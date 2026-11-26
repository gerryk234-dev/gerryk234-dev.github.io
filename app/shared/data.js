/* DELTA prototype — content & seed data.
   Everything here is placeholder content intended to be replaced via a CMS / admin.
   Reference ranges and rules are ILLUSTRATIVE ONLY and await clinical sign-off (brief §19). */

const PILLARS = [
  { id: 'body', n: 1, name: 'BODY', image: 'brand/nourish.jpg', alt: 'Vegetables and protein on a plate', short: 'Nourish and strengthen — vegetables, protein, water, and a simple shower practice.', tag: 'Nourish & Strengthen', icon: '◆',
    summary: 'Vegetables and protein, hydration, carrot juice and wheatgrass education, individual nutritional and supplement guidance with timing where appropriate, warm-to-cool showers and optional sauna.',
    note: 'Personalised advice lives in your Mineral Intelligence report and is kept separate from these general lessons.',
    lessons: ['Building a plate: vegetables & protein', 'Hydration basics', 'Carrot juice & wheatgrass: what we know', 'Timing your nutrition', 'Warm-to-cool showers', 'Sauna: an optional practice'] },
  { id: 'environment', n: 2, name: 'SPACE', image: 'brand/space.jpg', alt: 'A bright room with plants and an open window', short: 'Create better spaces — air, light, less clutter, and kinder boundaries.', tag: 'Create Better Spaces', icon: '⬡',
    summary: 'Home and workplace conditions, damp and mould awareness, ventilation, clutter, relationships, boundaries, supportive social surroundings, comfort, enjoyment and creating positive spaces.',
    lessons: ['Damp & mould awareness', 'Ventilation at home', 'Clearing clutter', 'Relationships & boundaries', 'Supportive surroundings', 'Designing a space you enjoy'] },
  { id: 'ground', n: 3, name: 'GROUND', image: 'brand/ground.jpg', alt: 'Bare feet on grass', short: 'Reconnect — time outside, quieter screens, and an easy breath.', tag: 'Reconnect with Yourself and Nature', icon: '◎',
    summary: 'Nature, digital quiet, mindfulness, breathing, grounding practices and the Zhineng Qigong-inspired DELTA Energy Circuit golden-energy visualisation, with standing and lying options.',
    lessons: ['Time in nature', 'Digital quiet', 'Breathing foundations', 'Mindful grounding', 'DELTA Energy Circuit — standing', 'DELTA Energy Circuit — lying'] },
  { id: 'move', n: 4, name: 'MOVE', image: 'brand/move.jpg', alt: 'Walking a quiet path at sunrise', short: 'Get energy moving — a walk, a little strength, and a version that fits you.', tag: 'Build Strength & Get the Energy Moving', icon: '▲',
    summary: 'Brisk outdoor walking, appropriate inclines, resistance and strength, mobility, stretching, posture, Qi Gong and enjoyable sports — with accessible variations.',
    lessons: ['Brisk outdoor walking', 'Using inclines safely', 'Strength at home', 'Mobility & stretching', 'Posture check-in', 'Qi Gong for beginners'] },
  { id: 'release', n: 5, name: 'RELEASE', image: 'brand/release.jpg', alt: 'Two people laughing outdoors', short: 'Feel and let go — notice tension, and leave room for laughter.', tag: 'Feel, Express & Let Go', icon: '✦',
    summary: 'TER (Timeline Emotional Release), BTR (Body Tension Release) and ST (The Stillness Technique) — gentle, non-forcing practices — plus LAUGHOLOGY as a distinct entry point.',
    lessons: ['TER — present emotions & gentle timeline reflection', 'BTR — noticing and softening tension', 'ST — The Stillness Technique', 'Tapping: an introduction', 'LAUGHOLOGY: why laughter matters'] },
  { id: 'rest', n: 6, name: 'REST', image: 'brand/rest.jpg', alt: 'A calm bedroom in the evening', short: 'Restore — an evening routine and sleep treated as the practice.', tag: 'Restore & Renew', icon: '☾',
    summary: 'Sleep, recovery, evening routines, breathing, relaxation, massage, restorative practices and spiritual peace.',
    lessons: ['Sleep foundations', 'An evening wind-down routine', 'Breathing for relaxation', 'Self-massage basics', 'Restorative practice', 'Finding peace'] },
];

const EPISODES = [
  { id: 'e7', n: 7, title: 'What your hair can (and can\'t) tell you', date: '2026-11-04', topics: ['Minerals', 'Analysis'], host: 'Founder', guest: '', mins: 38, access: 'public', desc: 'An honest look at Hair Tissue Mineral Analysis — what it measures, its limitations, and why we treat it as education, not diagnosis.' },
  { id: 'e6', n: 6, title: 'Awakening: my story, part one', date: '2026-10-21', topics: ['Awakening', 'Founder'], host: 'Founder', guest: '', mins: 52, access: 'public', desc: 'The founder shares the beginning of a personal journey towards greater awareness.' },
  { id: 'e5', n: 5, title: 'Laughing your way to RELEASE', date: '2026-10-07', topics: ['RELEASE', 'Humour'], host: 'Founder', guest: 'Guest comedian', mins: 41, access: 'members', desc: 'Why laughter belongs in a wellbeing practice — with a lot of laughing.' },
  { id: 'e4', n: 4, title: 'Damp, mould and the spaces we live in', date: '2026-09-23', topics: ['SPACE'], host: 'Founder', guest: 'Building surveyor', mins: 47, access: 'public', desc: 'Practical awareness of home conditions and how to create better spaces.' },
  { id: 'e3', n: 3, title: 'The DELTA Energy Circuit explained', date: '2026-09-09', topics: ['GROUND', 'Awakening'], host: 'Founder', guest: '', mins: 33, access: 'members', desc: 'A walk-through of the golden-energy visualisation, standing and lying.' },
  { id: 'e2', n: 2, title: 'Sleep, rest and renewal', date: '2026-08-26', topics: ['REST'], host: 'Founder', guest: 'Sleep coach', mins: 44, access: 'public', desc: 'Evening routines and restorative practices that support rest.' },
  { id: 'e1', n: 1, title: 'Welcome to DELTA — From Analysis to Awakening', date: '2026-08-12', topics: ['Founder', 'Six Pillars'], host: 'Founder', guest: '', mins: 29, access: 'public', desc: 'Introducing the six pillars and the idea behind the DELTA Experience.' },
];

