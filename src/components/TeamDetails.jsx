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
      {/* <h2 className='team-details-title'> Players</h2> */}
      <ul className="players-list">
        <div className="team-list-header">
          <div className="team-number">
            Num
          </div>
          <div className="player-name">
            Player
          </div>
          <div className="player-position">
            Pos
          </div>
        </div>
        {players?.map((player) => (
          <li
            key={player.ID}
            onClick={() => handlePlayerClick(player)}
            className="player-item"
          >
            <div className="player-details">
              <div className="player-details-number">
                {player.TeamNumber}.
              </div>
              <div className="player-details-name">
                {player.FullName}
              </div>
              <div className="player-details-position">
                {player.Position}
              </div>
            </div>
            <p>  </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamDetails;
