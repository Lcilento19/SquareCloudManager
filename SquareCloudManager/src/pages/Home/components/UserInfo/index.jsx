import { useState, useEffect } from "react";
import { getUserByID } from "../../functions";
import { AiOutlineSearch } from "react-icons/ai";
import "./userinfo.scss";
import "../../home.scss";

export default function UserInfo() {
  const [userData, setUserData] = useState({});
  const [userIDInput, setUserIDInput] = useState("");

  useEffect(() => {
    async function fetchUserData(userID) {
      if (userID && userID.trim() !== "") {
        try {
          const userData = await getUserByID(userID);
          setUserData(userData);
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      }
    }
    fetchUserData(userIDInput);
  }, [userIDInput]);

  return (
    <ul className="info-square info-user">
      <h1>Usuário</h1>
      <li>
        <div className="search-input">
          <div className="search-container">
            <AiOutlineSearch className="search-icon" />
            <input
              type="text"
              placeholder="Insira o ID do usuário"
              value={userIDInput}
              onChange={(e) => setUserIDInput(e.target.value)}
            />
          </div>
        </div>
      </li>
      <li>
        <strong>ID: </strong> {userData?.response?.user?.id ?? "Carregando..."}
      </li>
      <li>
        <strong>Tag: </strong>{" "}
        {userData?.response?.user?.tag ?? "Carregando..."}
      </li>
      <li>
        <strong>Plano: </strong>{" "}
        {userData?.response?.user?.plan?.name ?? "Carregando..."}
      </li>
    </ul>
  );
}
