import { useNavigate } from 'react-router-dom';

const GroupMatches = ({group, matches, teams}) => {
  const navigate = useNavigate();
 
  if (!matches || !teams) {
    return <div>Check your code fetching!!!</div>; 
  }
  const handleIndividualGameClick = (match) => {
    navigate(`/games/${match.ID}/details`);
  };

  return (
    <div className="group-stage-matches-container">
      <h4>Scores & Fixtures</h4>
      <div className="group-stage-matches">

        {matches.map(match => {
          const teamA = teams.find(team => team.ID === match.ATeamID);
          const teamB = teams.find(team => team.ID === match.BTeamID);
          return (
            <div key={match.ID} className="match" onClick={() => handleIndividualGameClick(match)}>
              <p>{teamA ? teamA.Name : 'Unknown'} vs {teamB ? teamB.Name : 'Unknown'}</p>

              <p>Date: {match.Date}</p>
              <p>Score: {match.Score}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupMatches;
