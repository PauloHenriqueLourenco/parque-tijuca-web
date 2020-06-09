import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "../../services/api";

import logoImg from "../../assets/logo.jpg";
import profileImg from "../../assets/foto-perfil.png";

import "./styles.css";

export default function Logon() {
  /* 
  const [login, setLogin] = useState();
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    console.log(login);
    console.log(password);

    try {
      const response = await api.post("login", {
        login: parseInt(login),
        password,
      });

      localStorage.setItem("userLogin", login);
      localStorage.setItem("userName", response.data.nome_user);
      localStorage.setItem("userEmail", response.data.email_user);
      localStorage.setItem("userCargo", response.data.cargo_user);
      localStorage.setItem("userTeam", response.data.id_team);

      history.push("/profile");
    } catch (err) {
      alert("Falha no login, tente novamente.");
    }
  } */

  return (
    <div className="header-container">
      <div className="menu-container">
        <Link className="logo" to="/">
          <img src={logoImg} alt="Parque Nacional Tijuca" />
        </Link>

        <Link to="/users" style={{ textDecoration: "none" }}>
          <h1>Usuários</h1>
        </Link>

        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <h1>Dashboard</h1>
        </Link>
      </div>

      <div className="option-container">
        <Link className="button" to="actions/new">
          NOVA AÇÃO
        </Link>

        <Link className="profile" to="/users">
          <img src={profileImg} alt="Foto perfil" />
        </Link>
      </div>
    </div>
  );
}
