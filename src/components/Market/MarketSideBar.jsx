import {React, useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import { filtrosMarket } from "../../redux/Actions/index.js";
import SearchBarProduct from "../SearchBars/SearchBarProduct.jsx"



export default function MarketSideBar({ setCurrentPage }) {
    const dispatch = useDispatch()
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

    })
  }

  function handlerMin(ev) {
    setFilterParamsMarket({
        ...filterParamsMarket,
        priceMin: ev.target.value
    })
  }
 function handlerButton(ev){
    ev.preventDefault()
    dispatch(filtrosMarket(filterParamsMarket))
} 

    return (
        <nav className="w-screen  h-30 flex lg:flex-row pt-14 items-center justify-around bg-yellow-500">
            <div className="flex flex-col lg:flex-row justify-center items-center">
                <SearchBarProduct
                    setCurrentPage={setCurrentPage}
                />
            </div>
            <div>
                <h3>FILTROS</h3>
                 <select onChange={(ev) => handlerCategory(ev)}>
                <option hidden value="all">Categoria</option>
                {Array.from(new Set (allProducts.map((ev) => ev.category))).map((ev) => (<option value={ev}>{ev}</option>))}
                </select>
            </div>
            <select onChange={(ev) => handlerType(ev)}>
            <option hidden value ="all">Animal</option>
                <option value="perro">Perros</option>
                <option value="gato">Gatos</option>
                <option value="otro">Otros</option>
            </select>
            <form onSubmit = {(ev) => handlerButton(ev)}>
            <div>
                <input onChange={(ev) => handlerMin(ev)} value={filterParamsMarket.priceMin} type="number" placeholder="Precio Minimo"/>
            </div>
            <div>
                <input onChange={(ev) => handlerMax(ev)} value={filterParamsMarket.priceMax} type="number" placeholder="Precio Maximo"/>
           {/*      {filterParamsMarket.priceMin > filterParamsMarket.priceMax && filterParamsMarket.priceMax !== null?<p>Valores invalidos</p>:<></>} */}
            </div>
             <button type="submit">Buscar</button>    
            </form>
        </nav>
    )
}
