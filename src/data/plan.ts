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
    points: ['Anonymous streamed chat', 'Intake with plugin autosave', 'Formula with source traces'],
  },
  {
    id: 'clinician',
    title: 'Clinician workspace',
    body: 'Canvas for charting, orders, and sign-off. ForeVita plugin for review queue, tier-two blocking, async encounters, and AI as a visible event.',
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
  { stream: 'clinician', week: 4, label: 'Canvas chart, ForeVita queue' },
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
      'Canvas org setup, FHIR credentials, and consent types',
      'Visual direction and the first component set',
      'Landing page with streamed anonymous chat',
      'Intake autosave design against Canvas form limits (CAN-06, INT-02)',
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
      'Kit lifecycle strip fed by vendor plugin store (LAB-05)',
      'Trend chart plugin over Canvas observations (LAB-08)',
      'Admin catalogue: items, classes, evidence, pricing',
    ],
  },
  {
    id: 4,
    title: 'Clinician, operations, cycle, and guardrails',
    summary:
      'Review queue, lab exceptions, cycle packages, pause, operations, analytics, and tested safety rails.',
    items: [
      'Clinician queue in ForeVita with tier two blocking; charting in Canvas',
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
    note: 'Discrete fields, never a document. Save and resume needs plugin CustomModel or short forms. Cycle questions hidden from male members.',
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
    note: 'Exception subset, clinic directory, pause, clinician review. Canvas handles orders, results, and scheduling.',
  },
] as const

export const stackGroups = [
  {
    title: 'Member product',
    items: ['TypeScript', 'React and Vite', 'React Router', 'Tailwind', 'TanStack Query', 'Supabase Postgres, Auth, Storage'],
  },
  {
    title: 'Clinical platform',
    items: ['Canvas Medical', 'FHIR API read and write', 'Canvas SDK and Studio', 'Note and Commands APIs', 'Read-only replica database'],
  },
  {
    title: 'Orchestration and AI',
    items: ['Node and Express', 'Zod validation', 'Anthropic Claude', 'Internal adapter', 'Server-sent events', 'Open Knowledge Format'],
  },
  {
    title: 'Operate',
    items: ['Stripe hosted elements', 'CloudFront for the frontend', 'ECS Fargate or App Runner', 'GitHub Actions', 'Vitest and Playwright', 'CloudWatch'],
  },
] as const

export const notInStack = [
  'Custom EMR beyond Canvas',
  'Wearables aggregator',
  'Compounding pharmacy vendor',
  'Employer channel integrations',
]

export const toConfirm = [
  'Canvas enrollment timing for Health Gorilla and Surescripts',
  'Infrastructure as code tool',
  'API hosting target',
  'Background jobs for kit timers',
  'Email and SMS wiring beyond Canvas portal',
]

export const projectBeats = [
  {
    title: 'Member journey',
    body: 'A visitor asks in public chat, signs up with consents, completes intake, and is assigned a phase. Uploads become observations. A formula is generated and revised only on a new result, a visit, clinician input, or the member\'s own input. This is ForeVita web and API work.',
  },
  {
    title: 'Canvas clinical backbone',
    body: 'Charting, e-prescribing, lab orders and results, scheduling, patient portal messaging, consents, and payments run on Canvas out of the box. ForeVita consumes the FHIR API and Canvas events. Enrollment for Health Gorilla, Surescripts, and billing integrations is configure work, not SOW build.',
  },
  {
    title: 'Intelligence',
    body: 'Claude never sees raw PDFs or a vector dump. The adapter loads the member record from Supabase, clinical facts from Canvas via FHIR, and the agent-scoped OKF bundle, then streams a grounded answer on top of the pretrained base. Guardrails are code, not prompt instructions.',
  },
] as const

