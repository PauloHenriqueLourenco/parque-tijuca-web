import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Link, useHistory } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import Chart from "react-google-charts";

import Header from "../../common/Header";
import api from "../../services/api";

import acaoImg from "../../assets/acao.png";
import expandImg from "../../assets/expand_more.svg";

import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [countPerTypeAction, setCountPerTypeAction] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    api.get("dashboard/countPerTypeAction").then((response) => {
      setCountPerTypeAction(response.data);
      console.log(...response.data.map((row) => [row.description, row.count]));
    });
  }, []);

  return (
    <div>
      <Header />

      <div className="container">
        <div className="filter">
          <p>Período de </p>
          <DatePicker
            className="datepicker"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />

          <p>à </p>
          <DatePicker
            className="datepicker"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />

          <button className="filter-button" type="submit">
            FILTRAR
          </button>
        </div>

        <Chart
          width={900}
          height={700}
          chartType="ColumnChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Ação", "Quantidade"],
            ...countPerTypeAction.map((row) => [
              row.description,
              parseInt(row.count),
            ]),
            /* ["New York City, NY", 8175000, 8008000],
            ["Los Angeles, CA", 3792000, 3694000],
            ["Chicago, IL", 2695000, 2896000],
            ["Houston, TX", 2099000, 1953000],
            ["Philadelphia, PA", 1526000, 1517000], */
          ]}
          options={{
            title: "Registros de ações",
            chartArea: { width: "60%" },
            hAxis: {
              title: "Total de registros",
              minValue: 0,
            },
            vAxis: {
              title: "Ações",
            },
          }}
          legendToggle
        />
      </div>
    </div>
  );
}
