// ============================================================
// BUDAK LAB — Member Roster
// ============================================================
// gender: 'm' | 'f'  (drives figure silhouette — hijab vs. short hair)
// theme:  accent color key, maps to CSS custom properties in style.css
// status: 'current' | 'alumni'
// ============================================================

const MEMBERS = [
  {
    id: "en.zainal",
    domain: "team leader",
    photo: "assets/images/en.zainal.jpeg",
    order: 0,
    gender: "m",
    isLeader: true,
    name: "Encik Zainal Abidin",
    role: "Team Leader",
    theme: "blue",
    joined: "2022",
    left: null,
    status: "current",
    tagline: "Pioneer of BUDAK LAB — leading a data science team of 5 current members and 3 former members.",
  },
{
    id: "nurul.syaqriana",
    domain: "data science",
    order: 1,
    gender: "f",
    isLeader: false,
    photo: "assets/images/yana.jpeg",
    name: "Nurul Syaqriana",
    role: "Data Science",
    theme: "purple",
    joined: "Feb 2026",
    left: "Apr 2026",
    status: "former",

    key_contributions: [
        "Standardized Python scripts for the address matching workflow.",
        "Improved and simplified the processing pipeline.",
        "Coordinated workflow updates for nationwide implementation."
    ],

    // IMPORTANT: use project IDs, not project titles
    projects: [
        "padu-msar",
        "putrajaya-dashboard",
        "budaklab-manual"
    ]
},
  {
    id: "khairunnisa.azura",
    domain: "data science",
    order: 2,
    gender: "f",
    isLeader: false,
    photo: "assets/images/nisa.jpeg",
    name: "Khairunnisa Azura",
    role: "Data Science",
    theme: "rose",
    joined: "Feb 2026",
    left: "Apr 2026",
    status: "former",

    skills: [
      { name: "Python", level: 90 },
      { name: "Power BI", level: 80 },
      { name: "SQL", level: 75 }
    ],
    key_contributions: [
        "Developed the address matching workflow using Python.",
        "Built and refined the multi-phase processing pipeline.",
        "Automated data processing and workflow standardization."
    ],

    projects: [
        "padu-msar"
    ]
  },
  {
    id: "siti.nabila",
    domain: "data science",
    order: 3,
    gender: "f",
    isLeader: false,
    photo: "assets/images/Nabila.jpeg",
    name: "Siti Nabila",
    role: "Data Science",
    theme: "amber",
    joined: "Feb 2026",
    left: "May 2026",
    status: "former",

    skills: [
      { name: "Python", level: 90 },
      { name: "Power BI", level: 80 },
      { name: "SQL", level: 75 }
    ],

    key_contributions: [
        "Standardized data processing scripts.",
        "Performed data validation and quality assurance.",
        "Verified address matching results before finalization."
    ],

    projects: [
        "padu-msar",
        "budaklab-manual",
        "manual_QCS"
    ]
  },
  {
    id: "nur.syakira",
    domain: "data science",
    order: 4,
    gender: "f",
    isLeader: false,
    photo: "assets/images/keyra.jpeg",
    name: "Nur Syakira Afiffa",
    role: "Data Science",
    theme: "emerald",
    joined: "Feb 2026",
    left: null,
    status: "current",

    skills: [
      { name: "Python", level: 90 },
      { name: "Power BI", level: 80 },
      { name: "SQL", level: 75 }
    ],
    key_contributions: [
        "Conducted GIS and spatial analysis.",
        "Validated spatial matching results.",
        "Improved geographical accuracy of matched datasets."
    ],
    projects: [
        "atlas",
        "manual_UB"   
    ]
  },
  {
    id: "nurul.izzah",
    domain: "data science",
    order: 5,
    gender: "f",
    isLeader: false,
    photo: "assets/images/Izzah.jpg",
    name: "Nurul Izzah Aqilah",
    role: "Data Science",
    theme: "cyan",
    joined: "Mar 2026",
    left: null,
    status: "current",

    skills: [
      { name: "Python", level: 90 },
      { name: "Power BI", level: 80 },
      { name: "SQL", level: 75 }
    ],

    key_contributions: [
        "Developed interactive population dashboards.",
        "Enhanced data visualization and reporting features.",
        "Supported dashboard testing and improvements."
    ],
    
    projects: [
        "padu-msar",
        "putrajaya-dashboard",
        "budaklab-manual"
    ]
  },
  {
    id: "nuralis",
    domain: "data science",
    order: 6,
    gender: "f",
    isLeader: false,
    photo: "assets/images/alis.jpg",
    name: "Nuralis",
    role: "Data Science",
    theme: "orange",
    joined: "May 2026",
    left: null,
    status: "current",

    skills: [
      { name: "Python", level: 90 },
      { name: "Power BI", level: 80 },
      { name: "SQL", level: 75 }
    ],
    key_contributions: [
        "Led the development of the BP Map Generation System.",
        "Designed the system interface and user workflow.",
        "Prepared technical documentation and user manuals.",
        "Coordinated system deployment and user acceptance testing."
    ],
    projects: [
        "jana-peta",
        "KYA"
    ]
  },
  {
    id: "yussyafika",
    domain: "data science",
    order: 7,
    gender: "f",
    isLeader: false,
    photo: "assets/images/yus.jpeg",
    name: "Yussyafika",
    role: "Data Science",
    theme: "teal",
    joined: "May 2026",
    left: null,
    status: "current",

    skills: [
      { name: "Python", level: 90 },
      { name: "Power BI", level: 80 },
      { name: "SQL", level: 75 }
    ],
    key_contributions: [
        "Developed backend modules and system integration.",
        "Implemented database connectivity and API services.",
        "Integrated chatbot functionality and facility analysis features.",
        "Optimized overall system performance."
    ],
    projects: [
        "jana-peta",
        "KYA"
    ]
  },
  {
    id: "siti.humaira",
    domain: "data science",
    order: 8,
    gender: "f",
    isLeader: false,
    photo: "assets/images/humaira.jpeg",
    name: "Siti Humaira",
    role: "Data Science",
    theme: "blue",
    joined: "Jun 2026",
    left: null,
    status: "current",

    skills: [
      { name: "Python", level: 90 },
      { name: "Power BI", level: 80 },
      { name: "SQL", level: 75 }
    ],

    key_contributions: [
        "Developed the Population Dashboard.",
        "Designed interactive dashboards and data visualization features.",
        "Prepared system documentation and user guides."
    ],

    projects: [
        "lensa_penduduk",
        "budak_lab"
    ]
  },
];

