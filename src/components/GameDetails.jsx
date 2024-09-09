import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';

const GameDetails = () => {
    const navigate = useNavigate();
    const { ID } = useParams(); 
    const data = useContext(DataContext);

    const matches = data['matches.csv'];
    const teams = data['teams.csv'];
    const players = data['players.csv'];

    // Find the crresponding match using the gameId
    const match = matches?.find(m => m.ID === ID);
    const teamA = teams?.find(team => team.ID === match?.ATeamID);
    const teamB = teams?.find(team => team.ID === match?.BTeamID);
    const playersTeamA = players?.filter(player => player.TeamID === match?.ATeamID);
    const playersTeamB = players?.filter(player => player.TeamID === match?.BTeamID);

    const [selectedTeam, setSelectedTeam] = useState(null);

    const handleTeamClick = (team, players) => {
        setSelectedTeam({ team, players });
    };

    const handleClose = () => {
        navigate(-1); 
    };

    if (!match || !teamA || !teamB) {
        return <div>Loading match details...</div>;
    }

    return (
        <div className="game-details">
            <button onClick={handleClose} className="close-button">Close</button>
            <h2>{teamA?.Name} vs {teamB?.Name}</h2>
            <p>Date: {match?.Date}</p>
            <p>Score: {match?.Score}</p>

            <h3>{teamA?.Name} Formation</h3>
            <div onClick={() => handleTeamClick(teamA, playersTeamA)}>
                <div className="image-container" style={{ height: 200, width: 200 }}>
                    <img src="/assets/images/442-jpg.webp" alt={`${teamA?.Name} Formation`} style={{ width: '100%', height: '100%' }} />
                </div>
            </div>

            <h3>{teamB?.Name} Formation</h3>
            <div onClick={() => handleTeamClick(teamB, playersTeamB)}>
                <div className="image-container" style={{ height: 200, width: 200 }}>
                    <img src="/assets/images/442-jpg.webp" alt={`${teamB?.Name} Formation`} style={{ width: '100%', height: '100%' }} />
                </div>
            </div>

            {selectedTeam && (
                <div className="team-details">
                    <h4>{selectedTeam.team?.Name} Players</h4>
                    <ul>
                        {selectedTeam.players.map(player => (
                            <li key={player.ID}>{player.Name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default GameDetails;
