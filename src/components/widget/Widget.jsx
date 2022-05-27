import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { URL } from "../../constant/Constant"
import axios from "axios";

const Widget = ({ type }) => {
  let data;
  //temporary
  const amount = 100;
  const diff = 20;
  const [count_C, setcount_C] = useState([]);
  const [count_E, setcount_E] = useState([]);
  const [count_N, setcount_N] = useState([]);
  const [count_P, setcount_P] = useState([]);


  useEffect((count_C) => {
    axios.get(`${URL}/countAll_consultant`).then(function (res) {
      //  console.log(res.data);
      setcount_C(res.data);
    });
  }, [])
  useEffect((count_E) => {
    axios.get(`${URL}/countAll_entreprise`).then(function (res) {
      //  console.log(res.data);
      setcount_E(res.data);
    });
  }, [])
  useEffect((count_N) => {
    axios.get(`${URL}/countAll_norme`).then(function (res) {
      //  console.log(res.data);
      setcount_N(res.data);
    });
  }, [])
  useEffect((count_P) => {
    axios.get(`${URL}/countAll_project`).then(function (res) {
      //  console.log(res.data);
      setcount_P(res.data);
    });
  }, [])

  switch (type) {
    case "consultant":
      data = {
        title: "Consultant",
        isConsultant: true,
        link_C: "View All Consultant",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "entreprise":
      data = {
        title: "Entreprise",
        isEntreprise: true,
        link_E: "View All Entreprise",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "norme":
      data = {
        title: "Norme",
        isnorme: true,
        link_N: "View All Norme",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "projet":
      data = {
        title: "Project",
        isprojet: true,
        link_P: "View All Project",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isConsultant && `${count_C}`} 
          {data.isEntreprise && `${count_E}`} 
          {data.isnorme && `${count_N}`} 
          {data.isprojet && `${count_P}`} 
        </span>
        <Link to="/consultant" style={{ textDecoration: "none" }}>
        <span className="link">{data.link_C}</span>
          </Link>
          <Link to="/entreprise" style={{ textDecoration: "none" }}>
          <span className="link">{data.link_E}</span>
          </Link>
        <Link to="/Norme" style={{ textDecoration: "none" }}>
        <span className="link">{data.link_N}</span>
          </Link>
        <Link to="/projets" style={{ textDecoration: "none" }}>
              <span className="link">{data.link_P}</span>
          </Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
