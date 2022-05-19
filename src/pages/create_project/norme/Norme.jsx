import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Table_Norme from "../../../components/create_prj/norme/Tab_Norme"
import { useState, useEffect } from 'react';
import axios from "axios";
import { URL } from "../../../constant/Constant"
import AddNorme from "./AddNorme"

const List_norme = () => {

  const [normes, setNormes] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect((normes) => {
    axios.get(`${URL}/getAll_norme`).then(function (res) {
      //  console.log(res.data);
      setNormes(res.data);
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
            List Normes
            <div onClick={handleShow} className="link" >
              Add New
            </div>
          </div>
          <Table_Norme data={{ normes: normes, setNormes: setNormes }} />
        </div>
      </div>
    </div>
    <AddNorme data={{ handleClose: handleClose , show :show }} />

    </>
  )
}

export default List_norme