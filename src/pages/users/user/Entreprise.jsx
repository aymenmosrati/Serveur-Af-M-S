import "./list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Datatable from "../../../components/datatable/Datatable_entreprise"
import { useState, useEffect } from 'react';
import axios from "axios";
import {URL} from "../../../constant/Constant"

const List_entreprise = () => {

  const [users, setUsers] = useState([]);
  const [entreprise, setEntreprise ] = useState([]);
  useEffect((users) => {
    axios.get(`${URL}/getAllUserEntreprise`).then(function (res) { 
      //  console.log(res.data);
      setUsers(res.data.listId);
      setEntreprise(res.data.users)
    });
  },[])

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable Key={users.id} data={{ users: users, setUsers: setUsers, entreprise:entreprise }} />
      </div>
    </div>
  )
}

export default List_entreprise