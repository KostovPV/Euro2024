import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {

    const data = useContext(DataContext);
    const records = data['records.csv'];
    const players = data['players.csv'];
    const teams = data['teams.csv'];
    const matches = data['matches.csv'];
    console.log(' records->', records);
    console.log(' players->', players);
    console.log(' matches->', matches);
    console.log(' teams->', teams);
    const navigate = useNavigate();
    return (

        <section className="home-page">
            <button onClick={() => navigate('/group-stage')}>Check the group stage results</button>
            <main>
                <p>
                    Content here!
                </p>
            </main>
        </section>
    );
};

export default HomePage;