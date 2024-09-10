import { useNavigate } from 'react-router-dom';

const MatchItem = ({ match, teamA, teamB }) => {
  const navigate = useNavigate();

  const handleIndividualGameClick = () => {
    navigate(`/games/${match.ID}/details`);
  };

  return (
    // <div className="match-container">
      <div className="match" onClick={handleIndividualGameClick}>
        <p>{teamA ? teamA.Name : 'Unknown'} vs {teamB ? teamB.Name : 'Unknown'}</p>
        <div className="matches-image-container">
          <div className="host-team-image-container">
            <img src={`/assets/images/${teamA.Name}.svg`} alt="" />
          </div>
          <div className="visitor-team-image-container">
            <img src={`/assets/images/${teamB.Name}.svg`} alt="" />
          </div>
        </div>
        <p>Date: {match.Date}</p>
        {/* <p>Score: {match.Score}</p> */}
      </div>
    // </div>
  );
};

export default MatchItem;
