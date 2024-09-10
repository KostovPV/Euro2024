import { useContext } from 'react';
import { DataContext } from '../context/DataContext';  
import { getKnockoutStages } from '../helpers/EliminationStageData';  
import MatchItem from '../components/MatchItem';

const HomePage = () => {
    const data = useContext(DataContext);  // Use your data context here
    if (!data || !data['teams.csv'] || !data['matches.csv']) {
        return <p>Loading...</p>;
    }
    const teams = data['teams.csv'];
    const matches = data['matches.csv'];
    const { final, semiFinals, quarterFinals, roundOf16 } = getKnockoutStages(matches);

    return (
        <div className="home-container">
            <h2>Knockout Stage Games</h2>

            <section className="knockout-stage round-of-16">
                <h3>Round of 16</h3>
                {roundOf16.map(match => {
                    const teamA = teams.find(team => team.ID === match.ATeamID);
                    const teamB = teams.find(team => team.ID === match.BTeamID);
                    return (
                        <MatchItem 
                            key={match.ID} 
                            match={match} 
                            teamA={teamA} 
                            teamB={teamB} 
                        />
                    );
                })}
            </section>
            <section className="knockout-stage quarter-finals">
                <h3>Quarter-finals</h3>
                {quarterFinals.map(match => {
                    const teamA = teams.find(team => team.ID === match.ATeamID);
                    const teamB = teams.find(team => team.ID === match.BTeamID);
                    return (
                        <MatchItem 
                            key={match.ID} 
                            match={match} 
                            teamA={teamA} 
                            teamB={teamB} 
                        />
                    );
                })}
            </section>
            <section className="knockout-stage semi-finals">
                <h3>Semi-finals</h3>
                {semiFinals.map(match => {
                    const teamA = teams.find(team => team.ID === match.ATeamID);
                    const teamB = teams.find(team => team.ID === match.BTeamID);
                    return (
                        <MatchItem 
                            key={match.ID} 
                            match={match} 
                            teamA={teamA} 
                            teamB={teamB} 
                        />
                    );
                })}
            </section>
            <section className="knockout-stage final">
                <h3>Final</h3>
                {final && (
                    <MatchItem 
                        match={final} 
                        teamA={teams.find(team => team.ID === final.ATeamID)} 
                        teamB={teams.find(team => team.ID === final.BTeamID)} 
                    />
                )}
            </section>
        </div>
    );
};

export default HomePage;