export const architectureNodes = [
  {
    id: 'member',
    label: 'Member web',
    col: 0,
    row: 0,
    detail: 'Stages 00 through 06. Chat, intake, formula, kits, and purchase paths. Talks only to the ForeVita API.',
  },
  {
    id: 'clinician',
    label: 'Clinician',
    col: 0,
    row: 1,
    detail: 'Works in Canvas for charting, orders, and sign-off. ForeVita review queue and AI events surface through API plugins.',
  },
  {
    id: 'admin',
    label: 'Admin',
    col: 0,
    row: 2,
    detail: 'Members, catalogue, kit ops, billing, and OKF authorship. Canvas templates and consents configured here, not coded.',
  },
  {
    id: 'okf',
    label: 'OKF knowledge',
    col: 1,
    row: 0,
    detail: 'Open Knowledge Format bundle: one markdown file per concept, YAML frontmatter, explicit links. Versioned records for protocols, bands, explainers, and copy rules.',
  },
  {
    id: 'api',
    label: 'Express API',
    col: 1,
    row: 1,
    detail: 'Zod-validated TypeScript. Consumes Canvas FHIR, Supabase member state, and OKF bundles. Enforces protocol scope and streams SSE.',
  },
  {
    id: 'supabase',
    label: 'Supabase',
    col: 2,
    row: 0,
    detail: 'Postgres for the member product record, Auth for roles, Storage for uploads. Observations are discrete fields, not documents.',
  },
  {
    id: 'canvas',
    label: 'Canvas',
    col: 2,
    row: 1,
    detail: 'Clinical platform: chart, eRx, labs via Health Gorilla, scheduling, portal, consents, documents, FHIR API, and Canvas AI tooling.',
  },
  {
    id: 'stripe',
    label: 'Stripe',
    col: 2,
    row: 2,
    detail: 'Member subscription and add-ons in ForeVita. Canvas also supports patient payments and revenue cycle when enabled.',
  },
  {
    id: 'claude',
    label: 'Claude',
    col: 3,
    row: 1,
    detail: 'Reached only through the internal adapter. Grounded on OKF, Supabase member state, and FHIR facts from Canvas. No vendor SDK in application code.',
  },
] as const

export type ArchitectureId = (typeof architectureNodes)[number]['id']

