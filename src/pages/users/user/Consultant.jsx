import "./list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Datatable from "../../../components/datatable/Datatable_consultant"
import { useState, useEffect } from 'react';
import axios from "axios";
import {URL} from "../../../constant/Constant"

const List_consultant = () => {

  const [users, setUsers] = useState([]);
  useEffect((users) => {
    axios.get(`${URL}/getAll_consultant`).then(function (res) {
      //  console.log(res.data);
      setUsers(res.data);
    });
  },[])

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable Key={users.id} data={{ users: users, setUsers: setUsers }} />
      </div>
    </div>
  )
}

export default List_consultant