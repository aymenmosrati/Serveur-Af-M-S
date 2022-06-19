import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import React, { useState, useContext, useEffect } from 'react'
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import API from "../../api/index";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';

const Navbar = (props) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [usersE, setUsersE] = useState([]);
  const [usersC, setUsersC] = useState([]);
  const [entreprise, setEntreprise] = useState([]);
  const [consultant, setConsultant] = useState([]);
  useEffect((users) => {
    API.get(`getAllUserEntreprise`).then(function (res) {
      //  console.log(res.data);
      setUsersE(res.data.listId);
      setEntreprise(res.data.users)
    });

    API.get(`getAllUserConsultant`).then(function (res) {
      setUsersC(res.data.listId);
      setConsultant(res.data.users);
    });
  }, [])

  const navigate = useNavigate();

  const clickViewDetail = (id, role) => {
    // console.log(id,role);
    if (role == "consultant") {
      // console.log("consultant");
      API.get(`getId/${id}/${role}`).then(function (res) {
        // console.log(res.data);
        navigate(`/user_consultant/${res.data.id}`)
      });
    } else if (role == "entreprise") {
      // console.log("entreprise");
      API.get(`getId/${id}/${role}`).then(function (res) {
        // console.log(res.data);
        navigate(`/user_entreprise/${res.data.id}`)
      });
    }
  };

  const ClickAddPrj = (id, role, name) => {
    // console.log(id,role);
    API.get(`getId/${id}/${role}`).then(function (res) {
      console.log(res.data, name);
      navigate(`/ajoute_projet/${res.data.id}/${name}`)
    });
  };

  const [open, setOpen] = useState(false);
  const [id_C, setId_C] = useState();
  const handleClickOpen = (id) => {
    setOpen(true);
    setId_C(id);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  const deleteConsultant = () => {
    API.delete(`delete_user/${id_C}`)
      .then((response) => {
        window.location.reload(false)
      })
      .catch((error) => {
        // console.log(error)
      })
  };

  let index = 0;

  const { dispatch } = useContext(DarkModeContext);
  if (localStorage.getItem("currentUser")) {
    const curentUser = JSON.parse(localStorage.getItem("curentUser"));
  }
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search" onClick={handleShow}>
          <input type="text" placeholder="Search..." disabled/>
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={(e) => { handleClose(e) }}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Search
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search With Name Consultant or Name Entreprise"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </InputGroup>

          <table className="table">
            <thead>
              <tr>
                <th>Name Entreprise or Consultant</th>
                <th>Email</th>
                <th> Action</th>
              </tr>
            </thead>
            <tbody>
              {usersE.length > 0 ? (
                usersE.filter((user) => {
                  if (searchTerm == "") {
                    return null;
                  } else if (user.username.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return user;
                  }
                }).map((user, Key) => {
                  return (
                    <tr>
                      <td key={Key}>
                        {user.username}
                      </td>
                      <td key={Key}>
                        {user.email}
                      </td>
                      <td key={Key}>
                        <Dropdown>
                          <Dropdown.Toggle variant="Primary" id="dropdown-basic">
                            Action
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => clickViewDetail(user?.id, "entreprise")}>View Entreprise</Dropdown.Item>
                            <Dropdown.Item onClick={() => ClickAddPrj(user?.id, "entreprise", user?.username)}>Add Project</Dropdown.Item>
                            {/* <Link to={`/ajoute_projet/${entreprise[index]?.id}/${user?.username}`} >
                              <div className="ajoutButton"><AddIcon /></div>
                            </Link> */}
                            <Dropdown.Item onClick={() => handleClickOpen(user.id)}>Delete</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                      <span hidden>{index++}</span>
                    </tr>
                  )
                })
              ) : <tr><td colSpan='3' className="text-center">No Entreprise found</td></tr>}
              {usersC.length > 0 ? (
                usersC.filter((user) => {
                  if (searchTerm == "") {
                    return null;
                  } else if (user.username.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return user;
                  }
                }).map((user, Key) => {
                  return (
                    <tr>
                      <td key={Key}>
                        {user.username}
                      </td>
                      <td key={Key}>
                        {user.email}
                      </td>
                      <td key={Key}>
                        <Dropdown>
                          <Dropdown.Toggle variant="Primary" id="dropdown-basic">
                            Action
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => clickViewDetail(user?.id, "consultant")}>View Consultant</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleClickOpen(user.id)}>Delete</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        {/* <Link to={`/user_consultant/${consultant[index]?.id}`} style={{ textDecoration: "none" }}>
                          <div className="viewButton">Consultant Detail {entreprise.id}</div>
                        </Link> */}
                      </td>

                    </tr>
                  )
                })
              ) : <tr><td colSpan='3' className="text-center">No Consultant found</td></tr>}
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="alert alert-danger">are you sure you want to delete this?</div></Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={handleClickClose}>
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

export default Navbar;
