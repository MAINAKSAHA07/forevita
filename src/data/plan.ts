export const premiumPrice = 199

export const metrics = [
  { label: 'Surfaces', value: '3' },
  { label: 'Build weeks', value: '4' },
  { label: 'Test week', value: '1' },
  { label: 'Release gates', value: '10' },
] as const

export const surfaces = [
  {
    id: 'member',
    title: 'Member web',
    body: 'Stages 00 through 06 on responsive web. Free tier first. Premium locks stay visible.',
    points: ['Anonymous streamed chat', 'Intake you can save and resume', 'Formula with source traces'],
  },
  {
    id: 'clinician',
    title: 'Clinician console',
    body: 'Review queue, sign-off, async encounters, flag triage, and chat as a visible event.',
    points: ['Tier two blocks until signed', 'Licensure-aware routing', 'Structured corrections'],
  },
  {
    id: 'admin',
    title: 'Admin backoffice',
    body: 'Members, catalogue, clinical config, kits, partners, billing, analytics, and audit.',
    points: ['Role-based access', 'Protocol versions without a deploy', 'Funnel and queue health'],
  },
] as const

export const streams = [
  { id: 'platform', label: 'Platform' },
  { id: 'member', label: 'Member web' },
  { id: 'ai', label: 'AI and formula' },
  { id: 'clinician', label: 'Clinician' },
  { id: 'admin', label: 'Admin' },
  { id: 'qa', label: 'Guardrails' },
] as const

export type StreamId = (typeof streams)[number]['id']

export type GanttBar = {
  stream: StreamId
  week: number
  label: string
}

export const ganttBars: GanttBar[] = [
  { stream: 'platform', week: 1, label: 'Supabase, CI, schema, auth' },
  { stream: 'member', week: 1, label: 'Landing, chat, intake' },
  { stream: 'admin', week: 1, label: 'Shell and roles' },
  { stream: 'member', week: 2, label: 'Phase, records, locks' },
  { stream: 'ai', week: 2, label: 'Base answering, formula' },
  { stream: 'admin', week: 2, label: 'Member search' },
  { stream: 'member', week: 3, label: 'Stripe, kits, purchase paths' },
  { stream: 'ai', week: 3, label: 'One phase specialist' },
  { stream: 'admin', week: 3, label: 'Catalogue and pricing' },
  { stream: 'member', week: 4, label: 'Cycle, pause, exceptions' },
  { stream: 'clinician', week: 4, label: 'Queue, sign-off, on-call' },
  { stream: 'admin', week: 4, label: 'Ops, billing, analytics' },
  { stream: 'qa', week: 4, label: 'Guardrail failing cases' },
  { stream: 'qa', week: 5, label: 'Mock journey and rehearsal' },
]

