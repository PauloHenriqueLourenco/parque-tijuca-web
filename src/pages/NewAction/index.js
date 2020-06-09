import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";

import fotoContent from "../../assets/foto-content.png";
import Header from "../../common/Header";

import api from "../../services/api";
import "./styles.css";

export default function Main() {
  const history = useHistory();
  const [typesAction, setTypesAction] = useState([]);
  const [typesTrail, setTypesTrail] = useState([]);

  const [sector, setSector] = useState("");
  const [area, setArea] = useState("");
  const [peoples, setPeoples] = useState("");
  const [typeTrail, setTypeTrail] = useState({});
  const [typeAction, setTypeAction] = useState({});
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState(0);
  const [description, setDescription] = useState("");

  const idUser = localStorage.getItem("idUser");
  const regisUser = localStorage.getItem("regisUser");
  const userName = localStorage.getItem("userName");
  const userTeam = localStorage.getItem("userTeam");

  useEffect(() => {
    api.get("type_action").then((response) => {
      setTypesAction(response.data);
    });

    api.get("type_trail").then((response) => {
      setTypesTrail(response.data);
    });
  }, []);

  const optionsTypesAction = typesAction.map((ta) => {
    return { value: ta.id_type_action, label: ta.description };
  });

  const optionsTypesTrail = typesTrail.map((tt) => {
    return { value: tt.id_type_trail, label: tt.description };
  });

  const optionsSectors = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
  ];

  const optionsAmounts = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
  ];

  const optionsUnits = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
  ];

  async function handleNewAction(e) {
    e.preventDefault();

    console.log(sector);
    console.log(area);
    console.log(peoples);
    console.log(typeTrail);
    console.log(typeAction);
    console.log(amount);
    console.log(unit);
    console.log(description);

    try {
      const response = await api.post("actions", {
        sector_location: sector,
        area_location: area,
        date_action: new Date(),
        peoples_action: peoples,
        amount_action: amount.value,
        unit_action: unit.value,
        description_action: description,
        id_type_action: typeAction.value,
        id_type_trail: typeTrail.value,
        id_user: idUser,
      });

      history.push("/");
    } catch (err) {
      alert("Falha na criação da ação, tente novamente.");
    }
  }

  return (
    <div>
      <Header />

      <div className="new-action-container">
        <section className="form">
          <ul>
            <li>
              <div className="data-head">
                <img className="acaoImg" src={fotoContent} alt="" />

                <div className="data-details">
                  <div>
                    <strong>Número do Registro:</strong>
                    <p>{regisUser}</p>
                  </div>

                  <div>
                    <strong>DATA:</strong>
                    <p>{new Date().toLocaleDateString()}</p>
                  </div>

                  <div>
                    <strong>Status:</strong>
                    <p>Pendente</p>
                  </div>

                  <div>
                    <strong>Responsável:</strong>
                    <p>{userName}</p>
                  </div>

                  <div>
                    <strong>Equipe:</strong>
                    <p>{userTeam}</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <form onSubmit={handleNewAction}>
            <Select
              className="select sector-select mb-3"
              placeholder="Setor"
              options={optionsSectors}
              onChange={setSector}
            />

            <input
              placeholder="Área"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />

            <input
              placeholder="Pessoal extra"
              value={peoples}
              onChange={(e) => setPeoples(e.target.value)}
            />

            <h1>Ações</h1>
            <div className="select-action-container">
              <Select
                placeholder="Manejo de trilha"
                className="select"
                options={optionsTypesAction}
                onChange={setTypeAction}
              />
              <Select
                placeholder="Escolha uma ação"
                className="select"
                options={optionsTypesTrail}
                onChange={setTypeTrail}
              />

              <div className="select-amount-unit-container">
                <Select
                  placeholder="Quantidade"
                  className="select"
                  options={optionsAmounts}
                  onChange={setAmount}
                />
                <Select
                  placeholder="Unidade"
                  className="select"
                  options={optionsUnits}
                  onChange={setUnit}
                />
              </div>
            </div>

            <h1>Descrição</h1>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <button className="button" type="submit">
              ENVIAR
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
