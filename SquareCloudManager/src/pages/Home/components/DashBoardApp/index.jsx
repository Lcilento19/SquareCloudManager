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
import { BsFillPlayFill, BsStop, MdRefresh } from "react-icons/bs";
import { toast } from "react-toastify";

export default function DashBoardApp() {
  const [appData, setAppData] = useState(null);
  const [appStatus, setAppStatus] = useState(null);
  const [appIDInput, setAppIDInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchAppData = async (appID) => {
    setLoading(true);
    setNotFound(false);

    try {
      const appData = await getAppByID(appID);
      if (appData && appData.response) {
        setAppData(appData.response);
        const appStatus = await getStatusApp(appID);
        setAppStatus(appStatus.response);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Erro ao buscar dados da aplicação:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (appIDInput.trim() !== "") {
      fetchAppData(appIDInput);
    }
  }, [appIDInput]);

  const startApp = async () => {
    try {
      await startApplication(appIDInput);
      toast.success("Aplicação iniciada, aguarde!");
      fetchAppData(appIDInput);
    } catch (error) {
      console.error("Erro ao iniciar a aplicação:", error);
    }
  };

  const stopApp = async () => {
    try {
      await stopApplication(appIDInput);
      toast.warn("Aplicação parada, aguarde!");
      fetchAppData(appIDInput);
    } catch (error) {
      console.error("Erro ao parar a aplicação:", error);
    }
  };

  const restartApp = async () => {
    try {
      await restartApplication(appIDInput);
      toast.success("Aplicação reiniciada, aguarde!");
      fetchAppData(appIDInput);
    } catch (error) {
      console.error("Erro ao reiniciar a aplicação:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="search-input">
        <AiOutlineSearch className="search-icon" />
        <input
          type="text"
          placeholder="Insira o ID da aplicação"
          value={appIDInput}
          onChange={(e) => setAppIDInput(e.target.value)}
        />
      </div>
      {notFound && (
        <p>Aplicação não encontrada ou erro ao carregar os dados.</p>
      )}
      {loading && !notFound && <p>Carregando...</p>}
      {appData && !notFound && !loading && (
        <div className="app-info">
          <img className="app-avatar" src={appData.avatar} alt={appData.name} />
          <span>{appData.name}</span>
          <div className="dashboard-buttons">
            <button className="btn-play" onClick={startApp}>
              <BsFillPlayFill size={20} />
            </button>
            <button className="btn-stop" onClick={stopApp}>
              <BsStop size={20} />
            </button>
            <button className="btn-restart" onClick={restartApp}>
              <MdRefresh size={20} />
            </button>
          </div>
          <p>{appData.desc}</p>
          <p>
            <strong>Status: </strong>
            {appStatus?.status === "running" ? (
              <span className="info-success">{appStatus.status}</span>
            ) : (
              <span className="info-failed">{appStatus.status}</span>
            )}
          </p>
          <p>
            <strong>ID:</strong> {appData.id}
          </p>
          <p>
            <strong>Dono:</strong> {appData.owner}
          </p>
        </div>
      )}
    </div>
  );
}