export const weeks = [
  {
    id: 1,
    title: 'Foundation, design, and the front door',
    summary:
      'Supabase schema and auth, consent, design direction, public chat, structured intake, and an admin shell.',
    items: [
      'Supabase environment, repository, and GitHub Actions',
      'Core object schema in Supabase Postgres',
      'Supabase Auth, roles, and consent capture',
      'Visual direction and the first component set',
      'Landing page with streamed anonymous chat',
      'Structured intake with save and resume',
      'Admin shell with role-based access',
      'OKF seed for phases, bands, and the first protocols',
    ],
  },
  {
    id: 2,
    title: 'Record, phase, and the free tier',
    summary:
      'Phase proposal with override, document extraction, a preliminary formula, and premium sections locked in place.',
    items: [
      'Phase proposal with recorded confidence and override',
      'Free-text goals stored on the member record',
      'Upload and extraction into discrete observations',
      'Both clinical and ForeVita bands on every marker',
      'Preliminary formula with item-level source traces',
      'Base AI answering from the member record and OKF concepts',
      'Premium surfaces locked, not hidden',
      'Admin member search and record view',
    ],
  },
  {
    id: 3,
    title: 'Premium and catalogue',
    summary:
      'Card on file, one phase specialist, three distinct purchase paths, kit status, trends, and catalogue control.',
    items: [
      'Stripe subscription with a tokenised card on file',
      'One phase specialist, scoped by protocol not copy',
      'Detailed formula with versions and stated reasons',
      'Supplement, approved Rx, and compounded paths kept separate',
      'Kit lifecycle status strip',
      'Results and trends with cycle day on the chart',
      'Admin catalogue: items, classes, evidence, pricing',
    ],
  },
  {
    id: 4,
    title: 'Clinician, operations, cycle, and guardrails',
    summary:
      'Review queue, lab exceptions, cycle packages, pause, operations, analytics, and tested safety rails.',
    items: [
      'Clinician queue with tier two blocking and sign-off',
      'Review chip only where review actually happened',
      'Lab exception states with a route out of each',
      'Cycle package, clinic directory, consent-gated share',
      'Medication reconciliation as a hard gate',
      'Phase transition prompts and the Paused state',
      'Admin kit ops, replacements, refills, billing',
      'Funnel and queue-health analytics',
      'Guardrails: pregnancy inference, upload injection, copy lint',
    ],
  },
  {
    id: 5,
    title: 'Testing',
    summary:
      'The nine-month mock patient journey is the acceptance script. Walk it, fail the rails, fix, then rehearse.',
    items: [
      'Run the mock patient journey start to finish',
      'Run every guardrail failing case',
      'Fix gaps found in the walkthrough',
      'Rehearse the client evaluation deploy',
    ],
  },
] as const

export const stages = [
  {
    code: '00',
    title: 'Acquisition',
    week: 1,
    depth: 'thin',
    note: 'Ask first. Persist the question through signup. No payment at account creation.',
  },
  {
    code: '01',
    title: 'Intake',
    week: 1,
    depth: 'thin',
    note: 'Discrete fields, never a document. Save and resume. Cycle questions hidden from male members.',
  },
  {
    code: '02',
    title: 'Phase',
    week: 2,
    depth: 'thin',
    note: 'System proposes with confidence. Member confirms or corrects. One phase at a time.',
  },
  {
    code: '03',
    title: 'Records',
    week: 2,
    depth: 'thin',
    note: 'One extraction format. Low confidence stays pending. Uploads are untrusted input.',
  },
  {
    code: '04',
    title: 'Formula',
    week: 2,
    depth: 'thin',
    note: 'Member-facing name is formula. Every item traces to a source. No efficacy claims without outcome data.',
  },
  {
    code: '05',
    title: 'Premium',
    week: 3,
    depth: 'thin',
    note: 'One specialist agent. Three purchase paths. Kits and trends. Locked sections stay visible.',
  },
  {
    code: '06',
    title: 'Cycle and care',
    week: 4,
    depth: 'thin',
    note: 'Exception subset, clinic directory, pause, clinician review. Vendor steps stay stubbed.',
  },
] as const

export const stackGroups = [
  {
    title: 'Application',
    items: ['TypeScript', 'React and Vite', 'React Router', 'Tailwind', 'TanStack Query', 'Recharts'],
  },
  {
    title: 'API and data',
    items: ['Supabase Postgres', 'Supabase Auth', 'Supabase Storage', 'Node and Express', 'Zod validation'],
  },
  {
    title: 'AI',
    items: ['Anthropic Claude', 'Internal adapter only', 'Server-sent events', 'Open Knowledge Format'],
  },
  {
    title: 'Operate',
    items: ['Stripe hosted elements', 'CloudFront for the frontend', 'ECS Fargate or App Runner', 'GitHub Actions', 'Vitest and Playwright', 'CloudWatch'],
  },
] as const

export const notInStack = [
  'EMR',
  'ePrescribing vendor',
  'Lab vendor',
  'Eligibility provider',
  'Wearables aggregator',
]

export const toConfirm = [
  'Infrastructure as code tool',
  'API hosting target',
  'Background jobs for kit timers',
  'Email and SMS wiring',
]

