/**
 * ALL SITE COPY LIVES HERE. Edit text in this file; components only render it.
 * House rules: short declarative sentences. No prices. No exclamation points. No emojis.
 * Titles given as arrays render one line each (the design stacks display type).
 */

export const site = {
  name: 'Block Development Group',
  url: 'https://blockdevelopmentgroup.com', // change if the production domain differs
  parent: { name: 'Block & Hewston', url: 'https://www.blockandhewston.com' },
  hq: 'Dallas, Texas',
  phone: '443-365-8539',
  phoneTel: '+14433658539',
  email: 'nico@blockdevelopmentgroup.com',
  description:
    'Block Development Group is a veteran-led real estate services and development firm headquartered in Dallas, Texas. Property services, rehab and restoration, and development across Texas and Louisiana.',
};

export const nav = [
  { href: '/property-services/', label: 'Property Services' },
  { href: '/rehab-restoration/', label: 'Rehab & Restoration' },
  { href: '/development/', label: 'Development' },
  { href: '/markets/', label: 'Markets' },
  { href: '/about/', label: 'About' },
];

export const cta = {
  owner: { label: 'Request a Walkthrough', href: '/contact/?type=owner' },
  investor: { label: 'Partner With Us', href: '/contact/?type=investor' },
  mast: { label: 'Contact', href: '/contact/' },
};

/** Photography supplied with the design system (black and white). Files live in /public/img/photos. */
export const photos = {
  dallasSkyline: { src: '/img/photos/dallas-skyline-night.jpg', alt: 'Dallas skyline at night' },
  dallasTrinity: { src: '/img/photos/dallas-trinity-night.jpg', alt: 'Dallas skyline reflected in the Trinity River at night' },
  shreveport: { src: '/img/photos/shreveport-skyline.jpg', alt: 'Downtown Shreveport towers' },
  steel: { src: '/img/photos/steel-beams-yard.jpg', alt: 'Steel tube stock stacked in a yard' },
  timber: { src: '/img/photos/timber-framing.jpg', alt: 'Heavy timber framing under construction' },
  formwork: { src: '/img/photos/concrete-formwork.jpg', alt: 'Aerial view of concrete formwork on a building site' },
  demo: { src: '/img/photos/interior-demo-brick.jpg', alt: 'Interior demolition exposing brick and lath' },
  kitchen: { src: '/img/photos/interior-gutted-kitchen.jpg', alt: 'Gutted interior ready for restoration' },
} as const;

export const home = {
  seo: {
    title: 'Block Development Group | Property Services, Rehab & Real Estate Development in Texas and Louisiana',
    description:
      'Veteran-led real estate firm in Dallas. Make-ready, rehab and restoration, and real estate development across Texas and Louisiana, including Shreveport and Bossier.',
  },
  hero: {
    title: ['Built', 'to hold.'],
    lede: 'We take distressed property and return it to service. Real estate services and development across Texas and Louisiana, from make-ready to ground-up.',
  },
  intro: {
    title: ['We underwrite', 'like owners.', 'Because we are.'],
    lede: 'Our crews do the work on the properties we manage and the projects we build. The scope a partner approves is the scope that gets delivered.',
    action: { label: 'How we operate', href: '/about/' },
  },
  tiers: [
    { title: 'Restore', meta: '01 · Property services', body: 'Cleanouts, turnovers, make-ready and full rehabs. Property back in service on schedule.', href: '/property-services/', photo: 'kitchen' },
    { title: 'Reposition', meta: '02 · Rehab and restoration', body: 'Underperforming assets rebuilt to earn. Scope fixed, work documented.', href: '/rehab-restoration/', photo: 'demo' },
    { title: 'Develop', meta: '03 · Development', body: 'Acquisition, infill and ground-up development across Texas and Louisiana.', href: '/development/', photo: 'formwork' },
  ] as const,
  how: {
    eyebrow: 'How we work',
    title: 'One firm, start to finish.',
    steps: [
      { title: 'Acquire', body: 'Land and existing assets in growth corridors from Dallas to Shreveport.' },
      { title: 'Reposition', body: 'Rehab and restoration carried out by our own crews.' },
      { title: 'Develop', body: 'Ground-up projects from entitlement to delivery.' },
      { title: 'Hold', body: 'We own and operate what we build.' },
    ],
  },
  audiences: [
    {
      eyebrow: 'For owners and managers',
      title: ['Your boots', 'on the ground.'],
      body: 'You are not on site. We are. Out-of-town landlords hand us the address and the objective. We return a documented result.',
    },
    {
      eyebrow: 'For investors and partners',
      title: ['A long-range', 'plan.'],
      body: 'Two states, one operating discipline. We work with investors, developers, brokers and lenders who think in years, not quarters.',
    },
  ],
  markets: {
    lines: ['Texas. Louisiana.', 'Block by block.'],
    body: 'Headquartered in Dallas. Operating across Dallas–Fort Worth, Houston and Shreveport–Bossier.',
  },
  cta: { title: ['Bring us', 'the site.'], lede: 'For owners, landowners and capital partners with a property or project in Texas or Louisiana.' },
};

