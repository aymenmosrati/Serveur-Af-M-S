import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
// import Featured from "../../components/featured/Featured";
// import Chart from "../../components/chart/Chart";
// import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
       
        <div className="charts">
          {/* <Featured /> */}
          {/* <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} /> */}
        </div>
        <div className="listContainer">
        <div className="widgets">
          <Widget type="consultant" />
          <Widget type="entreprise" />
          <Widget type="norme" />
          <Widget type="projet" />
        </div>
          {/* <div className="listTitle">Latest Transactions</div> */}
          {/* <Table /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;

// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import "./home.scss";

// const Home = () => {
//   return (
//     <div className="home">
//       <Sidebar />
//       <div className="homeContainer">
//         <Navbar />
//         <div className="listContainer">
//           <div className="listTitle">Latest Transactions</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
