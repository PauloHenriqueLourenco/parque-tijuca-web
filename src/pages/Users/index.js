import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

import Header from "../../common/Header";
import api from "../../services/api";

import acaoImg from "../../assets/acao.png";
import expandImg from "../../assets/expand_more.svg";

import "./styles.css";

export default function Users() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("users", { params: { search } }).then((response) => {
      setUsers(response.data);
    });
  }, [search]);

  return (
    <div>
      <Header />

      <section className="users-container">
        <div className="search-container">
          <div className="search-input-button">
            <input
              placeholder="Buscar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="button" type="submit">
              <FiSearch size={16} color="#A0A5A8" />
            </button>
          </div>

          <Link className="add-new-user" to="/users/new">
            ADICIONAR USUÁRIO
          </Link>
        </div>

        <ul>
          {users.map((user) => (
            <li key={user.id_user}>
              <img
                className="photoImg"
                src={require("../../assets/Ellipse.png")}
                alt={user.area}
              />

              <div className="details-container">
                <div>
                  <strong>Matrícula:</strong>
                  <p>{user.regis_user}</p>
                </div>

                <div>
                  <strong>Nome:</strong>
                  <p>{user.nome_user}</p>
                </div>

                <div>
                  <strong>Cargo:</strong>
                  <p>{user.cargo_user}</p>
                </div>

                <div>
                  <strong>Equipe:</strong>
                  <p>{user.name_team}</p>
                </div>

                <div>
                  <strong>Registros:</strong>
                  <p>{user.count}</p>
                </div>
              </div>

              <img className="expandImg" src={expandImg} alt="Mais detalhes" />
              {/* <button
                onClick={() => handleDeleteIncident(action.id)}
                type="button"
              >
                <FiTrash2 size={20} color="#a8a8b3" />
              </button> */}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
