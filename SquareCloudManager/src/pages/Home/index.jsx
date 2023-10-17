import React, { useEffect, useState } from "react";
import "./home.scss";
import ServiceStatus from "./components/ServiceStatus";
import UserInfo from "./components/UserInfo";
import Header from "../../components/Header";
import AppInfo from "./components/Applications";

function Home() {
  return (
    <div className="home-container">
      <Header />
      <div className="component">
        <ServiceStatus />
        <UserInfo />
        <AppInfo />
      </div>
    </div>
  );
}

export default Home;
