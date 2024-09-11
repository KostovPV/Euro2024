import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import TeamDetails from './TeamDetails';

const GameDetails = () => {
    const navigate = useNavigate();
    const { ID } = useParams();
    const data = useContext(DataContext);

    const matches = data['matches.csv'];
    const teams = data['teams.csv'];
    const players = data['players.csv'];

    // Find the corresponding match using the gameId
    const match = matches?.find(m => m.ID === ID);
    const teamA = teams?.find(team => team.ID === match?.ATeamID);
    const teamB = teams?.find(team => team.ID === match?.BTeamID);
    const playersTeamA = players?.filter(player => player.TeamID === match?.ATeamID);
    const playersTeamB = players?.filter(player => player.TeamID === match?.BTeamID);

    // State to track selected teams
    const [showTeamA, setShowTeamA] = useState(false);
    const [showTeamB, setShowTeamB] = useState(false);

    const handleTeamClick = (team) => {
        if (team.ID === teamA?.ID) {
            setShowTeamA(prev => !prev); 
            setShowTeamB(false); 
        } else if (team.ID === teamB?.ID) {
            setShowTeamB(prev => !prev); B
            setShowTeamA(false); 
        }
    };

    const handleClose = () => {
        navigate(-1);
    };

    const handleBack = (teamID) => {
        if (teamID === teamA?.ID) {
            setShowTeamA(false);
        } else if (teamID === teamB?.ID) {
            setShowTeamB(false);
        }
    };

    if (!match || !teamA || !teamB) {
        return <div>Loading match details...</div>;
    }

    return (
        <section className="game-details">
            <div className="game-details-head">
                <div className="game-details-head-info">
                    <h2>{teamA?.Name} vs {teamB?.Name}</h2>
                    <p>Date: {match?.Date}</p>
                    <p>Score: {match?.Score}</p>
                    <div className="game-details-head-btn">
                        <button onClick={handleClose} className="btn">Close game info</button>
                    </div>
                </div>
            </div>

            <div className="formation-container">
                <div className="formation-container-host">
                    <h3>{teamA?.Name} Formation</h3>
                    <div className="formation-container-host-info">
                        <div onClick={() => handleTeamClick(teamA)}>
                            <div className="formation-image-container" >
                                <img src="/assets/images/442-jpg.webp" alt={`${teamA?.Name} Formation`} style={{ width: '100%', height: '100%' }} />
                            </div>
                        </div>
                        {showTeamA && (
                            <div>
                                <div className="host-team-list">
                                    <TeamDetails
                                        team={teamA}
                                        matchID={match.ID}
                                    />
                                    <button onClick={() => handleBack(teamA.ID)} className="btn">Back</button>
                                </div>

                            </div>
                        )}
                    </div>
                </div>
                <div className="formation-container-visitor">
                    <h3>{teamB?.Name} Formation</h3>
                    <div className="formation-container-visitor-info">
                        <div onClick={() => handleTeamClick(teamB)}>
                            <div className="formation-image-container" >
                                <img src="/assets/images/442-jpg.webp" alt={`${teamB?.Name} Formation`} style={{ width: '100%', height: '100%' }} />
                            </div>
                        </div>
                        {showTeamB && (
                            <div>
                                <div className="visitor-team-list">
                                    <TeamDetails
                                        team={teamB}
                                        matchID={match.ID}
                                    />
                                    <button onClick={() => handleBack(teamB.ID)} className="btn">Back</button>
                                </div>


                            </div>
                        )}

                    </div>


                </div>
            </div>
        </section>
    );
};

export default GameDetails;
