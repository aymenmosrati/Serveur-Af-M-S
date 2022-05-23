import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Table_Projet from "../../components/projet/Tab_prj";
import { useState, useEffect } from 'react';
import axios from "axios";
import { URL } from "../../constant/Constant";
// import AddNorme from "./AddNorme"

const List_norme = () => {

//   const [normes, setNormes] = useState([]);
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   useEffect((normes) => {
//     axios.get(`${URL}/getAll_norme`).then(function (res) {
//       //  console.log(res.data);
//       setNormes(res.data);
//     });
//   }, [])
const [projet , setProjet]= useState();

useEffect((projet) => {
    axios.get(`${URL}/getquestion_byIdarticle`).then(function (res) {
      // console.log(res.data);
      setProjet(res.data);
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
            List Project
            <div  className="link" >
              Add New Project
            </div>
          </div>
          <Table_Projet data={{projet:projet}} />
        </div>
      </div>
    </div>
    {/* <AddNorme data={{ handleClose: handleClose , show :show }} /> */}
    </>
  )
}

export default List_norme