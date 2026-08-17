import type { Team } from "./types";

// Seeded pseudo-random number generator function (MurmurHash/LCG style)
const createSeededRandom = (seed: number) => {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// Custom array shuffler powered by our points seed
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
  const sortedTeams = [...teams].sort((a, b) => b.points - a.points);
  const totalTeams = sortedTeams.length;
  const size = Math.ceil(totalTeams / 4);

  return sortedTeams.map((team, index) => {
    let domain: Team["spatialDomain"] = "Epic";
    if (index < size) domain = "Glory";
    else if (index < size * 2) domain = "Mythic";
    else if (index < size * 3) domain = "Legend";

    let arrRight: "YES" | "NO" = team.arr;
    if (team.ws >= 2 || team.ls >= 3) arrRight = "YES";

    return { ...team, spatialDomain: domain, arr: arrRight };
  });
};

// Generates next matches strictly locked to point values
export const generateNextRoundMatches = (groupedTeams: Team[]) => {
  // Generate a reliable seed based on the combined points configuration
  const pointSeed = groupedTeams.reduce(
    (sum, team) => sum + team.points + 50,
    0,
  );

  // Enforce structural loop starting from lowest domain to highest
  const domains: Team["spatialDomain"][] = [
    "Epic",
    "Legend",
    "Mythic",
    "Glory",
  ];
  const nextMatches: any[] = [];

  domains.forEach((domain) => {
    const teamsInDomain = groupedTeams.filter(
      (t) => t.spatialDomain === domain,
    );
    // Shuffle using our locked-in point seed
    const shuffledTeams = seededShuffle(teamsInDomain, pointSeed);

    for (let i = 0; i < shuffledTeams.length; i += 2) {
      if (shuffledTeams[i] && shuffledTeams[i + 1]) {
        nextMatches.push({
          id: `match-${domain}-${i}`,
          team1Id: shuffledTeams[i].id,
          team2Id: shuffledTeams[i + 1].id,
          spatialDomain: domain,
          matchIsDone: false, // Default tracking state flag
        });
      }
    }
  });

  return nextMatches;
};