// ============================================================
// The Reel — project categories shown as the page 2 montage.
// Drop matching photos into assets/projects/ using the `image`
// filename below. If a file is missing, the reel falls back to
// a themed icon tile automatically — nothing breaks.
// ============================================================
const REEL_ITEMS = [
  { id: "dashboard", title: "Dashboards", desc: "Live ops metrics for the whole lab.", icon: "▦", theme: "blue", image: "assets/projects/dashboard.jpg" },
  { id: "gis", title: "GIS", desc: "Spatial risk mapping & remote sensing.", icon: "◈", theme: "emerald", image: "assets/projects/gis.jpg" },
  { id: "ai", title: "Artificial Intelligence", desc: "Lightweight models, real deployments.", icon: "◎", theme: "purple", image: "assets/projects/ai.jpg" },
  { id: "web", title: "Website Development", desc: "Portals that connect students to funding.", icon: "◫", theme: "orange", image: "assets/projects/web.jpg" },
  { id: "data", title: "Data Analytics", desc: "Turning raw exports into decisions.", icon: "▤", theme: "rose", image: "assets/projects/data.jpg" },
  { id: "research", title: "Research", desc: "Papers, grants, documentation.", icon: "▥", theme: "teal", image: "assets/projects/research.jpg" },
  { id: "achievements", title: "Achievements", desc: "Recognition from beyond campus.", icon: "★", theme: "amber", image: "assets/projects/achievements.jpg" },
];

