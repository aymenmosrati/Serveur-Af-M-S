import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../../constant/Constant"


const Tab_prj = () => {

    const [ projectsTable, setProjectsTable] = useState([]);
    const [entreprises, setEntreprises] = useState([]);
    const [consultants, setConsultants] = useState([]);
    const [normes, setNormes] = useState([]);
    let index = 0;

    useEffect(() => {
        axios.get(`${URL}/getAllProjects`)
            .then((result) => {
                setProjectsTable(result?.data?.projects);
                setEntreprises(result?.data?.eNames);
                setNormes(result?.data?.normes);
                setConsultants(result?.data?.cNames);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="container" style={{ marginTop: "20px" }}>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Nom Entreprise</th>
                        <th scope="col">Nom Consultant</th>
                        <th scope="col">Norme</th>
                        <th scope="col">Date debut</th>
                        <th scope="col">date Fin</th>
                        <th scope="col">View</th>
                    </tr>
                </thead>
                <tbody>
                    {projectsTable.length > 0 ? (
                        projectsTable.length === 1 ? (
                            <tr key={projectsTable[0]?.id}>
                                <td className="tableCell">{consultants[index]}</td>
                                <td className="tableCell">{entreprises[index]}</td>
                                <td className="tableCell">
                                    {normes[index]}
                                    <span hidden>{index++}</span>
                                </td>
                                <td className="tableCell">{projectsTable[0]?.date_deb}</td>
                                <td className="tableCell">{projectsTable[0]?.date_fin}</td>
                                <td className="tableCell">
                                    <Link
                                        to={`/projet/${projectsTable[0]?.id}/${consultants[index]}/${entreprises[index]}/${projectsTable[0]?.date_deb}/${projectsTable[0]?.date_fin}`}
                                        style={{ textDecoration: "none" }}
                                        className="btn btn-outline-dark"
                                    >
                                        <div className="viewButton">View</div>
                                    </Link>
                                </td>
                            </tr>
                        ) : (
                            projectsTable?.map((project) => (
                                <tr key={project?.id}>
                                    <td className="tableCell"> {consultants[index]}</td>
                                    <td className="tableCell">{entreprises[index]}</td>
                                    <td className="tableCell">
                                        {normes[index]}
                                        <span hidden>{index++}</span>
                                    </td>
                                    <td className="tableCell">{project?.date_deb}</td>
                                    <td className="tableCell">{project?.date_fin}</td>
                                    <td className="tableCell">
                                        <Link
                                            to={`/projet/${project?.id}/${consultants[index]}/${entreprises[index]}/${project?.date_deb}/${project?.date_fin}`}
                                            className="btn btn-outline-dark"
                                        >
                                            view
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">
                                No Data found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Tab_prj;
