import React, { useEffect, useState } from "react";
import Alerta from "../components/Alerta";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";

function CambiarPass() {
  const { guardarPassword } = useAuth();
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({ pass1: "", pass2: "" });

  const { msg } = alerta;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(password).some((campo) => campo === "")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });

      return;
    }

    if (password.pass2.length < 6) {
      setAlerta({
        msg: "El password debe tener minimo 6 caracteres",
        error: true,
      });

      return;
    }

    const respuesta = await guardarPassword(password);

    setAlerta(respuesta);
  };

  return (
    <>
      <AdminNav />

      <p className="font-black text-3xl text-center mt-10">
        Modifica tu{" "}
        <span className="text-indigo-600 font-bold">Password aqui</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Password Actual
              </label>
              <input
                type="password"
                name="pass1"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Escribe tu password actual"
                onChange={(e) =>
                  setPassword({ ...password, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Password Nuevo
              </label>
              <input
                type="password"
                name="pass2"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Escribe tu nuevo password"
                onChange={(e) =>
                  setPassword({ ...password, [e.target.name]: e.target.value })
                }
              />
            </div>

            <input
              type="submit"
              className="bg-indigo-700 px-10 py-3 font-bold mt-5 text-white uppercase rounded-lg w-full cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default CambiarPass;
