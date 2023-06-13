import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();
  const autenticarUsuario = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clientAxios("/veterinarios/perfil", config);

      setAuth(data);
      navigate("/admin");
    } catch (error) {
      console.error(error.response.data.msg);
      setAuth({});
    }
  };

  const actualizarPerfil = async (datos) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = `/veterinarios/perfil/${datos._id}`;
      const { data } = await clientAxios.put(url, datos, config);

      return {
        msg: "Almacenado Correctamente",
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  useEffect(() => {
    autenticarUsuario();
    setCargando(false);
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setAuth({});
  };

  const guardarPassword = async (datos) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = "/veterinarios/actualizar-password";
      const { data } = await clientAxios.put(url, datos, config);

      return {
        msg: data.msg,
      };
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        actualizarPerfil,
        guardarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
