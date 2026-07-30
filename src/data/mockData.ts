import { Job, Blog, DisciplineType } from '../types';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'rlk-1001',
    title: 'ICU Registered Nurse (RN) - Travel Assignment',
    facility_name: 'Emory University Hospital',
    department: 'Intensive Care Unit',
    discipline: 'Nursing',
    specialty: 'ICU / Critical Care',
    location: 'Atlanta, GA',
    city: 'Atlanta',
    state: 'GA',
    employment_type: 'Travel Nursing',
    shift: 'Night (12 Hours)',
    salary_min: 2850,
    salary_max: 3400,
    salary_type: 'Weekly',
    weekly_pay: 3250,
    job_description: 'R.L. Klein & Associates is seeking an experienced Intensive Care Unit (ICU) Registered Nurse for a premier 13-week travel assignment at Emory University Hospital in Atlanta, GA. High-paying weekly stipend package including tax-free housing allowances.',
    responsibilities: [
      'Provide comprehensive critical care nursing to complex cardiac and neuro ICU patients.',
      'Monitor mechanical ventilators, continuous renal replacement therapy (CRRT), and arterial lines.',
      'Collaborate closely with multidisciplinary trauma and intensivist medical teams.',
      'Maintain meticulous documentation in Epic EHR systems.'
    ],
    requirements: [
      'Active Compact RN License or Georgia State RN License.',
      'Minimum 2 years of recent Level 1 Trauma ICU experience.',
      'Current BLS, ACLS certifications required.',
      'TNCC certification preferred.'
    ],
    benefits: [
      'Weekly Direct Deposit up to $3,250/week.',
      'Tax-free weekly housing and meals/incidental stipends.',
      'Comprehensive Medical, Dental, and Vision coverage from Day 1.',
      '401(k) retirement plan with immediate 4% company match.',
      '$1,000 Travel Reimbursement Allowance.',
      '24/7 dedicated clinical nurse liaison support.'
    ],
    application_deadline: '2026-09-15',
    status: 'published',
    featured: true,
    posted_date: '2026-07-28',
    seo_meta_title: 'Travel ICU Registered Nurse Job in Atlanta, GA - RL Klein',
    seo_meta_description: 'High paying ICU Travel RN job at Emory University Hospital. $3,250/wk stipend package.'
  },
  {
    id: 'rlk-1002',
    title: 'Emergency Room RN - Trauma Level I',
    facility_name: 'Memorial Hermann Health System',
    department: 'Emergency Services',
    discipline: 'Nursing',
    specialty: 'Emergency Room (ER)',
    location: 'Houston, TX',
    city: 'Houston',
    state: 'TX',
    employment_type: 'Travel Nursing',
    shift: 'Day (12 Hours)',
    salary_min: 2900,
    salary_max: 3500,
    salary_type: 'Weekly',
    weekly_pay: 3350,
    job_description: 'Join Memorial Hermann Health System in Houston, TX as an ER Registered Nurse. High volume emergency department seeking skilled nurses capable of handling rapid triage, stroke alerts, and high acuity trauma cases.',
    responsibilities: [
      'Triage incoming emergency room patients according to ESI acuity levels.',
      'Administer emergency medications, blood products, and advanced life support procedures.',
      'Coordinate rapid transfers to cardiac cath lab or surgical suites.'
    ],
    requirements: [
      'Active Texas or Compact RN License.',
      '2+ years ER nursing experience in high volume trauma center.',
      'BLS, ACLS, PALS, and TNCC required.'
    ],
    benefits: [
      '$3,350 Total Weekly Gross pay.',
      'Customizable travel housing stipend options.',
      'Full health benefits package.',
      'Paid time off accrual.'
    ],
    application_deadline: '2026-09-30',
    status: 'published',
    featured: true,
    posted_date: '2026-07-27',
    seo_meta_title: 'ER RN Travel Job Houston TX - RL Klein & Associates',
    seo_meta_description: 'Apply for Emergency Room RN travel nursing position in Houston TX. $3,350/wk.'
  },
  {
    id: 'rlk-1003',
    title: 'Physical Therapist (PT) - Outpatient / Orthopedic',
    facility_name: 'Banner Health Rehabilitation',
    department: 'Physical Therapy',
    discipline: 'Therapy',
    specialty: 'Physical Therapy',
    location: 'Phoenix, AZ',
    city: 'Phoenix',
    state: 'AZ',
    employment_type: 'Permanent Placement',
    shift: 'Day (12 Hours)',
    salary_min: 95000,
    salary_max: 115000,
    salary_type: 'Annual',
    job_description: 'R.L. Klein & Associates is placing a full-time Staff Physical Therapist for Banner Health in Phoenix, AZ. Exceptional work culture, state-of-the-art rehab equipment, and sign-on bonus available.',
    responsibilities: [
      'Perform thorough initial evaluations and develop individualized physical therapy plans.',
      'Treat orthopedic, post-surgical, and sports injuries.',
      'Educate patients and family members on home exercise routines.'
    ],
    requirements: [
      'Doctorate or Master of Physical Therapy (DPT/MPT).',
      'Active Arizona Physical Therapy License or eligibility.',
      '1+ years clinical experience preferred (New Grads welcome to apply).'
    ],
    benefits: [
      '$10,000 Sign-On Bonus.',
      'Generous Relocation Assistance.',
      'Continuing Education Allowance ($2,500/yr).',
      'Competitive paid time off (25 days/year).'
    ],
    application_deadline: '2026-10-01',
    status: 'published',
    featured: true,
    posted_date: '2026-07-25'
  },
  {
    id: 'rlk-1004',
    title: 'LPN / LVN - Med-Surg / Telemetry',
    facility_name: 'Cedars-Sinai Medical Center',
    department: 'Medical-Surgical',
    discipline: 'Nursing',
    specialty: 'LPN / LVN',
    location: 'Los Angeles, CA',
    city: 'Los Angeles',
    state: 'CA',
    employment_type: 'Contract',
    shift: 'Rotating',
    salary_min: 1950,
    salary_max: 2400,
    salary_type: 'Weekly',
    weekly_pay: 2200,
    job_description: 'Prime opportunity for a Licensed Practical Nurse / Licensed Vocational Nurse (LPN/LVN) at prestigious Cedars-Sinai in Los Angeles. 13-week renewable contract.',
    responsibilities: [
      'Provide bedside patient care, wound dressings, and routine vital monitoring.',
      'Administer oral and subcutaneous medications under RN supervision.',
      'Assist with patient admissions and discharge planning.'
    ],
    requirements: [
      'Active California LVN License.',
      '1+ years hospital med-surg or telemetry experience.',
      'IV Therapy & Blood Withdrawal Certification.'
    ],
    benefits: [
      'Weekly pay $2,200.',
      'California housing subsidy allowance.',
      'Guaranteed 36 hours weekly.'
    ],
    application_deadline: '2026-09-10',
    status: 'published',
    featured: false,
    posted_date: '2026-07-26'
  },
  {
    id: 'rlk-1005',
    title: 'Hospitalist Physician (MD / DO)',
    facility_name: 'Orlando Health Regional Medical Center',
    department: 'Hospital Medicine',
    discipline: 'Physicians',
    specialty: 'Internal Medicine',
    location: 'Orlando, FL',
    city: 'Orlando',
    state: 'FL',
    employment_type: 'Locum Tenens',
    shift: 'Day (12 Hours)',
    salary_min: 180,
    salary_max: 220,
    salary_type: 'Hourly',
    job_description: 'R.L. Klein Physician Search is recruiting a BC/BE Internal Medicine or Family Medicine Hospitalist for locum tenens coverage in Orlando, FL. 7-on / 7-off schedule.',
    responsibilities: [
      'Manage inpatient admissions and daily rounding for average 15-18 patients per shift.',
      'Coordinate specialist consultations and discharge summaries.',
      'No procedures required; dedicated nocturnal team in place.'
    ],
    requirements: [
      'Board Certified in Internal Medicine or Family Practice.',
      'Active Florida Medical License & DEA.',
      'Clean malpractice history.'
    ],
    benefits: [
      '$200/hour competitive rate + overtime.',
      'A++ rated Malpractice Insurance with tail coverage included.',
      'Luxury flight, rental car, and hotel accommodations provided.'
    ],
    application_deadline: '2026-11-01',
    status: 'published',
    featured: true,
    posted_date: '2026-07-24'
  },
  {
    id: 'rlk-1006',
    title: 'Radiology Technologist - CT / MRI Specialist',
    facility_name: 'Northwestern Medicine',
    department: 'Diagnostic Imaging',
    discipline: 'Allied Health',
    specialty: 'Radiology / CT / MRI',
    location: 'Chicago, IL',
    city: 'Chicago',
    state: 'IL',
    employment_type: 'Travel Nursing',
    shift: 'Evening (8 Hours)',
    salary_min: 2400,
    salary_max: 2850,
    salary_type: 'Weekly',
    weekly_pay: 2700,
    job_description: 'Seeking ARRT certified CT/MRI Technologist for a 13-week travel contract in downtown Chicago. Modern Siemens 128-slice CT equipment.',
    responsibilities: [
      'Perform high quality CT scans including cardiac protocols and trauma head scans.',
      'Ensure proper patient positioning and radiation protection standards.',
      'Maintain IV access and contrast administration.'
    ],
    requirements: [
      'ARRT (CT) or ARRT (MR) credentials.',
      'Illinois IEMA license.',
      'BLS certification.'
    ],
    benefits: [
      '$2,700/week gross pay.',
      'Comprehensive health coverage.',
      'Travel stipend.'
    ],
    application_deadline: '2026-09-20',
    status: 'published',
    featured: false,
    posted_date: '2026-07-22'
  },
  {
    id: 'rlk-1007',
    title: 'Nurse Practitioner (NP) - Urgent Care',
    facility_name: 'Atrium Health Medical Group',
    department: 'Urgent Care',
    discipline: 'Advanced Practice',
    specialty: 'Family Nurse Practitioner',
    location: 'Charlotte, NC',
    city: 'Charlotte',
    state: 'NC',
    employment_type: 'Permanent Placement',
    shift: 'Flexible',
    salary_min: 125000,
    salary_max: 145000,
    salary_type: 'Annual',
    job_description: 'Full-time Advanced Practice provider position in high-demand Charlotte urgent care center. Excellent salary plus quality bonuses.',
    responsibilities: [
      'Examine, diagnose, and treat acute injuries, illnesses, and minor procedures (suturing, x-ray reads).',
      'Prescribe medications according to state collaborative protocols.'
    ],
    requirements: [
      'Master or Doctorate of Nursing Practice (FNP / ENP).',
      'Active North Carolina NP License & DEA.',
      '2+ years urgent care or emergency room experience.'
    ],
    benefits: [
      '$135,000 base + incentive quarterly bonus.',
      'Full health/dental benefits.',
      '5 weeks PTO.'
    ],
    application_deadline: '2026-10-15',
    status: 'published',
    featured: true,
    posted_date: '2026-07-21'
  },
  {
    id: 'rlk-1008',
    title: 'Labor & Delivery (L&D) Registered Nurse',
    facility_name: 'Vanderbilt University Medical Center',
    department: 'Women\'s Health',
    discipline: 'Nursing',
    specialty: 'Labor & Delivery',
    location: 'Nashville, TN',
    city: 'Nashville',
    state: 'TN',
    employment_type: 'Travel Nursing',
    shift: 'Night (12 Hours)',
    salary_min: 2700,
    salary_max: 3200,
    salary_type: 'Weekly',
    weekly_pay: 3100,
    job_description: 'R.L. Klein travel nursing assignment in Music City, TN! Premier Academic Medical Center seeking L&D RN for high-risk obstetrics.',
    responsibilities: [
      'Monitor maternal-fetal heart rates during labor.',
      'Circulate in C-section surgical suites when required.',
      'Provide post-partum and immediate newborn resuscitation support.'
    ],
    requirements: [
      'Active Compact RN License.',
      '2+ years L&D experience in hospital setting.',
      'AWHONN Intermediate or Advanced Fetal Monitoring certification.'
    ],
    benefits: [
      '$3,100 weekly income package.',
      'Tax-free stipends.',
      'Travel assistance.'
    ],
    application_deadline: '2026-09-18',
    status: 'published',
    featured: false,
    posted_date: '2026-07-20'
  }
];

