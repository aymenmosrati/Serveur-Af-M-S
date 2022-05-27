import "./single.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
// import Chart from "../../components/chart/Chart";
import List from "../../../components/table/Projet_consultan";
import { useState, useEffect } from 'react';
import { URL } from "../../../constant/Constant"
import axios from "axios";
import { useParams } from "react-router-dom";

const Single_consultant = () => {

  const parames = useParams();
  const [Consultant, setConsultant] = useState([]);

  useEffect((Consultant) => {
    axios.get(`${URL}/getbyId_consultant/${parames.id}`).then(function (res) {
      setConsultant(res.data);
    });
  }, [])

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              {/* <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              /> */}
              <div className="details">
                <h1 className="itemTitle">{Consultant.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{Consultant.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+216 {Consultant.telephone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {Consultant.adress}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="Consultant Spending ( Last 6 Months)" />
          </div> */}
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List data={{ Consultant: Consultant.id }} />
        </div>
      </div>
    </div>
  );
};

export default Single_consultant;
