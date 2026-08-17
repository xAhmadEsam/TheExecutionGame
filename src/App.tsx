import { useMemo } from "react";
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader";
import { mockTeams } from "./mockData";
import { runShinkuRegrouping, generateNextRoundMatches } from "./shinkuEngine";

function App() {
  const processedTeams = useMemo(() => {
    return runShinkuRegrouping(mockTeams);
  }, [mockTeams]);

  const nextRoundMatches = useMemo(() => {
    // Generate the raw match sequence list from Shinku
    const rawMatches = generateNextRoundMatches(processedTeams);

    return rawMatches.map((match) => {
      if (match.id === "match-Epic-10" || match.id === "match-Legend-10") {
        return { ...match, matchIsDone: true };
      }

      return match;
    });
  }, [processedTeams]);

  return (
    <div className="min-h-screen bg-tegDarkBg text-white scroll-smooth relative">
      {/* Premium JJK Animated Intro Overlay */}
      <Loader />

      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20 space-y-16">
        {/* Shinku Engine Banner with Cursed Energy Glow Profile effect */}
        <section
          id="overview"
          className="bg-tegCardBg border border-tegSteelBlue/40 p-6 rounded-2xl flex items-center gap-6 shadow-2xl animate-cursed-flame relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-tegCrimson/5 rounded-full blur-2xl"></div>
          <div className="text-4xl">🔮</div>
          <div>
            <h2 className="text-lg font-black text-tegCrimson tracking-wider uppercase">
              Shinku Domain Configuration
            </h2>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-2xl">
              Matchups and spatial boundaries are active.
            </p>
          </div>
        </section>

        {/* Standings Grid System */}
        <section id="teams" className="scroll-mt-12">
          <h2 className="text-2xl font-black text-white tracking-widest mb-6 border-b border-tegSteelBlue/20 pb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-tegCrimson rounded-full"></span>{" "}
            SYSTEM STANDINGS
          </h2>

          <div className="overflow-x-auto bg-tegCardBg border border-tegSteelBlue/30 rounded-xl shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-tegDarkBg/80 text-gray-400 text-[10px] uppercase font-bold tracking-widest border-b border-tegSteelBlue/30">
                  <th className="p-4">Rank</th>
                  <th className="p-4">Team Designation</th>
                  <th className="p-4 text-center">Score Point Threshold</th>
                  <th className="p-4 text-center">Streak Configuration</th>
                  <th className="p-4 text-center">ARR Rule Mod</th>
                  <th className="p-4 text-right">Assigned Domain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tegSteelBlue/10 text-xs font-medium">
                {processedTeams.map((team, idx) => (
                  <tr
                    key={team.id}
                    className="hover:bg-white/[0.02] transition duration-200"
                  >
                    <td className="p-4 font-black text-gray-600">#{idx + 1}</td>
                    <td className="p-4 font-bold text-white text-sm">
                      {team.name}
                    </td>
                    <td
                      className={`p-4 text-center font-black text-sm ${team.points >= 10 ? "text-tegCrimson" : team.points < 0 ? "text-gray-500" : "text-gray-300"}`}
                    >
                      {team.points > 0 ? `+${team.points}` : team.points}
                    </td>
                    <td className="p-4 text-center text-gray-400 font-mono">
                      {team.ws >= 2
                        ? `🔥 WS:${team.ws}`
                        : team.ls >= 3
                          ? `💀 LS:${team.ls}`
                          : team.ws > 0
                            ? `WS:${team.ws}`
                            : `LS:${team.ls}`}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-black ${team.arr === "YES" ? "bg-tegCrimson text-white animate-pulse" : "bg-tegDarkBg text-gray-600"}`}
                      >
                        {team.arr}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <span
                        className={`px-2.5 py-1 rounded text-[10px] font-black tracking-wider uppercase ${
                          team.spatialDomain === "Glory"
                            ? "bg-tegCrimson/10 text-tegCrimson border border-tegCrimson/30"
                            : team.spatialDomain === "Mythic"
                              ? "bg-indigo-950 text-indigo-400 border border-indigo-500/20"
                              : team.spatialDomain === "Legend"
                                ? "bg-slate-900 text-slate-400 border border-slate-700/30"
                                : "bg-zinc-950 text-zinc-600 border border-zinc-800"
                        }`}
                      >
                        {team.spatialDomain}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Matchup Pipeline Container (Single Column Kept with Poster Accents) */}
        <section id="schedule" className="pt-12 scroll-mt-12">
          <h2 className="text-2xl font-black text-white tracking-widest mb-6 border-b border-tegSteelBlue/20 pb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-tegCrimson rounded-full"></span>{" "}
            UPCOMING EXECUTION MATCHUPS
          </h2>

          <div className="flex flex-col gap-4 max-w-xl mx-auto">
            {nextRoundMatches.map((match: any) => {
              const t1 = processedTeams.find((t) => t.id === match.team1Id);
              const t2 = processedTeams.find((t) => t.id === match.team2Id);

              return (
                <div
                  key={match.id}
                  className={`border rounded-xl p-5 relative overflow-hidden transition-all duration-300 ${
                    match.matchIsDone
                      ? "bg-tegDarkBg/40 border-tegDarkBg opacity-50 grayscale scale-98 animate-completed-strike cursor-help"
                      : "bg-tegCardBg border-tegSteelBlue/30 hover:border-tegCrimson/40 hover:shadow-[0_0_20px_rgba(214,40,40,0.15)] shadow-xl"
                  }`}
                >
                  <div
                    className={`absolute top-0 right-0 text-[9px] uppercase font-black px-3 py-0.5 rounded-bl border-l border-b ${
                      match.matchIsDone
                        ? "bg-tegDarkBg text-gray-600 border-tegSteelBlue/20"
                        : "bg-tegCrimson/10 text-tegCrimson border-tegCrimson/20"
                    }`}
                  >
                    {match.matchIsDone
                      ? "⚠️ TERMINATED"
                      : `${match.spatialDomain} Arena`}
                  </div>

                  <div className="flex justify-between items-center my-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-white truncate">
                        {t1?.name}
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono mt-0.5">
                        {t1?.points} PTS
                      </div>
                    </div>

                    <div className="px-4 text-center">
                      <span
                        className={`text-[9px] font-black px-2 py-1 rounded border ${
                          match.matchIsDone
                            ? "bg-tegDarkBg text-gray-700 border-tegSteelBlue/10"
                            : "bg-tegCrimson/10 text-tegCrimson border-tegCrimson/20"
                        }`}
                      >
                        VS
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 text-right">
                      <div className="font-bold text-sm text-white truncate">
                        {t2?.name}
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono mt-0.5">
                        {t2?.points} PTS
                      </div>
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
