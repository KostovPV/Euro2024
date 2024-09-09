export const groupTeamsByGroup = (teams) => {
    const groupedTeams = {};
    teams.forEach(team => {
      if (!groupedTeams[team.Group]) {
        groupedTeams[team.Group] = [];
      }
      groupedTeams[team.Group].push(team);
    });
    return groupedTeams;
};

export const calculateStandings = (groupTeams, groupMatches) => {
    let standings = groupTeams.map(team => ({
      team: team.Name,
      teamID: team.ID,
      points: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsScored: 0,
      goalsConceded: 0,
      goalDifference: 0
    }));

    groupMatches.forEach(match => {
      const teamA = standings.find(team => team.teamID === match.ATeamID);
      const teamB = standings.find(team => team.teamID === match.BTeamID);

      const [scoreA, scoreB] = match.Score.split('-').map(Number); // Get team scores

      teamA.goalsScored += scoreA;
      teamA.goalsConceded += scoreB;
      teamB.goalsScored += scoreB;
      teamB.goalsConceded += scoreA;

      if (scoreA > scoreB) { 
        teamA.points += 3;
        teamA.wins += 1;
        teamB.losses += 1;
      } else if (scoreA < scoreB) { 
        teamB.points += 3;
        teamB.wins += 1;
        teamA.losses += 1;
      } else { 
        teamA.points += 1;
        teamB.points += 1;
        teamA.draws += 1;
        teamB.draws += 1;
      }

      teamA.goalDifference = teamA.goalsScored - teamA.goalsConceded;
      teamB.goalDifference = teamB.goalsScored - teamB.goalsConceded;
    });

    // Sort standings by points, goal difference, goals scored, and finally alphabetically by team name
    standings.sort((a, b) => {
      if (b.points === a.points) {
        if (b.goalDifference === a.goalDifference) {
          if (b.goalsScored === a.goalsScored) {
            return a.team.localeCompare(b.team); 
          }
          return b.goalsScored - a.goalsScored;
        }
        return b.goalDifference - a.goalDifference;
      }
      return b.points - a.points;
    });

    return standings;
};

export const getThirdPlaceTeams = (groupStandings) => {
    return groupStandings.map(standings => standings[2] || null); // Return third-placed teams or null if not enough teams
};
