import "./list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Datatable from "../../../components/datatable/Datatable_consultant"
import { useState, useEffect } from 'react';
import axios from "axios";
import {URL} from "../../../constant/Constant"

const List_consultant = () => {

  const [users, setUsers] = useState([]);
  const [consultant, setConsultant ] = useState([]);
  useEffect((users) => {
    axios.get(`${URL}/getAllUserConsultant`).then(function (res) {
      setUsers(res.data.listId);
      setConsultant(res.data.users);
    });
  },[])
// console.log(users);
// console.log(consultant);
 

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable Key={users.id} data={{ users:users ,consultant:consultant, setUsers: setUsers }} />
      </div>
    </div>
  )
}

export default List_consultant