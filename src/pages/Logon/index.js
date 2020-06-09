import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "../../services/api";

import logoImg from "../../assets/logo.jpg";

import "./styles.css";

export default function Logon() {
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
      localStorage.setItem("regisUser", response.data.regis_user);
      localStorage.setItem("idUser", response.data.id_user);
      localStorage.setItem("userName", response.data.nome_user);
      localStorage.setItem("userEmail", response.data.email_user);
      localStorage.setItem("userCargo", response.data.cargo_user);
      localStorage.setItem("userTeam", response.data.team);

      history.push("/");
    } catch (err) {
      alert("Falha no login, tente novamente.");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <form onSubmit={handleLogin}>
          <div className="logo-container">
            <img src={logoImg} alt="Parque Nacional Tijuca" />
            <h1>Sistema de Registro de Ações</h1>
          </div>

          <input
            placeholder="ID"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />

          <input
            placeholder="Senha"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="button" type="submit">
            ENTRAR
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
    </div>
  );
}
