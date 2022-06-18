import "../list.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import Table_Article from "../../../components/create_prj/article/Tab_Article"
import { useState, useEffect } from 'react';
import { Link,useParams } from "react-router-dom";
import AddArticle from "./AddArticle"
import API from "../../../api/index";


const List_article = () => {

  const [Article, setArticle] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const parames = useParams();

  useEffect((Article) => {
    API.get(`getarticle_byIdchapitre/${parames.id}`).then(function (res) {
      //  console.log(res.data);
      setArticle(res.data);
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
              List Article for Chapiter
              <div onClick={handleShow} className="link" >
                Add New
              </div>
            </div>
            <Table_Article data={{ Article: Article, setArticle: setArticle }} />
          </div>
        </div>
      </div>
      <AddArticle data={{ handleClose: handleClose, show: show }} />
    </>
  )
}

export default List_article