export const projectBeats = [
  {
    title: 'Member journey',
    body: 'A visitor asks in public chat, signs up with consents, completes intake, and is assigned a phase. Uploads become observations. A formula is generated and revised only on a new result, a visit, clinician input, or the member\'s own input.',
  },
  {
    title: 'Clinician and admin',
    body: 'The console reviews blocking output, signs off, and captures structured corrections. Admin owns members, catalogue, OKF concepts, kits, billing, and audit. Nothing clinical is inferred that a human must confirm.',
  },
  {
    title: 'Intelligence',
    body: 'Claude never sees raw PDFs or a vector dump. The adapter loads the member record from Supabase and the agent-scoped OKF bundle, then streams a grounded answer on top of the pretrained base. Guardrails are code, not prompt instructions.',
  },
] as const

export const architectureNodes = [
  {
    id: 'member',
    label: 'Member web',
    col: 0,
    row: 0,
    detail: 'Stages 00 through 06. Chat, intake, formula, kits, and purchase paths. Talks only to the API.',
  },
  {
    id: 'clinician',
    label: 'Clinician',
    col: 0,
    row: 1,
    detail: 'Review queue, sign-off, async encounters, and chat as a visible event. Sees only members they may treat.',
  },
  {
    id: 'admin',
    label: 'Admin',
    col: 0,
    row: 2,
    detail: 'Members, catalogue, kit ops, billing, and OKF authorship. Clinical staff edit concepts without a deploy.',
  },
  {
    id: 'api',
    label: 'Express API',
    col: 1,
    row: 1,
    detail: 'Zod-validated TypeScript. Auth from Supabase. Assembles context, enforces protocol scope, and streams SSE.',
  },
  {
    id: 'supabase',
    label: 'Supabase',
    col: 2,
    row: 0,
    detail: 'Postgres for the member record, Auth for roles, Storage for uploads. Observations are discrete fields, not documents.',
  },
  {
    id: 'okf',
    label: 'OKF knowledge',
    col: 2,
    row: 1,
    detail: 'Open Knowledge Format bundle: one markdown file per concept, YAML frontmatter, explicit links. Versioned records. This is how the model knows protocols, bands, explainers, and copy rules.',
  },
  {
    id: 'stripe',
    label: 'Stripe',
    col: 2,
    row: 2,
    detail: 'Hosted elements. Tokenised card on file. Subscription, dunning, and add-on charges. No card data in the app.',
  },
  {
    id: 'claude',
    label: 'Claude',
    col: 3,
    row: 1,
    detail: 'Reached only through the internal adapter. No vendor SDK in application code. Output is reproducible from adapter, OKF versions, and member state.',
  },
] as const

export type ArchitectureId = (typeof architectureNodes)[number]['id']

export const architectureLinks: { source: ArchitectureId; target: ArchitectureId }[] = [
  { source: 'member', target: 'api' },
  { source: 'clinician', target: 'api' },
  { source: 'admin', target: 'api' },
  { source: 'admin', target: 'okf' },
  { source: 'api', target: 'supabase' },
  { source: 'api', target: 'okf' },
  { source: 'api', target: 'stripe' },
  { source: 'api', target: 'claude' },
  { source: 'okf', target: 'claude' },
]

export const okfVsRag = [
  {
    topic: 'How knowledge is chosen',
    okf: 'The adapter follows named links and phase tags. The bundle is the context.',
    rag: 'An embedding search returns nearby chunks. Ranking can change when the index or model changes.',
  },
  {
    topic: 'Provenance',
    okf: 'Every assertion points at a concept ID and an immutable version.',
    rag: 'A similarity score is not a source. The same question can cite a different passage tomorrow.',
  },
  {
    topic: 'Clinical authorship',
    okf: 'A clinician edits one concept file. The next inference uses that version. Rollback is a record swap.',
    rag: 'A PDF is re-chunked and re-embedded. A retired protocol can still surface.',
  },
  {
    topic: 'Safety',
    okf: 'Prohibited terms, red flags, and review tiers are fields on the concept. They are always in scope.',
    rag: 'A guardrail only fires if the retriever happened to pull the right paragraph.',
  },
  {
    topic: 'Fit for ForeVita',
    okf: 'Protocols, bands, and explainers are a small curated wiki. That is the job OKF was designed for.',
    rag: 'RAG fits large unstructured corpora. It is the wrong memory for a formula the member will act on.',
  },
] as const