const VIDEOS = [
  { id: 'v1', title: 'Meet Mineral Man: What is HTMA?', cat: 'Minerals', pillar: 'body', mins: 6, access: 'public', featured: true },
  { id: 'v2', title: 'Calcium & magnesium: the partnership', cat: 'Minerals', pillar: 'body', mins: 8, access: 'members' },
  { id: 'v3', title: 'Sodium, potassium and daily energy', cat: 'Minerals', pillar: 'body', mins: 7, access: 'members' },
  { id: 'v4', title: 'Reading your Mineral Intelligence report', cat: 'Your report', pillar: 'body', mins: 11, access: 'members', featured: true },
  { id: 'v5', title: 'Why we don\'t diagnose', cat: 'Your report', pillar: '', mins: 5, access: 'public' },
  { id: 'v6', title: 'How to take your hair sample', cat: 'Kit & sample', pillar: '', mins: 4, access: 'public' },
  { id: 'v7', title: 'Supplements: safety first', cat: 'Your report', pillar: 'body', mins: 9, access: 'members' },
  { id: 'v8', title: 'Mineral Man on the move', cat: 'Lifestyle', pillar: 'move', mins: 6, access: 'members' },
];

const PARTNERS = [
  { id: 'p1', name: 'Verdant Nutrition', cat: 'Supplements & nutrition', desc: 'Third-party tested food-state supplements.', code: 'DELTA10', paid: false, affiliate: true, active: true, clicks: 41 },
  { id: 'p2', name: 'Earthwise Living', cat: 'Grounding & environment', desc: 'Natural-fibre bedding and home-environment products.', code: '', paid: true, affiliate: true, active: true, clicks: 18 },
  { id: 'p3', name: 'Lantern Books', cat: 'Books & conscious living', desc: 'An independent bookshop for consciousness, philosophy and wellbeing.', code: 'DELTA5', paid: false, affiliate: true, active: true, clicks: 27 },
  { id: 'p4', name: 'Stillwater Sleep', cat: 'Movement, sleep & restoration', desc: 'Sleep and recovery accessories.', code: '', paid: false, affiliate: false, active: true, clicks: 9 },
  { id: 'p5', name: 'Trailhead Footwear', cat: 'Movement, sleep & restoration', desc: 'Comfortable walking footwear.', code: 'WALK15', paid: true, affiliate: true, active: false, clicks: 3 },
];

const FAQS = [
  ['What is included in the DELTA Experience?', 'One purchase includes your hair mineral test kit, laboratory analysis, your automatically prepared Mineral Intelligence report, a safety-screened proposed programme, and six months of full member access to all six pillars, Awakening, the DELTA Podcast, Meet Mineral Man, LAUGHOLOGY, community groups and the Partner Collective.'],
  ['Is HTMA a medical test?', 'No. Hair Tissue Mineral Analysis is not a standalone diagnostic tool. DELTA provides educational interpretation, not diagnosis or treatment. Always speak to your doctor about medical concerns.'],
  ['How does the six-month access work?', 'Each qualifying test purchase gives six months of full access. If you buy a repeat test early, six months is added from your current expiry date, so you never lose time.'],
  ['What happens when my access expires?', 'Member-only learning and groups pause, but your account and your historical reports are kept under our retention policy, and you can still access or export your personal information. Buying a new test reactivates everything.'],
  ['Do I need a personal consultation?', 'No — your report and learning path are delivered automatically. If you\'d like one, you can buy an optional practitioner voice note that explains your report or answers a set of questions.'],
  ['Will I receive supplement recommendations?', 'A proposed programme may be included, but only after safety screening. If anything in your intake (for example pregnancy, medications or medical conditions) needs professional judgement, your case is reviewed before any personalised supplement advice is released.'],
  ['Is retesting required?', 'Retesting is offered as a way to renew and to compare results over time. It is not presented as medically essential for everyone at a fixed interval.'],
  ['Is my health data safe?', 'Health information is special-category data. It is encrypted, access is role-restricted and audited, and we never use identifiable health records to train third-party AI systems.'],
];

const JOKES = [
  'I told my mineral report a joke. It had a great sense of humour — very well-balanced.',
  'Why did the magnesium go to therapy? It had too many unresolved bonds.',
  'My doctor told me to watch my iron levels. Now I just stare at the kettle.',
];

/* Illustrative HTMA panel — same shape and placeholder bands as the Grok build ({name,label,value,low,high,unit}).
   Bands are PLACEHOLDERS for the prototype only and must be replaced by the chosen laboratory's intervals. */
const MINERALS = [
  { name: 'Ca', label: 'Calcium', low: 40, high: 80, unit: 'mg%' },
  { name: 'Mg', label: 'Magnesium', low: 4, high: 8, unit: 'mg%' },
  { name: 'Na', label: 'Sodium', low: 20, high: 35, unit: 'mg%' },
  { name: 'K', label: 'Potassium', low: 5, high: 12, unit: 'mg%' },
  { name: 'Zn', label: 'Zinc', low: 12, high: 22, unit: 'mg%' },
  { name: 'Cu', label: 'Copper', low: 1.5, high: 2.5, unit: 'mg%' },
];
const DEMO_RESULT = { Ca: 62, Mg: 3.2, Na: 18, K: 8, Zn: 16, Cu: 2.8 }; // the Grok demo values
const TOXIC = [
  { name: 'Pb', label: 'Lead', unit: 'mg%', high: 0.10 },
  { name: 'Hg', label: 'Mercury', unit: 'mg%', high: 0.04 },
  { name: 'Cd', label: 'Cadmium', unit: 'mg%', high: 0.01 },
  { name: 'Al', label: 'Aluminium', unit: 'mg%', high: 0.70 },
];
const RATIOS = [
  { id: 'Ca/Mg', a: 'Ca', b: 'Mg', low: 5, high: 10 },
  { id: 'Na/K', a: 'Na', b: 'K', low: 2, high: 3 },
  { id: 'Zn/Cu', a: 'Zn', b: 'Cu', low: 6, high: 10 },
];

/* Version-controlled educational rule set. Each rule: condition → explanation + lessons + programme template.
   Programme templates intentionally contain NO doses: protocol awaits clinical sign-off (brief §19). */
