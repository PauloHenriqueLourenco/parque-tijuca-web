import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

import Header from "../../common/Header";
import api from "../../services/api";

import acaoImg from "../../assets/acao.png";
import expandImg from "../../assets/expand_more.svg";

import "./styles.css";

export default function Main() {
  const [search, setSearch] = useState("");
  const [actions, setActions] = useState([]);

  useEffect(() => {
    api.get("actions", { params: { search } }).then((response) => {
      setActions(response.data);
    });
  }, [search]);

  return (
    <div>
      <Header />

      <section className="main-container">
        <div className="search-container">
          <input
            placeholder="Buscar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="button" type="submit">
            <FiSearch size={16} color="#A0A5A8" />
          </button>
        </div>

        <ul>
          {actions.map((action) => (
            <li key={action.id_action}>
              <img className="acaoImg" src={acaoImg} alt={action.area} />

              <div className="details-container">
                <div>
                  <strong>TIPO:</strong>
                  <p>{action.type_action}</p>
                </div>

                <div>
                  <strong>LOCAL:</strong>
                  <p>{action.area_location}</p>
                </div>

                <div>
                  <strong>DATA:</strong>
                  <p>{new Date(action.date_action).toLocaleDateString()}</p>
                </div>
              </div>

              <strong className="status">Enviado</strong>

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