export const INITIAL_BLOGS: Blog[] = [
  {
    id: 'blog-1',
    title: 'The Ultimate Guide to Travel Nursing Compensation in 2026',
    slug: 'ultimate-guide-travel-nursing-compensation-2026',
    excerpt: 'Understand taxable hourly rates, non-taxable housing stipends, meal allowances, and how to maximize your weekly take-home pay on healthcare travel assignments.',
    content: `
      <h2>Navigating Travel Nurse Pay Packages</h2>
      <p>When evaluating travel nursing contracts with agencies like <strong>R.L. Klein & Associates Inc.</strong>, understanding how your pay breakdown works is critical to maximizing your financial return. Unlike permanent healthcare staff positions, travel pay packages combine taxable base pay with non-taxable government per diem stipends.</p>
      
      <h3>1. Base Taxable Hourly Rate</h3>
      <p>This is the hourly wage subject to federal, state, and local income taxes. While agencies keep this competitive, IRS rules require a reasonable hourly wage based on standard market rates.</p>

      <h3>2. Tax-Free Weekly Stipends</h3>
      <p>Stipends cover your duplicated living expenses—including housing, utilities, and daily meals—while on contract away from your tax home. Because these amounts are non-taxable, they significantly increase your net weekly income.</p>

      <h3>3. Travel & License Reimbursements</h3>
      <p>Most premier contracts at R.L. Klein include up to $1,000 in travel stipends to cover mileage or flights, along with full reimbursement for state license fees.</p>
    `,
    category: 'Travel Nursing',
    author: 'Sarah Jenkins, BSN, RN',
    author_role: 'Senior Clinical Recruiter',
    read_time: '6 min read',
    cover_image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    status: 'published',
    published_at: '2026-07-15'
  },
  {
    id: 'blog-2',
    title: 'NLC Compact Nursing License Expansion: What You Need to Know',
    slug: 'nlc-compact-nursing-license-expansion-2026',
    excerpt: 'Explore which new states have joined the Nurse Licensure Compact (NLC) and how one multi-state license opens doors across over 40 states.',
    content: `
      <h2>Unlocking Nationwide Career Flexibility</h2>
      <p>The Nurse Licensure Compact (NLC) enables Registered Nurses (RNs) and Licensed Practical Nurses (LPNs) to practice in multiple states with a single primary state license.</p>
      
      <h3>Key Advantages for Healthcare Professionals:</h3>
      <ul>
        <li><strong>Rapid Placement:</strong> Start travel or locum contracts immediately without waiting weeks for endorsement licenses.</li>
        <li><strong>Cost Savings:</strong> Save thousands of dollars in individual state license maintenance fees.</li>
        <li><strong>Emergency Support:</strong> Respond quickly to seasonal hospital census surges and disaster relief efforts.</li>
      </ul>
    `,
    category: 'Licensing & Compliance',
    author: 'David Vance',
    author_role: 'Director of Healthcare Compliance',
    read_time: '5 min read',
    cover_image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
    status: 'published',
    published_at: '2026-07-02'
  },
  {
    id: 'blog-3',
    title: 'Top 5 In-Demand Allied Health Careers for 2026 and Beyond',
    slug: 'top-5-in-demand-allied-health-careers-2026',
    excerpt: 'Discover why Radiology Technologists, Physical Therapists, and Respiratory Therapists are experiencing record high compensation and job stability.',
    content: `
      <h2>The Rising Demand for Allied Professionals</h2>
      <p>While nursing frequently dominates headlines, Allied Health professionals are the backbone of modern hospital diagnostics and rehabilitation. R.L. Klein & Associates has seen a 35% surge in allied contract requests nationwide.</p>
    `,
    category: 'Career Insights',
    author: 'Marcus Holloway',
    author_role: 'Allied Placement Specialist',
    read_time: '4 min read',
    cover_image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    status: 'published',
    published_at: '2026-06-20'
  }
];

