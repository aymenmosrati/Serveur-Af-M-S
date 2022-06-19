// import Login from "./pages/login/Login";
// import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";

import Home from "./pages/home/Home";
import Consultant from "./pages/users/user/Consultant";
import Entreprise from "./pages/users/user/Entreprise";
import New_Consultant from "./pages/users/new/New_Consultant";
import New_Entreprise from "./pages/users/new/New_Entreprise";
import Single_consultant from "./pages/users/single/Single_consultant";
import Single_entreprise from "./pages/users/single/Single_entreprise";
import Update_C from "./pages/users/update/Update_C";
import Update_E from "./pages/users/update/Update_E";
import Norme from "./pages/create_project/norme/Norme";
import Chapitre from "./pages/create_project/chapitre/Chapitre";
import Article from "./pages/create_project/article/Article";
import Question from "./pages/create_project/question/Question";
import Projet from "./pages/projet/Projet";
import Add_Prj from "./pages/projet/Add_Prj";
import Single_project from "./pages/projet/single_project/Single_project";
import PadeNoteFound from "./PadeNoteFound/PadeNoteFound";
import { productInputs, userInputs } from "./formSource";
import SinglePrjE from "./pages/projet/tableau project entreprise/SinglePrjE";
import SignIn from "./components/auth/SignIn";
import PadeNotFound from "./pages/pageNotFound/PageNotFound";
import API from "./api";
import { UserContext } from "./context/userContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const curentUser = JSON.parse(localStorage.getItem("curentUser"));
  const [user, setUser] = useState();

  useEffect(() => {
    if (curentUser) {
      API.post("/decodeToken").then((result) => {
        setUser(result?.data);
      });
    } else {
      setUser(null);
    }
  }, []);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/auth"
              element={curentUser ? <Navigate to="/" /> : <SignIn />}
            />
            <Route path="*" element={<PadeNotFound />} />
            <Route
              path="/"
              element={curentUser ? <Home /> : <Navigate to="/auth" />}
            />
            <Route
              path="consultant"
              exact
              element={curentUser ? <Consultant /> : <Navigate to="/auth" />}
            />
            <Route
              path="consultant/new"
              element={
                curentUser ? (
                  <New_Consultant title="Add New Consultant" />
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />
            <Route
              path="consultant/update/:id_U/:id_C"
              element={curentUser ? <Update_C /> : <Navigate to="/auth" />}
            />
            <Route
              path="entreprise/update/:id_U/:id_E"
              element={curentUser ? <Update_E /> : <Navigate to="/auth" />}
            />
            <Route
              path="entreprise"
              element={curentUser ? <Entreprise /> : <Navigate to="/auth" />}
            />
            <Route
              path="entreprise/new"
              element={
                curentUser ? (
                  <New_Entreprise title="Add New Entreprise" />
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />
            <Route
              path="user_consultant/:id"
              element={
                curentUser ? <Single_consultant /> : <Navigate to="/auth" />
              }
            />
            <Route
              path="user_entreprise/:id"
              element={
                curentUser ? <Single_entreprise /> : <Navigate to="/auth" />
              }
            />
            <Route
              path="Norme"
              element={curentUser ? <Norme /> : <Navigate to="/auth" />}
            />
            <Route
              path="chapitres/:id"
              element={curentUser ? <Chapitre /> : <Navigate to="/auth" />}
            />
            <Route
              path="articles/:id"
              element={curentUser ? <Article /> : <Navigate to="/auth" />}
            />
            <Route
              path="questions/:id"
              element={curentUser ? <Question /> : <Navigate to="/auth" />}
            />
            <Route
              path="projets"
              element={curentUser ? <Projet /> : <Navigate to="/auth" />}
            />
            <Route
              path="ajoute_projet/:id/:name"
              element={curentUser ? <Add_Prj /> : <Navigate to="/auth" />}
            />
            <Route
              path="projet/:id/:n_c/:n_e/:d_d/:d_f"
              exact
              element={
                curentUser ? <Single_project /> : <Navigate to="/auth" />
              }
            />
            {/* let dat = [usec.l, usere.l] */}

            {/* <Route path="/projet/:id/:n_c/:n_e/:d_d/:d_f/e" exact element={<SinglePrjE />} /> */}
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