const RULESETS = {
  'R-2026.11-v1': {
    approvedBy: 'Founder (draft — pending clinical sign-off)', date: '2026-11-01',
    rules: [
      { id: 'MG-LOW', when: v => v.Mg < 4, title: 'Magnesium below reference interval',
        text: 'Your magnesium reading sits below the reference interval used by DELTA. Magnesium is widely discussed in relation to relaxation and rest. This is educational context, not a diagnosis.',
        lessons: ['rest', 'body'], prog: 'Magnesium-rich food focus; supplement template MG-A (practitioner-approved protocol)', supplement: true },
      { id: 'CAMG-HIGH', when: (v, r) => r['Ca/Mg'] > 10, title: 'Higher calcium-to-magnesium ratio',
        text: 'Your calcium-to-magnesium ratio is above the interval DELTA uses. We explain what this ratio is generally thought to reflect in the "Calcium & magnesium" video.',
        lessons: ['body', 'rest'], prog: 'Education: Ca/Mg balance video & food sources', supplement: false },
      { id: 'NAK-LOW', when: (v, r) => r['Na/K'] < 2, title: 'Lower sodium-to-potassium ratio',
        text: 'Your sodium-to-potassium ratio is below the DELTA interval. Many practitioners associate this ratio with energy patterns; we suggest starting with the MOVE and REST pillars.',
        lessons: ['move', 'rest'], prog: 'Daily brisk walk & evening wind-down routine', supplement: false },
      { id: 'NA-LOW', when: v => v.Na < 20, title: 'Sodium below reference interval',
        text: 'Your sodium reading sits below the laboratory band. We cover hydration and everyday energy in the BODY and REST lessons.',
        lessons: ['body', 'rest'], prog: 'Hydration habits lesson & evening routine', supplement: false },
      { id: 'ZN-LOW', when: v => v.Zn < 12, title: 'Zinc below reference interval',
        text: 'Your zinc reading is below the reference interval. Zinc-containing foods are covered in BODY lessons.',
        lessons: ['body'], prog: 'Zinc-rich food focus; supplement template ZN-A (practitioner-approved protocol)', supplement: true },
      { id: 'CU-HIGH', when: v => v.Cu > 2.5, title: 'Copper above reference interval',
        text: 'Your copper reading is above the reference interval. Because copper and zinc interact, this is considered alongside your zinc result.',
        lessons: ['body', 'environment'], prog: 'Review of water/pipework awareness (SPACE lesson)', supplement: false },
      { id: 'TOXIC', when: (v, r, t) => t.length > 0, title: 'Elevated toxic-element reading',
        text: 'One or more toxic elements are above the DELTA reference level. This has been flagged for professional review. If you have health concerns, please speak to your GP.',
        lessons: ['environment'], prog: 'Held for practitioner review', supplement: false, review: true },
    ],
    baseline: { lessons: ['ground', 'release'], prog: 'Start with the DELTA Daily Practice: 10 minutes of grounding and one RELEASE lesson per week.' },
  },
};
const CURRENT_RULESET = 'R-2026.11-v1';

/* Safety screening questions — any "yes" routes personalised supplement advice to human review. */
const SAFETY_QS = [
  { id: 'pregnant', q: 'Are you pregnant, trying to conceive or breastfeeding?' },
  { id: 'meds', q: 'Are you taking any prescription medication (including blood thinners, thyroid, diuretics or antibiotics)?' },
  { id: 'kidney', q: 'Do you have a kidney, liver or heart condition?' },
  { id: 'chronic', q: 'Are you under medical care for any other diagnosed condition?' },
  { id: 'supps', q: 'Are you currently taking supplements?' },
];

