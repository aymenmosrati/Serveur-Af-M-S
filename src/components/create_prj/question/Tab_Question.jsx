import "../table_create_prj.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import API from "../../../api/index";

const Tab_Question = (props) => {
  const { Questions } = props.data;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [up_nor, setup_nor] = useState();
  // console.log(Questions);

  const [open, setOpen] = useState(false);
  const [id_Q , setId_Q] = useState();
  const handleClickOpen = (id) => {
    setOpen(true);
    setId_Q(id);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const deleteQuestion = () => {
    API.delete(`delete_question/${id_Q}`)
      .then((response) => {
        window.location.reload(false)
      })
      .catch((error) => { console.log(error) })
  };
  const getbyidNorme = (id) => {
    API.get(`getbyId_norme/${id}`)
      .then(function (response) {
        // console.log(response)
        setup_nor(response.data);
        handleShow();
      });
  }
  // console.log(Questions);
  return (
<>
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">question</TableCell>
            <TableCell className="tableCell">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Questions.map((question) => (
            <TableRow key={question.id}>
              <TableCell className="tableCell">{question.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">{question.Questions}</div>
              </TableCell>

              <TableCell className="tableCell">
                <div className="cellAction">
                  {/* <Link to={`/questions/${question.id}`} style={{ textDecoration: "none" }}>
                    <div className="viewButton">View</div>
                  </Link> */}
                  <div
                    className="updateButton"
                    onClick={() => getbyidNorme(question.id)}
                  >
                    Update
                  </div>
                  <div
                    className="deleteButton"
                    onClick={() => handleClickOpen(question.id)}
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
          <Button variant="danger" onClick={() => deleteQuestion() }>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
</>
  );
};

export default Tab_Question;
