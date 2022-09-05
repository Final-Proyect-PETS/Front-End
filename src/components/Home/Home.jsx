import React from "react";
import NavBar from "../NavBar/NavBar";
import Cards from "./Cards";
import SideBar from "../SideBar/SideBar";
import "./../LandingPage.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBarHome from "../NavBar/NavBarHome";
import chatt from "../../assets/images/chatt.png"

export default function Home() {
  const navigate = useNavigate();

  const loggedUser = useSelector((state) => state.userProfile);

  const verifyData = () => {
    if (!loggedUser?.telephone || !loggedUser.username) {
      Swal.fire({
        title: "DATOS",
        icon: "question",
        text: "Por favor completa tus datos",
      }).then(() => navigate("/missingdata", { replace: true }));
    }
  };

  function handley(e) {
    setTimeout(verifyData(), 5000);
    ///FUNCION DE CHRIS↑↑↑
  }
  return (
    <section onClick={(e) => handley(e)}>
      <NavBar />
      <NavBarHome />

      <div className="flex  flex-col">
        <div className="flex flex-row">
          <div className="flex w-screen h-screen justify-center">
            <Cards />
          </div>
        </div>
      </div>
      <img src={chatt} className="fixed "  />
    </section>
  );
}