/* ── Community Centre: practices, curated videos, books and the weekly timetable (all admin-editable once seeded) ── */
const PRACTICES = [
  { id: 'meditation', name: 'Meditation', tag: 'Settle the mind', pillar: 'rest', emblem: 'lotus', desc: 'Short guided sits to quieten a busy mind — from two-minute pauses to longer stillness practice. Sit, lie down or walk; there is no wrong way to begin.' },
  { id: 'yoga', name: 'Yoga', tag: 'Breath and gentle movement', pillar: 'move', emblem: 'yoga', desc: 'Beginner-friendly flows that link breath with movement — strength, flexibility and a calmer body. Always move within your own range.' },
  { id: 'taichi', name: 'Tai Chi & Qi Gong', tag: 'Moving meditation', pillar: 'ground', emblem: 'yinyang', desc: 'Slow, flowing forms rooted in Chinese practice, including Qi Gong — balance, posture and a quiet focus. Lovely outdoors, at any age.' },
  { id: 'mindfulness', name: 'Mindfulness', tag: 'Be here now', pillar: 'ground', emblem: 'ripple', desc: 'Everyday awareness — noticing breath, body and surroundings without judgement. Small moments, practised often.' },
  { id: 'laughter', name: 'Laughter', tag: 'Laughter yoga & play', pillar: 'release', emblem: 'laugh', desc: 'Laughter yoga, playful breathing and LAUGHOLOGY — laughing for no reason, together. It is part of the RELEASE pillar.' },
  { id: 'comedy', name: 'Comedy', tag: 'Clean comedy & good company', pillar: 'release', emblem: 'masks', desc: 'Family-friendly stand-up and silly stories to share. Watch on your own or join the Friday comedy night.' },
];
const CENTRE_VIDEOS = [
  ['meditation', 'U9YKY7fdwyg', '10-Minute Meditation For Beginners', 'Goodful', '10:21'],
  ['meditation', 'WHCl6b9K25Y', '10-Minute Guided Meditation for Beginners to Clear Thoughts', 'Yoga Journal', '11:21'],
  ['meditation', 'FGO8IWiusJo', 'Guided Morning Meditation — 10 Minutes to Start Every Day', 'Boho Beautiful Yoga', '10:35'],
  ['meditation', 'KIltp1hJlVY', 'Best Grounding Meditation', 'Mineral Man', '10:16'],
  ['meditation', 'jiRhB1VvfMY', 'Best Affirmation Meditation', 'Mineral Man', '14:38'],
  ['yoga', 'v7AYKMP6rOE', 'Yoga For Complete Beginners — 20 Minute Home Practice', 'Yoga With Adriene', '23:45'],
  ['yoga', 'vNyJuQuuMC8', '20-Minute Yoga For Beginners — Start Yoga Here', 'Yoga With Adriene', '21:41'],
  ['yoga', 'camy0PIKxwU', '20 Min Gentle Yoga Routine — Full Body Stretch', 'Charlie Follows', '19:50'],
  ['taichi', 'cEvSqHZIj8w', 'Tai Chi For Beginners: 7-Minute Routine', 'Phoenix Mountain Tai Chi', '8:00'],
  ['taichi', 'G0epup_G37s', 'Gentle Tai Chi Routine for All Levels', 'Taichi Workout', '30:11'],
  ['taichi', 'JkmYxL6AjDo', 'Tree Grounding — Why Everyone Needs It', 'Mineral Man', '3:45'],
  ['mindfulness', 'ZToicYcHIOU', 'Daily Calm — 10 Minute Mindfulness Meditation: Be Present', 'Calm', '10:30'],
  ['mindfulness', '6p_yaNFSYao', 'Mindfulness Meditation — Guided 10 Minutes', 'The Honest Guys', '9:48'],
  ['mindfulness', 'ABqBCQCf81o', 'Learn How To Breathe Correctly in 5 Minutes', 'Mineral Man', '6:18'],
  ['mindfulness', 'ZRRkhLOY6zw', 'The Healing Power of the Now', 'Mineral Man', '10:53'],
  ['laughter', '59KAzaNkctg', 'Laughter Yoga', 'Mayo Clinic', '4:36'],
  ['laughter', 'wfB58mhciAE', 'Five-Minute Laughter Yoga with Dr Madan Kataria', 'Laughter Guru', '5:22'],
  ['laughter', '4p4dZ0afivk', 'Laughter Yoga — Liliana DeLeo', 'TEDx Talks', '4:59'],
  ['laughter', 'WbXpggclVdU', 'The Power of Smiling', 'Mineral Man', '9:06'],
  ['comedy', 'j57MWJlN8aY', 'A Comedy Special the Whole Family Can Enjoy — Landry', 'Dry Bar Comedy', '22:25'],
  ['comedy', 'nQ3qp1VOYiA', 'Deep Thoughts on Dumb Things — Clean Comedy', 'John Branyan', '28:39'],
  ['comedy', 'oNdE22lcgkM', 'My Dad Is Old — Stand-Up', 'Colin C. (Cool Beans Comedy)', '4:21'],
].map(([practice, youtubeId, title, channel, length]) => ({ practice, youtubeId, title, channel, length }));
const BOOKS = [
  ['meditation', 'The Miracle of Mindfulness', 'Thich Nhat Hanh', 'A gentle, practical classic on sitting, breathing and everyday awareness.'],
  ['meditation', 'Wherever You Go, There You Are', 'Jon Kabat-Zinn', 'Short chapters on bringing meditation into ordinary life.'],
  ['mindfulness', 'Full Catastrophe Living', 'Jon Kabat-Zinn', 'The book behind mindfulness-based stress reduction (MBSR).'],
  ['mindfulness', 'The Power of Now', 'Eckhart Tolle', 'On presence and stepping out of the busy, thinking mind.'],
  ['yoga', 'Light on Yoga', 'B.K.S. Iyengar', 'The illustrated reference to postures and breathing.'],
  ['yoga', 'The Heart of Yoga', 'T.K.V. Desikachar', 'Building a personal practice that suits your own body.'],
  ['taichi', 'The Harvard Medical School Guide to Tai Chi', 'Peter M. Wayne', 'Tai chi explained clearly, with the research behind it.'],
  ['taichi', 'Tao Te Ching', 'Lao Tzu (tr. Stephen Mitchell)', 'The short, timeless text behind the philosophy of flow.'],
  ['laughter', 'Laugh for No Reason', 'Dr Madan Kataria', 'From the founder of laughter yoga — how and why it works in groups.'],
  ['laughter', 'The Book of Joy', 'Dalai Lama & Desmond Tutu', 'Two friends on joy, humour and resilience.'],
  ['comedy', 'Born Standing Up', 'Steve Martin', 'A warm, funny memoir about a life in comedy.'],
  ['comedy', 'Yes Please', 'Amy Poehler', 'Stories, jokes and kind advice.'],
  ['ground', 'Breath', 'James Nestor', 'A lively look at how we breathe — pairs well with GROUND.'],
  ['rest', 'Why We Sleep', 'Matthew Walker', 'An accessible book on sleep — pairs with REST.'],
  ['environment', 'The Life-Changing Magic of Tidying Up', 'Marie Kondo', 'Creating calmer spaces — pairs with SPACE.'],
  ['move', 'Born to Run', 'Christopher McDougall', 'A story about the joy of running — pairs with MOVE.'],
].map(([practice, title, author, why]) => ({ practice, title, author, why }));
const SESSIONS = [
  ['taichi', 'Sunrise Tai Chi', 1, '07:30', 20], ['meditation', 'Evening Guided Meditation', 2, '19:00', 15], ['laughter', 'Lunchtime Laughter Yoga', 3, '12:30', 20],
  ['yoga', 'Gentle Yoga Flow', 4, '18:30', 30], ['comedy', 'Friday Comedy Night (watch party)', 5, '20:00', 45], ['mindfulness', 'Mindful Morning Walk', 6, '09:00', 30], ['meditation', 'Sunday Stillness Circle', 0, '18:00', 20],
].map(([practice, title, day, time, mins]) => ({ practice, title, day, time, mins, host: 'DELTA guide', where: 'Online' }));


/* Guided methods: step-by-step practices the Community Centre plays with a living, animated guide.
   step = [name, seconds, cue, breath] — breath: 'in' | 'out' | 'hold' | '' (movement / rest).
   Each has a verified follow-along video and plain safety notes. Educational, not medical advice. */
