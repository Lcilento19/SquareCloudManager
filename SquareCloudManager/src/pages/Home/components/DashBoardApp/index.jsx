import "../../home.scss";
import "./dashboardapp.scss";

import { useState, useEffect } from "react";
import { getAppByID, getStatusApp } from "../../functions";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillPlayFill, BsStop } from "react-icons/bs";
import { MdRestartAlt } from "react-icons/md";

export default function DashBoardApp() {
  const [appdata, setAppData] = useState({});
  const [appstatus, setAppStatus] = useState({});
  const [appIDInput, setAppIDInput] = useState("");

  useEffect(() => {
    async function fetchAppData(appID) {
      if (appID && appID.trim() !== "") {
        try {
          const appdata = await getAppByID(appID);
          setAppData(appdata);
          const appstatus = await getStatusApp(appID);
          setAppStatus(appstatus);
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      }
    }
    fetchAppData(appIDInput);
  }, [appIDInput]);
  return (
    <ul className="info-square dashboard">
      <h1>Dashboard</h1>
      <li>
        <div className="search-input">
          <div className="search-container">
            <AiOutlineSearch className="search-icon" />
            <input
              type="text"
              placeholder="Insira o ID da aplicação"
              value={appIDInput}
              onChange={(e) => setAppIDInput(e.target.value)}
            />
          </div>
        </div>
      </li>
      <li className="app-info">
        <img className="app-avatar" src={appdata.response?.avatar} alt="" />
        <span>{appdata?.response?.name ?? "Carregando..."}</span>
        <div className="dashboard-buttons">
          <button className="btn-play">
            <BsFillPlayFill size={20} />
          </button>
          <button className="btn-restart">
            <MdRestartAlt size={20} />
          </button>
          <button className="btn-stop">
            <BsStop size={20} />
          </button>
        </div>
      </li>
      <span>{appdata?.response?.desc ?? "Carregando..."}</span>
      <li>
        <strong>Status:</strong> {appstatus?.response?.status ?? "Carregando..."}
      </li>
      <li>
        <strong>ID: </strong> {appdata?.response?.id ?? "Carregando..."}
      </li>
      <li>
        <strong>Dono: </strong>
        {appdata?.response?.owner ?? "Carregando..."}
      </li>
    </ul>
  );
}
