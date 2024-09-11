import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

const PlayerDetails = () => {
    const { id, matchID } = useParams();
    const data = useContext(DataContext);
    const players = data['players.csv'];
    const records = data['records.csv'];
    const matches = data['matches.csv'];
    const navigate = useNavigate();

    const player = players.find(player => player.ID === id);
    console.log('player->', player);

    const playerInfo = records
        ?.filter(record => record.PlayerID === player?.ID && record.MatchID === matchID)
        ?.shift();
    const handleBackClick = () => {
        navigate(-1);
    };
    console.log('playerInfo->', playerInfo);

    const calculateMinutesPlayed = (info) => {
        if (!info) return "Didn't play in this game";

        let start = info?.fromMinutes == 0 ? 'Started the game' : `Subbed in at minute ${info.fromMinutes}`;
        let end = info?.toMinutes == 'NULL' ? 'Played until the final whistle' : `Subbed out at minute ${info.toMinutes}`;
        //Remeinder - logic is not good yet for displayng the substitudes and minutes - correct it tonight
        return `${start} and ${end}`;
    };

    return (
        <div className="player-container">
            <div className="player-details-box">

                <h2>Player Details</h2>
                <div className="image-keeper">
                    <img
                        src={player?.Position === "GK" ? "/assets/images/goal-keeper.jpg" : "/assets/images/player.jpg"}
                        alt="player-sketch"
                    />
                </div>
                <p><strong>Name:</strong> {player?.FullName}</p>
                <p><strong>Number:</strong> {player?.TeamNumber}</p>
                <p><strong>Position:</strong> {player?.Position}</p>
                <p><strong>Minutes Played:</strong> {calculateMinutesPlayed(playerInfo)}</p>
                <button onClick={handleBackClick} className="btn">Back</button>
            </div>
        </div>

    );
};

export default PlayerDetails;
