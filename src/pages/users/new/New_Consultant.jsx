import "./new.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import axios from "axios";
import {URL} from "../../../constant/Constant"
import {useNavigate} from 'react-router-dom';

const New_Consultant = ({ title }) => {

  const [alert, setAlert] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    telephone: "",
    email: "",
    password: "",
    adress: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handelClick = (e) => {
    e.preventDefault();
    if (formData.username === "" || formData.telephone === "" || formData.email === "" || formData.password === "" || formData.adress === "") {
      setAlert(false);
      return null;
    }
    axios.post(`${URL}/register_consultant`, formData)
      .then(function (response) {
        setAlert(true);
        setFormData({
          username: "",
          telephone: "",
          email: "",
          password: "",
          adress: "",
        });
        // console.log(response);
        navigate('/consultant')
      })
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label>username <b>*</b></label>
                <input type="text" placeholder="UserName Consultant" name="username" value={formData.username}
                  onChange={handleChange} />
              </div>
              <div className="formInput">
                <label>Phone <b>*</b></label>
                <input type="text" placeholder="+216 50 567 890" name="telephone" value={formData.telephone}
                  onChange={handleChange} />
              </div>
              <div className="formInput">
                <label>Email <b>*</b></label>
                <input type="mail" placeholder="Consultant@gmail.com" name="email" value={formData.email}
                  onChange={handleChange} />
              </div>
              <div className="formInput">
                <label>Password <b>*</b></label>
                <input type="password" placeholder="********" name="password" value={formData.password}
                  onChange={handleChange} />
              </div>
              <div className="formInput address">
                <label>Address <b>*</b></label>
                <input type="text" placeholder="Elton St. 216 NewYork" name="adress" value={formData.adress}
                  onChange={handleChange} />
              </div>
              <div className="formInput address">
              </div>
              {
                alert === false &&
                <div className="alert alert-danger messerr" role="alert">
                  <b>*</b>  : required fields
                </div>
              }
              <div>
                <Button onClick={(e) => { handelClick(e) }}>Send</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default New_Consultant;


