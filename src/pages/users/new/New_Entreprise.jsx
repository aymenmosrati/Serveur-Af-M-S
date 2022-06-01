import "./new.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import axios from "axios";
import { URL } from "../../../constant/Constant";
import { useNavigate } from 'react-router-dom';

const New_Entreprise = ({ title }) => {

  const [alert, setAlert] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    telephone: "",
    email: "",
    password: "",
    adress: "",
    mobile: "",
    contact: "",
    web: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(formData);
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
    } else {
      axios.post(`${URL}/register_entreprise`, formData)
        .then(function (res) {
          if (!res) {
            console.log(res);
          } else {
            navigate('/entreprise')
            window.location.reload(false)
          }

        })

    }
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
                <label>Name Entreprise <b>*</b></label>
                <input type="text" placeholder="africa managment service" name="username"
                  onChange={handleChange} />
              </div>
              <div className="formInput">
                <label>Phone 1 <b>*</b></label>
                <input type="text" placeholder="+216 50 567 89" name="telephone"
                  onChange={handleChange} />
              </div>
              <div className="formInput">
                <label>Email <b>*</b></label>
                <input type="mail" placeholder="africa@gmail.com" name="email"
                  onChange={handleChange} />
              </div>
              <div className="formInput">
                <label>Password <b>*</b></label>
                <input type="password" placeholder="********" name="password"
                  onChange={handleChange} />
              </div>
              <div className="formInput">
                <label>Address <b>*</b></label>
                <input type="text" placeholder="Elton St. 216 NewYork" name="adress"
                  onChange={handleChange} />
              </div>
              <div className="formInput">
                <label>Phone 2</label>
                <input type="text" placeholder="+216 50 567 89" name="mobile"
                  onChange={handleChange} />
              </div>
              <div className="formInput">
                <label>Contact</label>
                <input type="mail" placeholder="Contact@gmail.com" name="contact"
                  onChange={handleChange} />
              </div>
              <div className="formInput">
                <label>Web</label>
                <input type="text" placeholder="URL Web" name="web"
                  onChange={handleChange} />
              </div>
              {
                alert === false &&
                <div className="alert alert-danger messerr" role="alert">
                  <b>*</b>  : required fields
                </div>
              }
              <Button onClick={handelClick}>Send</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New_Entreprise;