export const propertyServices = {
  seo: {
    title: 'Property Services Shreveport and Texas | Make-Ready, Turnovers, Cleanouts | Block Development Group',
    description:
      'Make-ready Louisiana and Texas landlords rely on. Turnovers, cleanouts, painting, repairs and full rehab of vacant rentals, with photo documentation and clear scopes.',
  },
  head: {
    eyebrow: 'Property services',
    title: ['Vacant to', 'rent-ready.'],
    lede: 'Turnovers, cleanouts, painting, repairs and full rehab. One accountable crew across Texas and Louisiana. Every job starts with a walkthrough and a written scope.',
  },
  services: [
    { title: 'Turnover and make-ready', body: 'The unit is cleaned, repaired and painted between tenants. We work to a written scope and a fixed date.', items: ['Cleaning', 'Repairs', 'Paint'] },
    { title: 'Cleanouts and junk removal', body: 'Left-behind property is removed, hauled and disposed of. The unit is returned swept and open.', items: ['Removal', 'Hauling', 'Disposal'] },
    { title: 'Interior and exterior painting', body: 'Surfaces are prepped, patched and finished to rental grade. Full repaints and targeted work.', items: ['Interior', 'Exterior'] },
    { title: 'Repairs and handyman work', body: 'Drywall, doors, hardware, trim and the punch-list items that hold up a lease. Licensed trades are coordinated, not improvised.', items: ['Drywall', 'Doors and hardware', 'Trim'] },
    { title: 'Full rehab of vacant rentals', body: 'Properties that need more than a turn get a complete scope, from demolition through finish. See Rehab and Restoration.', items: ['Demolition', 'Rebuild', 'Finish'] },
  ],
  remote: {
    eyebrow: 'Out-of-town landlords',
    title: ['We become your', 'boots on the ground.'],
    lede: 'Most of our owners are not nearby. That is the job. You set the objective. We walk the property, define the scope, execute and report.',
    points: [
      { title: 'Photo documentation', body: 'Dated, room-by-room images before, during and after the work.' },
      { title: 'Clear scopes', body: 'You approve what is done before it starts. Changes are written, not assumed.' },
      { title: 'One contact', body: 'One person who knows your property and answers for it.' },
      { title: 'Completion reports', body: 'A closing record you can keep, forward or file.' },
    ],
  },
  process: {
    eyebrow: 'How a job runs',
    title: 'Four steps.',
    steps: [
      { title: 'Walkthrough', body: 'We see the property, or review your photos.' },
      { title: 'Scope', body: 'A written scope and schedule for your approval.' },
      { title: 'Execute', body: 'The crew works the scope. Nothing outside it without your approval.' },
      { title: 'Report', body: 'Photo documentation and a completion report.' },
    ],
  },
  cta: { title: ['Request a', 'walkthrough.'], lede: 'Give us the address and the objective. We take it from there.' },
};

