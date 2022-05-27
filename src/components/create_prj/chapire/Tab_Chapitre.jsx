import "../table_create_prj.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../../../constant/Constant"
import { useState } from "react";
import UpdateChapitre from "../../../pages/create_project/chapitre/UpdateChapitre";
import { Button, Modal } from 'react-bootstrap';


const Tab_Chapitre = (props) => {
  const { Chpitres } = props.data;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [up_chap, setup_chap] = useState();

  const [open, setOpen] = useState(false);
  const [id_C , setId_C] = useState();
  const handleClickOpen = (id) => {
    setOpen(true);
    setId_C(id);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  
  const deleteChapitre = () => {
    axios.delete(`${URL}/delete_chapitre/${id_C}`)
      .then((response) => {
        window.location.reload(false)
      })
      .catch((error) => { console.log(error) })
  };

  const getbyidChapitre = (id) => {
    axios.get(`${URL}/getbyId_chapitre/${id}`)
      .then(function (response) {
        setup_chap(response.data);
        handleShow();
      });
  }

  return (
    <>
      <UpdateChapitre data={{show:show, handleClose:handleClose, up_chap:up_chap,setup_chap:setup_chap }} />
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Tracking ID</TableCell>
              <TableCell className="tableCell">Chapitre</TableCell>
              <TableCell className="tableCell">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Chpitres.map((chapitre) => (
              <TableRow key={chapitre.id}>
                <TableCell className="tableCell">{chapitre.id}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">{chapitre.Chapitres}</div>
                </TableCell>

                <TableCell className="tableCell">
                  <div className="cellAction">
                    <Link to={`/articles/${chapitre.id}`} style={{ textDecoration: "none" }}>
                      <div className="viewButton">View</div>
                    </Link>
                    <div
                      className="updateButton"
                      onClick={() => getbyidChapitre(chapitre.id)}
                    >
                      Update
                    </div>
                    <div
                      className="deleteButton"
                      onClick={() => handleClickOpen(chapitre.id)}
                    >
                      Delete
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal show={open} onHide={handleClickClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="alert alert-danger">are you sure you want to delete this?</div></Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={handleClickClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => deleteChapitre() }>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Tab_Chapitre;
