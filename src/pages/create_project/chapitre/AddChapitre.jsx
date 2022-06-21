import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import API from "../../../api/index";


export default function AddChapitre(props) {
    const { handleClose, show } = props.data;
    const [alert, setalert ] = useState(true);
    const parames =useParams();
    const [Chpitre, setChpitre] = useState({
        Chapitres: "",
        NormeId:`${parames.id}`, 
    });
    const handleChange = (e) => {
        setChpitre({
            ...Chpitre,
            [e.target.name]: e.target.value,
        });
    };

    const handelClick = (e) => {
        // console.log(Chpitre);
        e.preventDefault();
        // || Chpitre.Chapitres.includes("  ")
        if (Chpitre.Chapitres == "") {
            setalert(false);
            return null;  
        }
        API.post(`ajoute_chapitres`, Chpitre)
            .then(function (response) {
                setChpitre({
                    Chapitres: "",
                });
                handleClose();
                window.location.reload(false)
            })
    };

    return (
        <div className="model_box">
            <Modal
                show={show}
                onHide={(e) => { handleClose(e); setChpitre({ Chapitres: "" }); setalert(true); }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Chapitre</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {alert === false &&
                        <div className="alert alert-danger" role="alert">
                            You Must Fill Text Fields.
                        </div>
                    }
                    <form >
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                id="Chapitres"
                                name="Chapitres"
                                aria-describedby="name"
                                placeholder="Enter Name"
                                // value={Chpitre.Chapitres}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="btn btn-success mt-4"
                            onClick={(e) => {
                                handelClick(e)
                            }}
                        >
                            Add Chapitre
                        </Button>
                    </form>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={(e) => { handleClose(e); setChpitre({ Chapitres: "" }); setalert(true); }}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

