import React, { useEffect, useState } from "react";
import "./home.scss";
import ServiceStatus from "./components/ServiceStatus";
import UserInfo from "./components/UserInfo";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AppInfo from "./components/Applications";
import DashBoardApp from "./components/DashBoardApp";

function Home() {
  return (
    <div className="home-container">
      <Header />
      <div className="component">
        <ServiceStatus />
        <UserInfo />
        <DashBoardApp />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
