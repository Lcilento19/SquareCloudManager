import "../../home.scss";
import "./dashboardapp.scss";

import { useState, useEffect } from "react";
import {
  getAppByID,
  getStatusApp,
  startApp as startApplication,
  stopApp as stopApplication,
  restartApp as restartApplication,
  getAppLogs,
} from "../../functions";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { FaStop } from "react-icons/fa";
import { VscDebugConsole } from "react-icons/vsc";
import { RiRestartLine } from "react-icons/ri";
import { toast } from "react-toastify";

export default function DashBoardApp() {
  const [appData, setAppData] = useState({});
  const [appStatus, setAppStatus] = useState({});
  const [appLogs, setAppLogs] = useState("");
  const [appIDInput, setAppIDInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  async function fetchAppData(appID) {
    const trimmedAppID = appID.trim(); 

    if (trimmedAppID) {
      try {
        const appData = await getAppByID(trimmedAppID);
        setAppData(appData);
        const appStatus = await getStatusApp(trimmedAppID);
        setAppStatus(appStatus);
      } catch (error) {
        console.error("Erro ao buscar dados da aplicação:", error);
        setNotFound(true);
      }
    }
  }

  async function getAppLogsData(appID) {
    const trimmedAppID = appID.trim(); 

    if (trimmedAppID) {
      try {
        setLoading(true);
        const logsResponse = await getAppLogs(trimmedAppID);
        setLoading(false);
        if (logsResponse && logsResponse.response) {
          setAppLogs(logsResponse.response.logs);
        } else {
          setAppLogs("Erro ao obter logs.");
        }
      } catch (error) {
        console.error("Erro ao buscar logs da aplicação:", error);
        setAppLogs("Erro ao obter logs.");
      }
    }
  }

  async function startApp() {
    const trimmedAppID = appIDInput.trim(); 

    if (trimmedAppID) {
      try {
        await startApplication(trimmedAppID);
        toast.success("Aplicação iniciada, aguarde!");
        fetchAppData(trimmedAppID);
      } catch (error) {
        console.error("Erro ao iniciar a aplicação:", error);
      }
    }
  }

  async function stopApp() {
    const trimmedAppID = appIDInput.trim();

    if (trimmedAppID) {
      try {
        await stopApplication(trimmedAppID);
        toast.warn("Aplicação parada, aguarde!");
        fetchAppData(trimmedAppID);
      } catch (error) {
        console.error("Erro ao parar a aplicação:", error);
      }
    }
  }

  async function restartApp() {
    const trimmedAppID = appIDInput.trim(); 

    if (trimmedAppID) {
      try {
        await restartApplication(trimmedAppID);
        toast.success("Aplicação reiniciada, aguarde!");
        fetchAppData(trimmedAppID);
      } catch (error) {
        console.error("Erro ao reiniciar a aplicação:", error);
      }
    }
  }

  useEffect(() => {
    fetchAppData(appIDInput);
  }, [appIDInput]);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
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
      {notFound && (
        <p>Aplicação não encontrada ou erro ao carregar os dados.</p>
      )}
      {loading && !notFound && <p>Carregando...</p>}
      {appData?.response && !notFound && !loading && (
        <div className="app-info">
          <img className="app-avatar" src={appData?.response?.avatar} alt="" />
          <span>{appData?.response?.name}</span>
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
            <button
              className="btn-logs"
              onClick={() => getAppLogsData(appIDInput)}
            >
              <VscDebugConsole size={20} />
            </button>
          </div>
        </div>
      )}
      <ul>
        <li>{appData?.response?.desc}</li>
        <li>
          <strong>Status: </strong>
          {appStatus?.response?.status === "running" ? (
            <span className="info-success">{appStatus?.response?.status}</span>
          ) : (
            <span className="info-failed">{appStatus?.response?.status}</span>
          )}
        </li>
        <li>
          <strong>ID:</strong> {appData?.response?.id}
        </li>
        <li>
          <strong>Dono:</strong> {appData?.response?.owner}
        </li>
        <textarea
          name="Console"
          className="console"
          defaultValue={appLogs}
          readOnly
        ></textarea>
      </ul>
    </div>
  );
}
