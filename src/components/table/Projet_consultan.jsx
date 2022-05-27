import "./table_prj_user.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from 'react';
import axios from "axios";
import { URL } from "../../constant/Constant"
import { useParams } from "react-router-dom";

const Projet_consultan = (props) => {
  const { Consultant } = props.data;
  const [projectsTable, setProjectsTable] = useState([
    { NormeId: "", date_deb: "", date_fin: "" },
  ]);
  const [entreprises, setEntreprises] = useState([]);
  const [normes, setNormes] = useState([]);
  let index = 0;
  const parames = useParams();

  useEffect((prj_user) => {
    axios.get(`${URL}/getPC/${parames?.id}`).then(function (result) {
      // console.log(result.length)
      setProjectsTable(result?.data?.projects);
      setEntreprises(result?.data?.EntrepriseNames);
      setNormes(result?.data?.Normes);
    });
  }, [])

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Nom Entreprise</TableCell>
            <TableCell className="tableCell">Norme</TableCell>
            <TableCell className="tableCell">Date debut</TableCell>
            <TableCell className="tableCell">Date Fin</TableCell>
            <TableCell className="tableCell">View</TableCell>
            <TableCell className="tableCell">Statistique</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projectsTable.length > 0 ? (
            projectsTable.length === 1 ?
              <TableRow key={projectsTable[0]?.id}>
                <TableCell className="tableCell">{entreprises[0]}
                </TableCell>
                <TableCell className="tableCell">{normes[0]}</TableCell>
                <TableCell className="tableCell">{projectsTable[0]?.date_deb}</TableCell>
                <TableCell className="tableCell">{projectsTable[0]?.date_fin}</TableCell>
                <TableCell className="tableCell">
                  <button type="button" className="btn btn-outline-dark">
                    view
                  </button>
                </TableCell>
                <TableCell className="tableCell">
                  <button ype="button" className="btn btn-outline-secondary">
                    stats
                  </button>
                </TableCell>
              </TableRow>
              : projectsTable.map((project) => (
                <TableRow key={project?.id}>
                  <TableCell className="tableCell">{entreprises[index]}
                  </TableCell>
                  <TableCell className="tableCell">{normes[index]}</TableCell>
                  <TableCell className="tableCell">{project?.date_deb}</TableCell>
                  <TableCell className="tableCell">{project?.date_fin}</TableCell>
                  <TableCell className="tableCell">
                    <button type="button" className="btn btn-outline-dark">
                      view
                    </button>
                  </TableCell>
                  <TableCell className="tableCell">
                    <button ype="button" className="btn btn-outline-secondary">
                      stats
                    </button>
                    <span hidden>{index++}</span>
                  </TableCell>
                </TableRow>
              ))
          ) : <TableRow><TableCell colSpan='7' className="text-center" >No Project found</TableCell></TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Projet_consultan;
