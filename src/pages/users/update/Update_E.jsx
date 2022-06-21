import "../new/new.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import validator from 'validator'
import API from "../../../api/index";

const New_Entreprise = ({ title }) => {

    const [alert, setAlert] = useState(true);
    const [alertuser, setAlertuser] = useState(true);
    const [alerttlf, setAlerttlf] = useState(true);
    const [alertemail, setAlertemail] = useState(true);
    const [alertemaildispo, setAlertemaildispo] = useState(true);
    const [alertpass, setAlertpass] = useState(true);
    const [alertadss, setAlertadss] = useState(true);
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
    const parames = useParams();
    // console.log(parames);
    useEffect(() => {
        API.get(`getbyId_entreprise/${parames.id_E}`).then(function (res) {
            // console.log(res);
            setFormData(
                {
                    username: res.data.subInfo.username,
                    telephone: res.data.subInfo.telephone,
                    email: res.data.subInfo.email,
                    // password: res.data.subInfo.,
                    adress: res.data.subInfo.adress,
                });
        });
    }, [])


    const handleChange = (e) => {
        // console.log(formData);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handelClick = (e) => {
        e.preventDefault();
        if (formData.username === "" || formData.telephone === "" || formData.email === "" || formData.password === "" || formData.adress === ""
        || formData.username.includes("  ") || formData.email.includes("  ") || formData.password.includes("  ") || formData.adress.includes("  ")) {
            setAlert(false);
            setAlertuser(true);
            setAlerttlf(true);
            setAlertemail(true);
            setAlertpass(true);
            setAlertemaildispo(true);
            setAlertadss(true);
            return null;
        } else if (formData.username.length < 3 || formData.username.length > 50) {
            setAlertuser(false);
            setAlert(true);
            setAlerttlf(true);
            setAlertemail(true);
            setAlertpass(true);
            setAlertemaildispo(true);
            setAlertadss(true);
            return null;
        } else if (formData.telephone.length < 8 || formData.telephone.length > 8) {
            setAlerttlf(false);
            setAlert(true);
            setAlertuser(true);
            setAlertemail(true);
            setAlertpass(true);
            setAlertemaildispo(true);
            setAlertadss(true);
            return null;
        } else if (!(validator.isEmail(formData.email))) {
            setAlertemail(false);
            setAlerttlf(true);
            setAlert(true);
            setAlertuser(true);
            setAlertpass(true);
            setAlertemaildispo(true);
            setAlertadss(true);
            return null;
        } else if (formData.password.length < 8 || formData.password.length > 50) {
            setAlertpass(false);
            setAlert(true);
            setAlertuser(true);
            setAlerttlf(true);
            setAlertemail(true);
            setAlertemaildispo(true);
            setAlertadss(true);
            return null;
        } else if (formData.adress.length < 3 || formData.adress.length > 30) {
            setAlertadss(false);
            setAlertpass(true);
            setAlert(true);
            setAlertuser(true);
            setAlerttlf(true);
            setAlertemail(true);
            setAlertemaildispo(true);
            return null;
        } else {
            // console.log(formData, parames.id_U);
            API.patch(`update_user/${parames.id_U}`, formData)
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
                    navigate(`/user_entreprise/${parames.id_E}`)
                    // window.location.reload(false)
                    // console.log(formData);
                    // console.log(parames.id);
                }).catch((err) => {
                    setAlertemaildispo(false);
                    setAlert(true);
                    setAlertuser(true);
                    setAlerttlf(true);
                    setAlertemail(true);
                    setAlertpass(true);
                    setAlertadss(true);
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
                                <input type="text" placeholder="africa managment service" name="username" value={formData.username}
                                    onChange={handleChange} />
                            </div>
                            <div className="formInput">
                                <label>Phone 1 <b>*</b></label>
                                <input type="text" placeholder="+216 50 567 89" name="telephone" value={formData.telephone}
                                    onChange={handleChange} />
                            </div>
                            <div className="formInput">
                                <label>Email <b>*</b></label>
                                <input type="mail" placeholder="africa@gmail.com" name="email" value={formData.email}
                                    onChange={handleChange} />
                            </div>
                            <div className="formInput">
                                <label>Password <b>*</b></label>
                                <input type="password" placeholder="********" name="password"
                                    onChange={handleChange} />
                            </div>
                            <div className="formInput">
                                <label>Address <b>*</b></label>
                                <input type="text" placeholder="Elton St. 216 NewYork" name="adress" value={formData.adress}
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
                                    <b>*</b>  : Required fields
                                </div>
                            }
                            {
                                alertuser === false &&
                                <div className="alert alert-danger messerr" role="alert">
                                    <b>*</b>  UserName required min 3 caracter and max 50 caracter .
                                </div>
                            }
                            {
                                alerttlf === false &&
                                <div className="alert alert-danger messerr" role="alert">
                                    <b>*</b>  Phone required 8 number .
                                </div>
                            }
                            {
                                alertemail === false &&
                                <div className="alert alert-danger messerr" role="alert">
                                    <b>*</b>  is not Email .
                                </div>
                            }
                            {
                                alertemaildispo === false &&
                                <div className="alert alert-danger messerr" role="alert">
                                    <b>*</b>  This email is used .
                                </div>
                            }
                            {
                                alertpass === false &&
                                <div className="alert alert-danger messerr" role="alert">
                                    <b>*</b>  Password required minimum 8 caracter and maximum 50 caracter  .
                                </div>
                            }
                            {
                                alertadss === false &&
                                <div className="alert alert-danger messerr" role="alert">
                                    <b>*</b>  Adress required minimum 3 caracter and maximum 30 caracter  .
                                </div>
                            }
                            <div>
                                <Button onClick={handelClick}>Update</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default New_Entreprise;
