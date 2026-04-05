/**
 * Canonical FOSSEE workshop catalog for listing, filters, and detail routes.
 * @typedef {{ id: string, title: string, category: string, date: string, seats: number }} Workshop
 */

/** @type {Workshop[]} */
export const workshops = [
  {
    id: 'python-for-scientific-computing',
    title: 'Python for Scientific Computing',
    category: 'Python',
    date: 'Apr 15, 2026',
    seats: 28,
  },
  {
    id: 'scilab-for-engineering-math',
    title: 'Scilab for Engineering Math',
    category: 'Scilab',
    date: 'Apr 18, 2026',
    seats: 4,
  },
  {
    id: 'r-programming-for-data-analysis',
    title: 'R Programming for Data Analysis',
    category: 'R',
    date: 'Apr 20, 2026',
    seats: 15,
  },
  {
    id: 'dwsim-chemical-process-simulation',
    title: 'DWSIM Chemical Process Simulation',
    category: 'DWSIM',
    date: 'Apr 22, 2026',
    seats: 10,
  },
  {
    id: 'arduino-embedded-systems',
    title: 'Arduino & Embedded Systems',
    category: 'Arduino',
    date: 'Apr 25, 2026',
    seats: 0,
  },
  {
    id: 'esim-circuit-simulation',
    title: 'eSim Circuit Simulation',
    category: 'eSim',
    date: 'Apr 28, 2026',
    seats: 7,
  },
  {
    id: 'osdag-steel-structure-design',
    title: 'OSDAG Steel Structure Design',
    category: 'OSDAG',
    date: 'May 2, 2026',
    seats: 20,
  },
  {
    id: 'openfoam-cfd-simulation',
    title: 'OpenFOAM CFD Simulation',
    category: 'OpenFOAM',
    date: 'May 5, 2026',
    seats: 3,
  },
  {
    id: 'scilab-for-control-systems',
    title: 'Scilab for Control Systems',
    category: 'Scilab',
    date: 'May 8, 2026',
    seats: 18,
  },
  {
    id: 'python-for-machine-learning',
    title: 'Python for Machine Learning',
    category: 'Python',
    date: 'May 10, 2026',
    seats: 12,
  },
  {
    id: 'r-for-biostatistics',
    title: 'R for Biostatistics',
    category: 'R',
    date: 'May 14, 2026',
    seats: 22,
  },
  {
    id: 'dwsim-thermodynamics-lab',
    title: 'DWSIM Thermodynamics Lab',
    category: 'DWSIM',
    date: 'May 18, 2026',
    seats: 5,
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
