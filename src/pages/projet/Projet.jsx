import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Table_Projet from "../../components/projet/Tab_prj";

const List_norme = () => {
  return (
    <>
    <div className="list">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="listContainer">
          <div className="listTitle">
            List Project 
          </div>
          <Table_Projet />
        </div>
      </div>
    </div>
    </>
  )
}

export default List_norme