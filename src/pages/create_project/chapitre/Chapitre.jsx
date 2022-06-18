import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Table_Chapitre from "../../../components/create_prj/chapire/Tab_Chapitre"
import { useState, useEffect } from 'react';
import AddChapitre from "./AddChapitre";
import { useParams, Link } from "react-router-dom";
import API from "../../../api/index";

const List_chapitre = () => {

  const [Chpitres, setChpitres] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const parames = useParams();

  useEffect((Chpitres) => {
    API.get(`getchp_byidnorme/${parames.id}`).then(function (res) {
      //  console.log(res.data);
      setChpitres(res.data);
    });
  }, [])

  return (
    <>
    <div className="list">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="listContainer">
          <div className="listTitle">
            List Chpitres fro Norme 
            <div onClick={handleShow} className="link" >
              Add New
            </div>
          </div>
          <Table_Chapitre data={{ Chpitres: Chpitres, setChpitres: setChpitres }} />
        </div>
      </div>
    </div>
    <AddChapitre data={{ handleClose: handleClose , show :show }} />

    </>
  )
}

export default List_chapitre