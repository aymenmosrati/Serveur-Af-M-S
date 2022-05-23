import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import axios from "axios";
import { URL } from "../../../constant/Constant";

export default function ModalViewUpdate(props) {
    const { up_chap, handleClose, show, setup_chap } = props.data;
    const [alert, setAlert] = useState(true);
    const [formData, setFormData] = useState({
        Chapitres: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };
    // console.log(up_chap);

    useEffect(() => {
        if (!!up_chap?.id) {
            axios.get(`${URL}/getbyId_Chapitres/${up_chap.id}`)
                .then(function (response) {
                    // setFormData(
                    //     {
                    //         Chapitres: response.data.Chapitres,
                    //     });
                    console.log(response)
                });
        }

    }, [up_chap]);

    const handelClick = (e, id) => {
        e.preventDefault();

        if (formData.Chapitres === "") {
            setAlert(false);
            return null;
        }
        // console.log(formData);
        axios.patch(`${URL}/update_Chapitres/${up_chap.id}`, formData)
            .then(function (response) {
                setAlert(true);
                setFormData({
                    Chapitres: "",
                })
                window.location.reload(false);
                // console.log(response);
                setup_chap([]);
                handleClose();
            });
    };



    return (
        <div className="model_box">
            <Modal
                show={show}
                onHide={(e) => { handleClose(e); setAlert(true); setFormData({ Chapitres: "" }); }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Chapitre </Modal.Title>
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
                                value={formData.Chapitres}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="btn btn-success mt-4"
                            onClick={(e) => {
                                handelClick(e, up_chap.id)
                            }}
                        >
                            Update Chapitre
                        </Button>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={(e) => { handleClose(e); setAlert(true); setFormData({ Chapitres: "" }); }}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

