import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import API from "../../../api/index";


export default function AddNorme(props) {
    const { handleClose, show } = props.data;
    const [alert, setalert] = useState(true)
    // const [alertnorm, setalertnorm] = useState(true)
    const [Norme, setNorme] = useState({
        norme: "",
    });
    const handleChange = (e) => {
        setNorme({
            ...Norme,
            [e.target.name]: e.target.value,
        });
    };

    const handelClick = (e) => {
        e.preventDefault();
        // || Norme.norme.includes("  ")
        if (Norme.norme == "" || Norme.norme.includes("  ")) {
            setalert(false);
            return null;
        }else 
        {
            API.post(`ajoute_norme`, Norme)
                .then(function (response) {
                    setNorme({
                        norme: "",
                    });
                    handleClose();
                    window.location.reload(false)
                })
        }
    };

    return (
        <div className="model_box">
            <Modal
                show={show}
                onHide={(e) => { handleClose(e); setNorme({ norme: "" }); setalert(true); }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Norme</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {alert === false &&
                        <div className="alert alert-danger" role="alert">
                            You Must Fill Text Fields.
                        </div>
                    } 
                    {/* {alertnorm === false &&
                        <div className="alert alert-danger" role="alert">
                            You Must Fill Text minimom 3 champ reaquired.
                        </div>
                    } */}
                    <form >
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                id="norme"
                                name="norme"
                                aria-describedby="name"
                                placeholder="Enter Name"
                                value={Norme.norme}
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
                            Add Norme
                        </Button>
                    </form>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={(e) => { handleClose(e); setNorme({ norme: "" }); setalert(true); }}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

