import Home from "./Home";
import Cusine from "./Cusine";
import { Routes, Route } from "react-router-dom";
import Recipe from "./Recipe";
import Searched from "./Searched";

function Pages() {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/Cusine/:type"} element={<Cusine />} />
      <Route path={"/Searched/:type"} element={<Searched />} />
      <Route path={"/Recipe/:name"} element={<Recipe />} />
    </Routes>
  );
}

export default Pages;
