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
        <div className="elimination-container">
            <section className="direct-elimination-game">

                <div className="direct-elimination-game-container-round-of-16">
                    <h3>Round of 16</h3>
                    {roundOf16.map((match, index) => {
                        const teamA = teams.find(team => team.ID === match.ATeamID);
                        const teamB = teams.find(team => team.ID === match.BTeamID);
                        return (
                            <div className={`match-wrapper-16-${index+1}`} key={match.ID}>
                                <MatchItem
                                    key={match.ID}
                                    match={match}
                                    teamA={teamA}
                                    teamB={teamB}
                                />
                            </div>
                        );
                    })}
                </div>
            </section>
            <section className="direct-elimination-game">


                <div className="direct-elimination-game-container-quarter-finals">
                    <h3>Quarter-finals</h3>
                    {quarterFinals.map((match, index) => {
                        const teamA = teams.find(team => team.ID === match.ATeamID);
                        const teamB = teams.find(team => team.ID === match.BTeamID);
                        return (
                            <div className={`match-wrapper-${index+1}`} key={match.ID}>
                                <MatchItem
                                    key={match.ID}
                                    match={match}
                                    teamA={teamA}
                                    teamB={teamB}
                                />
                            </div>
                        );
                    })}
                </div>
            </section>
            <section className="direct-elimination-game">

                <div className="direct-elimination-game-container-semi-finals">
                    <h3>Semi-finals</h3>
                    {semiFinals.map((match, index) => {
                        const teamA = teams.find(team => team.ID === match.ATeamID);
                        const teamB = teams.find(team => team.ID === match.BTeamID);
                        return (
                            <div className={`match-wrapper-semi-${index+1}`} key={match.ID}>
                                <MatchItem
                                    key={match.ID}
                                    match={match}
                                    teamA={teamA}
                                    teamB={teamB}
                                />
                            </div>
                        );
                    })}
                </div>
            </section>
            <section className="direct-elimination-game">

                <div className="direct-elimination-game-container-final">
                    <h3>Final</h3>
                    {final && (
                        <div className="match-wrapper-final" key={final.ID}>
                            <MatchItem
                                match={final}
                                teamA={teams.find(team => team.ID === final.ATeamID)}
                                teamB={teams.find(team => team.ID === final.BTeamID)}
                            />
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default HomePage;


