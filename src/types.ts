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
  spatialDomain?: 'Glory' | 'Mythic' | 'Legend' | 'Epic'; // Shinku's Domains
}

export interface Match {
  id: string;
  isRevenge: boolean; 
  team1Id: string;
  team2Id: string;
  team1Score?: number;
  team2Score?: number;
  status: 'Scheduled' | 'Live' | 'Completed';
  matchIsDone: boolean;
  winnerId?: string;
}
