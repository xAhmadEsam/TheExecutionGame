import type { Team } from './types';

export const mockTeams: Team[] = [
  // ==================== CHI FLOOR (EARTH) ====================
  {
    id: '1',
    name: 'TheEnd',
    points: 5,
    ws: 3,
    ls: 0,
    arr: 'YES',
    floor: 'Chi',
    isEliminated: false,
    players: []
  },
  {
    id: '2',
    name: 'Shaheen',
    points: 5,
    ws: 3,
    ls: 0,
    arr: 'NO',
    floor: 'Chi',
    isEliminated: false,
    players: []
  },

  // ==================== SHIN'EN FLOOR (THE ABYSS) ====================
  {
    id: '3',
    name: 'HonourCore',
    points: 20,
    ws: 2,
    ls: 0,
    arr: 'YES',
    floor: "Shin'en",
    isEliminated: false,
    players: []
  },
  {
    id: '5',
    name: 'Zero nova',
    points: 10,
    ws: 0,
    ls: 1,
    arr: 'NO',
    floor: "Shin'en",
    isEliminated: false,
    players: []
  },
  {
    id: '6',
    name: 'Goosebumps',
    points: 10,
    ws: 1,
    ls: 0,
    arr: 'NO',
    floor: "Shin'en",
    isEliminated: false,
    players: []
  },
  {
    id: '7',
    name: 'Honorable Minds',
    points: 10,
    ws: 2,
    ls: 0,
    arr: 'NO',
    floor: "Shin'en",
    isEliminated: false,
    players: []
  },
  {
    id: '8',
    name: '꧁DARK_KINGS꧂',
    points: 10,
    ws: 2,
    ls: 0,
    arr: 'YES',
    floor: "Shin'en",
    isEliminated: false,
    players: []
  },
  {
    id: '9',
    name: 'Dark system™@',
    points: 5,
    ws: 1,
    ls: 0,
    arr: 'NO',
    floor: "Shin'en",
    isEliminated: false,
    players: []
  },
  {
    id: '11',
    name: 'Sky Shapers',
    points: -10,
    ws: 1,
    ls: 0,
    arr: 'NO',
    floor: "Shin'en",
    isEliminated: false,
    players: []
  },
  {
    id: '12',
    name: 'NOVA XO',
    points: -10,
    ws: 0,
    ls: 1,
    arr: 'NO',
    floor: "Shin'en",
    isEliminated: false,
    players: []
  },
  {
    id: '13',
    name: 'Nemeses',
    points: -15,
    ws: 0,
    ls: 2,
    arr: 'NO',
    floor: "Shin'en",
    isEliminated: false,
    players: []
  },
  {
    id: '4',
    name: 'Busy Gapping',
    points: -50,
    ws: 0,
    ls: 1,
    arr: 'YES',
    floor: "Shin'en",
    isEliminated: false,
    players: []
  },
  {
    id: '14',
    name: 'Sky Strikers',
    points: -50,
    ws: 0,
    ls: 2,
    arr: 'NO',
    floor: "Shin'en",
    isEliminated: true, // Manually marked as completed elimination
    players: []
  },
  {
    id: '15',
    name: 'The Trollers',
    points: -50,
    ws: 0,
    ls: 3,
    arr: 'YES',
    floor: "Shin'en",
    isEliminated: true, // Manually marked as completed elimination
    players: []
  },
  {
    id: '10',
    name: 'Team Eagles',
    points: -50,
    ws: 0,
    ls: 2,
    arr: 'NO',
    floor: "Shin'en",
    isEliminated: false,
    players: []
  },
  {
    id: '16',
    name: 'NeoStorm',
    points: -50,
    ws: 0,
    ls: 0,
    arr: 'NO',
    floor: "Shin'en",
    isEliminated: true, // Manually marked as completed elimination
    players: []
  }
];
