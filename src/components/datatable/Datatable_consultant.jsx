import "./datatable.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../../constant/Constant"
import { useState } from "react"
import { Button, Modal } from 'react-bootstrap';


const Datatable_consultant = (props) => {

  const { users, setUsers, consultant } = props.data;

  // console.log(users.length);
  // const navgite = useNavigate();

  const [open, setOpen] = useState(false);
  const [id_C, setId_C] = useState();

  const handleClickOpen = (id) => {
    setOpen(true);
    setId_C(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteConsultant = () => {
    axios.delete(`${URL}/delete_user/${id_C}`)
      .then((response) => {
        window.location.reload(false)
      })
      .catch((error) => { 
        // console.log(error)
       })
  };

  let index = 0;

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Consultant
        <Link to="/consultant/new" className="link" >
          Add New
        </Link>
      </div>
      <table className="table table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
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
                  <Link to={`/user_consultant/${consultant[0]?.id}`} style={{ textDecoration: "none" }}>
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
            </tr>
              : users.map((user) => (
                // consultant.map((consultant)=>(    
                <tr key={user?.id}>
                  <td>{user?.id}</td>
                  <td>{user?.username}</td>
                  <td>{user?.email}</td>
                  <td>{user?.telephone}</td>
                  <td>
                    <div className="cellAction">
                      <Link to={`/user_consultant/${consultant[index]?.id}`} style={{ textDecoration: "none" }}>
                        <div className="viewButton">View</div>
                      </Link>
                      <div
                        className="deleteButton"
                        onClick={() => handleClickOpen(user.id)}
                      >
                        Delete
                      </div>
                    </div>
                    <span hidden>{index++}</span>
                  </td>
                </tr>
                //rowspan / colspan
                // ))
              ))
          ) : <tr><td colSpan='5' className="text-center">No User found</td></tr>}
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
          <Button variant="danger" onClick={() => deleteConsultant()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Datatable_consultant;
