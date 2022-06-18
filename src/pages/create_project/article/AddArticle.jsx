import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import API from "../../../api/index";


export default function AddArticle(props) {
    const { handleClose, show } = props.data;
    const [alert, setalert ] = useState(true);
    const params = useParams();
    const [Article, setArticle] = useState({
        Articles: "",
        ChapitreId: `${params.id}`
    });
    const handleChange = (e) => {
        setArticle({
            ...Article,
            [e.target.name]: e.target.value,
        });
    };

    const handelClick = (e) => {
        e.preventDefault();
        if (Article.Articles == "") {
            setalert(false);
            return null;
        }
        API.post(`ajoute_article`, Article)
            .then(function (response) {
                setArticle({
                    Articles: "",
                });
                handleClose();
                window.location.reload(false)
            })
    };

    return (
        <div className="model_box">
            <Modal
                show={show}
                onHide={(e) => { handleClose(e); setArticle({ Articles: "" }); setalert(true); }}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Article</Modal.Title>
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
                                id="Articles"
                                name="Articles"
                                aria-describedby="name"
                                placeholder="Enter Name"
                                value={Article.Articles}
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
                            Add Article
                        </Button>
                    </form>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={(e) => { handleClose(e); setArticle({ Articles: "" }); setalert(true); }}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}