export const rehab = {
  seo: {
    title: 'Rental Rehab Texas and Louisiana | Distressed Property Restoration | Block Development Group',
    description:
      'Rent-ready restorations, distressed asset recovery and portfolio turns across Texas and Louisiana. Full-scope rehab by a veteran-led team.',
  },
  head: {
    eyebrow: 'Rehab and restoration',
    title: ['Full scope.', 'One team.'],
    lede: 'Projects beyond a standard turn. We restore distressed property to a condition the market will lease.',
  },
  types: [
    { title: 'Rent-ready restorations', body: 'Units and houses that need real work: systems coordination, flooring, kitchens, baths, paint and finish. Delivered ready to lease.', items: ['Interiors', 'Systems', 'Finish'] },
    { title: 'Distressed asset recovery', body: 'Neglected, damaged or abandoned property assessed, scoped and rebuilt. We document the starting condition and the finished result.', items: ['Assess', 'Rebuild', 'Document'] },
    { title: 'Portfolio turns', body: 'Multiple units, one standard. We run repeatable scopes across a portfolio so every door comes back the same way.', items: ['Repeatable scopes', 'One standard'] },
  ],
  method: {
    eyebrow: 'Method',
    title: 'How we run a rehab.',
    steps: [
      { title: 'Assess', body: 'Walk the asset. Record condition. Separate what is structural from what is cosmetic.' },
      { title: 'Scope', body: 'Fix the scope in writing. Define sequence, trades and completion criteria.' },
      { title: 'Build', body: 'Execute in sequence. Report progress with photographs. Surface issues early.' },
      { title: 'Close out', body: 'Inspect against scope. Deliver the record. Return the asset to service.' },
    ],
  },
  note: 'Licensed plumbing, electrical and HVAC work is performed by licensed trades under our coordination.',
  cta: { title: ['Bring us', 'the hard ones.'], lede: 'Distressed, neglected or overdue. Send the address and we will walk it.' },
};

export const development = {
  seo: {
    title: 'Real Estate Development Dallas | Acquisition, Repositioning and Ground-Up | Block Development Group',
    description:
      'Acquisition, value-add repositioning, infill and ground-up development in Texas and Louisiana. A disciplined, long-horizon development group based in Dallas.',
  },
  hero: {
    title: ['Built for', 'the long hold.'],
    lede: 'Acquisition, repositioning and ground-up development in Texas and Louisiana. Capital deployed with discipline.',
  },
  vision: {
    title: ['The', 'plan.'],
    lede: 'We start where the work is: distressed property, on the ground, in markets we know. That operating base gives us cost knowledge, local relationships and credibility. We build on it. Acquisition first. Repositioning next. Ground-up development as the platform matures.',
  },
  stages: [
    { title: 'Acquisition', body: 'Distressed and undervalued property in established Texas and Louisiana submarkets. We underwrite the work before we commit.', items: ['Distressed', 'Undervalued', 'Established submarkets'] },
    { title: 'Value-add repositioning', body: 'Operational and physical upgrades that restore an asset to its earning potential. Scope-controlled and documented.', items: ['Scope-controlled', 'Documented'] },
    { title: 'Infill development', body: 'Small and mid-scale sites inside the existing urban fabric, where demand is proven and land is constrained.', items: ['Proven demand', 'Constrained land'] },
    { title: 'Ground-up development', body: 'Purpose-built projects in growth corridors across both states, executed by the team that has already built the track record.', items: ['Growth corridors', 'Two states'] },
  ],
  principles: {
    eyebrow: 'Capital',
    title: 'How we think about it.',
    items: [
      { title: 'Discipline', body: 'We fix scope before we spend. Every commitment has an owner and a purpose.' },
      { title: 'Horizon', body: 'We build for hold periods measured in years. We do not chase cycles.' },
      { title: 'Depth', body: 'We do the work ourselves. Our underwriting reflects what construction requires.' },
      { title: 'Alignment', body: 'We work with partners whose time horizon and standards match ours.' },
    ],
  },
  audiences: {
    eyebrow: 'Partners',
    title: 'Who we work with.',
    items: [
      { title: 'Investors', body: 'Capital partners seeking disciplined exposure to Texas and Louisiana real estate.' },
      { title: 'Developers', body: 'Teams with sites or projects that need a reliable rehab and construction partner.' },
      { title: 'Brokers', body: 'Bring us distressed and off-market opportunities. We respond quickly and close professionally.' },
      { title: 'Lenders', body: 'Institutions that value an operator with documented execution and clear reporting.' },
    ],
  },
  cta: { title: ['Partner', 'with us.'], lede: 'If your horizon matches ours, introduce yourself.' },
};

