import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";

import fotoContent from "../../assets/foto-content.png";
import Header from "../../common/Header";

import api from "../../services/api";
import "./styles.css";

export default function Main() {
  const history = useHistory();
  const [teams, setTeams] = useState([]);

  const [regis, setRegis] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState({});
  const [cargo, setCargo] = useState("");

  const loggedIdUser = localStorage.getItem("idUser");
  const loggedRegisUser = localStorage.getItem("regisUser");
  const loggedUserName = localStorage.getItem("userName");
  const loggedUserTeam = localStorage.getItem("userTeam");

  useEffect(() => {
    api.get("teams").then((response) => {
      setTeams(response.data);
    });
  }, []);

  const optionsTeams = teams.map((team) => {
    return { value: team.id_team, label: team.name_team };
  });

  async function handleNewUser(e) {
    e.preventDefault();

    console.log(regis);
    console.log(name);
    console.log(email);
    console.log(team);
    console.log(cargo);

    try {
      const response = await api.post("users", {
        regis_user: regis,
        nome_user: name,
        email_user: email,
        password_user: "123",
        cargo_user: cargo,
        urlfoto_user: "teste.jpg",
        id_team: team.value,
      });

      history.push("/users");
    } catch (err) {
      alert("Falha na criação de usuário, tente novamente.");
    }
  }

  return (
    <div>
      <Header />

      <div className="new-user-container">
        <section className="form">
          <img className="userImg" src={fotoContent} alt="" />

          <form onSubmit={handleNewUser}>
            <input
              placeholder="Matricula"
              value={regis}
              onChange={(e) => setRegis(e.target.value)}
            />

            <input
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              placeholder="Cargo"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
            />

            <Select
              className="select sector-select mb-3"
              placeholder="Equipe"
              options={optionsTeams}
              onChange={setTeam}
            />

            <button className="button" type="submit">
              ENVIAR
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