export const requirementDomains = [
  { name: 'Member portal', count: 76 },
  { name: 'Admin backoffice', count: 35 },
  { name: 'AI platform', count: 17 },
  { name: 'Release conditions', count: 10 },
  { name: 'Clinician console', count: 8 },
  { name: 'Non-functional', count: 7 },
]

export const weekLoad = [
  { week: 'W1', Platform: 1, Member: 1, AI: 0, Clinician: 0, Admin: 1, Guardrails: 0 },
  { week: 'W2', Platform: 0, Member: 1, AI: 1, Clinician: 0, Admin: 1, Guardrails: 0 },
  { week: 'W3', Platform: 0, Member: 1, AI: 1, Clinician: 0, Admin: 1, Guardrails: 0 },
  { week: 'W4', Platform: 0, Member: 1, AI: 0, Clinician: 1, Admin: 1, Guardrails: 1 },
  { week: 'W5', Platform: 0, Member: 0, AI: 0, Clinician: 0, Admin: 0, Guardrails: 1 },
]

export const stubbed = [
  'Lab results and kit status',
  'Prescriber approval',
  'Pharmacy fulfilment',
  'Partner clinic monitoring feed',
  'Insurance eligibility',
  'Wearable data',
  'Email and SMS delivery',
]

export const excluded = [
  'EMR integration',
  'Payer screens beyond a placeholder',
  'Wearables',
  'Life phases four to six',
  'Employer channel',
  'At-home nurse dispatch',
  'Comprehensive testing as a paid add-on',
  'Full evaluation golden set',
  'Licensed clinical corpus beyond a seed',
  'Penetration, accessibility, and load testing',
]

export const chatAgents = [
  {
    id: 's1',
    code: 'S1',
    name: 'Public chat bar',
    who: 'Anonymous visitor on the landing page',
    nodes: '0.3',
    sees: 'Nothing. No account, no record, no volunteered lab value.',
    okf: 'Public education bundle only: journey explainer, marker primers, signup copy rules. No protocols, no bands, no member-specific concepts.',
    does: 'Answers one real question well enough to earn a signup. Never withholds the answer to force the signup. Offers to save the thread.',
    cannot: ['Personalise', 'Diagnose', 'Interpret a value she types', 'Ask for identifying details'],
    example: 'I am 31 and thinking about freezing my eggs in the next 6 months. Where do I even start?',
    experience: 'It explains the process and the marker clinics look at first, then offers to save the conversation. That question becomes thread one after signup.',
    review: 'Tier 0. General education. No clinician review.',
  },
  {
    id: 's2',
    code: 'S2',
    name: 'General medical AI',
    who: 'Base member, free, all day',
    nodes: '1.4, 2.1, 2.5, 3.1',
    sees: 'Intake, uploads, extracted labs, goals, confirmed phase, and the full chat history, including the pre-signup question.',
    okf: 'Base bundle: phase detection rules, band definitions, upload handling, preliminary formula schema, AMH explainer. Protocol depth and dosing concepts are excluded at assembly.',
    does: 'Explains her own health. Proposes a phase. Summarises uploads. Writes the preliminary formula. Delivers the AMH explainer, the moment that converts.',
    cannot: ['Protocol depth', 'Dosing', 'Add-on recommendation', 'Hide the safety path behind Premium'],
    example: 'What does my AMH actually mean?',
    experience: 'It does not tell you about egg quality, and it does not predict whether you will conceive naturally. Trust comes from what it declines to claim.',
    review: 'Tier 1. Sampled. No clinical action follows.',
  },
  {
    id: 's3',
    code: 'S3',
    name: 'Phase specialist',
    who: 'Premium member, one agent per active phase',
    nodes: '4.4, 5.A, 5.B, 5.C, 6.1',
    sees: 'Everything S2 sees, plus monthly panels with cycle day, marker states, medications, encounters, and phase history.',
    okf: 'Phase bundle: full protocol set for the active phase, monthly panel schema, medication rules, encounter triggers, formula revision workflow. Prescription and publish concepts stay gated at assembly.',
    does: 'Reasons from her numbers, not averages. Proposes formula revisions. Requests an APP encounter. Raises a flag. Hands off when it hits its limit.',
    cannot: ['Prescribe', 'Publish a formula change', 'Claim efficacy without human outcome data', 'Decide a phase transition'],
    example: 'What will this cycle yield given my AMH?',
    experience: 'I can tell you what AMH generally predicts, but not what your cycle will yield. That needs someone who can see your ultrasound. Naming the limit is the care step, not a sales step.',
    review: 'Tier 2 on the formula, action-driving results, and every prescription. Blocked until signed. The review chip appears only where review happened.',
  },
] as const

