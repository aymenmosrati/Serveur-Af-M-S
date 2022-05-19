import "./single.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
// import Chart from "../../components/chart/Chart";
import List from "../../../components/table/Projet_entreprise";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from 'react';
import {URL} from "../../../constant/Constant"


const Single_entreprise = () => {

  const parames = useParams();
  const [user, setUser] = useState([]);
  useEffect((user) => {
    axios.get(`${URL}/getbyId_entreprise/${parames.id}`).then(function (res) {
      setUser(res.data);
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
                <h1 className="itemTitle">{user.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+216 {user.telephone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                   {user.adress}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Contact:</span>
                  <span className="itemValue">{user?.subInfo?.contact}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Mobile:</span>
                  <span className="itemValue">+216 {user?.subInfo?.mobile}</span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List  data={{user : user.id}}/>
        </div>
      </div>
    </div>
  );
};

export default Single_entreprise;