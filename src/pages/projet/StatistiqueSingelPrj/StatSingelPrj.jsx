import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./StatistiqueSingelPrj.scss";
import API from "../../../api/index";

import jsPDF from "jspdf";
import html2canvas from 'html2canvas';

import { Button, Modal } from 'react-bootstrap';

const StatSingelPrj = (props) => {

    const exportPDF = () => {
        const input = document.getElementById("stat")
        html2canvas(input, { logging: true, letterRendering: 1, useCORS: true }).then((canvas) => {
            const imgWidth = 208;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const imgData = canvas.toDataURL("/img/png");
            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save("Statistique.pdf")
        })
    };

    const { handleClose, show, chapitre, id_prj, NormIso } = props.data;
    const [data, setData] = useState({
        ProjectId: id_prj,
        ChapitreId: ""
    });
    const [isloead, setLoead] = useState(false);
    const [state, setState] = useState();

    // const ClcResult = (id) => {
    //     setData({ ...data, ChapitreId: id });
    //     let result = API.get('getChapitreResults', data).then((res) => {
    //         return res;
    //     })
    //     console.log(result);
    // }

    useEffect(() => {
        API.get(`getChapitreResults/`,{
                "array": [
                    {
                        "ProjectId": 27,
                        "ChapitreId": 4
                    },
                    {
                        "ProjectId": 27,
                        "ChapitreId": 4
                    },
                    {
                        "ProjectId": 27,
                        "ChapitreId": 3
                    }
                ]
            }).then((res) => {
                console.log(res);
        });
    }, []);

    return (
        <>
            <Modal
                show={show}
                onHide={(e) => { handleClose(e); }}
                backdrop="static"
                keyboard={false} >
                <Modal.Header closeButton>
                    <Modal.Title>Statistique</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div id="stat" className="stat">
                        <div className="list">
                            <div className="homeContainer">
                                <div className="listContainer">
                                    <p className="titleNor">Résultats globaux, autoévaluation {NormIso}</p>
                                    <table className="TabPorCentage">
                                        <thead>
                                            <tr>
                                                <th className="col-sm-10">Chapitre de La Norme</th>
                                                <th className="col-sm-4"> Note (%)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {chapitre.map((chap) => (
                                                <tr key={chap.id} className="">
                                                    <td className="chap">{chap.Chapitres}</td>
                                                    <td>
                                                        {/* {ClcResult(chap.id)} */}
                                                    </td>
                                                </tr>
                                            ))
                                            }
                                        </tbody >
                                    </table >
                                </div>
                            </div>
                        </div>
                    </div>







                    {/* <div id="stat" className="stat">
                        <div className="list">
                            <div className="homeContainer">
                                <div className="listContainer">
                                    <p className="titleNor">Résultats globaux, autoévaluation</p>
                                    <table className="TabPorCentage">
                                        <thead>
                                            <tr>
                                                <th className="col-sm-10">Chapitre de La Norme</th>
                                                <th className="col-sm-4"> Note (%)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {chapitre.map((chap) => (
                                                <tr key={chap.id} className="">
                                                    <td className="chap">{chap.Chapitres}</td>
                                                    <td>
                                                        100 %
                                                    </td>
                                                </tr>
                                            ))
                                            }
                                        </tbody >
                                    </table >
                                </div>
                            </div>
                        </div>
                    </div> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ background: '#bb2929', border: '1px solid red' }}
                        onClick={exportPDF}>
                        Export PDF
                    </Button>
                    <Button variant="primery" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default StatSingelPrj;