export type ChatAgentId = (typeof chatAgents)[number]['id']

export const chatPipeline = [
  {
    title: 'Scope the agent',
    body: 'S1, S2, or S3 is chosen by auth and entitlement. Data access and OKF bundle scope are enforced server side by protocol rules, not by a line in the prompt.',
  },
  {
    title: 'Wire OKF and assemble context',
    body: 'The adapter resolves agent, phase, and entitlement into an OKF bundle manifest. S1 gets public education concepts. S2 gets base member concepts plus phase detection. S3 gets the active phase protocol set. From S2 up, the member record in Supabase is merged in. Same agent, phase, and OKF versions produce the same context.',
  },
  {
    title: 'Infer and stream',
    body: 'Claude is called only through the internal adapter, on top of its pretrained base. The reply streams over SSE with concept IDs and versions attached. Time to first token is targeted under one second on mobile.',
  },
  {
    title: 'Gate the release',
    body: 'Output is linted, provenance is attached, crisis routing runs on all three surfaces. Tier 2 is held until an APP signs. The member sees pending, never a partial formula.',
  },
] as const

export const chatOkfWiring = [
  {
    title: 'Authored in admin',
    body: 'Clinical staff edit OKF concept files: protocols, bands, explainers, prohibited terms, review tiers. Each file is versioned. A version is immutable once referenced in an inference.',
  },
  {
    title: 'Scoped at the API',
    body: 'The adapter maps S1, S2, or S3 to a bundle manifest before any model call. Public, base, and phase scopes are enforced in code. Concepts outside scope never enter context.',
  },
  {
    title: 'Assembled by link, not search',
    body: 'Named links and phase tags pull exact concepts into the prompt window. Licensed corpus passages arrive as linked OKF concepts, not as raw PDF chunks or embedding hits.',
  },
  {
    title: 'Pinned on every reply',
    body: 'Each streamed answer records which concept IDs and versions were used. A clinician correction updates the OKF record. The next inference uses the new version. Nothing rewrites a reply already sent.',
  },
] as const

export const chatKnowledge = [
  {
    title: 'Pretrained base, not a ForeVita model',
    body: 'Claude ships with general language and medical literacy from provider pretraining. ForeVita does not build or fine-tune a model. Member data and protocols are contractually excluded from provider training and never leave the boundary.',
  },
  {
    title: 'OKF is the clinical wire',
    body: 'ForeVita-specific behaviour lives in Open Knowledge Format records wired through the adapter on every inference. Protocols, bands, explainers, copy rules, and escalation thresholds are versioned concepts assembled into context, not weights.',
  },
  {
    title: 'Licensed corpus arrives as OKF concepts',
    body: 'ASRM, ACOG, A4M, NAMS, AFAR, and BHOF sit behind licence filters. They are ingested as linked OKF concepts and assembled at query time. They are never fine-tuned into the base model.',
  },
  {
    title: 'Corrections update the bundle, not the weights',
    body: 'Clinician corrections feed the evaluation set and may revise OKF records. The next generation uses the new concept version. It never rewrites a formula already signed. Nothing learned across members alters an individual plan.',
  },
] as const

