import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

const TeamDetails = ({ team, matchID }) => {
  
  const navigate = useNavigate();
  const data = useContext(DataContext);

  const players = data['players.csv']?.filter(player => player.TeamID === team.ID);
  const handlePlayerClick = (player) => {
    navigate(`/${matchID}/players/${player.ID}`);
  };

  return (
    <div className="team-details">
      <h2>{team?.Name} Players</h2>
      <ul className="players-list">
        {players?.map((player) => (
          <li
            key={player.ID}
            onClick={() => handlePlayerClick(player)}
            className="player-item"
          >
            <p>{player.TeamNumber}. {player.FullName} - {player.Position}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamDetails;
