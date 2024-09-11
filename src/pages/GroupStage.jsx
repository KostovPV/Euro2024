import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { groupTeamsByGroup, calculateStandings, getThirdPlaceTeams } from '../helpers/GroupPhaseData';
import GroupStandings from "../components/GroupStanding";
import ThirdPlaceBest from "../components/ThirdPlaceBest";
import GroupMatches from "../components/GroupMatches";
import { useNavigate } from "react-router-dom";

const GroupStage = () => {
    const data = useContext(DataContext);
    const teams = data['teams.csv'];
    const matches = data['matches.csv'];
    const navigate = useNavigate();
    if (!teams || !matches) {
        return <div>Loading data...</div>;
    }

    // Create the groups
    const groupedTeams = groupTeamsByGroup(teams);

    // Calculate standings and get third-placed teams for each group
    const groupStandings = Object.entries(groupedTeams).map(([groupName, groupTeams]) => {
        const groupTeamIds = groupTeams.map(team => team.ID);
        const groupMatches = matches.filter(
            match => groupTeamIds.includes(match.ATeamID) && groupTeamIds.includes(match.BTeamID)
        );
        const standings = calculateStandings(groupTeams, groupMatches);

        return { groupName, standings, groupTeams, groupMatches };
    });

    // Get all third-placed teams
    const allThirdPlaceTeams = getThirdPlaceTeams(groupStandings.map(({ standings }) => standings));
    console.log('allThirdPlaceTeams ->', allThirdPlaceTeams);


    return (

        <div className="group-stage-wrapper">
            <div className="group-stage">
                {groupStandings.map(({ groupName, standings, groupTeams, groupMatches }, index) => (
                    <section key={index} className="group-stage-section">
                        <GroupStandings standings={standings} groupName={groupName} />
                        <GroupMatches group={groupName} matches={groupMatches} teams={groupTeams} />
                    </section>
                ))}
                <ThirdPlaceBest allThirdPlaceTeams={allThirdPlaceTeams} />
            </div>

        </div>

    );
};
export default GroupStage;