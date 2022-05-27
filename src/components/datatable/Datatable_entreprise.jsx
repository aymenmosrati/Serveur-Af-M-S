import "./datatable.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../../constant/Constant"
import { useState } from "react"
import { Button, Modal } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Datatable_entreprise = (props) => {

  const { users, setUsers, entreprise } = props.data;
  // console.log(users.length);
  const [open, setOpen] = useState(false);
  const [id_E, setId_E] = useState();

  const handleClickOpen = (id) => {
    setOpen(true);
    setId_E(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteEntreprise = () => {
    axios.delete(`${URL}/delete_user/${id_E}`)
      .then((response) => {
        window.location.reload(false)
      })
      .catch((error) => { console.log(error) })
  };

  let index = 0;

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Entreprise
        <Link to="/entreprise/new" className="link">
          Add New
        </Link>
      </div>
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name Entreprise</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
            <th>Add Project</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.length === 1 ? <tr key={users[0]?.id}>
              <td>{users[0]?.id}</td>
              <td>{users[0]?.username}</td>
              <td>{users[0]?.email}</td>
              <td>{users[0]?.telephone}</td>
              <td>
                <div className="cellAction">
                  <Link to={`/user_entreprise/${entreprise[0].id}`} style={{ textDecoration: "none" }}>
                    <div className="viewButton">View</div>
                  </Link>
                  <div
                    className="deleteButton"
                    onClick={() => handleClickOpen(users[0].id)}
                  >
                    Delete
                  </div>
                </div>
              </td>
              <td>
                <tr>
                  <Link to={`/ajoute_projet/${entreprise[0].id}/${users[0]?.username}`} >
                    <div className="ajoutButton"><AddIcon /></div>
                  </Link>
                </tr>
              </td>
            </tr>
              : users.map((user) => (
                <tr key={user?.id}>
                  <td>{user?.id}</td>
                  <td>{user?.username}</td>
                  <td>{user?.email}</td>
                  <td>{user?.telephone}</td>
                  <td>
                    <div className="cellAction">
                      <Link to={`/user_entreprise/${entreprise[index]?.id}`} style={{ textDecoration: "none" }}>
                        <div className="viewButton">
                          {/* <VisibilityIcon /> */}
                          View
                        </div>
                      </Link>
                      <div
                        className="deleteButton"
                        onClick={() => handleClickOpen(user.id)}
                      >
                        {/* <DeleteIcon /> */}
                        Delete
                      </div>
                    </div>
                  </td>
                  <td>
                    <tr>
                      <Link to={`/ajoute_projet/${entreprise[index]?.id}/${user?.username}`} >
                        <div className="ajoutButton"><AddIcon /></div>
                      </Link>
                    </tr>
                    <span hidden>{index++}</span>
                  </td>
                </tr>
                //rowspan / colspan
              ))
          ) : <tr><td colSpan='6' className="text-center">No User found</td></tr>}
        </tbody>
      </table>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="alert alert-danger">are you sure you want to delete this?</div></Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => deleteEntreprise()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Datatable_entreprise;