export const architectureLinks: { source: ArchitectureId; target: ArchitectureId }[] = [
  { source: 'member', target: 'api' },
  { source: 'clinician', target: 'canvas' },
  { source: 'admin', target: 'api' },
  { source: 'admin', target: 'okf' },
  { source: 'api', target: 'supabase' },
  { source: 'api', target: 'canvas' },
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

export const canvasCapability = [
  {
    name: 'Native',
    count: 18,
    hint: 'Yes, native in Canvas. Configure, do not build.',
  },
  {
    name: 'Plugin / SDK',
    count: 112,
    hint: 'Yes, via Canvas SDK or plugin. This is ForeVita SOW on the platform.',
  },
  {
    name: 'Partial',
    count: 50,
    hint: 'Canvas covers part of the row. ForeVita fills the remainder in plugin or overlay.',
  },
  {
    name: 'Open',
    count: 12,
    hint: 'Needs discussion. Ten P0 and two P1 rows from the Canvas input sheet.',
  },
  {
    name: 'ForeVita only',
    count: 46,
    hint: 'No in Canvas by design. Forty-four AI-layer rows and two public marketing-bridge rows.',
  },
] as const

export const canvasCapabilityByArea = [
  { area: 'Journey', Native: 14, Plugin: 90, Partial: 28, Open: 7, ForeVita: 3 },
  { area: 'Platform', Native: 4, Plugin: 4, Partial: 6, Open: 4, ForeVita: 0 },
  { area: 'AI layer', Native: 0, Plugin: 18, Partial: 16, Open: 1, ForeVita: 43 },
] as const

export const stubbed = [
  'Kit logistics status until vendor or carrier feed lands (LAB-05)',
  'Partner clinic monitoring feed',
  'Compounding pharmacy handoff',
  'Wearable data',
  'ForeVita-specific purchase paths pending catalogue lock',
]

export const excluded = [
  'Building an EMR from scratch',
  'Custom e-prescribing stack',
  'Custom lab network integration beyond Canvas enrollment',
  'Wearables',
  'Life phases four to six',
  'Employer channel',
  'At-home nurse dispatch',
  'Comprehensive testing as a paid add-on',
  'Full evaluation golden set',
  'Licensed clinical corpus beyond a seed',
  'Penetration, accessibility, and load testing',
]

export const canvasTiers = [
  { id: 'included', label: 'Included', note: 'Native in Canvas. Not SOW build work.' },
  { id: 'configure', label: 'Configure', note: 'Enable and set up. No code.' },
  { id: 'build', label: 'Build', note: 'ForeVita SOW on the Canvas platform.' },
  { id: 'addons', label: 'Add-ons', note: 'Separate cost or out of scope.' },
] as const

export type CanvasTierId = (typeof canvasTiers)[number]['id']

export const canvasScope: Record<CanvasTierId, { title: string; body: string }[]> = {
  included: [
    {
      title: 'Clinical documentation and charting',
      body: 'Patient chart, timeline, problem and medication lists, structured notes via commands, note templates, questionnaires with scoring dashboard, care plans, tasks, and chart review.',
    },
    {
      title: 'E-prescribing and medications',
      body: 'Surescripts and DrFirst e-prescribing including EPCS, medication history, and interaction checking via First Databank. Provider enrollment required.',
    },
    {
      title: 'Labs and orders',
      body: 'Lab ordering and structured results via Health Gorilla, point-of-care tests, and imaging or consult review. Health Gorilla enrollment required.',
    },
    {
      title: 'Scheduling and patient engagement',
      body: 'Appointments, provider availability, Google Calendar sync, secure messaging, portal intake, consents, after-visit summaries, lab delivery, and payments.',
    },
    {
      title: 'Interoperability and AI tooling',
      body: 'Full FHIR API read and write, Note and Commands APIs, read-only replica, bulk export, Hyperscribe, Canvas Chat, and SDK LLM client for plugins.',
    },
    {
      title: 'Documents and interoperability',
      body: 'Inbound fax and uploaded-document hub, send and receive faxing, PDF annotation, CCDA import and export, and FHIR bulk export for portability.',
    },
    {
      title: 'Security and environments',
      body: 'HITRUST CSF r2, HIPAA, SOC 2 Type 2 hosting, MFA, SSO, role model, production plus non-production environments, and standard onboarding.',
    },
  ],
  configure: [
    {
      title: 'Templates and clinical setup',
      body: 'Note templates, questionnaires, care-team roles, consent types, appointment types, org settings, and permission groups.',
    },
    {
      title: 'Integration enrollment',
      body: 'Turn on Health Gorilla, Surescripts or DrFirst, Candid or Claim MD, Zus, and EPCS with credentials. Setup, not custom code.',
    },
    {
      title: 'ForeVita-specific Canvas config',
      body: 'ForeVita consent wording, intake questionnaires, phase note templates, and feature flags aligned to the member journey.',
    },
  ],
  build: [
    {
      title: 'Canvas plugins and portal pages',
      body: 'SDK plugins, SimpleAPI endpoints, CustomModel storage, portal widgets, menu configuration, iframed custom pages, and WebSocket streaming for member chat. Most journey features land here, not as native Canvas screens.',
    },
    {
      title: 'ForeVita member web and API',
      body: 'Public marketing site, Surface-1 chat, bridge pages, Supabase member record, OKF adapter, guardrails, and API consumption of Canvas FHIR and events.',
    },
    {
      title: 'Clinical workflow extensions',
      body: 'Phase assignment UI, formula overlays, tier-two blocking, review queue hooks, kit state machines, optimal bands on observations, and fertility-specific gating.',
    },
    {
      title: 'Admin and catalogue',
      body: 'ForeVita backoffice for members, kits, catalogue, pricing, funnel analytics, and OKF authorship. Canvas handles chart configuration and clinical templates.',
    },
  ],
  addons: [
    {
      title: 'Not included in Canvas base',
      body: 'Custom room or chair scheduling beyond native Canvas, employer channel, wearables aggregator, compounding vendor integration, and at-home nurse dispatch.',
    },
    {
      title: 'Separate revenue modules',
      body: 'Full revenue-cycle module with claims, coverages, and clearinghouse when client-bill is not sufficient. Canvas Stripe patient payments may still apply.',
    },
    {
      title: 'ForeVita engagement exclusions',
      body: 'Life phases four to six, comprehensive testing add-on, full golden evaluation set, penetration and load testing, and licensed corpus beyond seed concepts.',
    },
  ],
}

export const canvasIntegration = [
  {
    title: 'ForeVita owns the member product',
    body: 'Public chat, marketing bridge, formula, premium entitlements, and kit commerce live in ForeVita web and Supabase. Canvas is not involved until registration. The full AI layer is ForeVita, not Canvas.',
  },
  {
    title: 'Canvas owns clinical operations',
    body: 'Charting, prescribing, lab network, scheduling, portal messaging, and clinical documents stay on Canvas. Clinicians work in Canvas; plugins extend the portal.',
  },
  {
    title: 'Plugins plus FHIR, not a parallel EMR',
    body: '112 of 238 assessed requirements are plugin or SDK work on Canvas. Express consumes FHIR, reacts to Canvas events, and assembles AI context with OKF.',
  },
  {
    title: 'SOW scope is the plugin and AI layer',
    body: 'Native Canvas features and configure enrollments are not four-week build work. The SOW focuses on plugins, API consumption, ForeVita AI, and the public member surface.',
  },
] as const

export const canvasAssessmentStats = [
  { label: 'Requirements assessed', value: '238' },
  { label: 'Native in Canvas', value: '18' },
  { label: 'Plugin or SDK', value: '112' },
  { label: 'Partial', value: '50' },
  { label: 'P0 open questions', value: '10' },
] as const

export const canvasAssessmentNote =
  'Capability assessment mapped from ForeVita requirements to Canvas support. Forty-six rows are No by design: forty-four are the ForeVita AI layer outside Canvas, two are the public marketing bridge before registration.'

export const canvasStageBreakdown = [
  { stage: 'Arrival', native: 3, plugin: 17, partial: 3, open: 2, forevita: 2, total: 27 },
  { stage: 'Intake', native: 1, plugin: 5, partial: 1, open: 0, forevita: 0, total: 7 },
  { stage: 'Phase', native: 1, plugin: 6, partial: 1, open: 1, forevita: 0, total: 9 },
  { stage: 'Formula', native: 1, plugin: 7, partial: 1, open: 0, forevita: 1, total: 10 },
  { stage: 'Premium', native: 2, plugin: 6, partial: 1, open: 0, forevita: 0, total: 9 },
  { stage: 'Care', native: 3, plugin: 5, partial: 0, open: 0, forevita: 0, total: 8 },
  { stage: 'Rx', native: 2, plugin: 11, partial: 10, open: 0, forevita: 0, total: 23 },
  { stage: 'Labs', native: 1, plugin: 16, partial: 6, open: 4, forevita: 0, total: 27 },
  { stage: 'Wearables', native: 0, plugin: 3, partial: 0, open: 0, forevita: 0, total: 3 },
  { stage: 'Packages', native: 0, plugin: 5, partial: 5, open: 0, forevita: 0, total: 10 },
  { stage: 'Transition', native: 0, plugin: 9, partial: 0, open: 0, forevita: 0, total: 9 },
  { stage: 'Platform', native: 4, plugin: 4, partial: 6, open: 4, forevita: 0, total: 18 },
  { stage: 'AI layer', native: 0, plugin: 18, partial: 16, open: 1, forevita: 43, total: 78 },
] as const

export const canvasLayerStack = [
  {
    id: 'member',
    label: 'ForeVita member surface',
    share: 'Public chat, marketing bridge, formula, commerce',
    weight: 1,
  },
  {
    id: 'plugins',
    label: 'Plugins and API layer',
    share: '112 plugin rows plus partial overlays on Canvas',
    weight: 2,
  },
  {
    id: 'configure',
    label: 'Configure and enroll',
    share: 'Health Gorilla, Surescripts, templates, consents',
    weight: 1,
  },
  {
    id: 'canvas',
    label: 'Canvas clinical platform',
    share: '18 native capabilities: chart, eRx, labs, portal, FHIR',
    weight: 3,
  },
] as const

export const canvasPartialGaps = [
  {
    id: 'CAN-02',
    title: 'Portal sign-in styling',
    body: 'Canvas owns sign-in and verification screens. Only logo, HTML banner, and background image are configurable. The bridge page stays on ForeVita.',
  },
  {
    id: 'CAN-06',
    title: 'Intake save and resume',
    body: 'Portal forms submit whole. No native per-field draft persistence. Build autosave via plugin CustomModel or split intake into short forms.',
  },
  {
    id: 'ACQ-07',
    title: 'Session timeout',
    body: 'Canvas session defaults to about thirty minutes of inactivity and browser-close expiry. Not per-customer configurable today. Align with CAN-10.',
  },
  {
    id: 'LAB-08',
    title: 'Cross-phase trend charts',
    body: 'Observations are native over time. The fertility trend chart with panel-change markers is a custom portal plugin reading Canvas observations.',
  },
  {
    id: 'APT-07',
    title: 'Eligibility path',
    body: 'Native 270/271 via Claim.MD. Confirm whether Bridge is a separate vendor or the Claim.MD path is sufficient. Stale-result gating is plugin logic.',
  },
  {
    id: 'FRM-01',
    title: 'Formula presentation',
    body: 'Formula logic and provenance are ForeVita plugin and OKF work. Canvas stores artefacts and clinician sign-off, not the member-facing formula engine.',
  },
] as const

export const canvasOpenQuestions = [
  {
    id: 'CAN-03',
    title: 'Custom member domain',
    body: 'Default portal lives on canvasmedical.com. Customer-owned subdomain is not supported today. Flag for platform conversation if hard requirement.',
  },
  {
    id: 'CAN-10',
    title: 'Longer member sessions',
    body: 'Thirty-minute inactivity timeout may interrupt chat mid-conversation. Needs product decision and possible Canvas platform ask.',
  },
  {
    id: 'LAB-05',
    title: 'Kit logistics feed',
    body: 'Health Gorilla carries results, not kit shipping or return tracking. Kit status must come from the kit vendor or carrier into a plugin store.',
  },
  {
    id: 'LAB-15',
    title: 'Cycle day on observations',
    body: 'AOE questions can go on the order, but answers may not round-trip onto the resulting observation. Confirm with Health Gorilla and Canvas before build.',
  },
  {
    id: 'LAB-11',
    title: 'Critical result hold',
    body: 'Canvas has release controls and Tasks, but automatic critical hold, on-call routing, and timed release are not turnkey. Needs design and legal review.',
  },
  {
    id: 'PLT-07',
    title: 'Portal accessibility',
    body: 'Custom plugin charts and iframed pages need explicit WCAG validation. Native Canvas accessibility does not automatically cover ForeVita overlays.',
  },
  {
    id: 'PHS-09',
    title: 'Phase eligibility rules',
    body: 'Canvas can represent config-driven phase rules. ForeVita must define the phase model and eligibility logic first (ties OD-10).',
  },
  {
    id: 'VEN-12',
    title: 'Result-type routing',
    body: 'Canvas has release controls but not automatic genetic-result counselling gates. Needs design with LAB-11 and PLT-09.',
  },
  {
    id: 'CHN-04',
    title: 'Portal performance',
    body: 'Depends on ForeVita page design over Canvas FHIR and Replicant. Joint performance review recommended.',
  },
  {
    id: 'AI-CTX-03',
    title: 'Cycle context for AI',
    body: 'Cycle day may not live on the Canvas observation. ForeVita must attach it in Supabase or plugin overlay. Ties LAB-15.',
  },
] as const

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
    sees: 'Intake, uploads, extracted labs, goals, confirmed phase, Canvas FHIR observations where synced, and the full chat history, including the pre-signup question.',
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
    id: 'scope',
    label: 'Scope',
    title: 'Scope the agent',
    body: 'S1, S2, or S3 is chosen by auth and entitlement. Data access and OKF bundle scope are enforced server side by protocol rules, not by a line in the prompt.',
    systems: ['Auth', 'Entitlements', 'Protocol rules'],
    detail: 'Anonymous token on S1. Member record unlocks S2. Premium entitlement unlocks S3.',
  },
  {
    id: 'wire',
    label: 'Wire',
    title: 'Wire OKF and assemble context',
    body: 'The adapter resolves agent, phase, and entitlement into an OKF bundle manifest. From S2 up, Supabase member state and Canvas FHIR observations merge in. Same agent, phase, and OKF versions produce the same context.',
    systems: ['OKF', 'Supabase', 'Canvas FHIR'],
    detail: 'Named links pull exact concepts. No embedding search. Context is deterministic for a given version set.',
  },
  {
    id: 'infer',
    label: 'Infer',
    title: 'Infer and stream',
    body: 'Claude is called only through the internal adapter, on top of its pretrained base. The reply streams over SSE with concept IDs and versions attached. Time to first token is targeted under one second on mobile.',
    systems: ['Adapter', 'Claude', 'SSE'],
    detail: 'No vendor SDK in app code. Provenance attaches on the first token, not after the stream ends.',
  },
  {
    id: 'gate',
    label: 'Gate',
    title: 'Gate the release',
    body: 'Output is linted, provenance is attached, crisis routing runs on all three surfaces. Tier 2 is held until an APP signs. The member sees pending, never a partial formula.',
    systems: ['Linter', 'Crisis route', 'Review queue'],
    detail: 'Guardrails are code paths with failing tests, not prompt instructions the model might ignore.',
  },
] as const

