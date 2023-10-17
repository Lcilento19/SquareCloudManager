import "../../home.scss";
import "./applications.scss";

import { useState, useEffect } from "react";
import { getAppByID } from "../../functions";
import { AiOutlineSearch } from "react-icons/ai";

export default function AppInfo() {
  const [appdata, setAppData] = useState({});
  const [appIDInput, setAppIDInput] = useState("");

  useEffect(() => {
    async function fetchAppData(appID) {
      if (appID && appID.trim() !== "") {
        try {
          const appdata = await getAppByID(appID);
          setAppData(appdata);
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
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
        <img className="app-avatar" src={appdata.response?.avatar} alt="" />
        <span>{appdata?.response?.name ?? "Carregando..."}</span>
      </li>
      <span>{appdata?.response?.desc ?? "Carregando..."}</span>
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
