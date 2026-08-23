import type { Team, Match } from './types';

const createSeededRandom = (seed: number) => {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const seededShuffle = <T>(array: T[], seedValue: number): T[] => {
  const result = [...array];
  const random = createSeededRandom(seedValue);
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const runShinkuRegrouping = (teams: Team[]): Team[] => {
  // Step 1: Base validation mapping loop
  let processed = teams.map(team => {
    let isEliminated = team.isEliminated;
    let eliminationReason = team.eliminationReason;

    if (team.points <= -50) {
      isEliminated = true;
      eliminationReason = "EXTERMINATED: Points plummeted to -50";
    }
    
    const floor = team.floor || 'Chi';
    return { ...team, floor, isEliminated, eliminationReason, spatialDomain: undefined as any };
  });

  // Step 2: Tengoku Victory Trigger condition check
  const tengokuCount = processed.filter(t => !t.isEliminated && t.floor === 'Tengoku').length;
  if (tengokuCount >= 3) {
    processed = processed.map(team => {
      if (team.floor !== 'Tengoku' && !team.isEliminated) {
        return {
          ...team,
          points: -50,
          isEliminated: true,
          eliminationReason: "TERMINATED: 3 Teams reached Tengoku. Lower planes collapsed."
        };
      }
      return team;
    });
  }

  // Step 3: Compute Spatial Ranges SEPARATELY for each floor group
  const floors: Team['floor'][] = ['Tengoku', 'Chi', "Shin'en"];
  let fullyGroupedTeams: Team[] = [];

  floors.forEach(targetFloor => {
    let floorTeams = processed.filter(t => t.floor === targetFloor);
    
    floorTeams.sort((a, b) => b.points - a.points);
    
    const totalInFloor = floorTeams.length;
    if (totalInFloor > 0) {
      if (totalInFloor <= 4) {
        floorTeams = floorTeams.map(team => ({ ...team, spatialDomain: 'Mythical Glory' }));
      } else {
        const size = Math.ceil(totalInFloor / 4);
        floorTeams = floorTeams.map((team, index) => {
          let domain: 'Mythical Glory' | 'Mythic' | 'Legend' | 'Epic' = 'Epic';
          
          if (index < size) domain = 'Mythical Glory';
          else if (index < size * 2) domain = 'Mythic';
          else if (index < size * 3) domain = 'Legend';

          return { ...team, spatialDomain: domain };
        });
      }
    }
    fullyGroupedTeams = [...fullyGroupedTeams, ...floorTeams];
  });

  const floorPriority: Record<string, number> = { 'Tengoku': 3, 'Chi': 2, "Shin'en": 1 };
  return fullyGroupedTeams.sort((a, b) => {
    const floorA = a.floor || 'Chi';
    const floorB = b.floor || 'Chi';

    if (floorPriority[floorA] !== floorPriority[floorB]) {
      return floorPriority[floorB] - floorPriority[floorA];
    }
    if (a.isEliminated !== b.isEliminated) {
      return a.isEliminated ? 1 : -1;
    }
    return b.points - a.points;
  });
};

export const generateNextRoundMatches = (groupedTeams: Team[]): Match[] => {
  const pointSeed = groupedTeams.reduce((sum, team) => sum + team.points + 120, 0);
  
  // Outer layer lists
  const floors: ('Tengoku' | 'Chi' | "Shin'en")[] = ["Tengoku", "Chi", "Shin'en"];
  // Inner layer lists
  const domains: ('Mythical Glory' | 'Mythic' | 'Legend' | 'Epic')[] = ["Epic", "Legend", "Mythic", "Mythical Glory"];
  
  const nextMatches: Match[] = [];

  floors.forEach(floor => {
    domains.forEach(domain => {
      // CRITICAL FIX: Match teams strictly checking BOTH the same Floor and the same Spatial Domain Range!
      const activeTeamsInPool = groupedTeams.filter(t => {
        const currentTeamFloor = t.floor || 'Chi';
        const currentTeamDomain = t.spatialDomain || 'Mythical Glory';
        return !t.isEliminated && currentTeamFloor === floor && currentTeamDomain === domain;
      });

      const shuffledTeams = seededShuffle(activeTeamsInPool, pointSeed);
      
      for (let i = 0; i < shuffledTeams.length; i += 2) {
        if (shuffledTeams[i] && shuffledTeams[i + 1]) {
          nextMatches.push({
            id: `match-${floor}-${domain}-${i}`,
            team1Id: shuffledTeams[i].id,
            team2Id: shuffledTeams[i + 1].id,
            floor: floor,
            spatialDomain: domain,
            matchIsDone: false,
            isAutoWin: false
          });
        } else if (shuffledTeams[i] && !shuffledTeams[i + 1]) {
          nextMatches.push({
            id: `autowin-${floor}-${domain}-${i}`,
            team1Id: shuffledTeams[i].id,
            team2Id: 'AUTOWIN_SYSTEM',
            floor: floor,
            spatialDomain: domain,
            matchIsDone: true,
            isAutoWin: true
          });
        }
      }
    });
  });

  return nextMatches;
};