export type ChatPipelineId = (typeof chatPipeline)[number]['id']

export const chatOkfWiring = [
  {
    id: 'author',
    label: 'Author',
    title: 'Authored in admin',
    body: 'Clinical staff edit OKF concept files: protocols, bands, explainers, prohibited terms, review tiers. Each file is versioned. A version is immutable once referenced in an inference.',
    detail: 'One markdown file per concept. YAML frontmatter holds IDs, links, and review tiers. Rollback is a record swap.',
    files: ['protocol.md', 'band.md', 'explainer.md', 'guardrail.md'],
  },
  {
    id: 'scope',
    label: 'Scope',
    title: 'Scoped at the API',
    body: 'The adapter maps S1, S2, or S3 to a bundle manifest before any model call. Public, base, and phase scopes are enforced in code. Concepts outside scope never enter context.',
    detail: 'S1 gets public explainers only. S2 adds member-safe bands. S3 adds phase protocols. Scope is a code gate, not a prompt request.',
    files: ['S1 public', 'S2 base', 'S3 phase'],
  },
  {
    id: 'assemble',
    label: 'Assemble',
    title: 'Assembled by link, not search',
    body: 'Named links and phase tags pull exact concepts into the prompt window. Licensed corpus passages arrive as linked OKF concepts, not as raw PDF chunks or embedding hits.',
    detail: 'The adapter follows edges: protocol points at bands, bands point at explainers. Similarity search never chooses the formula.',
    files: ['protocol → band', 'band → explainer', 'explainer → corpus'],
  },
  {
    id: 'pin',
    label: 'Pin',
    title: 'Pinned on every reply',
    body: 'Each streamed answer records which concept IDs and versions were used. A clinician correction updates the OKF record. The next inference uses the new version. Nothing rewrites a reply already sent.',
    detail: 'Provenance is attached on the first token. Corrections land on the next call, never on a signed formula.',
    files: ['okf:band.amh@v12', 'okf:proto.ov@v4'],
  },
] as const

export type ChatOkfId = (typeof chatOkfWiring)[number]['id']

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
  'Canvas Medical is the clinical platform. ForeVita consumes FHIR and builds plugins, not a parallel EMR.',
  'Client feedback within two working days at each checkpoint.',
  'Scope is fixed. Additions displace existing items.',
  'Canvas integration enrollments sit with the client and are configure work, not SOW build.',
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
    id: 'canvas',
    title: 'Canvas enrollment slips the clinical path',
    impact: 4,
    likelihood: 3,
    mitigation: 'Start Health Gorilla and Surescripts enrollment in week one. Stub with visible placeholders only for ForeVita-specific kit flows.',
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
      'Canvas custom domain and session timeout (CAN-03, CAN-10)',
      'Cycle day AOE round-trip with Health Gorilla (LAB-15)',
      'Kit logistics data source (LAB-05)',
      'Canvas enrollment timing for Health Gorilla and Surescripts',
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