export const markets = {
  seo: {
    title: 'Markets: Texas and Louisiana | Dallas–Fort Worth, Houston, Shreveport–Bossier | Block Development Group',
    description: 'Block Development Group operates across Texas and Louisiana: Dallas–Fort Worth, Houston, and Shreveport–Bossier.',
  },
  hero: {
    title: ['Two states.', 'Three markets.'],
    lede: 'Headquartered in Dallas. Operating across Texas and Louisiana.',
  },
  anchors: [
    { title: 'Dallas–Fort Worth', body: 'Our home market and headquarters. Deep, fast-growing and capital-rich. The center of our acquisition and development activity.', items: ['Headquarters', 'Texas'] },
    { title: 'Houston', body: 'The largest metropolitan economy on the Gulf. Strong rental demand and a long pipeline of repositioning opportunity.', items: ['Texas Gulf Coast'] },
    { title: 'Shreveport–Bossier', body: 'Our Louisiana base. Property services and rehab on the ground, with a view toward larger projects.', items: ['North Louisiana', 'Caddo and Bossier parishes'] },
  ],
  note: 'We also serve surrounding Texas and Louisiana communities. Ask about your location.',
  cta: { title: ['Your market.', 'Our crew.'], lede: 'Tell us where the property is. We will tell you how we can help.' },
};

export const about = {
  seo: {
    title: 'About Block Development Group | Veteran-Led Real Estate Services and Development',
    description:
      'A veteran-led real estate services and development firm built on discipline, accountability and execution. The operating brand of Block & Hewston.',
  },
  hero: {
    title: ['Quiet', 'professionals.'],
    lede: 'A veteran-led firm headquartered in Dallas. We say what we will do, then we do it.',
  },
  intro: {
    title: ['Services first.', 'Development', 'next.'],
    lede: 'Block Development Group is the operating brand of Block & Hewston. We began with property services for landlords and owners, and we are building a development group on that foundation.',
  },
  values: {
    eyebrow: 'Standards',
    title: 'What we hold to.',
    items: [
      { title: 'Discipline', body: 'We plan the work, define the scope and hold to it.' },
      { title: 'Accountability', body: 'We answer for results. Problems are reported early and owned fully.' },
      { title: 'Execution', body: 'We finish. On schedule, to scope, documented.' },
    ],
  },
  statement: ['Texas. Louisiana.', 'Block by block.'],
  parent: {
    eyebrow: 'Parent company',
    title: ['Part of', 'Block & Hewston.'],
    body: 'Block & Hewston protects, holds and improves the critical infrastructure behind global trade, and measures success by how well it serves the communities it is part of.',
    link: 'Visit Block & Hewston',
  },
  cta: { title: ['Work with', 'a firm that finishes.'], lede: 'Owners request a walkthrough. Investors open a conversation.' },
};

export const contact = {
  seo: {
    title: 'Contact Block Development Group | Request a Walkthrough or Partner With Us',
    description: 'Request a property walkthrough or open an investment conversation with Block Development Group in Dallas, Texas.',
  },
  head: {
    eyebrow: 'Contact',
    title: ['Start a', 'conversation.'],
    lede: 'Owners request a walkthrough. Investors, landowners, brokers and lenders introduce themselves. A principal responds directly.',
  },
  form: {
    typeLabel: 'I am a',
    types: [
      { value: 'owner', label: 'Owner or manager' },
      { value: 'investor', label: 'Investor or partner' },
    ],
    nameLabel: 'Full name',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    addressLabel: 'Property address',
    addressHint: 'Optional for investors',
    projectLabel: 'Project description',
    projectHint: 'The property, its status and what needs to happen',
    submit: 'Send inquiry',
    sending: 'Sending',
    successTitle: 'Received.',
    successBody: 'A principal will respond directly. If it is urgent, call.',
    errorBody: 'We could not send that automatically. Email us instead. Your details are filled in.',
    consent: 'We use what you send only to respond to you.',
  },
};

export const footer = {
  address: 'Dallas, Texas\nServing Texas and Louisiana',
  legal: '© Block Development Group. A Block & Hewston company.',
  columns: [
    { title: 'Work', links: [{ label: 'Property Services', href: '/property-services/' }, { label: 'Rehab & Restoration', href: '/rehab-restoration/' }, { label: 'Development', href: '/development/' }] },
    { title: 'Firm', links: [{ label: 'Markets', href: '/markets/' }, { label: 'About', href: '/about/' }, { label: 'Contact', href: '/contact/' }] },
  ],
};
