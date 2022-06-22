import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Travaux from "../../components/travaux/Travaux";

const Home = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />

                <div className="charts">
                    <Travaux />
                </div>
            </div>
        </div>
    );
};

export default Home;

