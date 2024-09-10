// import { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useContext } from 'react';
// import { DataContext } from '../context/DataContext';
// import TeamDetails from './TeamDetails';

// const GameDetails = () => {
//     const navigate = useNavigate();
//     const { ID } = useParams();
//     const data = useContext(DataContext);

//     const matches = data['matches.csv'];
//     const teams = data['teams.csv'];
//     const players = data['players.csv'];

//     // Find the crresponding match using the gameId
//     const match = matches?.find(m => m.ID === ID);
//     const teamA = teams?.find(team => team.ID === match?.ATeamID);
//     const teamB = teams?.find(team => team.ID === match?.BTeamID);
//     const playersTeamA = players?.filter(player => player.TeamID === match?.ATeamID);
//     const playersTeamB = players?.filter(player => player.TeamID === match?.BTeamID);

//     const [selectedTeam, setSelectedTeam] = useState(null);

//     const handleTeamClick = (team, players) => {
//         setSelectedTeam({ team, players });
//     };

//     const handleClose = () => {
//         navigate(-1);
//     };

//     if (!match || !teamA || !teamB) {
//         return <div>Loading match details...</div>;
//     }

//     return (
//         <section className="game-details">
//             <div className="game-details-head">

//                 <div className="game-details-head-info">
//                     <h2>{teamA?.Name} vs {teamB?.Name}</h2>

//                     <p>Date: {match?.Date}</p>
//                     <p>Score: {match?.Score}</p>
//                     <div className="game-details-head-btn">
//                         <button onClick={handleClose} className="btn">Close game info</button>
//                     </div>
//                 </div>


//             </div>

//             <div className="foramtion-container">
//                 <div className="formation-container-host">
//                     <h3>{teamA?.Name} Formation</h3>
//                     <div onClick={() => handleTeamClick(teamA, playersTeamA)}>
//                         <div className="image-container" style={{ height: 200, width: 200 }}>
//                             <img src="/assets/images/442-jpg.webp" alt={`${teamA?.Name} Formation`} style={{ width: '100%', height: '100%' }} />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="formation-container-visitor">
//                     <h3>{teamB?.Name} Formation</h3>
//                     <div onClick={() => handleTeamClick(teamB, playersTeamB)}>
//                         <div className="image-container" style={{ height: 200, width: 200 }}>
//                             <img src="/assets/images/442-jpg.webp" alt={`${teamB?.Name} Formation`} style={{ width: '100%', height: '100%' }} />
//                         </div>
//                     </div>
//                 </div>
//             </div>


//             {selectedTeam && (
//                 <TeamDetails
//                     team={selectedTeam.team}
//                     players={selectedTeam.players}
//                     matchID={match.ID}
//                 />
//             )}
//         </section>
//     );
// };

// export default GameDetails;
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
            setShowTeamA(true);
        } else if (team.ID === teamB?.ID) {
            setShowTeamB(true);
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
                    <div onClick={() => handleTeamClick(teamA)}>
                        <div className="image-container" style={{ height: 200, width: 200 }}>
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
                <div className="formation-container-visitor">
                    <h3>{teamB?.Name} Formation</h3>
                    <div onClick={() => handleTeamClick(teamB)}>
                        <div className="image-container" style={{ height: 200, width: 200 }}>
                            <img src="/assets/images/442-jpg.webp" alt={`${teamB?.Name} Formation`} style={{ width: '100%', height: '100%' }} />
                        </div>
                    </div>
                    {showTeamB && (
                <div>
                    <div className="visitors-team-list">
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
        </section>
    );
};

export default GameDetails;
