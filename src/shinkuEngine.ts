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
  const processed = teams.map(team => {
    let isEliminated = team.isEliminated;
    let eliminationReason = team.eliminationReason;

    // Direct check for the -50 points automatic fallback rule
    if (team.points <= -50) {
      isEliminated = true;
      eliminationReason = "EXTERMINATED: Points plummeted to -50";
    }
    
    const floor = team.floor || 'Chi';
    return { ...team, floor, isEliminated, eliminationReason };
  });

  // Assign a mathematical priority number to each floor layer to force separation
  const floorPriority: Record<string, number> = {
    'Tengoku': 3,
    'Chi': 2,
    "Shin'en": 1
  };

  // Sort teams primarily by their floor tier value, then by active status, then by highest points
  return processed.sort((a, b) => {
    const floorA = a.floor || 'Chi';
    const floorB = b.floor || 'Chi';

    // 1. Separate floors completely (Highest priority number stays at the top)
    if (floorPriority[floorA] !== floorPriority[floorB]) {
      return floorPriority[floorB] - floorPriority[floorA];
    }
    
    // 2. If they are on the same floor, push eliminated teams to the bottom of that floor
    if (a.isEliminated !== b.isEliminated) {
      return a.isEliminated ? 1 : -1;
    }
    
    // 3. If they are on the same floor and both active, sort by highest points descending
    return b.points - a.points;
  });
};

export const generateNextRoundMatches = (groupedTeams: Team[]): Match[] => {
  const pointSeed = groupedTeams.reduce((sum, team) => sum + team.points + 120, 0);
  
  // Strict execution tracking order sequence layout
  const floors: ('Tengoku' | 'Chi' | "Shin'en")[] = ["Tengoku", "Chi", "Shin'en"];
  const nextMatches: Match[] = [];

  floors.forEach(floor => {
    // FIX: Explicitly check for string matches and fallbacks to pass strict type filters
    const activeTeamsInFloor = groupedTeams.filter(t => {
      const currentTeamFloor = t.floor || 'Chi';
      return !t.isEliminated && currentTeamFloor === floor;
    });

    const shuffledTeams = seededShuffle(activeTeamsInFloor, pointSeed);
    
    for (let i = 0; i < shuffledTeams.length; i += 2) {
      if (shuffledTeams[i] && shuffledTeams[i + 1]) {
        nextMatches.push({
          id: `match-${floor}-${i}`,
          team1Id: shuffledTeams[i].id,
          team2Id: shuffledTeams[i + 1].id,
          floor: floor,
          // Fallback domain default parameter mapping
          spatialDomain: shuffledTeams[i].spatialDomain || 'Mythical Glory',
          matchIsDone: false
        });
      }
    }
  });

  return nextMatches;
};
