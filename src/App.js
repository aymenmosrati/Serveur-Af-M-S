
// import Login from "./pages/login/Login";
// import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

import { productInputs, userInputs } from "./formSource";


function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/consultant" element={<Consultant />} />
          <Route path="/consultant/new" element={<New_Consultant title="Add New Consultant" />} />
          <Route path="/entreprise" element={<Entreprise />} />
          <Route path="/entreprise/new" element={<New_Entreprise title="Add New Entreprise" />} />
          <Route path="/user_consultant/:id" element={<Single_consultant />} />
          <Route path="/user_entreprise/:id" element={<Single_entreprise />} />
          <Route path="/Norme" element={<Norme />} />
          <Route path="/chapitres/:id" element={<Chapitre />}/>
          <Route path="/articles/:id" element={<Article />} />
          <Route path="/questions/:id" element={<Question />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
