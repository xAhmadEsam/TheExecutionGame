import React from "react";
import type { Match } from "../types";

interface MatchCardProps {
  match: Match;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  return (
    <div className="bg-cardBg border border-gray-800 rounded-lg p-4 shadow-lg hover:border-gold transition">
      <div className="flex justify-between text-xs text-gray-400 mb-3">
        <span>{match.stage}</span>
        <span
          className={`px-2 py-0.5 rounded ${
            match.status === "Live"
              ? "bg-red-600 text-white animate-pulse"
              : "bg-gray-700"
          }`}
        >
          {match.status}
        </span>
      </div>

      <div className="flex justify-between items-center my-2">
        <span className="font-semibold text-lg">{match.team1.name}</span>
        <span className="text-xl font-bold text-gold">
          {match.team1Score ?? 0}
        </span>
      </div>

      <div className="text-center text-xs text-gray-500 my-1">VS</div>

      <div className="flex justify-between items-center my-2">
        <span className="font-semibold text-lg">{match.team2.name}</span>
        <span className="text-xl font-bold text-gold">
          {match.team2Score ?? 0}
        </span>
      </div>

      <div className="mt-4 pt-2 border-t border-gray-800 text-xs text-center text-gray-400">
        {match.matchTime}
      </div>
    </div>
  );
};
