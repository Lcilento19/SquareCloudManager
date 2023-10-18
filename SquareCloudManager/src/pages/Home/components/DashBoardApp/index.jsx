import "../../home.scss";
import "./dashboardapp.scss";

import { useState, useEffect } from "react";
import {
  getAppByID,
  getStatusApp,
  startApp as startApplication,
  stopApp as stopApplication,
  restartApp as restartApplication,
} from "../../functions";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { FaStop } from "react-icons/fa";
import { RiRestartLine } from "react-icons/ri";
import { toast } from "react-toastify";

export default function DashBoardApp() {
  const [appdata, setAppData] = useState({});
  const [appstatus, setAppStatus] = useState({});
  const [appIDInput, setAppIDInput] = useState("");
  const [appNotFound, setAppNotFound] = useState(false);

  async function fetchAppData(appID) {
    if (appID && typeof appID === "string" && appID.trim() !== "") {
      try {
        const appData = await getAppByID(appID);
        if (appData.response) {
          setAppData(appData);
          setAppNotFound(false);
          const appStatus = await getStatusApp(appID);
          setAppStatus(appStatus);
        } else {
          setAppData({});
          setAppStatus({});
          setAppNotFound(true);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da aplicação:", error);
        setAppNotFound(true);
      }
    }
  }

  useEffect(() => {
    fetchAppData(appIDInput);
  }, [appIDInput]);

  async function startApp() {
    if (
      appIDInput &&
      typeof appIDInput === "string" &&
      appIDInput.trim() !== ""
    ) {
      try {
        await startApplication(appIDInput);
        toast.success("Aplicação iniciada, aguarde!");
        fetchAppData(appIDInput);
      } catch (error) {
        console.error("Erro ao iniciar a aplicação:", error);
        setAppNotFound(true);
      }
    }
  }

  async function restartApp() {
    if (
      appIDInput &&
      typeof appIDInput === "string" &&
      appIDInput.trim() !== ""
    ) {
      try {
        await restartApplication(appIDInput);
        toast.success("Aplicação reiniciada, aguarde!");
        fetchAppData(appIDInput);
      } catch (error) {
        console.error("Erro ao reiniciar a aplicação:", error);
        setAppNotFound(true);
      }
    }
  }

  async function stopApp() {
    if (
      appIDInput &&
      typeof appIDInput === "string" &&
      appIDInput.trim() !== ""
    ) {
      try {
        await stopApplication(appIDInput);
        toast.warn("Aplicação parada, aguarde!");
        fetchAppData(appIDInput);
      } catch (error) {
        console.error("Erro ao parar a aplicação:", error);
        setAppNotFound(true);
      }
    }
  }

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

      {appNotFound ? (
        <li>
          <p>Aplicação não encontrada ou erro ao carregar os dados.</p>
        </li>
      ) : appdata.response && appdata.response.avatar ? (
        <li className="app-info">
          <img className="app-avatar" src={appdata.response.avatar} alt="" />
          <span>{appdata.response.name || "Carregando..."}</span>
          <div className="dashboard-buttons">
            <button className="btn-play" onClick={startApp}>
              <BsFillPlayFill size={20} />
            </button>
            <button className="btn-restart" onClick={restartApp}>
              <RiRestartLine size={20} />
            </button>
            <button className="btn-stop" onClick={stopApp}>
              <FaStop size={20} />
            </button>
          </div>
        </li>
      ) : (
        <li>
          <p>Carregando...</p>
        </li>
      )}

      <span>{appdata.response?.desc || "Carregando..."}</span>

      {appstatus.response ? (
        <li>
          <strong>Status: </strong>
          {appstatus.response.status === "running" ? (
            <span className="info-success">{appstatus.response.status}</span>
          ) : (
            <span className="info-failed">{appstatus.response.status}</span>
          )}
        </li>
      ) : null}

      {appdata.response ? (
        <>
          <li>
            <strong>ID: </strong> {appdata.response.id || "Carregando..."}
          </li>
          <li>
            <strong>Dono: </strong>
            {appdata.response.owner || "Carregando..."}
          </li>
        </>
      ) : null}
    </ul>
  );
}
