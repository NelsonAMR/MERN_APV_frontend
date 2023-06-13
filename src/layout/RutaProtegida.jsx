import React, { Fragment } from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

function RutaProtegida() {
  const { auth, cargando } = useAuth();

  if (cargando) return "Cargando...";
  return (
    <Fragment>
      <Header />
      {auth?._id ? (
        <main className="conatiner mx-auto mt-10">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" />
      )}
      <Footer />
    </Fragment>
  );
}

export default RutaProtegida;
