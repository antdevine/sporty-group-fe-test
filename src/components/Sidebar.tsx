import React from 'react';

interface SidebarProps {
  selectedBadge: string | null;
  selectedLeagueId: string | null;
  allLeagues: any[];
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedBadge,
  selectedLeagueId,
  allLeagues,
}) => {
  const selectedLeague = allLeagues.find(
    (league) => league.idLeague === selectedLeagueId
  );

  return (
    <aside className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-2 md:p-4 shadow-inner z-50 md:static md:w-auto md:h-screen md:border-t-0 md:border-l md:sticky md:top-0 md:p-6 shadow-md border-t">

  <h2 className="text-xl font-semibold text-gray-700 mb-2 md:mb-4">Selected League</h2>

  {selectedBadge ? (
    <>
      <img
        src={selectedBadge}
        alt="Season Badge"
        className="h-24 mx-auto md:mb-4 transition-transform duration-300 hover:scale-105"
      />
      <p className="text-center text-gray-700 font-medium hidden md:block">
        {allLeagues.find((l) => l.idLeague === selectedLeagueId)?.strLeague || ''}
      </p>
    </>
  ) : (
    <div className="border-2 border-dashed border-gray-300 rounded-md h-28 flex items-center justify-center md:mb-4 p-3">
      <p className="text-gray-400 text-sm text-center">Click a league to view badge</p>
    </div>
  )}
</aside>

  );
};

export default Sidebar;
