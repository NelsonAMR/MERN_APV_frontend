import React, { useEffect, useState } from "react";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";
import AdminNav from "../components/AdminNav";

function EditarPerfil() {
  const { auth, actualizarPerfil } = useAuth();
  const [perfil, setPerfil] = useState({});
  const [alerta, setAlerta] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;

    setPerfil({ ...perfil, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, email } = perfil;

    if ([nombre, email].includes("")) {
      setAlerta({
        msg: "Email y nombre son obligatorios",
        error: true,
      });
      return;
    }

    const resultado = await actualizarPerfil(perfil);

    setAlerta(resultado);
  };

  const { msg } = alerta;

  useEffect(() => {
    setPerfil(auth);
  }, [auth]);
  return (
    <>
      <AdminNav />

      <p className="font-black text-3xl text-center mt-10 mb-5">
        Modifica tu{" "}
        <span className="text-indigo-600 font-bold">informacion aqui</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={perfil.nombre || ""}
                onChange={handleChange}
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Sitio Web
              </label>
              <input
                type="text"
                name="web"
                value={perfil.web || ""}
                onChange={handleChange}
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Telefono
              </label>
              <input
                type="text"
                name="telefono"
                value={perfil.telefono || ""}
                onChange={handleChange}
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">Email</label>
              <input
                type="text"
                name="email"
                value={perfil.email || ""}
                onChange={handleChange}
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
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

export default EditarPerfil;
