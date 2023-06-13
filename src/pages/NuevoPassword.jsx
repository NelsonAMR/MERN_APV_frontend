import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clientAxios from "../config/axios";

function NuevoPassword() {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [modPass, setModPass] = useState(false);
  const { token } = useParams();

  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password.length < 6) {
      return setAlerta({
        msg: "El password debe ser minimo de 6 caracteres",
        error: true,
      });
    }

    try {
      const url = `/veterinarios/recuperar/${token}`;
      const { data } = await clientAxios.post(url, { password });

      setAlerta({ msg: data.msg });
      setModPass(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const comprobarToken = async () => {
    try {
      await clientAxios(`/veterinarios/recuperar/${token}`);

      setAlerta({ msg: "Ingresa tu nuevo password" });
      setTokenValido(true);
    } catch (error) {
      setAlerta({
        msg: "Hubo un error con el enlace",
        error: true,
      });
      setTokenValido(false);
    }
  };

  useEffect(() => {
    comprobarToken();
  }, []);

  const { msg } = alerta;

  return (
    <Fragment>
      <div>
        <h1 className="text-indigo-600 font-black text-5xl">
          Crea tu cuenta y administra {""}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}

        {tokenValido && (
          <Fragment>
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <label className="uppercase text-gray-600 text-xl font-bold block">
                  Nuevo Password
                </label>
                <input
                  type="password"
                  placeholder="Tu nuevo password"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={password}
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <input
                type="submit"
                value="Cambiar password"
                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
              />
            </form>

            {modPass && (
              <Link to="/" className="block text-center my-5 text-gray-500">
                ¿Ya tienes cuenta?
              </Link>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

export default NuevoPassword;
