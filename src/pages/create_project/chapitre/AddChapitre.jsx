import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import axios from "axios";
import { URL } from "../../../constant/Constant"


export default function AddChapitre(props) {
    const { handleClose, show } = props.data;
    const [Chpitre, setChpitre] = useState({
        chpitre: "",
    });
    const handleChange = (e) => {
        setChpitre({
            ...Chpitre,
            [e.target.name]: e.target.value,
        });
    };

    const handelClick = (e) => {
        e.preventDefault();
        if (Chpitre.chpitre == "") {
            return null;
        }
        axios.post(`${URL}/ajoute_chapitres`, Chpitre)
            .then(function (response) {
                setChpitre({
                    chpitre: "",
                });
                handleClose();
                window.location.reload(false)
            })
    };

    return (
        <div className="model_box">
            <Modal
                show={show}
                onHide={(e) => { handleClose(e); setChpitre({ chpitre: "" }); }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Chpitre</Modal.Title>
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
                                id="Chpitre"
                                name="Chpitre"
                                aria-describedby="name"
                                placeholder="Enter Name"
                                value={Chpitre.chpitre}
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
                            Add Chpitre
                        </Button>
                    </form>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={(e) => { handleClose(e); setChpitre({ chpitre: "" }); }}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

