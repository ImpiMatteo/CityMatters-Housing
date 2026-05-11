import type { Node } from '@/types';

export const nodes: Node[] = [
  // ─── TEMA 1 central node ───────────────────────────────────────────────────
  {
    id: 'monitoring',
    label: 'Monitoring',
    appearances: [{ themeId: '1', level: 'alto', parentNodeId: null }],
  },

  // ─── TEMA 2 central node ───────────────────────────────────────────────────
  {
    id: 'energy-class',
    label: 'Energy class',
    appearances: [{ themeId: '2', level: 'alto', parentNodeId: null }],
  },

  // ─── TEMA 3 central node ───────────────────────────────────────────────────
  {
    id: 'boundaries',
    label: 'Boundaries',
    appearances: [
      { themeId: '1', level: 'basso', parentNodeId: null },
      { themeId: '3', level: 'alto', parentNodeId: null },
    ],
  },

  // ─── NODI TRASVERSALI (compaiono in più temi) ──────────────────────────────

  {
    id: 'old-houses',
    label: 'Old Houses',
    appearances: [
      { themeId: '1', level: 'medio', parentNodeId: 'monitoring' },
      { themeId: '2', level: 'medio', parentNodeId: 'energy-class' },
    ],
  },
  {
    id: 'living-alone',
    label: 'Living alone',
    appearances: [
      { themeId: '1', level: 'medio', parentNodeId: 'neighbourhood' },
      { themeId: '2', level: 'medio', parentNodeId: 'energy-class' },
    ],
  },
  {
    id: 'neighbourhood',
    label: 'Neighbourhood',
    appearances: [
      { themeId: '1', level: 'medio', parentNodeId: 'monitoring' },
      { themeId: '3', level: 'medio', parentNodeId: 'volunteer' },
    ],
  },
  {
    id: 'safety',
    label: 'Safety',
    appearances: [
      { themeId: '1', level: 'medio', parentNodeId: 'monitoring' },
      { themeId: '3', level: 'basso', parentNodeId: 'neighbourhood' },
    ],
  },
  {
    id: 'assistance',
    label: 'Assistance',
    appearances: [
      { themeId: '1', level: 'medio', parentNodeId: 'monitoring' },
      { themeId: '3', level: 'basso', parentNodeId: 'neighbourhood' },
    ],
  },
  {
    id: 'healthcare-system-collapse',
    label: 'Healthcare System Collapse',
    appearances: [
      { themeId: '1', level: 'basso', parentNodeId: 'monitoring' },
      { themeId: '3', level: 'basso', parentNodeId: 'volunteer' },
    ],
  },
  {
    id: 'rsa',
    label: 'RSA',
    appearances: [
      { themeId: '1', level: 'basso', parentNodeId: 'monitoring' },
      { themeId: '3', level: 'basso', parentNodeId: 'volunteer' },
    ],
  },
  {
    id: 'volunteer',
    label: 'Volunteer',
    appearances: [
      { themeId: '1', level: 'basso', parentNodeId: 'monitoring' },
      { themeId: '3', level: 'medio', parentNodeId: 'caregiver' },
    ],
  },
  {
    id: 'caregiver',
    label: 'Caregiver',
    appearances: [
      { themeId: '1', level: 'basso', parentNodeId: 'monitoring' },
      { themeId: '3', level: 'medio', parentNodeId: 'new-family-models' },
    ],
  },
  {
    id: 'house-renovation',
    label: 'House renovation',
    appearances: [
      { themeId: '1', level: 'basso', parentNodeId: 'caregiver' },
      { themeId: '2', level: 'basso', parentNodeId: 'energy-class' },
      { themeId: '3', level: 'medio', parentNodeId: 'new-family-models' },
    ],
  },
  {
    id: 'connections',
    label: 'Connections',
    appearances: [
      { themeId: '1', level: 'basso', parentNodeId: 'monitoring' },
      { themeId: '3', level: 'medio', parentNodeId: 'shared-spaces' },
    ],
  },
  {
    id: 'new-people',
    label: 'New people',
    appearances: [
      { themeId: '1', level: 'medio', parentNodeId: 'connections' },
      { themeId: '3', level: 'basso', parentNodeId: 'connections' },
    ],
  },
  {
    id: 'boredom',
    label: 'Boredom',
    appearances: [
      { themeId: '1', level: 'basso', parentNodeId: 'monitoring' },
      { themeId: '3', level: 'basso', parentNodeId: 'connections' },
    ],
  },
  {
    id: 'digital-skills',
    label: 'Digital Skills',
    appearances: [
      { themeId: '1', level: 'medio', parentNodeId: 'monitoring' },
      { themeId: '3', level: 'basso', parentNodeId: 'connections' },
    ],
  },
  {
    id: 'isolation',
    label: 'Isolation',
    appearances: [
      { themeId: '1', level: 'medio', parentNodeId: 'caregiver' },
      { themeId: '3', level: 'medio', parentNodeId: 'boundaries' },
    ],
  },
  {
    id: 'depression',
    label: 'Depression',
    appearances: [
      { themeId: '1', level: 'basso', parentNodeId: 'isolation' },
      { themeId: '3', level: 'medio', parentNodeId: 'boundaries' },
    ],
  },
  {
    id: 'desire-to-live-in-your-house',
    label: 'Desire to live in your house',
    appearances: [
      { themeId: '1', level: 'medio', parentNodeId: 'isolation' },
      { themeId: '2', level: 'basso', parentNodeId: 'changing-habits' },
      { themeId: '3', level: 'medio', parentNodeId: 'depression' },
    ],
  },
  {
    id: 'downsizing',
    label: 'Downsizing',
    appearances: [
      { themeId: '2', level: 'basso', parentNodeId: 'energy-class' },
      { themeId: '3', level: 'basso', parentNodeId: 'new-family-models' },
    ],
  },
  {
    id: 'city-distribution',
    label: 'City distribution',
    appearances: [
      { themeId: '2', level: 'basso', parentNodeId: 'energy-class' },
      { themeId: '3', level: 'medio', parentNodeId: 'boundaries' },
    ],
  },
  {
    id: 'wellbeing',
    label: 'Wellbeing',
    appearances: [
      { themeId: '2', level: 'basso', parentNodeId: 'city-distribution' },
      { themeId: '3', level: 'medio', parentNodeId: 'boundaries' },
    ],
  },
  {
    id: 'house-management',
    label: 'House management',
    appearances: [
      { themeId: '2', level: 'medio', parentNodeId: 'wellbeing' },
      { themeId: '3', level: 'medio', parentNodeId: 'boundaries' },
    ],
  },
  {
    id: 'changing-habits',
    label: 'Changing habits',
    appearances: [
      { themeId: '2', level: 'medio', parentNodeId: 'energy-class' },
      { themeId: '3', level: 'medio', parentNodeId: 'boundaries' },
    ],
  },

  // ─── NODI ESCLUSIVI TEMA 1 ────────────────────────────────────────────────

  {
    id: 'problem-in-asking-for-help',
    label: 'Problem in asking for help',
    appearances: [{ themeId: '1', level: 'basso', parentNodeId: 'monitoring' }],
  },
  {
    id: 'preoccupation-of-relatives',
    label: 'Preoccupation of relatives',
    appearances: [{ themeId: '1', level: 'medio', parentNodeId: 'monitoring' }],
  },
  {
    id: 'technology',
    label: 'Technology',
    appearances: [{ themeId: '1', level: 'medio', parentNodeId: 'monitoring' }],
  },
  {
    id: 'emergencies',
    label: 'Emergencies',
    appearances: [{ themeId: '1', level: 'medio', parentNodeId: 'monitoring' }],
  },
  {
    id: 'daily-care-remind',
    label: 'Daily care/remind',
    appearances: [{ themeId: '1', level: 'basso', parentNodeId: 'monitoring' }],
  },
  {
    id: 'housekeeping',
    label: 'Housekeeping',
    appearances: [{ themeId: '1', level: 'basso', parentNodeId: 'caregiver' }],
  },
  {
    id: 'children-and-relatives-living-far-away',
    label: 'Children and relatives living far away',
    appearances: [{ themeId: '1', level: 'medio', parentNodeId: 'caregiver' }],
  },

  // ─── NODI ESCLUSIVI TEMA 2 ────────────────────────────────────────────────

  {
    id: 'new-income',
    label: 'New income',
    appearances: [{ themeId: '2', level: 'medio', parentNodeId: 'energy-class' }],
  },
  {
    id: 'low-income',
    label: 'Low income',
    appearances: [{ themeId: '2', level: 'medio', parentNodeId: 'energy-class' }],
  },
  {
    id: 'policy',
    label: 'Policy',
    appearances: [{ themeId: '2', level: 'medio', parentNodeId: 'low-income' }],
  },

  // ─── NODI ESCLUSIVI TEMA 3 ────────────────────────────────────────────────

  {
    id: 'woman-role',
    label: 'Woman role',
    appearances: [{ themeId: '3', level: 'basso', parentNodeId: 'boundaries' }],
  },
  {
    id: 'co-housing',
    label: 'Co-housing',
    appearances: [{ themeId: '3', level: 'medio', parentNodeId: 'boundaries' }],
  },
  {
    id: 'new-family-models',
    label: 'New Family Models',
    appearances: [{ themeId: '3', level: 'medio', parentNodeId: 'boundaries' }],
  },
  {
    id: 'matchmaking',
    label: 'Matchmaking',
    appearances: [{ themeId: '3', level: 'basso', parentNodeId: 'boundaries' }],
  },
  {
    id: 'limited-social-circle',
    label: 'Limited social circle',
    appearances: [{ themeId: '3', level: 'medio', parentNodeId: 'matchmaking' }],
  },
  {
    id: 'loss-of-a-dear-one',
    label: 'Loss of a dear one',
    appearances: [{ themeId: '3', level: 'medio', parentNodeId: 'boundaries' }],
  },
  {
    id: 'intergenerational-exchange',
    label: 'Intergenerational exchange',
    appearances: [{ themeId: '3', level: 'medio', parentNodeId: 'boundaries' }],
  },
  {
    id: 'shared-spaces',
    label: 'Shared spaces',
    appearances: [{ themeId: '3', level: 'basso', parentNodeId: 'boundaries' }],
  },
  {
    id: 'weightlifting',
    label: 'Weightlifting',
    appearances: [{ themeId: '3', level: 'basso', parentNodeId: 'depression' }],
  },
  {
    id: 'new-friends',
    label: 'New friends',
    appearances: [{ themeId: '3', level: 'basso', parentNodeId: 'connections' }],
  },
];
