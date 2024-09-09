const GroupStandings = ({ standings, groupName }) => {
  return (
    <div className="group-stage-standings">
      <h4>Group {groupName}</h4>
      <div className="standings-header">
        <div>Team</div>
        <div>Pts</div>
        <div>W</div>
        <div>D</div>
        <div>L</div>
        <div>Gdf</div>
      </div>
      {standings.map((team, index) => (
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

export default GroupStandings;