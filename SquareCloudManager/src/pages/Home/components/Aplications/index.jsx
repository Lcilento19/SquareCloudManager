import "../../home.scss";
import "./applications.scss";

import { useState, useEffect } from "react";
import { getAppByID } from "../../functions";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom/dist";

export default function AppInfo() {
  const [appdata, setAppData] = useState({});
  const [appIDInput, setAppIDInput] = useState("");

  useEffect(() => {
    async function fetchAppData(appID) {
      if (appID && appID.trim() !== "") {
        try {
          const appData = await getAppByID(appID);
          setAppData(appData);
        } catch (error) {
          console.error("Erro ao buscar dados da aplicação:", error);
        }
      }
    }
    fetchAppData(appIDInput);
  }, [appIDInput]);

  return (
    <ul className="info-square info-apps">
      <h1>Informações da Aplicação</h1>
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
        <img
          className="app-avatar"
          src={appdata?.response?.app?.avatar}
          alt=""
        />
        <span>{appdata?.response?.app?.name ?? "Carregando..."}</span>
      </li>
      <span>{appdata?.response?.app?.desc ?? "Carregando..."}</span>
      <li>
        <strong>ID: </strong> {appdata?.response?.app?.id ?? "Carregando..."}
      </li>
      <li>
        <strong>Dono: </strong>
        {appdata?.response?.app?.owner ?? "Carregando..."}
      </li>
      {appdata?.response?.app?.isWebsite === "false" ? (
        ""
      ) : (
        <li>
          <strong>Domínio: </strong>
          <Link target="_blank" href={appdata?.response?.app?.domain}>
            {appdata?.response?.app?.domain}
          </Link>
        </li>
      )}
    </ul>
  );
}
