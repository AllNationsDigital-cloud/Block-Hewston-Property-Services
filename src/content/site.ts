/**
 * ALL SITE COPY LIVES HERE.
 * Edit text in this file; components only render it.
 * House rules: short declarative sentences. No prices. No exclamation points. No emojis.
 */

export const site = {
  name: 'Block Development Group',
  shortName: 'Block Development',
  url: 'https://blockdevelopmentgroup.com', // change if the production domain differs
  parent: { name: 'Block & Hewston', url: 'https://www.blockandhewston.com' },
  hq: 'Dallas, Texas',
  phone: '443-365-8539',
  phoneTel: '+14433658539',
  email: 'nico@blockdevelopmentgroup.com',
  tagline: 'We take distressed property and return it to service.',
  description:
    'Block Development Group is a veteran-led real estate services and development firm headquartered in Dallas, Texas. Property services, rehab and restoration, and development across Texas and Louisiana.',
};

export const nav = [
  { href: '/property-services/', label: 'Property Services' },
  { href: '/rehab-restoration/', label: 'Rehab & Restoration' },
  { href: '/development/', label: 'Development' },
  { href: '/markets/', label: 'Markets' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
];

export const cta = {
  owner: { label: 'Request a Walkthrough', href: '/contact/?type=owner' },
  investor: { label: 'Partner With Us', href: '/contact/?type=investor' },
};

/** Marked clearly on screen as placeholders. Replace with real photography. */
export const photos = {
  hero: 'Dark, high-contrast skyline or steel framing at dusk. Wide, 16:9.',
  restore: 'Interior in mid-rehab: exposed framing, work light, concrete floor.',
  reposition: 'Weathered multifamily exterior, low sun, hard shadows.',
  develop: 'Site with rebar and formwork, skyline behind.',
  services: 'Crew at work in a vacant unit. Documentary, desaturated.',
  rehab: 'Before-and-after pair: stripped interior and finished interior.',
  development: 'Aerial of an infill parcel at dusk with the city beyond.',
  markets: 'Skyline silhouette: Dallas, Houston or Shreveport.',
  about: 'Hands, tools and drawings on a plan table. Tight crop.',
};

export const home = {
  seo: {
    title: 'Block Development Group | Property Services, Rehab & Real Estate Development in Texas and Louisiana',
    description:
      'Veteran-led real estate firm in Dallas. Make-ready, rehab and restoration, and real estate development across Texas and Louisiana, including Shreveport and Bossier.',
  },
  hero: {
    kicker: 'Veteran-led. Texas and Louisiana.',
    headline: 'We take distressed property and return it to service.',
    sub: 'Block Development Group restores, repositions and develops real estate across Texas and Louisiana.',
    markets: ['Dallas–Fort Worth', 'Houston', 'Shreveport–Bossier'],
  },
  tiersHeading: 'Three disciplines. One standard.',
  tiersIntro: 'Services are how we start. Development is where we are going.',
  tiers: [
    {
      n: '01',
      title: 'Restore',
      body: 'Cleanouts, turnovers, make-ready and full rehabs. We bring vacant and rundown property back into service on schedule.',
      href: '/property-services/',
      linkLabel: 'Property services',
      photo: 'restore',
    },
    {
      n: '02',
      title: 'Reposition',
      body: 'Underperforming assets, rebuilt to earn. Scope is fixed, capital is controlled and the work is documented.',
      href: '/rehab-restoration/',
      linkLabel: 'Rehab and restoration',
      photo: 'reposition',
    },
    {
      n: '03',
      title: 'Develop',
      body: 'Acquisition, infill and ground-up development in Texas and Louisiana growth markets. Built for the long hold.',
      href: '/development/',
      linkLabel: 'Development',
      photo: 'develop',
    },
  ] as const,
  owners: {
    kicker: 'For owners and managers',
    heading: 'Your boots on the ground.',
    body: 'You are not on site. We are. Out-of-town landlords hand us the address and the objective. We return a documented result.',
    points: ['Clear written scopes', 'Photo documentation on every job', 'One point of contact', 'Walkthrough on request'],
  },
  investors: {
    kicker: 'For investors and partners',
    heading: 'A long-range plan.',
    body: 'Acquire. Reposition. Develop. Two states, one operating discipline. We work with investors, developers, brokers and lenders who think in years, not quarters.',
  },
  markets: {
    heading: 'Texas and Louisiana.',
    body: 'Headquartered in Dallas. Operating in the markets we know on the ground.',
  },
  parentLine: 'Block Development Group is the operating brand of Block & Hewston.',
  closing: {
    heading: 'Put it back in service.',
    body: 'Owners request a walkthrough. Investors open a conversation.',
  },
};

export const propertyServices = {
  seo: {
    title: 'Property Services Shreveport and Texas | Make-Ready, Turnovers, Cleanouts | Block Development Group',
    description:
      'Make-ready Louisiana and Texas landlords rely on. Turnovers, cleanouts, painting, repairs and full rehab of vacant rentals, with photo documentation and clear scopes.',
  },
  hero: {
    kicker: 'Property services',
    headline: 'Vacant to rent-ready. On schedule.',
    sub: 'Turnovers, cleanouts, painting, repairs and full rehab. One accountable crew across Texas and Louisiana.',
  },
  services: [
    {
      title: 'Turnover and make-ready',
      body: 'The unit is cleaned, repaired and painted between tenants. We work to a written scope and a fixed date.',
    },
    {
      title: 'Cleanouts and junk removal',
      body: 'Left-behind property is removed, hauled and disposed of. The unit is returned swept and open.',
    },
    {
      title: 'Interior and exterior painting',
      body: 'Surfaces are prepped, patched and finished to rental grade. Full repaints and targeted work.',
    },
    {
      title: 'Repairs and handyman work',
      body: 'Drywall, doors, hardware, trim and the punch-list items that hold up a lease. Licensed trades are coordinated, not improvised.',
    },
    {
      title: 'Full rehab of vacant and rundown rentals',
      body: 'Properties that need more than a turn get a complete scope: demolition through finish. See Rehab and Restoration.',
    },
  ],
  remote: {
    kicker: 'Out-of-town landlords',
    heading: 'We become your boots on the ground.',
    body: 'Most of our owners are not nearby. That is the job. You set the objective. We walk the property, define the scope, execute and report.',
    points: [
      { title: 'Photo documentation', body: 'Dated, room-by-room images before, during and after the work.' },
      { title: 'Clear scopes', body: 'You approve what is done before it starts. Changes are written, not assumed.' },
      { title: 'One point of contact', body: 'One person who knows your property and answers for it.' },
      { title: 'Completion reports', body: 'A closing record you can keep, forward or file.' },
    ],
  },
  process: {
    heading: 'How a job runs.',
    steps: [
      { n: '01', title: 'Walkthrough', body: 'We see the property, or review your photos.' },
      { n: '02', title: 'Scope', body: 'A written scope and schedule for your approval.' },
      { n: '03', title: 'Execute', body: 'The crew works the scope. Nothing outside it without your approval.' },
      { n: '04', title: 'Report', body: 'Photo documentation and a completion report.' },
    ],
  },
};

export const rehab = {
  seo: {
    title: 'Rental Rehab Texas and Louisiana | Distressed Property Restoration | Block Development Group',
    description:
      'Rent-ready restorations, distressed asset recovery and portfolio turns across Texas and Louisiana. Full-scope rehab by a veteran-led team.',
  },
  hero: {
    kicker: 'Rehab and restoration',
    headline: 'Full scope. One accountable team.',
    sub: 'Projects beyond a standard turn. We restore distressed property to a condition the market will lease.',
  },
  types: [
    {
      title: 'Rent-ready restorations',
      body: 'Units and houses that need real work: systems coordination, flooring, kitchens, baths, paint and finish. Delivered ready to lease.',
    },
    {
      title: 'Distressed asset recovery',
      body: 'Neglected, damaged or abandoned property assessed, scoped and rebuilt. We document the starting condition and the finished result.',
    },
    {
      title: 'Portfolio turns',
      body: 'Multiple units, one standard. We run repeatable scopes across a portfolio so every door comes back the same way.',
    },
  ],
  method: {
    heading: 'How we run a rehab.',
    steps: [
      { n: '01', title: 'Assess', body: 'Walk the asset. Record condition. Identify what is structural and what is cosmetic.' },
      { n: '02', title: 'Scope', body: 'Fix the scope in writing. Define sequence, trades and completion criteria.' },
      { n: '03', title: 'Build', body: 'Execute in sequence. Report progress with photographs. Surface issues early.' },
      { n: '04', title: 'Close out', body: 'Inspect against scope. Deliver the record. Return the asset to service.' },
    ],
  },
  note: 'Licensed plumbing, electrical and HVAC work is performed by licensed trades under our coordination.',
};

export const development = {
  seo: {
    title: 'Real Estate Development Dallas | Acquisition, Repositioning and Ground-Up | Block Development Group',
    description:
      'Acquisition, value-add repositioning, infill and ground-up development in Texas and Louisiana. A disciplined, long-horizon development group based in Dallas.',
  },
  hero: {
    kicker: 'Development',
    headline: 'Built for the long hold.',
    sub: 'Acquisition, repositioning and ground-up development in Texas and Louisiana. Capital deployed with discipline.',
  },
  vision: {
    heading: 'The plan.',
    body: 'We start where the work is: distressed property, on the ground, in markets we know. That operating base gives us cost knowledge, local relationships and credibility. We build on it. Acquisition first. Repositioning next. Ground-up development as the platform matures.',
  },
  stages: [
    { n: '01', title: 'Acquisition', body: 'Distressed and undervalued property in established Texas and Louisiana submarkets. We underwrite the work before we commit.' },
    { n: '02', title: 'Value-add repositioning', body: 'Operational and physical upgrades that restore an asset to its earning potential. Scope-controlled and documented.' },
    { n: '03', title: 'Infill development', body: 'Small and mid-scale sites inside the existing urban fabric, where demand is proven and land is constrained.' },
    { n: '04', title: 'Ground-up development', body: 'Purpose-built projects in growth corridors across both states, executed by the team that has already built the track record.' },
  ],
  principles: {
    heading: 'How we think about capital.',
    items: [
      { title: 'Capital discipline', body: 'We fix scope before we spend. Every commitment has an owner and a purpose.' },
      { title: 'Long-horizon thinking', body: 'We build for hold periods measured in years. We do not chase cycles.' },
      { title: 'Operating depth', body: 'We do the work ourselves. Our underwriting reflects what construction actually requires.' },
      { title: 'Aligned partners', body: 'We work with partners whose time horizon and standards match ours.' },
    ],
  },
  audiences: {
    heading: 'Who we work with.',
    items: [
      { title: 'Investors', body: 'Capital partners seeking disciplined exposure to Texas and Louisiana real estate.' },
      { title: 'Developers', body: 'Teams with sites or projects that need a reliable rehab and construction partner.' },
      { title: 'Brokers', body: 'Bring us distressed and off-market opportunities. We respond quickly and close professionally.' },
      { title: 'Lenders', body: 'Institutions that value an operator with documented execution and clear reporting.' },
    ],
  },
};

export const markets = {
  seo: {
    title: 'Markets: Texas and Louisiana | Dallas–Fort Worth, Houston, Shreveport–Bossier | Block Development Group',
    description:
      'Block Development Group operates across Texas and Louisiana: Dallas–Fort Worth, Houston, and Shreveport–Bossier.',
  },
  hero: {
    kicker: 'Markets',
    headline: 'Two states. Three anchor markets.',
    sub: 'Headquartered in Dallas. Operating across Texas and Louisiana.',
  },
  anchors: [
    {
      name: 'Dallas–Fort Worth',
      role: 'Headquarters',
      body: 'Our home market. Deep, fast-growing and capital-rich. The center of our acquisition and development activity.',
    },
    {
      name: 'Houston',
      role: 'Texas Gulf Coast',
      body: 'The largest metropolitan economy in the Gulf region. Strong rental demand and a long pipeline of repositioning opportunity.',
    },
    {
      name: 'Shreveport–Bossier',
      role: 'North Louisiana',
      body: 'Our Louisiana base. Property services and rehab on the ground, with a view toward larger projects.',
    },
  ],
  note: 'We also serve surrounding Texas and Louisiana communities. Ask about your location.',
};

export const about = {
  seo: {
    title: 'About Block Development Group | Veteran-Led Real Estate Services and Development',
    description:
      'A veteran-led real estate services and development firm built on discipline, accountability and execution. The operating brand of Block & Hewston.',
  },
  hero: {
    kicker: 'About',
    headline: 'Discipline. Accountability. Execution.',
    sub: 'A veteran-led firm that does what it says, on the date it says.',
  },
  story: [
    'Block Development Group is a veteran-led real estate services and development firm. We are headquartered in Dallas and operate across Texas and Louisiana.',
    'We came to this work with a simple view. Property should be restored, held and improved with discipline. Owners should know what is happening. Partners should know what to expect.',
    'We begin with property services because the work is real and the standard is visible. We build from there toward repositioning and development.',
  ],
  values: [
    { title: 'Discipline', body: 'We plan the work, define the scope and hold to it.' },
    { title: 'Accountability', body: 'We answer for results. Problems are reported early and owned fully.' },
    { title: 'Execution', body: 'We finish. On schedule, to scope, documented.' },
  ],
  parent: {
    heading: 'Part of Block & Hewston.',
    body: 'Block Development Group is the operating brand of Block & Hewston, our parent holding company. Block & Hewston protects, holds and improves the critical infrastructure behind global trade, and measures success by how well it serves the communities it is part of.',
    link: 'Visit Block & Hewston',
  },
};

export const contact = {
  seo: {
    title: 'Contact Block Development Group | Request a Walkthrough or Partner With Us',
    description:
      'Request a property walkthrough or open an investment conversation with Block Development Group in Dallas, Texas.',
  },
  hero: {
    kicker: 'Contact',
    headline: 'Start the conversation.',
    sub: 'Owners request a walkthrough. Investors and partners introduce themselves.',
  },
  form: {
    nameLabel: 'Name',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    addressLabel: 'Property address',
    addressHint: 'Optional for investors.',
    typeLabel: 'I am a',
    types: [
      { value: 'owner', label: 'Owner or manager' },
      { value: 'investor', label: 'Investor or partner' },
    ],
    projectLabel: 'Project description',
    projectHint: 'What is the property and what needs to happen?',
    submit: 'Send',
    sending: 'Sending',
    successTitle: 'Received.',
    successBody: 'We will respond directly. If it is urgent, call.',
    errorBody: 'We could not send that automatically. Email us instead. Your details are filled in.',
    consent: 'We use what you send only to respond to you.',
  },
};

export const footer = {
  blurb: 'Veteran-led real estate services and development. Texas and Louisiana.',
  legal: 'Block Development Group is an operating brand of Block & Hewston.',
};
