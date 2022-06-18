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

const Tab_Article = (props) => {
  const { Article } = props.data;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [up_nor, setup_nor] = useState();
  // console.log(articles);

  const [open, setOpen] = useState(false);
  const [id_A , setId_A] = useState();
  const handleClickOpen = (id) => {
    setOpen(true);
    setId_A(id);
  };
  const handleClickClose = () => {
    setOpen(false);
  };

  const deleteArticle = () => {
    API.delete(`delete_article/${id_A}`)
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

  return (
<>
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Article</TableCell>
            <TableCell className="tableCell">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Article.map((article) => (
            <TableRow key={article.id}>
              <TableCell className="tableCell">{article.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">{article.Articles}</div>
              </TableCell>

              <TableCell className="tableCell">
                <div className="cellAction">
                  <Link to={`/questions/${article.id}`} style={{ textDecoration: "none" }}>
                    <div className="viewButton">View</div>
                  </Link>
                  <div
                    className="updateButton"
                    onClick={() => getbyidNorme(article.id)}
                  >
                    Update
                  </div>
                  <div
                    className="deleteButton"
                    onClick={() => handleClickOpen(article.id)}
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
          <Button variant="danger" onClick={() => deleteArticle() }>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
</>
  );
};

export default Tab_Article;
