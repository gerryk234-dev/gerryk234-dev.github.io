/* Reads lab results out of documents (PDF text or CSV) into DELTA's "Symbol, value, unit" lines.
   It only copies what is written — nothing is guessed or converted. The result then goes through the
   normal validation (parseLab), so anything odd still lands in the exception queue. Shared by server and browser. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./data.js'));
  else root.LabText = factory(root.DeltaData);
})(typeof self !== 'undefined' ? self : this, function (D) {
  'use strict';
  const ELEMENTS = [...D.MINERALS, ...D.TOXIC];
  const UNIT = /(mg%|mg\/100g|ppm|mg\/kg|µg\/g|ug\/g|mcg\/g|%)/i;
  const NUM = /(-?\d+(?:[.,]\d+)?)/;
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  /* PDF text items (from pdf.js) → readable lines, keeping table rows together. */
  function itemsToText(pages) {
    return pages.map(items => {
      const rows = [];
      for (const it of items) {
        if (!it.str || !it.str.trim()) continue;
        const y = it.transform[5], x = it.transform[4];
        let row = rows.find(r => Math.abs(r.y - y) < 3);
        if (!row) rows.push(row = { y, cells: [] });
        row.cells.push({ x, s: it.str });
      }
      return rows.sort((a, b) => b.y - a.y).map(r => r.cells.sort((a, b) => a.x - b.x).map(c => c.s.trim()).join('  ')).join('\n');
    }).join('\n');
  }

  /* Free text (e.g. from a PDF) → lines for each element found, plus the patient name if printed. */
  function fromText(text) {
    const lines = String(text || '').split(/\r?\n/).map(l => l.replace(/\s+/g, ' ').trim()).filter(Boolean);
    const found = [], out = [], notes = [];
    for (const el of ELEMENTS) {
      const nameRe = new RegExp(`(^|[^A-Za-z])(${esc(el.label)}|${esc(el.name)})(?![A-Za-z])`, el.name.length <= 2 ? '' : 'i');
      const labelRe = new RegExp(`(^|[^A-Za-z])${esc(el.label)}(?![A-Za-z])`, 'i');
      // prefer a line with the full element name; fall back to the symbol on its own
      const line = lines.find(l => labelRe.test(l)) || lines.find(l => nameRe.test(l) && new RegExp(`(^|\\s)${esc(el.name)}(\\s|$)`).test(l));
      if (!line) continue;
      const after = line.slice(line.search(labelRe.test(line) ? labelRe : nameRe)).replace(new RegExp(`^\\W*(${esc(el.label)})?\\s*(\\(?${esc(el.name)}\\)?)?`, 'i'), '');
      const m = after.match(NUM); if (!m) continue;
      const rest = after.slice(after.indexOf(m[1]) + m[1].length);
      const u = rest.match(new RegExp(`^\\s*${UNIT.source}`, 'i'));
      out.push(u ? `${el.name}, ${m[1].replace(',', '.')}, ${normUnit(u[1])}` : `${el.name}, ${m[1].replace(',', '.')}`);
      if (!u) notes.push(`${el.label}: no unit printed next to the value — check it is ${el.unit}`);
      found.push(el.name);
    }
    const nm = text.match(/(?:patient|client|name)\s*(?:name)?\s*[:\-]\s*([A-Za-zÀ-ÿ' .-]{2,60})/i);
    return { lines: out.join('\n'), found, notes, missing: ELEMENTS.filter(e => !found.includes(e.name)).map(e => e.name), name: nm ? nm[1].trim().replace(/\s{2,}.*$/, '') : '' };
  }
  const normUnit = u => (/^ug\/g$/i.test(u) ? 'µg/g' : /^mg%$/i.test(u) ? 'mg%' : u);

  /* CSV in any of the common layouts → the same lines. */
  function fromCsv(csv) {
    const rows = parseCsv(csv).filter(r => r.some(c => c.trim()));
    if (!rows.length) return { lines: '', notes: [], found: [], missing: ELEMENTS.map(e => e.name), name: '' };
    const find = k => ELEMENTS.find(e => e.name.toLowerCase() === k.toLowerCase() || e.label.toLowerCase() === k.toLowerCase());
    const head = rows[0].map(h => h.trim().toLowerCase());
    let name = '';
    const nameRow = rows.find(r => /^(patient|client|name)$/i.test((r[0] || '').trim()));
    if (nameRow) name = (nameRow[1] || '').trim();
    let pairs = [];
    if (head.filter(h => find(h)).length >= 3) { // wide: one column per element, values in the next row
      const vals = rows[1] || [];
      pairs = head.map((h, i) => [find(h), vals[i]]).filter(([e, v]) => e && v != null && v !== '').map(([e, v]) => [e, v, '']);
    } else {
      const ci = n => head.findIndex(h => n.test(h));
      const hasHead = ci(/element|mineral|symbol|analyte|test/) >= 0;
      const iEl = hasHead ? Math.max(ci(/element|mineral|symbol|analyte|test/), 0) : 0;
      const iVal = hasHead ? ci(/result|value|level|amount/) : 1;
      const iUnit = hasHead ? ci(/unit/) : 2;
      for (const r of rows.slice(hasHead ? 1 : 0)) {
        const e = find((r[iEl] || '').trim()) || find(((r[iEl] || '').match(/\(([A-Za-z]{1,2})\)/) || [])[1] || '');
        if (e) pairs.push([e, (r[iVal >= 0 ? iVal : 1] || '').trim(), iUnit >= 0 ? (r[iUnit] || '').trim() : '']);
      }
    }
    const seen = new Set(), out = [], notes = [];
    for (const [e, v, u] of pairs) { if (seen.has(e.name)) continue; seen.add(e.name); out.push(u ? `${e.name}, ${String(v).replace(',', '.')}, ${normUnit(u)}` : `${e.name}, ${String(v).replace(',', '.')}`); if (!u) notes.push(`${e.label}: no unit given — check it is ${e.unit}`); }
    return { lines: out.join('\n'), notes, found: [...seen], missing: ELEMENTS.filter(e => !seen.has(e.name)).map(e => e.name), name };
  }

  /* Small RFC-4180 CSV parser (quotes, commas, semicolons). */
  function parseCsv(text) {
    const src = String(text || '').replace(/^﻿/, ''); const sep = (src.split('\n')[0].match(/;/g) || []).length > (src.split('\n')[0].match(/,/g) || []).length ? ';' : ',';
    const rows = []; let row = [], cell = '', q = false;
    for (let i = 0; i < src.length; i++) {
      const c = src[i];
      if (q) { if (c === '"' && src[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; }
      else if (c === '"') q = true; else if (c === sep) { row.push(cell); cell = ''; } else if (c === '\n') { row.push(cell.replace(/\r$/, '')); rows.push(row); row = []; cell = ''; } else cell += c;
    }
    if (cell || row.length) { row.push(cell.replace(/\r$/, '')); rows.push(row); }
    return rows;
  }
  return { itemsToText, fromText, fromCsv, parseCsv };
});