const METHODS = (() => {
  const times = (n, steps) => Array.from({ length: n }, () => steps).flat();
  const pose = (name, secs, cue) => [name, secs, cue, ''];
  return [
    { id: 'wimhof', cat: 'breath', practice: 'meditation', emblem: 'ripple', name: 'Wim Hof–style breathing', mins: 11, level: 'Intermediate', special: 'wimhof',
      desc: 'Rounds of 30 deep, rhythmic breaths, a relaxed breath-hold after breathing out, then a 15-second recovery breath. Popularised by Wim Hof — often followed by a cool shower finish.',
      safety: 'Always sit or lie down. Never practise in or near water, while driving or standing. Light-headedness and tingling are common — stop if you feel unwell. Not suitable during pregnancy or if you have epilepsy, a heart condition or high blood pressure; check with your GP first.',
      video: { id: 'tybOi4hjZFQ', title: 'Guided Wim Hof Method Breathing', ch: 'Wim Hof' }, more: { id: 'IFSL_Qk9qKw', title: 'Wim Hof Method — Safety Information' }, link: 'https://www.wimhofmethod.com' },
    { id: 'box', cat: 'breath', practice: 'mindfulness', emblem: 'ripple', name: 'Box breathing', mins: 4, level: 'Beginner',
      desc: 'Breathe in, hold, breathe out, hold — four counts each. A steadying square used by athletes and first responders.',
      safety: 'Keep holds comfortable; shorten the counts if you feel strained.',
      video: { id: 'aPYmZOhJF5Q', title: 'Guided Box Breathing (4-4-4-4)', ch: 'Feeling Healing' },
      steps: times(12, [['Breathe in', 4, 'Slowly through the nose', 'in'], ['Hold', 4, 'Soft shoulders', 'hold'], ['Breathe out', 4, 'Slowly, all the way', 'out'], ['Hold', 4, 'Rest empty', 'hold']]) },
    { id: 'coherent', cat: 'breath', practice: 'meditation', emblem: 'lotus', name: 'Coherent breathing (5.5)', mins: 5, level: 'Beginner',
      desc: 'About five and a half breaths a minute — in for 5.5, out for 5.5. A gentle, even rhythm that many people find deeply calming.',
      safety: 'Breathe quietly through the nose; never force.',
      video: { id: 'ZXh-IGyBegQ', title: 'Breathing to Regulate Nervous System (5.5 breaths per minute)', ch: 'Pocket Breath Coach' },
      steps: times(27, [['Breathe in', 5.5, 'Low and slow into the belly', 'in'], ['Breathe out', 5.5, 'Long and smooth', 'out']]) },
    { id: 'relax478', cat: 'breath', practice: 'meditation', emblem: 'lotus', name: '4-7-8 relaxing breath', mins: 3, level: 'Beginner',
      desc: 'In for 4, hold for 7, out for 8 through softly pursed lips. A wind-down breath for the evening.',
      safety: 'Start with four rounds. Sit down — the long hold can make some people light-headed.',
      video: { id: 'YRPh_GaiL8s', title: 'How To Perform the 4-7-8 Breathing Exercise', ch: 'Andrew Weil, M.D.' },
      steps: times(8, [['Breathe in', 4, 'Quietly through the nose', 'in'], ['Hold', 7, 'Tongue resting behind the top teeth', 'hold'], ['Breathe out', 8, 'Whoosh out through the mouth', 'out']]) },
    { id: 'nadi', cat: 'breath', practice: 'yoga', emblem: 'yoga', name: 'Alternate nostril breathing', mins: 5, level: 'Beginner',
      desc: 'Nadi Shodhana: close one nostril with the thumb, breathe in through the other, switch and breathe out. A balancing yoga breath.',
      safety: 'Skip it if your nose is blocked. Breathe gently.',
      video: { id: 'TKNITh99roA', title: 'Guided Alternate Nostril Breathing (Nadi Shodhana) — 5 minutes', ch: 'Feeling Healing' },
      steps: times(8, [['In — left nostril', 4, 'Thumb closes the right', 'in'], ['Hold', 2, 'Both closed, softly', 'hold'], ['Out — right nostril', 6, 'Ring finger closes the left', 'out'], ['In — right nostril', 4, 'Stay on the right', 'in'], ['Hold', 2, 'Both closed', 'hold'], ['Out — left nostril', 6, 'Thumb closes the right', 'out']]) },

    { id: 'sunsal', cat: 'yoga', practice: 'yoga', emblem: 'yoga', name: 'Sun Salutation flow', mins: 8, level: 'Beginner',
      desc: 'Surya Namaskar — twelve linked postures that warm the whole body, each move matched to a breath. Three gentle rounds.',
      safety: 'Bend your knees in forward folds and lower to the knees from plank if you need to. Move within your own range.',
      video: { id: '8AakYeM23sI', title: '10 min Sun Salutation Practice', ch: 'Yoga With Adriene' },
      steps: times(3, [['Mountain pose', 10, 'Stand tall, palms together at the heart', 'out'], ['Upward salute', 6, 'Sweep the arms up', 'in'], ['Forward fold', 6, 'Hinge at the hips, knees soft', 'out'], ['Half lift', 5, 'Long flat back, hands on shins', 'in'], ['Plank', 8, 'Step back, strong and steady', 'out'], ['Knees, chest, chin', 6, 'Lower slowly to the mat', 'out'], ['Cobra', 6, 'Lift the chest, elbows hugging in', 'in'], ['Downward dog', 20, 'Hips high, pedal the feet — five breaths', ''], ['Step forward', 6, 'Hands between the feet, half lift', 'in'], ['Forward fold', 6, 'Let the head hang', 'out'], ['Rise up', 6, 'Sweep the arms up', 'in'], ['Mountain pose', 6, 'Hands to the heart', 'out']]) },
    { id: 'bedtime', cat: 'yoga', practice: 'yoga', emblem: 'lotus', name: 'Bedtime yoga', mins: 10, level: 'Beginner',
      desc: 'Slow floor postures to release the day and settle the nervous system before sleep.',
      safety: 'Use pillows freely. Skip legs-up-the-wall if you have glaucoma or are in late pregnancy.',
      video: { id: 'CLDHeV9OI5U', title: '10-Minute Bedtime Yoga', ch: 'Yoga With Adriene' },
      steps: [pose("Child's pose", 60, 'Knees wide, forehead down, long slow breaths'), pose('Cat–cow', 60, 'Arch on the in-breath, round on the out-breath'), pose('Seated forward fold', 60, 'Knees bent, let the spine soften'), pose('Twist — right', 45, 'Lying down, knees fall to the right'), pose('Twist — left', 45, 'Knees fall to the left'), pose('Happy baby', 45, 'Hold the feet, rock gently'), pose('Legs up the wall', 120, 'Heavy legs, quiet mind'), pose('Rest (savasana)', 120, 'Let the whole body be held')] },
    { id: 'chair', cat: 'yoga', practice: 'yoga', emblem: 'yoga', name: 'Chair yoga', mins: 8, level: 'Everyone',
      desc: 'Seated stretches for the desk, the sofa or anyone with limited mobility — neck, shoulders, spine, wrists and ankles.',
      safety: 'Use a sturdy chair without wheels. Keep movements small and pain-free.',
      video: { id: '1DYH5ud3zHo', title: 'Gentle Chair Yoga for Beginners and Seniors', ch: 'Yoga with Kassandra' },
      steps: [pose('Settle and breathe', 40, 'Feet flat, sit tall'), pose('Neck rolls', 50, 'Half circles, ear to shoulder'), pose('Shoulder rolls', 40, 'Big slow circles backwards'), pose('Seated cat–cow', 60, 'Hands on knees, arch and round'), pose('Side stretch — right', 30, 'Left arm reaches over'), pose('Side stretch — left', 30, 'Right arm reaches over'), pose('Twist — right', 30, 'Hand to the chair back'), pose('Twist — left', 30, 'Hand to the chair back'), pose('Wrists and fingers', 40, 'Circle the wrists, spread the fingers'), pose('Ankle circles', 40, 'Both directions, one foot at a time'), pose('Rest', 60, 'Hands in the lap, eyes closed')] },

    { id: 'brocades', cat: 'taichi', practice: 'taichi', emblem: 'yinyang', name: 'Eight Brocades (Ba Duan Jin)', mins: 9, level: 'Beginner',
      desc: 'A classic qigong set of eight flowing movements, practised in China for centuries. Slow, standing, breath-led.',
      safety: 'Knees soft, never locked. Sit for any movement that challenges your balance.',
      video: { id: 'MGGHJF5kbfU', title: '8 Brocades Qigong Follow-Along for Beginners', ch: 'Regeneration Tai Chi' },
      steps: [pose('Stand in stillness', 40, 'Feet hip-width, knees soft, breathe low'), pose('Two hands hold up the heavens', 60, 'Interlace the fingers, press up, lower'), pose('Drawing the bow', 60, 'Step wide, draw the bow left and right'), pose('Separating heaven and earth', 60, 'One hand presses up, one presses down'), pose('Wise owl gazes backwards', 60, 'Turn the head gently, look behind'), pose('Sway the head and tail', 60, 'Horse stance, sway side to side'), pose('Hands to the feet', 60, 'Slide the hands down the legs, rise slowly'), pose('Clench the fists, gaze fiercely', 60, 'Punch slowly, eyes bright'), pose('Bouncing on the toes', 40, 'Rise and drop softly to the heels'), pose('Gather and close', 40, 'Hands rest on the belly')] },
    { id: 'taichi5', cat: 'taichi', practice: 'taichi', emblem: 'yinyang', name: 'Tai chi — five flowing moves', mins: 7, level: 'Beginner',
      desc: 'Wu ji standing, commencement, cloud hands, brush knee and closing — the heart of a beginner’s tai chi, slow as a cloud.',
      safety: 'Move slowly with the breath. Use a chair for balance if you need it.',
      video: { id: 'cEvSqHZIj8w', title: 'Tai Chi For Beginners: 7-Minute Routine', ch: 'Phoenix Mountain Tai Chi' },
      steps: [pose('Wu ji — standing', 60, 'Feet parallel, crown lifted, arms hang'), pose('Commencement', 60, 'Float the arms up on the in-breath, sink on the out-breath'), pose('Cloud hands', 100, 'Hands circle past the face as the waist turns'), pose('Brush knee', 100, 'Step, brush past the knee, push forward softly'), pose('Closing', 60, 'Cross the hands, lower them, stand still')] },
    { id: 'qigong-morning', cat: 'taichi', practice: 'taichi', emblem: 'yinyang', name: 'Morning qigong', mins: 6, level: 'Beginner',
      desc: 'Wake the body gently: shaking, tapping, swinging and gathering energy.',
      safety: 'Tap lightly. Skip shaking if you have dizziness.',
      video: { id: 'YtucUw4LI8c', title: '15-Minute Morning Qigong — Beginner Routine', ch: 'Zach Scannapieco' },
      steps: [pose('Shake it out', 60, 'Bounce gently through the knees, let the arms flop'), pose('Tapping', 60, 'Loose fists tap arms, chest and legs'), pose('Swinging arms', 60, 'Turn the waist, let the arms swing'), pose('Lifting the sky', 60, 'Arms rise, breathe in; lower, breathe out'), pose('Gathering', 60, 'Scoop energy in, hands to the belly'), pose('Stillness', 60, 'Feel the tingle and warmth')] },

    { id: 'bodyscan', cat: 'mind', practice: 'mindfulness', emblem: 'ripple', name: 'Body scan', mins: 8, level: 'Beginner',
      desc: 'Move your attention slowly from your feet to the top of your head, noticing without changing anything.',
      safety: 'If any area feels distressing, simply move on or open your eyes.',
      video: { id: 'BlWo7sqWLNk', title: 'Guided Body Scan Meditation (10 minutes)', ch: 'MindfulPeace' },
      steps: [pose('Arrive', 45, 'Lie or sit comfortably; feel the body being supported'), pose('Feet', 50, 'Toes, soles, heels — warmth, coolness, tingling'), pose('Legs', 50, 'Calves, knees, thighs'), pose('Hips and belly', 50, 'Feel the belly rise and fall'), pose('Back and chest', 50, 'Notice the breath moving the ribs'), pose('Hands and arms', 50, 'Fingers, palms, forearms, shoulders'), pose('Neck and face', 50, 'Soften the jaw, the eyes, the forehead'), pose('Whole body', 60, 'Feel the body as one field of sensation'), pose('Return', 30, 'Wiggle fingers and toes')] },
    { id: 'pmr', cat: 'mind', practice: 'meditation', emblem: 'lotus', name: 'Progressive muscle relaxation', mins: 7, level: 'Beginner',
      desc: 'Tense a muscle group for five seconds, then let it go and feel the difference. Great before sleep.',
      safety: 'Tense gently (about half effort). Skip any area that is injured or painful.',
      video: { id: '2IJUD-e14FY', title: 'Guided Progressive Muscle Relaxation', ch: 'Hospital for Special Surgery' },
      steps: ['Feet', 'Calves', 'Thighs', 'Belly', 'Hands', 'Arms', 'Shoulders', 'Face'].flatMap(m => [[`Tense — ${m.toLowerCase()}`, 5, 'Squeeze gently and hold', 'in'], [`Release — ${m.toLowerCase()}`, 15, 'Let go completely; notice the softness', 'out']]).concat([pose('Rest', 60, 'Feel the whole body heavy and warm')]) },
    { id: 'nidra', cat: 'mind', practice: 'meditation', emblem: 'lotus', name: 'Yoga nidra — yogic sleep', mins: 10, level: 'Everyone',
      desc: 'A deeply restful guided practice lying down: an intention, a journey of awareness through the body, and a return.',
      safety: 'It is fine to fall asleep. Avoid while driving.',
      video: { id: '9r8jXUvsi3w', title: '20 minute yoga nidra — reset your nervous system', ch: 'Ally Boothroyd' },
      steps: [pose('Lie down', 60, 'Blanket, pillow, eyes closed'), pose('Intention', 45, 'Silently repeat a short, kind sentence — your sankalpa'), pose('Rotation of awareness', 150, 'Right hand thumb, fingers, palm… let your attention travel'), pose('Breath', 90, 'Count breaths backwards from 27'), pose('Heavy and light', 60, 'Feel the body heavy… then light as a feather'), pose('Inner image', 90, 'A calm place: sand, sea, a warm sun'), pose('Intention again', 30, 'Repeat your sankalpa'), pose('Return', 45, 'Deepen the breath, stretch slowly')] },
    { id: 'kindness', cat: 'mind', practice: 'mindfulness', emblem: 'lotus', name: 'Loving-kindness', mins: 6, level: 'Everyone', special: 'kindness',
      desc: 'Offer kind wishes to yourself, someone you love and everyone. With the living Tree of Life.',
      safety: 'If it feels hard to send kindness to yourself, start with someone easy to love.',
      video: { id: '-d_AA9H4z9U', title: 'Loving Kindness Meditation to Develop Mindfulness and Compassion', ch: 'Josh Wise' } },

    { id: 'grounding', cat: 'joy', practice: 'mindfulness', emblem: 'ripple', name: 'Barefoot grounding', mins: 6, level: 'Everyone',
      desc: 'Stand or walk barefoot on grass, sand or earth and come back to your senses with the 5-4-3-2-1 practice. Part of the GROUND pillar.',
      safety: 'Check the ground for glass and sharp objects. Avoid in very cold weather or if you have reduced feeling in your feet.',
      video: { id: '30VMIEmA114', title: 'The 5-4-3-2-1 Method: A Grounding Exercise', ch: 'The Partnership In Education' },
      steps: [pose('Feet on the earth', 60, 'Shoes off — feel the ground'), pose('5 things you can see', 45, 'Name them slowly'), pose('4 things you can feel', 45, 'Grass, air, sun, clothes'), pose('3 things you can hear', 45, 'Near and far'), pose('2 things you can smell', 40, 'Earth, salt, leaves'), pose('1 thing you can taste', 30, 'Or one good thing about today'), pose('Slow walk', 90, 'Feel every step land')] },
    { id: 'laughdrill', cat: 'joy', practice: 'laughter', emblem: 'laugh', name: 'Laughter yoga drills', mins: 5, level: 'Everyone',
      desc: 'Laughter for no reason — the body can’t tell fake from real, and soon it becomes real. Five classic drills.',
      safety: 'Avoid if you have had recent surgery, a hernia or uncontrolled high blood pressure. Stop if you leak or feel pain.',
      video: { id: 'wfB58mhciAE', title: 'Five minutes instructional laughter yoga with Dr Madan Kataria', ch: 'Laughter Guru' },
      steps: [pose('Ho-ho, ha-ha-ha', 40, 'Clap 1-2, 1-2-3 and chant'), pose('Greeting laugh', 45, 'Wave and laugh as if meeting old friends'), pose('Milkshake laugh', 45, 'Pour between two glasses, drink — and laugh!'), pose('Lion laugh', 40, 'Tongue out, hands like paws, roar with laughter'), pose('Silent laugh', 45, 'Laugh with no sound — shoulders shaking'), pose('Very good, very good, yay!', 30, 'Arms up'), pose('Calm breath', 40, 'Hand on the belly, smile')] },
    { id: 'soundbath', cat: 'joy', practice: 'meditation', emblem: 'lotus', name: 'Sound bath', mins: 10, level: 'Everyone', special: 'sound',
      desc: 'Lie back and let a soft resonant hum and bells wash over you. Built into DELTA — no download needed.',
      safety: 'Keep the volume low. Not while driving.',
      video: { id: 'BU_4OiqUn7U', title: '10 minute gong meditation', ch: 'Temple Sounds' } },
  ];
})();
const METHOD_CATS = [['breath', 'Breathwork', '🌬'], ['yoga', 'Yoga', '🧘'], ['taichi', 'Tai chi & qigong', '☯'], ['mind', 'Mindfulness & deep rest', '🌙'], ['joy', 'Grounding & joy', '🌿']];


