
export const getKnockoutStages = (matches) => {
    const final = matches[matches.length - 1]; // Final match(last game)
    const semiFinals = matches.slice(matches.length - 3, matches.length - 1); // Semi-final matches (last 2 games before the final)
    const quarterFinals = matches.slice(matches.length - 7, matches.length - 3); // Quarter-final matches 
    const roundOf16 = matches.slice(matches.length - 15, matches.length - 7); // Round of 16 matches

    const quarterFinalFirstGroup = [];
    const quarterFinalSecondGroup = [];

    // Rearrange quarterfinals based on semifinal teams so that the 
    // first two teams are the team who played the semifinal
    // and the theam who played agains him in the quaterfinal
    // second couple is the second semifinalist and his opponent
    quarterFinals.forEach(game => {
        if (
            game.ATeamID === semiFinals[0].ATeamID || game.BTeamID === semiFinals[0].ATeamID ||
            game.ATeamID === semiFinals[0].BTeamID || game.BTeamID === semiFinals[0].BTeamID
        ) {
            quarterFinalFirstGroup.push(game);
        } else if (
            game.ATeamID === semiFinals[1].ATeamID || game.BTeamID === semiFinals[1].ATeamID ||
            game.ATeamID === semiFinals[1].BTeamID || game.BTeamID === semiFinals[1].BTeamID
        ) {
            quarterFinalSecondGroup.push(game);
        }
    });

    // Combine the rearranged quarterfinal groups
    const quarterFinalsRearranged = [...quarterFinalFirstGroup, ...quarterFinalSecondGroup];

    // Rearrange Round of 16 based on quarterfinals
    const roundOf16FirstGroup = [];
    const roundOf16SecondGroup = [];

    roundOf16.forEach(game => {
        if (
            quarterFinalFirstGroup.some(qfGame => qfGame.ATeamID === game.ATeamID || qfGame.BTeamID === game.ATeamID ||
                qfGame.ATeamID === game.BTeamID || qfGame.BTeamID === game.BTeamID)
        ) {
            roundOf16FirstGroup.push(game);
        } else if (
            quarterFinalSecondGroup.some(qfGame => qfGame.ATeamID === game.ATeamID || qfGame.BTeamID === game.ATeamID ||
                qfGame.ATeamID === game.BTeamID || qfGame.BTeamID === game.BTeamID)
        ) {
            roundOf16SecondGroup.push(game);
        }
    });

    // Combine the rearranged Round of 16 groups
    const roundOf16Rearranged = [...roundOf16FirstGroup, ...roundOf16SecondGroup];

    return {
        final,
        semiFinals,
        quarterFinals: quarterFinalsRearranged,
        roundOf16: roundOf16Rearranged,
    };
};


