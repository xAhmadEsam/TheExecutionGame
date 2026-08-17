import { useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { mockTeams } from './mockData';
import { runShinkuRegrouping, generateNextRoundMatches } from './shinkuEngine';

function App() {
  // 1. Shinku automatically runs when the file loads or changes
  const processedTeams = useMemo(() => {
    return runShinkuRegrouping(mockTeams);
  }, [mockTeams]);

  // 2. Pairings lock in securely and won't change on browser refresh
  const nextRoundMatches = useMemo(() => {
     const matches = generateNextRoundMatches(processedTeams);

    // ==================== MANUAL MATCH UPDATE WORKSPACE ====================
    // Copy/paste or add match IDs here to set them to true when completed!
    
    matches.forEach(match => {
      // Example 1: Set a match to complete using its unique ID string
      if (match.id === 'match-Epic-1') {
        match.matchIsDone = true;
      }

      // Example 2: Set another match to complete
      if (match.id === 'match-Legend-1') {
        match.matchIsDone = true;
      }
    });
    // =======================================================================

    return matches;
  }, [processedTeams]);

  return (
    <div className="min-h-screen bg-darkBg text-white scroll-smooth">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20 space-y-16">
        
        {/* Shinku Engine Status Alert */}
        <section id="overview" className="bg-cardBg border border-purple-900/40 p-6 rounded-2xl flex items-center gap-6 shadow-xl">
          <div className="text-4xl animate-pulse">🔮</div>
          <div>
            <h2 className="text-xl font-bold text-purple-400">Shinku Domain Engine Active</h2>
            <p className="text-sm text-gray-400 mt-1">
              Data is fully synchronized. Matchups and spatial pools are securely locked in system cache memory. Pairings only regenerate when team points are altered.
            </p>
          </div>
        </section>

        {/* Live Leaderboard Standings (Full Wide Table Restored) */}
        <section id="teams" className="scroll-mt-12">
          <h2 className="text-3xl font-bold text-gold mb-6 border-b border-gray-800 pb-4">
            LIVE LEADERBOARD STANDINGS
          </h2>
          
          <div className="overflow-x-auto bg-cardBg border border-gray-800 rounded-xl shadow-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-900 text-gray-400 text-xs uppercase tracking-wider border-b border-gray-800">
                  <th className="p-4">Rank</th>
                  <th className="p-4">Team Name</th>
                  <th className="p-4 text-center">Points</th>
                  <th className="p-4 text-center">Streak</th>
                  <th className="p-4 text-center">ARR Rule</th>
                  <th className="p-4 text-right">Shinku Domain Pool</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-sm">
                {processedTeams.map((team, idx) => (
                  <tr key={team.id} className="hover:bg-gray-800/20 transition">
                    <td className="p-4 font-bold text-gray-600">#{idx + 1}</td>
                    <td className="p-4 font-semibold text-white">{team.name}</td>
                    <td className={`p-4 text-center font-bold ${team.points >= 10 ? 'text-green-400' : team.points < 0 ? 'text-red-400' : 'text-gray-300'}`}>
                      {team.points > 0 ? `+${team.points}` : team.points}
                    </td>
                    <td className="p-4 text-center text-xs text-gray-400">
                      {team.ws >= 2 ? `🔥 ${team.ws} Win Streak` : team.ls >= 3 ? `💀 ${team.ls} Loss Streak` : team.ws > 0 ? `👍 ${team.ws} Win` : `👎 ${team.ls} Loss`}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${team.arr === 'YES' ? 'bg-gold text-darkBg animate-pulse' : 'bg-gray-800 text-gray-500'}`}>
                        {team.arr}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        team.spatialDomain === 'Mythical Glory' ? 'bg-purple-950 text-purple-300 border border-purple-500/30' :
                        team.spatialDomain === 'Mythic' ? 'bg-blue-950 text-blue-300 border border-blue-500/20' :
                        team.spatialDomain === 'Legend' ? 'bg-yellow-950 text-yellow-500 border border-yellow-500/20' :
                        'bg-red-950 text-red-400 border border-red-500/20'
                      }`}>
                        {team.spatialDomain}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Upcoming Matchup Pipeline (Single Column Layout Kept, Centered on Wide Screen) */}
        <section id="schedule" className="pt-12 scroll-mt-12">
          <h2 className="text-3xl font-bold text-gold mb-6 border-b border-gray-800 pb-4">
            UPCOMING MATCHUP PIPELINE
          </h2>
          
          {/* Centered single column container wrapper max-w-xl */}
          <div className="flex flex-col gap-4 max-w-xl mx-auto">
            {nextRoundMatches.map((match: any) => {
              const t1 = processedTeams.find(t => t.id === match.team1Id);
              const t2 = processedTeams.find(t => t.id === match.team2Id);
              
              return (
                <div 
                  key={match.id} 
                  className={`border rounded-xl p-5 relative overflow-hidden transition duration-300 ${
                    match.matchIsDone 
                      ? 'bg-gray-950/40 border-gray-950 opacity-40 grayscale line-through' 
                      : 'bg-cardBg border-gray-800 hover:border-purple-500/40 shadow-md'
                  }`}
                >
                  {/* Status Banner Ribbon overlay element */}
                  <div className={`absolute top-0 right-0 text-[9px] uppercase font-black px-3 py-0.5 rounded-bl border-l border-b ${
                    match.matchIsDone 
                      ? 'bg-gray-800 text-gray-400 border-gray-700' 
                      : 'bg-purple-900/40 text-purple-300 border-purple-500/20'
                  }`}>
                    {match.matchIsDone ? '🔴 CONCLUDED' : `${match.spatialDomain} Pool`}
                  </div>

                  {/* Team vs Layout Wrapper */}
                  <div className="flex justify-between items-center my-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-white truncate">{t1?.name}</div>
                      <div className="text-[10px] text-gray-500 font-medium">Score: {t1?.points} pts</div>
                    </div>
                    
                    <div className="px-4 text-center">
                      <span className={`text-[10px] font-black px-2 py-1 rounded border ${
                        match.matchIsDone ? 'bg-gray-900 text-gray-600 border-gray-800' : 'bg-gold/10 text-gold border-gold/20'
                      }`}>VS</span>
                    </div>

                    <div className="flex-1 min-w-0 text-right">
                      <div className="text-[10px] text-purple-400 font-mono mb-1">ID: {match.id}</div>
                      <div className="font-bold text-sm text-white truncate">{t2?.name}</div>
                      <div className="text-[10px] text-gray-500 font-medium">Score: {t2?.points} pts</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
}

export default App;
