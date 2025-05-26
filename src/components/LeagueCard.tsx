import React from "react";
import Button from "./Button";

interface LeagueCardProps {
  league: any;
  isLoadingBadge: boolean;
  onClick: (id: string) => void;
}

const LeagueCard: React.FC<LeagueCardProps> = ({
  league,
  isLoadingBadge,
  onClick,
}) => {
  return (
    <div className="relative bg-white rounded-xl p-4 pb-16 shadow hover:shadow-lg transition border hover:border-blue-500">
      {league.strSport && (
        <p className="text-sm text-gray-500 mb-2">{league.strSport}</p>
      )}

      {league.strLeague && (
        <h2 className="text-lg font-semibold mb-1 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          {league.strLeague}
        </h2>
      )}

      {league.strLeagueAlternate && (
        <p className="text-sm text-gray-400 italic">
          ({league.strLeagueAlternate})
        </p>
      )}

      <Button
        className="mt-4 absolute bottom-2 left-2 right-2 cursor-pointer"
        type="button"
        variant="primary"
        onClick={() => onClick(league.idLeague)}
      >
        Select League
      </Button>

      {isLoadingBadge && (
        <p className="text-sm text-blue-500 mt-2">Loading badge...</p>
      )}
    </div>
  );
};

export default LeagueCard;
