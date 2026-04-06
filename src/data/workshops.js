/**
 * Canonical FOSSEE workshop catalog for listing, filters, and detail routes.
 * @typedef {{
 * id: string,
 * title: string,
 * category: string,
 * date: string,
 * seats: number,
 * instructor: string,
 * duration: string,
 * level: 'Beginner' | 'Intermediate' | 'Advanced',
 * prerequisites: string[],
 * topics: string[],
 * about: string
 * }} Workshop
 */

/** @type {Workshop[]} */
export const workshops = [
  {
    id: 'python-for-scientific-computing',
    title: 'Python for Scientific Computing',
    category: 'Python',
    date: 'Apr 15, 2026',
    seats: 28,
    instructor: 'Dr. Anil Kumar',
    duration: '3 days (18 hours)',
    level: 'Beginner',
    prerequisites: [
      'Class 11/12 level mathematics',
      'Basic familiarity with programming logic',
      'Laptop with Python 3 and internet',
    ],
    topics: [
      'Python environment setup and Jupyter workflow',
      'NumPy arrays, indexing, and vectorization',
      'Scientific plotting with Matplotlib',
      'Solving data-driven numerical problems',
      'Mini project, review, and certification Q&A',
    ],
    about:
      'This workshop introduces scientific computing with Python through practical examples used in engineering and science classrooms. Students learn efficient numerical workflows and visualization methods they can immediately apply in lab courses and projects.',
  },
  {
    id: 'scilab-for-engineering-math',
    title: 'Scilab for Engineering Math',
    category: 'Scilab',
    date: 'Apr 18, 2026',
    seats: 4,
    instructor: 'Prof. Meera Iyer',
    duration: '3 days (18 hours)',
    level: 'Beginner',
    prerequisites: [
      'Basic calculus and linear algebra',
      'Familiarity with solving equations manually',
      'Laptop with Scilab installed',
    ],
    topics: [
      'Scilab interface and script fundamentals',
      'Matrices, vectors, and numerical methods',
      'Symbolic-style workflows for engineering math',
      'Applied problem sets from semester courses',
      'Performance tips and assessment walkthrough',
    ],
    about:
      'Designed for first- and second-year students, this session connects engineering mathematics with open-source computation. Participants practice matrix operations, equation solving, and automation of repetitive calculations.',
  },
  {
    id: 'r-programming-for-data-analysis',
    title: 'R Programming for Data Analysis',
    category: 'R',
    date: 'Apr 20, 2026',
    seats: 15,
    instructor: 'Dr. Neha Joshi',
    duration: '3 days (18 hours)',
    level: 'Beginner',
    prerequisites: [
      'Basic statistics (mean, variance, distributions)',
      'Spreadsheet familiarity',
      'Laptop with R and RStudio',
    ],
    topics: [
      'R basics and data frame operations',
      'Cleaning and transforming raw datasets',
      'Exploratory analysis and plotting',
      'Interpreting trends with statistical summaries',
      'Case study report and certification prep',
    ],
    about:
      'Students learn to move from raw CSV files to meaningful insights using R. The workshop balances coding fundamentals with interpretation, helping learners build confidence for internships and research tasks.',
  },
  {
    id: 'dwsim-chemical-process-simulation',
    title: 'DWSIM Chemical Process Simulation',
    category: 'DWSIM',
    date: 'Apr 22, 2026',
    seats: 10,
    instructor: 'Dr. Raghavendra Rao',
    duration: '3 days (18 hours)',
    level: 'Intermediate',
    prerequisites: [
      'Introductory chemical engineering thermodynamics',
      'Material and energy balance basics',
      'Laptop with DWSIM and internet',
    ],
    topics: [
      'Flowsheet setup and property package selection',
      'Unit operations for process simulation',
      'Convergence and recycle handling',
      'Sensitivity analysis for plant conditions',
      'Industry-inspired simulation project and Q&A',
    ],
    about:
      'This workshop focuses on realistic process simulation workflows for chemical engineering students. Learners model complete flowsheets, validate operating conditions, and interpret simulation outputs for design decisions.',
  },
  {
    id: 'arduino-embedded-systems',
    title: 'Arduino & Embedded Systems',
    category: 'Arduino',
    date: 'Apr 25, 2026',
    seats: 0,
    instructor: 'Engr. Prateek Sharma',
    duration: '3 days (18 hours)',
    level: 'Beginner',
    prerequisites: [
      'Basic C programming syntax',
      'Understanding of voltage/current fundamentals',
      'Laptop with Arduino IDE',
    ],
    topics: [
      'Arduino board architecture and setup',
      'Digital and analog input/output programming',
      'Sensor interfacing and serial communication',
      'Embedded debugging and optimization',
      'Hardware mini-project and certification discussion',
    ],
    about:
      'Participants build and debug embedded prototypes from scratch using Arduino. By the end, students can write reliable firmware, interface sensors, and implement small automation projects.',
  },
  {
    id: 'esim-circuit-simulation',
    title: 'eSim Circuit Simulation',
    category: 'eSim',
    date: 'Apr 28, 2026',
    seats: 7,
    instructor: 'Dr. Kavya Nair',
    duration: '3 days (18 hours)',
    level: 'Intermediate',
    prerequisites: [
      'Basic analog and digital electronics',
      'Circuit laws and component behavior',
      'Laptop with eSim setup',
    ],
    topics: [
      'Schematic capture and simulation workflow',
      'SPICE analysis: DC, AC, and transient',
      'Debugging unstable circuit designs',
      'Design validation against expected outputs',
      'End-to-end circuit challenge and Q&A',
    ],
    about:
      'This workshop trains students to validate circuit designs before hardware fabrication. Learners run simulations, diagnose faults, and improve reliability using structured electronic design workflows.',
  },
  {
    id: 'osdag-steel-structure-design',
    title: 'OSDAG Steel Structure Design',
    category: 'OSDAG',
    date: 'May 2, 2026',
    seats: 20,
    instructor: 'Prof. Arvind Kulkarni',
    duration: '3 days (18 hours)',
    level: 'Intermediate',
    prerequisites: [
      'Strength of materials basics',
      'Exposure to steel design concepts',
      'Laptop with OSDAG installed',
    ],
    topics: [
      'OSDAG interface and design code setup',
      'Member and connection design workflows',
      'Load combinations and safety checks',
      'Detailing outputs and design reports',
      'Structural design case study and review',
    ],
    about:
      'Civil engineering learners use OSDAG to perform code-compliant steel design checks. The session emphasizes practical report generation and interpretation of software recommendations.',
  },
  {
    id: 'openfoam-cfd-simulation',
    title: 'OpenFOAM CFD Simulation',
    category: 'OpenFOAM',
    date: 'May 5, 2026',
    seats: 3,
    instructor: 'Dr. Sandeep Patil',
    duration: '3 days (18 hours)',
    level: 'Advanced',
    prerequisites: [
      'Fluid mechanics fundamentals',
      'Basic Linux command-line usage',
      'Laptop with OpenFOAM environment',
    ],
    topics: [
      'Meshing and case directory structure',
      'Boundary conditions and solver selection',
      'Running transient and steady simulations',
      'Post-processing velocity and pressure fields',
      'CFD mini-project and validation discussion',
    ],
    about:
      'A hands-on CFD bootcamp for students who want to simulate real flow systems using open-source tools. Participants build complete cases, run solvers, and interpret engineering results with confidence.',
  },
  {
    id: 'scilab-for-control-systems',
    title: 'Scilab for Control Systems',
    category: 'Scilab',
    date: 'May 8, 2026',
    seats: 18,
    instructor: 'Prof. Nitin Deshmukh',
    duration: '3 days (18 hours)',
    level: 'Intermediate',
    prerequisites: [
      'Signals and systems basics',
      'Transfer function and feedback concepts',
      'Laptop with Scilab/Xcos tools',
    ],
    topics: [
      'Control toolbox and model setup',
      'Time-domain and frequency-domain analysis',
      'PID tuning in Xcos',
      'Stability checks and performance metrics',
      'Controller design assignment and Q&A',
    ],
    about:
      'Students explore controller design and analysis using Scilab and Xcos. The workshop links classroom theory with simulation-driven tuning and validation of practical control systems.',
  },
  {
    id: 'python-for-machine-learning',
    title: 'Python for Machine Learning',
    category: 'Python',
    date: 'May 10, 2026',
    seats: 12,
    instructor: 'Dr. Priya Menon',
    duration: '3 days (18 hours)',
    level: 'Intermediate',
    prerequisites: [
      'Python basics (functions, loops, lists)',
      'High school level probability/statistics',
      'Laptop with Python, NumPy, and scikit-learn',
    ],
    topics: [
      'ML workflow and dataset preparation',
      'Supervised learning with scikit-learn',
      'Model evaluation and error analysis',
      'Feature engineering and tuning basics',
      'Capstone notebook and certification Q&A',
    ],
    about:
      'This workshop helps students build a practical machine learning pipeline from preprocessing to evaluation. Participants implement working models and learn how to improve performance responsibly.',
  },
  {
    id: 'r-for-biostatistics',
    title: 'R for Biostatistics',
    category: 'R',
    date: 'May 14, 2026',
    seats: 22,
    instructor: 'Dr. Shalini Verma',
    duration: '3 days (18 hours)',
    level: 'Intermediate',
    prerequisites: [
      'Introductory biostatistics concepts',
      'Basic understanding of hypothesis testing',
      'Laptop with R and RStudio',
    ],
    topics: [
      'Clinical-style data handling in R',
      'Descriptive and inferential statistics',
      'Hypothesis testing workflows',
      'Visualization for biomedical reporting',
      'Biostatistics case analysis and feedback',
    ],
    about:
      'A focused program for life science and biomedical learners to perform robust statistical analysis in R. Students interpret medical-style datasets and produce reproducible analytical summaries.',
  },
  {
    id: 'dwsim-thermodynamics-lab',
    title: 'DWSIM Thermodynamics Lab',
    category: 'DWSIM',
    date: 'May 18, 2026',
    seats: 5,
    instructor: 'Dr. Vinayak Kulshreshtha',
    duration: '3 days (18 hours)',
    level: 'Advanced',
    prerequisites: [
      'Chemical thermodynamics and phase equilibrium',
      'Prior exposure to process simulation',
      'Laptop with DWSIM configured',
    ],
    topics: [
      'Thermodynamic models in DWSIM',
      'VLE/LLE calculations and interpretation',
      'Heat integration and energy analysis',
      'Scenario comparison for process optimization',
      'Lab-grade simulation project and certification',
    ],
    about:
      'This advanced lab-format workshop dives deep into thermodynamic modeling using DWSIM. Learners compare property methods, test process scenarios, and derive engineering insights from simulation data.',
  },
]

/** Total workshops in the catalog (used in “Showing X of Y” copy). */
export const WORKSHOP_TOTAL = workshops.length

/** Category chips shown in the filter bar (includes All). */
export const FILTER_CATEGORIES = [
  'All',
  'Python',
  'Scilab',
  'R',
  'DWSIM',
  'Arduino',
  'eSim',
  'OSDAG',
  'OpenFOAM',
]
