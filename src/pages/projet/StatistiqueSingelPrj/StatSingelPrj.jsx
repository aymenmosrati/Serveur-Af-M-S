import React, { useEffect, useState } from "react";
import "./StatistiqueSingelPrj.scss";
import API from "../../../api/index";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { Button, Modal } from "react-bootstrap";

const StatSingelPrj = (props) => {
  const exportPDF = () => {
    const input = document.getElementById("stat");
    html2canvas(input, {
      logging: true,
      letterRendering: 1,
      useCORS: true,
    }).then((canvas) => {
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL("/img/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("Statistique.pdf");
    });
  };

  const { handleClose, show, chapitre, id_prj, NormIso } = props.data;
  const [isLoaded, setIsLoaded] = useState(false);
  const [state, setState] = useState();
  let array = [];
  const addToArray = (id) => {
    array.push({ ProjectId: id_prj, ChapitreId: id });
  };
  useEffect(() => {
    chapitre.map((chap) => addToArray(chap.id));
    API.post('getChapitreResults', { array: array }).then((res) => {
      setState(res.data);
      setIsLoaded(true);
    });
  }, []);
  //   if (isLoaded) {
  //     console.log("====================================");
  //     console.log(state[0].average);
  //     console.log("====================================");
  //   }
  let index = 0;
  return (
    <>
      {isLoaded ? (
        <Modal
          show={show}
          onHide={(e) => {
            handleClose(e);
          }}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Statistique</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div id="stat" className="stat">
              <div className="list">
                <div className="homeContainer">
                  <div className="listContainer">
                    <p className="titleNor">
                      Résultats globaux, autoévaluation {NormIso}
                    </p>
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
                            <td>{state[index].average}{state[index].average != null ? (<span> %</span>) : (<></>)}</td>
                            <span hidden>{index++}</span>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ background: "#bb2929", border: "1px solid red" }}
              onClick={exportPDF}
            >
              Export PDF
            </Button>
            <Button variant="primery" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  );
};
export default StatSingelPrj;