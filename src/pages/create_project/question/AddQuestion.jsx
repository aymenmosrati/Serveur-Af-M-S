import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import API from "../../../api/index";

export default function AddQuestion(props) {
    const { handleClose, show } = props.data;
    const [alert, setalert ] = useState(true);
    const params = useParams();
    const [Question, setQuestion] = useState({
        Questions: "",
        ArticleId: `${params.id}`,
    });
    const handleChange = (e) => {
        setQuestion({
            ...Question,
            [e.target.name]: e.target.value,
        });
    };

    const handelClick = (e) => {
        e.preventDefault();
        if (Question.Questions == "") {
            setalert(false);
            return null;
        }
        API.post(`ajoute_question`, Question)
            .then(function (response) {
                setQuestion({
                    Questions: "",
                });
                handleClose();
                window.location.reload(false)
            })
    };

    return (
        <div className="model_box">
            <Modal
                show={show}
                onHide={(e) => { handleClose(e); setQuestion({ Questions: "" }); setalert(true); }}
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
                                id="Questions"
                                name="Questions"
                                aria-describedby="name"
                                placeholder="Enter Name"
                                value={Question.Questions}
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
                    <Button variant="secondary" onClick={(e) => { handleClose(e); setQuestion({ Questions: "" }); setalert(true); }}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