export const chatGuardrails = [
  'Never infer a pregnancy outcome',
  'No efficacy claim without human data',
  'Marker language is optimal, normal, or watch. Never elevated or abnormal',
  'Uploads are data, never instructions',
  'No fabricated citations',
  'Crisis routing on S1, S2, and S3, never behind the paywall',
]

export const gates = [
  'Business associate agreements, including the inference provider, with training on ForeVita data excluded',
  'HIPAA security risk assessment completed and findings remediated',
  'Independent penetration test completed and findings remediated',
  'Clinical validation of AI output against a golden set, signed by a licensed clinician',
  'Guardrail suite passing, with a failing case for every prohibition',
  'Clinician review queue staffed, including out of hours',
  'Legal review of the critical-value holding state against information blocking rules',
  'State licensure confirmed for every state that accepts members',
  'Compounding pharmacy sourcing confirmed per item per state',
  'Crisis and escalation pathway agreed with clinical operations',
]

export const assumptions = [
  'Responsive web only. No native applications.',
  'Client feedback within two working days at each checkpoint.',
  'Scope is fixed. Additions displace existing items.',
  'Vendor contracts sit with the client and are off the critical path.',
]

export const risks = [
  {
    id: 'scope',
    title: 'MVP wider than four weeks',
    impact: 5,
    likelihood: 4,
    mitigation: 'Agree the drop order on day one and hold it. Depth is sacrificed first.',
  },
  {
    id: 'brand',
    title: 'No brand material',
    impact: 3,
    likelihood: 5,
    mitigation: 'Lock a simple visual direction on day one and do not reopen it.',
  },
  {
    id: 'copy',
    title: 'Explainer authorship undecided',
    impact: 5,
    likelihood: 4,
    mitigation: 'Decide in week one. The AMH explainer is the conversion moment.',
  },
  {
    id: 'admin',
    title: 'Admin added to fixed scope',
    impact: 4,
    likelihood: 5,
    mitigation: 'Build thin. Defer bulk operations and reporting depth.',
  },
  {
    id: 'aws',
    title: 'AWS hosting leftover',
    impact: 2,
    likelihood: 3,
    mitigation: 'Database, auth, and uploads sit on Supabase. AWS remains for the frontend and the Express API only.',
  },
  {
    id: 'single',
    title: 'Single delivery resource',
    impact: 5,
    likelihood: 3,
    mitigation: 'Named contingency in the contract.',
  },
  {
    id: 'creep',
    title: 'Scope creep during the build',
    impact: 4,
    likelihood: 4,
    mitigation: 'Fixed scope. Additions displace rather than extend.',
  },
  {
    id: 'release',
    title: 'Release conditions treated as optional',
    impact: 5,
    likelihood: 2,
    mitigation: 'Section 6 is a gate, not a checklist. Evaluation deploy only until it closes.',
  },
] as const

export const decisionGroups = [
  {
    title: 'Technical',
    items: [
      'Infrastructure as code',
      'API hosting',
      'Kit timers and reminders',
      'Email and SMS providers',
    ],
  },
  {
    title: 'Content',
    items: [
      'Who writes clinical explainer and protocol copy',
      'Placeholder, drafted here, or client authored',
    ],
  },
  {
    title: 'Commercial',
    items: [
      'How the client accesses the running build',
      'Repository and IP ownership',
      'Mid-build checkpoint schedule',
      'Demo persona: mock patient, or a second male path',
    ],
  },
  {
    title: 'Scope and deploy',
    items: [
      'Which lab exception states, and in what order',
      'Agreed drop order if the schedule slips',
      'Client environment for evaluation, or real members',
    ],
  },
] as const

export const openNote =
  'Twenty-four decisions remain open across the source documents. Nine of them block launch. All are client owned. All need dates.'
