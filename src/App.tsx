import { Navbar } from './components/Navbar';
import { MatchCard } from './components/MatchCard';
import { mockMatches, teamsData } from './TeamsData';

function App() {
  return (
    <div className="min-h-screen bg-darkBg text-white scroll-smooth">
      {/* Sticky Top Navigation */}
      <Navbar />
      
      {/* Section 1: Overview (Hero Banner) */}
      <section id="overview" className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-16">
        <h1 className="text-5xl md:text-8xl font-extrabold text-gold mb-6 tracking-tighter drop-shadow-lg">
          THE ULTIMATE <br className="hidden md:block"/> SHOWDOWN
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
          Welcome to the premier MLBB Championship Tournament. Follow live action scores, track participating roster lineups, and see who climbs to victory.
        </p>
        <a 
          href="#schedule"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#schedule')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-gold text-darkBg px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:scale-105 transition transform duration-200"
        >
          View Live Matches
        </a>
      </section>

      {/* Main content wrapper with clean vertical spacing gaps */}
      <div className="max-w-6xl mx-auto px-6 space-y-32 pb-32">
        
        {/* Section 2: Teams */}
        <section id="teams" className="pt-24 scroll-mt-12">
          <h2 className="text-3xl font-bold text-gold mb-2 border-b border-gray-800 pb-4">COMPETING TEAMS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {teamsData.map(team => (
              <div key={team.id} className="bg-cardBg p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition">
                <h3 className="text-xl font-bold text-white mb-2">{team.name}</h3>
                <p className="text-sm text-gray-400">Roster Capacity: {team.players.length} Active Profiles</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Schedule */}
        <section id="schedule" className="pt-24 scroll-mt-12">
          <h2 className="text-3xl font-bold text-gold mb-2 border-b border-gray-800 pb-4">TOURNAMENT SCHEDULE</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {mockMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>

        {/* Section 4: Brackets */}
        <section id="brackets" className="pt-24 scroll-mt-12">
          <h2 className="text-3xl font-bold text-gold mb-2 border-b border-gray-800 pb-4">BRACKETS STAGE</h2>
          <div className="mt-6 p-12 bg-cardBg rounded-xl border border-gray-800 text-center text-gray-500 font-medium">
            Visual brackets tree structure map is under active manual construction.
          </div>
        </section>

      </div>
    </div>
  );
}

export default App;
