import { useContext, useState } from 'react';
import GameDetails from './GameDetails'; 
import { GamesDataContext } from '../context/GamesDataContext';

const SingleGame = ({ groupMatches, teams }) => {
    const data = useContext(GamesDataContext);
    const [selectedMatch, setSelectedMatch] = useState(null);

    const handleGameClick = (match) => {
        setSelectedMatch(match);
    };

    return (
        <div className="single-matches">
            <h4>Matches</h4>
            <ul>
                {groupMatches.map(match => {
                    const teamA = teams.find(team => team.ID === match.ATeamID);
                    const teamB = teams.find(team => team.ID === match.BTeamID);

                    return (
                        <li key={match.ID} onClick={() => handleGameClick(match)}>
                            {teamA?.Name} vs {teamB?.Name}
                        </li>
                    );
                })}
            </ul>

            {selectedMatch && (() => {
                const teamA = teams.find(team => team.ID === selectedMatch.ATeamID);
                const teamB = teams.find(team => team.ID === selectedMatch.BTeamID);

                // Only render GameDetails if both teamA and teamB exist
                if (!teamA || !teamB) {
                    return <p>Unable to load team data.</p>;
                }

                const playersTeamA = data['players.csv'].filter(player => {
                    console.log("Player:", player); 
                    return player.TeamID === teamA.ID;

                });
                const playersTeamB = data['players.csv'].filter(player => player.TeamID === teamB.ID);

                return (
                    <GameDetails 
                        match={selectedMatch} 
                        teamA={teamA} 
                        teamB={teamB} 
                        playersTeamA={playersTeamA} 
                        playersTeamB={playersTeamB} 
                    />
                );
            })()}
        </div>
    );
};

export default SingleGame;
