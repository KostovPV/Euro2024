import MatchItem from './MatchItem';  // Import the new MatchItem component

const GroupMatches = ({ group, matches, teams }) => {
  if (!matches || !teams) {
    return <div>Check if your code is fetching the correct data!!!</div>; 
  }

  return (
    <div className="group-stage-matches-container">
      <h4>Group {group}: Scores & Fixtures</h4>
      <div className="group-stage-matches">
        {matches.map(match => {
          const teamA = teams.find(team => team.ID === match.ATeamID);
          const teamB = teams.find(team => team.ID === match.BTeamID);
          return (
            <MatchItem 
              key={match.ID} 
              match={match} 
              teamA={teamA} 
              teamB={teamB} 
            />
          );
        })}
      </div>
    </div>
  );
};

export default GroupMatches;