const PROJECTS = {
  "padu-msar": {
    id: "padu-msar",
    title: "PADU–MSAR Address Matching",
    category: "GIS",
    theme: "emerald",
    summary: "Address matching between PADU and MSAR datasets.",
    overview: "A spatial monitoring platform combining rainfall telemetry with campus elevation data to flag flood-prone routes before storms hit.",
    objectives: "Standardise and normalise address records from PADU and MSAR before matching.",
    description: "A structured address-matching workflow that combines Levenshtein Matching and Jaccard Similarity to standardise, classify, and validate PADU and MSAR address records for population mapping and planning.",
    stack: ["PADU", "MSAR ", " Address Matching ", "Levenshtein Distance ", "Jaccard Similarity "],
  },
  "putrajaya-dashboard": {
    id: "putrajaya-dashboard",
    title: "W.P. Putrajaya Population Profile Dashboard",
    category: "Dashboard",
    theme: "blue",
    summary: "Interactive demographic dashboard integrating population data from multiple sources to support monitoring and analysis.",
    overview: "The W.P. Putrajaya Population Profile Dashboard is an interactive platform developed to present population information from various data sources, including STB 2024, HIES, the Agriculture Census, and the Population and Housing Census 2020. It combines demographic indicators, visual analytics, projections, and spatial data to provide a comprehensive view of population trends and characteristics.",
    objectives: "Visualise population distribution through an interactive map with search, filtering, and record-level pop-up information.",
    description: "An interactive population dashboard that presents current demographic profiles, Census 2020 information, and 2030 population projections through KPIs, charts, searchable data, and spatial visualisation.",
    stack: ["Shiny R ", "Population Dashboard ", "Demographic Analysis ", "Data Visualisation"],
    video:
    "assets/videos/profil_dashboard.mp4"
  },
  "budaklab-manual": {
    id: "budaklab-manual",
    title: "Budak Lab 2026 Technical Manual",
    category: "Report",
    theme: "purple",
    summary: "Comprehensive technical manual documenting data processing workflows, from data preparation and integration to dashboard development.",
    overview: "The Budak Lab 2026 Technical Manual provides a complete guide for data harmonisation, address standardisation, dataset integration, PADU–MSAR address matching, result validation, and dashboard development. It documents the end-to-end workflow from data preparation and processing to the generation of final datasets and interactive visual outputs.",
    objectives: "Diagnostic tools for early crop stress required equipment far outside a smallholder farmer's budget.",
    description: "A practical technical manual that documents the full workflow for data harmonisation, PADU–MSAR address matching, validation, output preparation, and interactive dashboard development.",
    stack: ["Technical Manual ", "Data Harmonisation ", "PADU ", "MSAR","Shiny R"],
    video:
    "assets/videos/manual_budak lab.mp4"
  },
  "jana-peta": {
    id: "jana-peta",
    title: "Sistem Automasi Jana Peta BP",
    category: "Website Development",
    theme: "orange",
    summary: "Online reporting system for monitoring layer submission progress with bulk map generation capabilities.",
    overview: "This system was developed to support online reporting and monitoring of layer submission progress for State DOSM. It also introduces an innovation by headquarters that enables bulk map generation, improving the efficiency of spatial data management and reporting processes.",
    objectives: "Enabling DOSM officers to provide their respective state BP, UB, and BP category data layers online.",
    description: "A web-based geospatial automation system developed to streamline the preparation and validation of Blok Penghitungan (BP), Unit Bangunan (UB), and BP category data for automated batch map generation. The system reduces manual GIS processing time while producing standardized, high-quality A3 PDF maps for DOSM census operations. ",
    stack: ["Python", "Geospatial Data Processing", "GIS", "Web Development"],
  },
  "KYA": {
    id: "KYA",
    title: "Know Your Area",
    category: "Website Development",
    theme: "teal",
    summary: "Web-based geospatial analysis system for evaluating population distribution and public facility accessibility across planning blocks in Malaysia.",
    overview: "Know Your Area is a web-based geospatial facility analysis system developed to analyze the distribution of population and public facilities across planning blocks in Malaysia. The system integrates demographic and spatial data from multiple sources, including the Department of Statistics Malaysia (DOSM), MyGeoMap, and OpenStreetMap, to support data-driven decision-making and geospatial analysis.",
    objectives: "To provide an interactive map platform for exploring Malaysia's demographic data",
    description: "The system provides a comprehensive platform for stakeholders to assess population patterns, facility coverage, and spatial accessibility. It supports various users including Local Authorities (PBT) for infrastructure planning, government agencies for public service analysis, businesses for understanding population density around locations, families for identifying nearby facilities before relocation, and researchers for studying population distribution trends.",
    stack: ["Geospatial", "PostGIS", "Demographic Analysis", "Interactive Map"],
  },
  "atlas": {
    id: "atlas",
    title: "Atlas Banci 2020",
    category: "Production",
    theme: "teal",
    summary: "Comprehensive geospatial publication visualising Population and Housing Census 2020 findings through maps, charts, and infographics.",
    overview: "Atlas Banci 2020 Malaysia presents demographic patterns across Malaysia through thematic maps, charts, and infographics. It provides spatial insights on population distribution, households, housing, and urbanisation to support planning, research, and policy development.",
    objectives: "Present Population and Housing Census 2020 data through thematic maps and geospatial visualisations.",
    description: "Atlas Banci 2020 Malaysia provides a comprehensive geospatial visualisation of census data, enabling a better understanding of population distribution, demographic characteristics, households, housing, and urbanisation across Malaysia.",
    stack: ["Population Census 2020", "GIS", "Thematic Mapping", "Spatial Analysis"],
    video:
    "assets/videos/atlas.mp4"
  },
  "manual_UB": {
    id: "manual_UB",
    title: "Manual Pengemaskinian UB",
    category: "Report",
    theme: "teal",
    summary: "A step-by-step guide for updating DOSM UB data through building footprint integration and geospatial database maintenance.",
    overview: "Manual Pengemaskinian UB outlines the workflow for updating DOSM UB data by integrating Microsoft Building Footprint data with existing UB datasets using ArcGIS Pro and Python Notebook. It covers data acquisition, processing, identification of new buildings, and geospatial database updates for more efficient and accurate data maintenance.",
    objectives: "Provide a structured workflow for updating DOSM UB data using Microsoft Building Footprint, ArcGIS Pro, and Python Notebook.",
    description: "A comprehensive guide for updating DOSM Unit Building (UB) data by integrating Microsoft Building Footprint with existing UB datasets using ArcGIS Pro and Python Notebook.",
    stack: ["ArcGIS Pro", "Microsoft Building Footprint", "Python", "GIS", "Geospatial Data"],
    video:
    "assets/videos/manual_UB.mp4"
  }, 
  "manual_QCS": {
    id: "manual_QCS",
    title: "Manual Penggunaan Data Quarterly Construction Survey (QCS)",
    category: "Report",
    theme: "teal",
    summary: "A guide for processing and transforming Quarterly Construction Survey data into structured spatial datasets.",
    overview: "Manual Penggunaan Data Quarterly Construction Survey (QCS) provides guidance on processing and extracting construction survey data using Microsoft Excel, Power Query, and ArcGIS Pro. It covers manual and automated workflows for converting contract information into spatial data to improve efficiency, consistency, and accuracy in geospatial data processing.",
    objectives: "Provide a structured workflow for processing and extracting QCS data using manual and automated methods.",
    description: "A practical guide for processing Quarterly Construction Survey (QCS) data using Microsoft Excel, Power Query, and ArcGIS Pro to automate data extraction, improve data quality, and support geospatial analysis. ",
    stack: ["Power Query", "Microsoft Excel ", "ArcGIS Pro", "GIS"],
    video:
    "assets/videos/manual_QCS.mp4"
  },
  "lensa_penduduk": {
    id: "lensa_penduduk",
    title: "Dashboard Lensa Penduduk",
    category: "Dashboard",
    theme: "teal",
    summary: "An interactive population platform supporting preparations towards the 2030 Population and Housing Census through demographic insights and data visualisation.",
    overview: "Lensa Penduduk is a population-focused platform developed to provide accessible demographic insights and support strategic preparations towards the Population and Housing Census 2030. It presents population trends, characteristics, and spatial information through interactive visualisations to enhance understanding, planning, and decision-making.",
    objectives: "To support early preparations and planning towards Population and Housing Census 2030.",
    description: "Lensa Penduduk enables users to explore population-related information through interactive dashboards and visual analytics. The platform supports monitoring of demographic changes and provides valuable insights for stakeholders in understanding population characteristics, trends, and spatial distribution as part of the preparation towards Census 2030.",
    stack: ["OpenDOSM", "Python ", "Web Development", "Data Visualisation"],
    video:
    "assets/videos/lensa.mp4"
  },
   "budak_lab": {
    id: "budak_lab",
    title: "Website Budak Lab",
    category: "Website Development",
    theme: "teal",
    summary: "A web platform showcasing BUDAK LAB’s team, projects, contributions, and data-driven innovations.",
    overview: "Budak Lab Web is an interactive platform developed to showcase BUDAK LAB’s activities, project portfolios, technical contributions, and achievements. It provides a centralised digital space to present team profiles, completed projects, and research or development outcomes through an engaging web interface.",
    objectives: "To provide a digital platform for showcasing BUDAK LAB projects and achievements.",
    description: "Budak Lab Web serves as a portfolio and information platform that highlights the lab’s projects, technical documentation, and team capabilities. The website integrates project showcases, member profiles, and interactive elements to provide a comprehensive overview of BUDAK LAB’s development journey and digital innovations.",
    stack: ["HTML", "JavaScript","Interactive UI Components"],
  },
};