export const DISCIPLINES_LIST = [
  {
    title: 'Nursing',
    subtitle: 'Registered Nurses, LPN/LVNs, & Specialty Units',
    description: 'Travel and permanent opportunities in ICU, ER, OR, Med-Surg, L&D, Telemetry, Cath Lab, and Pediatrics across top health systems.',
    count: '3,400+ Openings',
    iconName: 'Activity',
    color: 'from-blue-600 to-indigo-700'
  },
  {
    title: 'Allied Health',
    subtitle: 'Imaging, Laboratory, & Surgical Technologists',
    description: 'Radiology (CT/MRI), Ultrasound, Cath Lab Techs, Surgical Techs, and Clinical Lab Scientists in high-demand facilities.',
    count: '1,800+ Openings',
    iconName: 'Scan',
    color: 'from-cyan-600 to-blue-700'
  },
  {
    title: 'Therapy',
    subtitle: 'Physical, Occupational, & Speech Therapy',
    description: 'Rehabilitation positions in acute care hospitals, outpatient clinics, skilled nursing facilities, and school systems.',
    count: '1,200+ Openings',
    iconName: 'HeartPulse',
    color: 'from-emerald-600 to-teal-700'
  },
  {
    title: 'Physicians',
    subtitle: 'MD / DO Locum Tenens & Direct Hire',
    description: 'Hospitalists, Emergency Medicine, Anesthesiology, Family Practice, and Surgical Specialties with full malpractice coverage.',
    count: '650+ Openings',
    iconName: 'Stethoscope',
    color: 'from-sky-600 to-blue-800'
  },
  {
    title: 'Advanced Practice',
    subtitle: 'Nurse Practitioners, CRNAs, & Physician Assistants',
    description: 'Autonomous clinical positions in hospital networks, primary care clinics, and specialty medical groups.',
    count: '920+ Openings',
    iconName: 'UserCheck',
    color: 'from-indigo-600 to-blue-900'
  },
  {
    title: 'Healthcare IT & Leadership',
    subtitle: 'Nurse Managers, Directors, & EHR Consultants',
    description: 'Interim healthcare leadership, nursing directors, case managers, and Epic/Cerner clinical informatics experts.',
    count: '410+ Openings',
    iconName: 'Award',
    color: 'from-slate-700 to-blue-950'
  }
];

export const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];
