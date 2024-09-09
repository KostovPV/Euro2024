;import { useNavigate } from 'react-router-dom';

const MatchItem = ({ match, teamA, teamB }) => {
  const navigate = useNavigate();

  const handleIndividualGameClick = () => {
    navigate(`/games/${match.ID}/details`);
  };

  return (
    <div className="match" onClick={handleIndividualGameClick}>
      <p>{teamA ? teamA.Name : 'Unknown'} vs {teamB ? teamB.Name : 'Unknown'}</p>
      <p>Date: {match.Date}</p>
      <p>Score: {match.Score}</p>
    </div>
  );
};

export default MatchItem;
