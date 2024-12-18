import Head from "next/head";
import React from "react";
import App from "../app/App";
import "./styles/styles.css";
const HomePage = () => {
  return (
    <div>
      <Head>
        <title>EasyReserves</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App />
    </div>
  );
};

export default HomePage;