/* Community portal — daily content. Picked by date, so everyone shares the same "today".
   Food ideas are general wholefood suggestions, not personal nutrition advice. */
const DAILY = {
  messages: [
    ['Small steps, taken daily, become a new way of living.', 'DELTA'],
    ['You don’t have to feel ready. You just have to begin gently.', 'DELTA'],
    ['Drink water, step outside, breathe slowly — the basics are powerful.', 'DELTA'],
    ['Rest is not a reward for finishing. It is part of the work.', 'DELTA'],
    ['Your body keeps listening to how you speak to it. Speak kindly.', 'DELTA'],
    ['Progress, not perfection. One good choice is enough for now.', 'DELTA'],
    ['Feet on the earth, face to the sun, a laugh with a friend — medicine for the spirit.', 'DELTA'],
    ['Breathe in what you need. Breathe out what you don’t.', 'DELTA'],
    ['The best time to plant a tree was twenty years ago. The second best time is now.', 'Proverb'],
    ['Wherever you go, there you are.', 'Jon Kabat-Zinn'],
    ['Almost everything will work again if you unplug it for a few minutes — including you.', 'Anne Lamott'],
    ['Happiness is not something ready-made. It comes from your own actions.', 'The Dalai Lama'],
    ['Look deep into nature, and then you will understand everything better.', 'Albert Einstein'],
    ['A good laugh and a long sleep are the best cures in the doctor’s book.', 'Irish proverb'],
    ['What you do every day matters more than what you do once in a while.', 'Gretchen Rubin'],
    ['The present moment is filled with joy and happiness. If you are attentive, you will see it.', 'Thich Nhat Hanh'],
    ['Be the energy you want to attract.', 'DELTA'],
    ['Movement is a celebration of what your body can do today.', 'DELTA'],
    ['You are not behind. You are on your own path, at your own pace.', 'DELTA'],
    ['Gratitude turns what we have into enough.', 'Anonymous'],
    ['Slow down — calm is a superpower.', 'DELTA'],
    ['Every sunrise is an invitation to begin again.', 'DELTA'],
    ['Take care of your body. It’s the only place you have to live.', 'Jim Rohn'],
    ['Nature does not hurry, yet everything is accomplished.', 'Lao Tzu'],
    ['Connection is why we’re here; it gives purpose and meaning to our lives.', 'Brené Brown'],
    ['Like water, a calm mind lets everything become clear.', 'DELTA'],
    ['Joy is the simplest form of gratitude.', 'Karl Barth'],
    ['Your daily rhythm is your quiet superpower. Guard it kindly.', 'DELTA'],
    ['Awaken a little more today: notice, breathe, smile.', 'DELTA'],
    ['You are allowed to be both a masterpiece and a work in progress.', 'Sophia Bush'],
  ],
  meals: {
    breakfast: ['Overnight oats with chia, berries and pumpkin seeds', 'Two eggs, wilted spinach and wholegrain toast', 'Greek yoghurt with walnuts, kiwi and a drizzle of honey', 'Buckwheat porridge with banana and almond butter', 'Avocado on rye with tomatoes and a squeeze of lemon', 'Green smoothie: spinach, banana, oats, flaxseed and milk of choice', 'Scrambled tofu with peppers, onions and turmeric'],
    lunch: ['Quinoa bowl with roast vegetables, chickpeas and tahini', 'Lentil and vegetable soup with a slice of sourdough', 'Big salad: leaves, beetroot, feta, seeds and olive oil', 'Wholegrain wrap with hummus, chicken or falafel and crunchy veg', 'Sardines on toast with a tomato and cucumber salad', 'Brown rice, edamame, avocado and sesame — a simple poke bowl', 'Sweet potato topped with black beans, salsa and yoghurt'],
    dinner: ['Baked salmon, steamed greens and new potatoes', 'Vegetable and bean chilli with brown rice', 'Chicken and vegetable stir-fry with ginger and garlic', 'Chickpea and spinach curry with wholegrain flatbread', 'Lean mince and lentil bolognese with wholewheat pasta', 'Roast vegetable tray bake with feta and herbs', 'Miso-glazed tofu with bok choy and noodles'],
    snack: ['A handful of almonds and an apple', 'Carrot and cucumber sticks with hummus', 'A square of dark chocolate and some berries', 'Oatcakes with nut butter', 'A banana and a glass of water', 'Plain popcorn with a pinch of sea salt', 'Natural yoghurt with seeds'],
  },
  moves: [
    ['10 slow squats', 'Sit back as if into a chair; use one if you like.'],
    ['Wall push-ups ×10', 'Hands on the wall, body straight, lower and press.'],
    ['20 calf raises', 'Hold a counter, rise onto your toes, lower slowly.'],
    ['A 10-minute brisk walk', 'Swing the arms; talk-but-not-sing pace.'],
    ['Dance to one song', 'Any song you love. No one is watching.'],
    ['Stairs ×3', 'Up and down at a steady pace; hold the rail.'],
    ['Plank for 20 seconds', 'On the knees is perfect too.'],
    ['Hip circles and shoulder rolls', 'Ten each way — oil the joints.'],
    ['Balance on one leg', '30 seconds each side, near a wall.'],
    ['Stretch break', 'Reach up tall, fold forward, open the chest.'],
  ],
  videos: [
    { id: '8KkKuTCFvzI', title: 'What makes a good life? Lessons from the longest study on happiness', ch: 'Robert Waldinger · TED', mins: 13 },
    { id: 'fLJsdqxnZb0', title: 'The happy secret to better work', ch: 'Shawn Achor · TED', mins: 12 },
    { id: 'UNP03fDSj1U', title: 'Try something new for 30 days', ch: 'Matt Cutts · TED-Ed', mins: 3 },
    { id: 'l-gQLqv9f4o', title: 'A pep talk from Kid President to you', ch: 'SoulPancake', mins: 3 },
    { id: 'gXDMoiEkyuQ', title: 'Gratitude', ch: 'Louie Schwartzberg · TEDxSF', mins: 10 },
    { id: 'yaQZFhrW0fU', title: 'Make your bed — commencement address', ch: 'Admiral William McRaven · UT Austin', mins: 19 },
    { id: '4q1dgn_C0AU', title: 'The surprising science of happiness', ch: 'Dan Gilbert · TED', mins: 21 },
    { id: 'UF8uR6Z6KLc', title: '2005 Stanford commencement address', ch: 'Steve Jobs · Stanford', mins: 15 },
    { id: 'Lp7E973zozc', title: 'How to stop screwing yourself over', ch: 'Mel Robbins · TEDxSF', mins: 22 },
  ],
  music: [
    ['Weightless', 'Marconi Union', 'Ambient calm'], ['Gymnopédie No. 1', 'Erik Satie', 'Piano'], ['Spiegel im Spiegel', 'Arvo Pärt', 'Stillness'],
    ['Clair de Lune', 'Claude Debussy', 'Piano'], ['Nuvole Bianche', 'Ludovico Einaudi', 'Piano'], ['Music for Airports', 'Brian Eno', 'Ambient'],
    ['Cello Suite No. 1', 'J. S. Bach · Yo-Yo Ma', 'Classical'], ['Here Comes the Sun', 'The Beatles', 'Feel-good'], ['Lovely Day', 'Bill Withers', 'Feel-good'],
    ['Three Little Birds', 'Bob Marley', 'Feel-good'], ['Hoppípolla', 'Sigur Rós', 'Uplifting'], ['Says', 'Nils Frahm', 'Focus'],
    ['What a Wonderful World', 'Louis Armstrong', 'Gratitude'], ['Riverside', 'Agnes Obel', 'Gentle'],
  ],
  films: [
    ['Soul', 2020, 'Animated, warm and wise — about the spark that makes life worth living.'],
    ['Peaceful Warrior', 2006, 'A gymnast learns presence from an unlikely teacher.'],
    ['The Secret Life of Walter Mitty', 2013, 'Stepping out of daydreams and into life.'],
    ['My Octopus Teacher', 2020, 'Documentary: a year of friendship in a kelp forest.'],
    ['Kiss the Ground', 2020, 'Documentary: soil, food and hope for the planet.'],
    ['Fantastic Fungi', 2019, 'Documentary: the hidden network beneath our feet.'],
    ['The Biggest Little Farm', 2018, 'Documentary: building a farm in harmony with nature.'],
    ['Inside Out', 2015, 'Every feeling has its place — especially sadness.'],
    ['The Pursuit of Happyness', 2006, 'Perseverance, fatherhood and hope.'],
    ['Paddington 2', 2017, 'Pure kindness, and very funny.'],
    ['Amélie', 2001, 'Small, joyful acts that change lives.'],
    ['Won’t You Be My Neighbor?', 2018, 'Documentary: Fred Rogers and the power of kindness.'],
  ],
};

/* Shared by the browser (global) and the server (require). */
(function (exportsObj) {
  if (typeof module !== 'undefined' && module.exports) module.exports = exportsObj;
  else self.DeltaData = exportsObj;
})({ PILLARS, EPISODES, VIDEOS, PARTNERS, FAQS, JOKES, MINERALS, DEMO_RESULT, TOXIC, RATIOS, RULESETS, CURRENT_RULESET, SAFETY_QS, PRACTICES, CENTRE_VIDEOS, BOOKS, SESSIONS, METHODS, METHOD_CATS, DAILY });
