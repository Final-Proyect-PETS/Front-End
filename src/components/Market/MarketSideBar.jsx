import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filtrosMarket } from "../../redux/Actions/index.js";
import SearchBarProduct from "../SearchBars/SearchBarProduct.jsx";

export default function MarketSideBar({ setCurrentPage }) {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => state.copyPorductsAll);
  const [resetFilters, setResetFiltersMarket] = useState("false");
  const [filterParamsMarket, setFilterParamsMarket] = useState({
    type: "all",
    category: "all",
    priceMax: null,
    priceMin: null,
  });
  function reset() {
    if (resetFilters === "false") {
      setResetFiltersMarket("true");
    } else {
      setResetFiltersMarket("false");
    }
    dispatch(
      filtrosMarket({
        type: "all",
        category: "all",
        priceMax: null,
        priceMin: null,
      })
    );
    setFilterParamsMarket({
      type: "all",
      category: "all",
      priceMax: null,
      priceMin: null,
    });
  }

  function handlerType(ev) {
    ev.preventDefault();
    dispatch(
      filtrosMarket({
        ...filterParamsMarket,
        type: ev.target.value,
      })
    );
    setFilterParamsMarket({
      ...filterParamsMarket,
      type: ev.target.value,
    });
  }
  function handlerCategory(ev) {
    ev.preventDefault();
    dispatch(
      filtrosMarket({
        ...filterParamsMarket,
        category: ev.target.value,
      })
    );
    setFilterParamsMarket({
      ...filterParamsMarket,
      category: ev.target.value,
    });
  }
  function handlerMax(ev) {
    setFilterParamsMarket({
      ...filterParamsMarket,
      priceMax: ev.target.value,
    });
  }

  function handlerMin(ev) {
    setFilterParamsMarket({
      ...filterParamsMarket,
      priceMin: ev.target.value,
    });
  }
  function handlerButton(ev) {
    dispatch(
      filtrosMarket(
        {
          ...filterParamsMarket,
          priceMax: ev.target.value,
        },
        filtrosMarket({
          ...filterParamsMarket,
          priceMin: ev.target.value,
        })
      )
    );
  }

  return (
    <nav className="w-screen  h-30 flex lg:flex-row pt-14 items-center justify-around bg-yellow-500">
      <div className="flex w-1/3 flex-col lg:flex-row justify-center items-center">
        <SearchBarProduct setCurrentPage={setCurrentPage} />
      </div>
      <div className="flex items-center justify-around w-2/3">
        <div>
          <select onChange={(ev) => handlerCategory(ev)}>
            <option hidden value="all">
              Categoria
            </option>
            {Array.from(new Set(allProducts.map((ev) => ev.category))).map(
              (ev) => (
                <option value={ev}>{ev}</option>
              )
            )}
          </select>
        </div>
        <select onChange={(ev) => handlerType(ev)}>
          <option hidden value="all">
            Animal
          </option>
          <option value="perro">Perros</option>
          <option value="gato">Gatos</option>
          <option value="otro">Otros</option>
        </select>
        <from type="submit" className="flex gap-6 justify-center items-center">
          <div>
            <input
              onChange={(ev) => handlerMin(ev)}
              value={filterParamsMarket.priceMin}
              type="number"
              placeholder="Precio Minimo"
            />
          </div>
          <div>
            <input
              onChange={(ev) => handlerMax(ev)}
              value={filterParamsMarket.priceMax}
              type="number"
              placeholder="Precio Maximo"
            />
          </div>
          <button className="py-2 px-4 w-full bg-yellow-900 hover:bg-yellow-800 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg flex items-center justify-center mb-4" onClick={(ev) => handlerButton(ev)}>Buscar</button>
        </from>
      </div>
    </nav>
  );
}
