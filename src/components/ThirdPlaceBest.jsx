
const ThirdPlaceBest = ({ allThirdPlaceTeams }) => {
  // Sort and slice to get the best four third-placed teams
  const bestFourThirds = allThirdPlaceTeams
    .sort((a, b) => {
      if (b.points === a.points) {
        if (b.goalDifference === a.goalDifference) {
          return b.goalsScored - a.goalsScored;
        }
        return b.goalDifference - a.goalDifference;
      }
      return b.points - a.points;
    })
    .slice(0, 6);
  // Take's the top 4 third-placed teams 
  // others to be marked in the css so not-qualified will be obvious

  return (
    <div className="group-stage-standings best-third-placed">
      <h4>Best Four Third-Placed Teams</h4>
      <div className="standings-header">
        <div>Team</div>
        <div>Pts</div>
        <div>W</div>
        <div>D</div>
        <div>L</div>
        <div>Gdf</div>
      </div>
      {bestFourThirds.map((team, index) => (
        <div key={index} className="standings-row">
          <div>{team.team}</div>
          <div>{team.points}</div>
          <div>{team.wins}</div>
          <div>{team.draws}</div>
          <div>{team.losses}</div>
          <div>{team.goalDifference}</div>
        </div>
      ))}
    </div>
  );
};

export default ThirdPlaceBest;