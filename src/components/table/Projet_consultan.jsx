import "./table_prj_user.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import API from "../../api/index";

const Projet_consultan = (props) => {
  const { Consultant,n_c } = props.data;
  const [projectsTable, setProjectsTable] = useState([
    { NormeId: "", date_deb: "", date_fin: "" },
  ]);
  const [entreprises, setEntreprises] = useState([]);
  const [normes, setNormes] = useState([]);
  let index = 0;
  const parames = useParams();

  useEffect((prj_user) => {
    API.get(`getPC/${parames?.id}`).then(function (result) {
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
                  <Link type="button" className="btn btn-outline-dark"
                    to={`/projet/${projectsTable[0]?.id}/${n_c}/${entreprises[0]}/${projectsTable[0]?.date_deb}/${projectsTable[0]?.date_fin}`}
                  >
                    view
                  </Link>
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
                    <Link type="button" className="btn btn-outline-dark"
                      to={`/projet/${project?.id}/${n_c}/${entreprises[index]}/${project?.date_deb}/${project?.date_fin}`}
                    >
                      view
                    </Link>
                    <span hidden>{index++}</span>
                  </TableCell>
                </TableRow>
              ))
          ) : <TableRow><TableCell colSpan='5' className="text-center" >No Project found</TableCell></TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Projet_consultan;
