import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import API from "../../../api/index";


export default function ModalViewUpdate(props) {
    const { norme_update, handleClose, show, setup_nor } = props.data;
    const [alert, setAlert] = useState(true);
    const [formData, setFormData] = useState({
        norme: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };


    useEffect(() => {
        if (!!norme_update?.id) {
            API.get(`getbyId_norme/${norme_update.id}`)
                .then(function (response) {
                    setFormData(
                        {
                            norme: response.data.norme,
                        });
                });
        }

    }, [norme_update]);

    const handelClick = (e, id) => {
        e.preventDefault();

        if (formData.norme === "") {
            setAlert(false);
            return null;
        }
        // console.log(formData);
        API.patch(`update_norme/${norme_update.id}`, formData)
            .then(function (response) {
                setAlert(true);
                setFormData({
                    norme: "",
                })
                window.location.reload(false);
                // console.log(response);
                setup_nor([]);
                handleClose();
            });
    };



    return (
        <div className="model_box">
            <Modal
                show={show}
                onHide={(e) => { handleClose(e); setAlert(true); setFormData({ norme: "" }); }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Norme </Modal.Title>
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
                                id="norme"
                                name="norme"
                                aria-describedby="name"
                                placeholder="Enter Name"
                                value={formData.norme}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="btn btn-success mt-4"
                            onClick={(e) => {
                                handelClick(e, norme_update.id)
                            }}
                        >
                            Update Norme
                        </Button>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={(e) => { handleClose(e); setAlert(true); setFormData({ norme: "" }); }}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

