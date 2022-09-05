import { Tooltip } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getPetByName,
  getUserByName,
  switchRenderAction,
} from "../../redux/Actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("mascota");
  dispatch(switchRenderAction(input));
  const [namePet, setNamePet] = useState("");
  const [nameUser, setNameUser] = useState("");
  const getPetNow = async () => dispatch(getPetByName(namePet));
  const getUserNow = async () => dispatch(getUserByName(nameUser));

  function handleToogle(e) {
    if (input === "mascota") {
      setInput("usuario");
    } else {
      setInput("mascota");
    }
    dispatch(switchRenderAction(input));
  }

  function handleInputChange(e) {
    e.preventDefault();
    setNamePet(e.target.value);
    setNameUser(e.target.value);
    getPetNow(namePet);
    getUserNow(nameUser);
  }

  return (
    <div className="flex flex-col">
      <label for="input-group-search" class="sr-only">
        Search
      </label>
      <div class="relative">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          onChange={(e) => handleInputChange(e)}
          type="text"
          id="input-group-search"
          class="block p-2 pl-10 w-4/6 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
          placeholder="Buscar..."
        />
      </div>

      <label
        htmlFor="small-toggle"
        className="inline-flex relative items-center mb-5 m-2 cursor-pointer"
      >
        <input
          type="checkbox"
          value={input}
          id="small-toggle"
          className="sr-only peer"
          onChange={(e) => handleToogle(e)}
        />
        <div className="w-9 h-5 mb-1 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-900"></div>
        {/* TERNARIOS switch FALOPA,SI SACO EL DE ARRIBA NO ME RENDERIZA EL DE ABAJO-.-.--.-.-.-.-.-.-.-.- */}
        {input.length > 0 ? (
          input === "mascota" ? (
            <Tooltip content="Pulsa para mostrar usuarios" placement="top">
              <span className="ml-6 text-sm font-medium text-white-900 dark:text-gray-300">
                Mostrando Mascotas
              </span>
            </Tooltip>
          ) : (
            <Tooltip content="Pulsa para mostrar mascotas" placement="top">
              <span className="m-2 text-2x1 font-medium text-white-900 dark:text-gray-300">
                Mostrando Usuarios
              </span>
            </Tooltip>
          )
        ) : (
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Mascotas/Usuarios
          </span>
        )}
      </label>
    </div>
  );
}
