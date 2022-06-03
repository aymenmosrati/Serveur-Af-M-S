// import Login from "./pages/login/Login";
// import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

import Home from "./pages/home/Home";
import Consultant from "./pages/users/user/Consultant";
import Entreprise from "./pages/users/user/Entreprise";
import New_Consultant from "./pages/users/new/New_Consultant";
import New_Entreprise from "./pages/users/new/New_Entreprise";
import Single_consultant from "./pages/users/single/Single_consultant";
import Single_entreprise from "./pages/users/single/Single_entreprise";
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

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const curentUser = JSON.parse(localStorage.getItem("curentUser"));

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={curentUser ? <Navigate to="/"/>:<SignIn />} />
          <Route path="*" element={<PadeNotFound/>}/>
          <Route path="/" element={<Home />}/>
            <Route path="consultant" exact element={<Consultant />} />
            <Route
              path="consultant/new"
              element={<New_Consultant title="Add New Consultant" />}
            />
            <Route path="entreprise" element={<Entreprise />} />
            <Route
              path="entreprise/new"
              element={<New_Entreprise title="Add New Entreprise" />}
            />
            <Route
              path="user_consultant/:id"
              element={<Single_consultant />}
            />
            <Route
              path="user_entreprise/:id"
              element={<Single_entreprise />}
            />
            <Route path="Norme" element={<Norme />} />
            <Route path="chapitres/:id" element={<Chapitre />} />
            <Route path="articles/:id" element={<Article />} />
            <Route path="questions/:id" element={<Question />} />
            <Route path="projets" element={<Projet />} />
            <Route path="ajoute_projet/:id/:name" element={<Add_Prj />} />
            <Route
              path="projet/:id/:n_c/:n_e/:d_d/:d_f"
              exact
              element={<Single_project />}
            />
          

          {/* <Route path="/projet/:id/:n_c/:n_e/:d_d/:d_f/e" exact element={<SinglePrjE />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
