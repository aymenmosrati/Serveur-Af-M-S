import "./list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Datatable from "../../../components/datatable/Datatable_entreprise"
import { useState, useEffect } from 'react';
import API from "../../../api/index";


const List_entreprise = () => {

  const [users, setUsers] = useState([]);
  const [entreprise, setEntreprise ] = useState([]);
  useEffect((users) => {
    API.get(`getAllUserEntreprise`).then(function (res) { 
      //  console.log(res.data);
      setUsers(res.data.listId);
      setEntreprise(res.data.users)
    });
  },[])

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar Key={users.id} dataEntreprise={{ users: users }}/>
        <Datatable Key={users.id} data={{ users: users, setUsers: setUsers, entreprise:entreprise }} />
      </div>
    </div>
  )
}

export default List_entreprise