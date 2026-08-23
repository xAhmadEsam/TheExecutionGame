import React, { useMemo } from "react";
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader";
import { mockTeams } from "./mockData";
import { runShinkuRegrouping, generateNextRoundMatches } from "./shinkuEngine";

function App() {
  const processedTeams = useMemo(() => {
    return runShinkuRegrouping(mockTeams);
  }, [mockTeams]);

  const nextRoundMatches = useMemo(() => {
    const rawMatches = generateNextRoundMatches(processedTeams);

    return rawMatches.map((match) => {
      // ==================== MANUAL MATCH UPDATE WORKSPACE ====================
      // Clear or add active match target IDs here to set them to finished!
      // Example: if (match.id === 'some-id') return { ...match, matchIsDone: true };
      // =======================================================================
      return match;
    });
  }, [processedTeams]);

  const stats = useMemo(() => {
    const active = processedTeams.filter((t) => !t.isEliminated);
    return {
      totalActive: active.length,
      shinenCount: active.filter((t) => t.floor === "Shin'en").length,
      chiCount: active.filter((t) => t.floor === "Chi").length,
      tengokuCount: active.filter((t) => t.floor === "Tengoku").length,
    };
  }, [processedTeams]);

  return (
    <div className="min-h-screen bg-tegDarkBg text-white scroll-smooth relative bg-domain-curtain">
      <Loader />
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20 space-y-12">
        {/* Heaven Threshold Card Banner */}
        <section
          id="overview"
          className="bg-tegCardBg border border-tegSteelBlue/40 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl animate-cursed-flame relative overflow-hidden"
        >
          <div className="flex items-center gap-5">
            <div className="text-4xl p-3 bg-tegDarkBg rounded-xl border border-tegSteelBlue/20 shadow-inner">
              🔮
            </div>
            <div>
              <h2 className="text-xl font-black text-tegCrimson tracking-wider uppercase animate-divergent-text">
                Shinku Floor & Spatial Ranges Active
              </h2>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-xl">
                Teams are separated by floors, and then sub-grouped into
                **Spatial Ranges** internally within each floor context. Once 3
                teams enter Tengoku, all lower squads are terminated to -50
                points.
              </p>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap justify-center bg-tegDarkBg/60 p-3 rounded-xl border border-tegSteelBlue/10">
            <div className="text-center px-3 py-1 border-r border-tegSteelBlue/20">
              <div className="text-[10px] text-gray-500 uppercase font-black">
                Active
              </div>
              <div className="text-sm font-black text-white">
                {stats.totalActive}
              </div>
            </div>
            <div className="text-center px-3 py-1 border-r border-tegSteelBlue/20">
              <div className="text-[10px] text-amber-400 uppercase font-black">
                Tengoku
              </div>
              <div className="text-sm font-black text-amber-400">
                {stats.tengokuCount}/3
              </div>
            </div>
            <div className="text-center px-3 py-1 border-r border-tegSteelBlue/20">
              <div className="text-[10px] text-blue-400 uppercase font-black">
                Chi
              </div>
              <div className="text-sm font-black text-blue-400">
                {stats.chiCount}
              </div>
            </div>
            <div className="text-center px-3 py-1">
              <div className="text-[10px] text-tegCrimson uppercase font-black">
                Shin'en
              </div>
              <div className="text-sm font-black text-tegCrimson">
                {stats.shinenCount}
              </div>
            </div>
          </div>
        </section>

        {/* Standings Table with Zone dividers */}
        <section id="teams" className="scroll-mt-12">
          <h2 className="text-2xl font-black text-white tracking-widest mb-6 border-b border-tegSteelBlue/20 pb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-tegCrimson rounded-full"></span>{" "}
            CHAMPIONSHIP STANDINGS matrix
          </h2>

          <div className="overflow-x-auto bg-tegCardBg border border-tegSteelBlue/30 rounded-xl shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-tegDarkBg/80 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-tegSteelBlue/30">
                  <th className="p-4">State</th>
                  <th className="p-4">Team Designation</th>
                  <th className="p-4 text-center">Points</th>
                  <th className="p-4 text-center">Streak Configuration</th>
                  <th className="p-4 text-center">
                    Spatial Range (Floor Inner)
                  </th>
                  <th className="p-4 text-right">Floor Layer</th>
                </tr>
              </thead>
              <tbody className="text-xs font-medium">
                {processedTeams.map((team, idx) => {
                  const isDead =
                    team.isEliminated === true || team.points <= -50;
                  const isFirstOfFloor =
                    idx === 0 || processedTeams[idx - 1].floor !== team.floor;

                  return (
                    <React.Fragment key={team.id}>
                      {isFirstOfFloor && (
                        <tr className="bg-tegDarkBg border-y border-tegSteelBlue/20">
                          <td
                            colSpan={6}
                            className="p-3 text-[10px] font-black tracking-widest text-left uppercase"
                          >
                            {team.floor === "Tengoku" && (
                              <span className="text-amber-400">
                                ✨ TENGOKU ZONE (HEAVEN)
                              </span>
                            )}
                            {team.floor === "Chi" && (
                              <span className="text-blue-400">
                                🔷 CHI ZONE (EARTH)
                              </span>
                            )}
                            {team.floor === "Shin'en" && (
                              <span className="text-tegCrimson">
                                ⚠️ SHIN'EN ZONE (THE ABYSS)
                              </span>
                            )}
                          </td>
                        </tr>
                      )}

                      <tr
                        className={`transition duration-200 border-b border-tegSteelBlue/5 ${isDead ? "bg-red-950/10 opacity-30 grayscale line-through" : "hover:bg-white/[0.02] text-white"}`}
                      >
                        <td className="p-4 font-black">
                          {isDead ? (
                            <span className="text-red-500 font-black text-[9px] bg-red-950/40 border border-red-900/40 px-2 py-0.5 rounded">
                              ELIMINATED
                            </span>
                          ) : (
                            <span className="text-gray-600">#{idx + 1}</span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="font-bold tracking-wide">
                            {team.name}
                          </div>
                          {isDead && (
                            <div className="text-[10px] text-red-400 font-mono tracking-tight mt-0.5 block">
                              {team.eliminationReason}
                            </div>
                          )}
                        </td>
                        <td
                          className={`p-4 text-center font-black text-sm ${isDead ? "text-gray-600" : team.points >= 15 ? "text-green-400" : team.points < 0 ? "text-red-400" : "text-gray-300"}`}
                        >
                          {team.points > 0 ? `+${team.points}` : team.points}
                        </td>
                        <td className="p-4 text-center text-gray-400 font-mono">
                          {team.ws >= 2
                            ? `🔥 WS:${team.ws}`
                            : team.ls >= 3
                              ? `💀 LS:${team.ls}`
                              : `WS:${team.ws} / LS:${team.ls}`}
                        </td>
                        <td className="p-4 text-center">
                          <span
                            className={`px-2 py-1 rounded text-[10px] font-bold ${
                              isDead
                                ? "bg-transparent text-gray-600"
                                : team.spatialDomain === "Mythical Glory"
                                  ? "text-purple-400 font-black"
                                  : team.spatialDomain === "Mythic"
                                    ? "text-blue-400"
                                    : team.spatialDomain === "Legend"
                                      ? "text-yellow-500"
                                      : "text-zinc-400"
                            }`}
                          >
                            {isDead ? "None" : team.spatialDomain}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <span
                            className={`px-2.5 py-1 rounded text-[10px] font-black uppercase ${
                              isDead
                                ? "bg-gray-900 text-gray-600 border border-gray-800"
                                : team.floor === "Tengoku"
                                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                                  : team.floor === "Chi"
                                    ? "bg-blue-950 text-blue-400 border border-blue-500/20"
                                    : "bg-red-950 text-red-400 border border-red-500/30"
                            }`}
                          >
                            {isDead ? "None" : team.floor}
                          </span>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Clean Match Pipeline Displays */}
                {/* Clean Match Pipeline Displays */}
        <section id="schedule" className="pt-8 scroll-mt-12">
          <h2 className="text-2xl font-black text-white tracking-widest mb-6 border-b border-tegSteelBlue/20 pb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-tegCrimson rounded-full"></span> UPCOMING EXECUTION MATCHUPS
          </h2>
          
          <div className="flex flex-col gap-4 max-w-xl mx-auto">
            {nextRoundMatches.length === 0 ? (
              <div className="p-12 bg-tegCardBg text-center text-gray-500 font-mono text-xs rounded-xl border border-tegSteelBlue/20">
                🛑 NO COMPATIBLE INTRA-FLOOR MATCHES GENERATED YET.
              </div>
            ) : (
              nextRoundMatches.map((match: any) => {
                const t1 = processedTeams.find(t => t.id === match.team1Id);
                const t2 = processedTeams.find(t => t.id === match.team2Id);
                
                if (match.isAutoWin) {
                  return (
                    <div key={match.id} className="bg-gradient-to-r from-teal-950/40 to-tegCardBg border border-teal-500/30 rounded-xl p-5 relative overflow-hidden shadow-xl animate-pulse">
                      <div className="absolute top-0 right-0 text-[9px] uppercase font-black px-3 py-0.5 rounded-bl bg-teal-500/20 text-teal-300 border-l border-b border-teal-500/20">
                        🎁 {match.floor} AUTO WIN
                      </div>
                      <div className="flex justify-between items-center my-2">
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm text-teal-400 truncate tracking-wide">{t1?.name}</div>
                          <div className="text-[10px] text-gray-500 font-mono mt-0.5">{t1?.points} POINTS</div>
                        </div>
                        <div className="px-5 text-center">
                          <span className="text-[9px] font-black px-2 py-1 rounded bg-teal-950 text-teal-400 border border-teal-500/20">⚡</span>
                        </div>
                        <div className="flex-1 min-w-0 text-right">
                          <div className="font-bold text-xs text-gray-400 uppercase tracking-widest">BYE / ACCORD</div>
                          <div className="text-[10px] text-teal-400/70 font-mono mt-0.5">+10 PTS GRANTED</div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={match.id} className={`border rounded-xl p-5 relative overflow-hidden transition-all duration-300 ${match.matchIsDone ? 'bg-tegDarkBg/40 border-tegDarkBg opacity-30 line-through scale-98 animate-completed-strike' : 'bg-tegCardBg border-tegSteelBlue/30 hover:border-tegCrimson/40 hover:shadow-[0_0_25px_rgba(214,40,40,0.15)] shadow-xl'}`}>
                    <div className={`absolute top-0 right-0 text-[9px] uppercase font-black px-3 py-0.5 rounded-bl border-l border-b ${
                      match.matchIsDone ? 'bg-tegDarkBg text-gray-600 border-tegSteelBlue/20' : 'bg-tegCrimson/10 text-tegCrimson border-tegCrimson/20'
                    }`}>
                      {match.matchIsDone ? '🔴 CONCLUDED' : `⚡ ${match.floor} (${match.spatialDomain})`}
                    </div>

                    <div className="flex justify-between items-center my-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-white truncate tracking-wide">{t1?.name}</div>
                        <div className="text-[10px] text-gray-500 font-mono mt-0.5">{t1?.points} POINTS</div>
                      </div>
                      
                      <div className="px-5 text-center">
                        <span className={`text-[9px] font-black px-2 py-1 rounded border ${match.matchIsDone ? 'bg-tegDarkBg text-gray-700 border-tegSteelBlue/10' : 'bg-tegCrimson/10 text-tegCrimson border-tegCrimson/20'}`}>VS</span>
                      </div>

                      <div className="flex-1 min-w-0 text-right">
                        <div className="font-bold text-sm text-white truncate tracking-wide">{t2?.name}</div>
                        <div className="text-[10px] text-gray-500 font-mono mt-0.5">{t2?.points} POINTS</div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>


      </main>
    </div>
  );
}

export default App;
