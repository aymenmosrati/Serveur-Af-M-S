import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Table_Question from "../../../components/create_prj/question/Tab_Question"
import { useState, useEffect } from 'react';
import { Link,useParams } from "react-router-dom";
import AddQuestion from "./AddQuestion"
import API from "../../../api/index";

const List_question = () => {

  const [Questions, setQuestions] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const parames = useParams();

  useEffect((Questions) => {
    API.get(`getquestion_byIdarticle/${parames.id}`).then(function (res) {
      // console.log(res.data);
      setQuestions(res.data);
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
            List Questions for Norme 
            <div onClick={handleShow} className="link" >
              Add New
            </div>
          </div>
          <Table_Question data={{ Questions: Questions, setQuestions: setQuestions }} />
        </div>
      </div>
    </div>
    <AddQuestion data={{ handleClose: handleClose , show :show }} />

    </>
  )
}

export default List_question