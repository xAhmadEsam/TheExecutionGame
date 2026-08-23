export interface Player {
  id: string;
  ign: string;
  role: 'EXP' | 'Gold' | 'Mid' | 'Roamer' | 'Jungler' | 'Substitute';
}

export interface Team {
  id: string;
  name: string;
  logoUrl?: string;
  players: Player[];
  points: number;
  ws: number; // Win streak
  ls: number; // Loss streak
  arr: 'YES' | 'NO'; // Right to add a rule
  spatialDomain?: 'Mythical Glory' | 'Mythic' | 'Legend' | 'Epic';
  floor?: 'Tengoku' | 'Chi' | "Shin'en";
  isEliminated: boolean;
  eliminationReason?: string;
}

export interface Match {
  id: string;
  team1Id: string;
  team2Id: string;
  floor: 'Tengoku' | 'Chi' | "Shin'en"; // Add or verify this line
  spatialDomain: 'Mythical Glory' | 'Mythic' | 'Legend' | 'Epic';
  matchIsDone: boolean; 
  isAutoWin?: boolean;
}
