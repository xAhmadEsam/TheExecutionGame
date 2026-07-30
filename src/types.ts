export interface Player {
  id: string;
  ign: string; // In-Game Name
  role: "EXP" | "Gold" | "Mid" | "Roamer" | "Jungler" | "Substitute";
}

export interface Team {
  id: string;
  name: string;
  logoUrl?: string;
  players: Player[];
}

export interface Match {
  id: string;
  stage: "Quarterfinals" | "Semifinals" | "Grand Finals";
  team1: Team;
  team2: Team;
  team1Score?: number;
  team2Score?: number;
  status: "Scheduled" | "Live" | "Completed";
  matchTime: string;
  winnerId?: string;
}

