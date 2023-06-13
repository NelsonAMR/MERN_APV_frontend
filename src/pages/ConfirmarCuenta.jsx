import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clientAxios from "../config/axios";

function ConfirmarCuenta() {
  const [confirmada, setConfirmada] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [alerta, setAlerta] = useState({});

  const { id } = useParams();

  const confirmarCuenta = async () => {
    try {
      const url = `/veterinarios/confirmar/${id}`;
      const { data } = await clientAxios(url);

      setConfirmada(true);
      setAlerta({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    confirmarCuenta();
  }, []);

  return (
    <Fragment>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl">
          Confirma tu cuenta y empieza a administrar {""}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {!isLoading && <Alerta alerta={alerta} />}
        {confirmada && (
          <Link to="/" className="block text-center my-5 text-gray-500">
            Iniciar Sesion
          </Link>
        )}
      </div>
    </Fragment>
  );
}

export default ConfirmarCuenta;
