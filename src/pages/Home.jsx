import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const HomePage = () => {

    const data = useContext(DataContext);
    const records = data['records.csv'];
    const players = data['players.csv'];
    const matches = data['matches.csv'];
    const teams = data['teams.csv'];
    console.log(' records->',records);
    console.log(' players->',players);
    console.log(' matches->',matches);
    console.log(' teams->',teams);

    return (
        <section className="home-page">
            <main>
                <p>
                    Content here!
                </p>
            </main>
        </section>
    );
};

export default HomePage;