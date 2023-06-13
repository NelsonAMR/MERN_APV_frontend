import { createContext, useState, useEffect } from "react";
import clientAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const { auth } = useAuth();

  const obtenerPacientes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios("/pacientes", config);

      setPacientes(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerPacientes();
  }, [auth]);

  const guardarPaciente = async (paciente) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (paciente.id) {
      try {
        console.log(editando);
        const { data } = await clientAxios.put(
          `/pacientes/${paciente.id}`,
          paciente,
          config
        );

        const pacientesActualizado = pacientes.map((pacienteState) =>
          pacienteState._id === data._id ? data : pacienteState
        );

        setPaciente(pacientesActualizado);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    } else {
      try {
        const { data } = await clientAxios.post("/pacientes", paciente, config);
        const { createdAt, updatedAt, __v, ...newPaciente } = data;

        setPacientes([newPaciente, ...pacientes]);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };

  const eliminarPaciente = async (id) => {
    const confirmar = confirm("¿Deseas eliminar?");

    if (confirmar) {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        await clientAxios.delete(`/pacientes/${id}`, config);

        const pacientesActualizado = pacientes.filter(
          (pacientesState) => pacientesState._id !== id
        );
        console.log(pacientesActualizado);
        setPacientes(pacientesActualizado);
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  const setEdicion = (paciente) => {
    setPaciente(paciente);
  };

  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        eliminarPaciente,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export default PacientesContext;
