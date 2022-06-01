import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import { useState, useEffect } from 'react';
import axios from "axios";
import { URL } from "../../constant/Constant";
import Form from 'react-bootstrap/Form'
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useParams,useNavigate } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';


const Add_Prj = () => {
    // const [value, setValue] = React.useState(null);
    const parames_id_name = useParams();
    const [date_deb, setDate_deb] = useState(new Date());
    const [date_fin, setDate_fin] = useState("");
    const [ConsultantId, setConsultantId] = useState('');
    const [EntrepriseId, setEntrepriseId] = useState(parames_id_name.id);
    const [name_entreprise, setname_entreprise] = useState(parames_id_name.name)
    const [name_norme, setnamenorme] = useState()
    const [NormeId, setNormeId] = useState('');
    const [alert, setAlert] = useState(true);
    const [Alertdate, setAlertdate] = useState(true);
    const [Bl, setBl] = useState(false);
    const navigate = useNavigate();

    function disablePrevDates(startDate) {
        const startSeconds = Date.parse(startDate);
        return (date) => {
            return Date.parse(date) < startSeconds;
        }
    }


    const handelClick = (e) => {
        let item = { date_deb, date_fin, ConsultantId, EntrepriseId, NormeId, name_entreprise }
        // console.log(item);
        if (item.ConsultantId === "" || item.NormeId === "") {
            setAlert(false);
            setAlertdate(true);
            return null;
        } else if (item.date_fin === "") {
            setAlertdate(false);
            setAlert(true);
            return null;
        } else {
            axios.post(`${URL}/ajoute_projet`, item)
                .then(function (response) {
                    navigate('/projets')
                    window.location.reload(false)
                });
        }
        e.preventDefault();
    };


    const [normes, setNormes] = useState([]);

    const [users, setUsers] = useState([]);
    const [consultant, setConsultant] = useState([]);
    useEffect(() => {
        axios.get(`${URL}/getAllUserConsultant`).then(function (res) {
            setUsers(res.data.listId);
            setConsultant(res.data.users);
            axios.get(`${URL}/getAll_norme`).then(function (res) {
                //  console.log(res.data);
                setNormes(res.data);
                setBl(true);
            });
        });
    }, [])

    let index = 0;

    return (
        <>
            <div className="list">
                <Sidebar />
                <div className="homeContainer">
                    <Navbar />
                    <div className="listContainer">
                        <div className="listTitle">
                            Add New Project
                        </div>
                        <strong>Entreprise :</strong><p>{parames_id_name.name}</p>
                        <div className="prj">
                            <div>
                                <span className="date">
                                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                                        <DatePicker
                                            label="Start Date"
                                            value={date_deb}
                                            onChange={(newValue) => {
                                                setDate_deb(newValue);
                                            }}
                                            shouldDisableDate={disablePrevDates(date_deb)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </span>

                                <span className="date">
                                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                                        <DatePicker
                                            label="End Date"
                                            value={date_fin}
                                            onChange={(newValue) => {
                                                setDate_fin(newValue);
                                            }}
                                            shouldDisableDate={disablePrevDates(date_deb)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </span>
                            </div>

                            {Bl == true ? <div className="form_selc">
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }} className="date">
                                    <InputLabel id="demo-simple-select-standard-label">Consultant <b>*</b></InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        // value={ConsultantId}
                                        onChange={(e) => setConsultantId(e.target.value)}
                                        label="ConsultantId">
                                        {users.map((user) => (
                                            <MenuItem key={user.id} value={consultant[index].id}>
                                                {user.username}<span hidden>{index++}</span></MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }} className="date">
                                    <InputLabel id="demo-simple-select-standard-label">Norme <b>*</b></InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        // value={NormeId}
                                        onChange={(e) => setNormeId(e.target.value)}
                                        label="NormeId">
                                        {normes.map((norme) => (
                                            <MenuItem key={norme.id} value={norme.id} >{norme.norme}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                                : null}
                        </div>
                        {alert === false &&
                            <div className="alert alert-danger messerr" role="alert">
                                <b>*</b>  : Please complete the name of Consultant and the Norme
                            </div>
                        }
                        {Alertdate === false &&
                            <div className="alert alert-danger messerr" role="alert">
                                Please fill in the end date
                            </div>
                        }
                        <div className="btn_prj">
                            <Button className="send_prj" onClick={(e) => { handelClick(e) }}>Send</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Add_Prj