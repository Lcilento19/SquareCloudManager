import { useState, useEffect } from "react";
import { getServiceStatistics } from "../../functions";
import "../../home.scss";

export default function ServiceStatus() {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchServiceData() {
      const serviceData = await getServiceStatistics();
      if (serviceData) {
        setData(serviceData);
      }
    }
    fetchServiceData();
  }, []);

  return (
    <ul className="info-square">
      <h1>Serviço SquareCloud</h1>
      <li>
        <strong>Status: </strong>
        {data.status === "success" ? (
          <span className="info-success">{data.status}</span>
        ) : (
          <span className="info-failed">{data.status}</span>
        )}
      </li>
      <li>
        <strong>Usuários: </strong>
        {data.response?.statistics?.users ?? "Carregando..."}
      </li>
      <li>
        <strong>Aplicações: </strong>
        {data.response?.statistics?.apps ?? "Carregando..."}
      </li>
      <li>
        <strong>Websites: </strong>
        {data.response?.statistics?.websites ?? "Carregando..."}
      </li>
    </ul>
  );
}
