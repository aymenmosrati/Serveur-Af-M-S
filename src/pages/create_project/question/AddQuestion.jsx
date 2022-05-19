import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import axios from "axios";
import { URL } from "../../../constant/Constant"


export default function AddQuestion(props) {
    const { handleClose, show } = props.data;
    const [Question, setQuestion] = useState({
        question: "",
    });
    const handleChange = (e) => {
        setQuestion({
            ...Question,
            [e.target.name]: e.target.value,
        });
    };

    const handelClick = (e) => {
        e.preventDefault();
        if (Question.question == "") {
            return null;
        }
        axios.post(`${URL}/ajoute_question`, Question)
            .then(function (response) {
                setQuestion({
                    question: "",
                });
                handleClose();
                window.location.reload(false)
            })
    };

    return (
        <div className="model_box">
            <Modal
                show={show}
                onHide={(e) => { handleClose(e); setQuestion({ question: "" }); }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Question</Modal.Title>
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
                                id="Question"
                                name="Question"
                                aria-describedby="name"
                                placeholder="Enter Name"
                                value={Question.question}
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
                            Add Question
                        </Button>
                    </form>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={(e) => { handleClose(e); setQuestion({ question: "" }); }}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

