import React from "react";
import SearchBarProduct from "../SearchBars/SearchBarProduct.jsx";

export default function MarketSideBar({ setCurrentPage }) {
  return (
    <nav className="w-screen  h-30 flex lg:flex-row pt-14 items-center justify-around bg-yellow-500">
      <div className="flex flex-col lg:flex-row justify-center items-center">
        <div className="pt-5">
          <SearchBarProduct /* setCurrentPage={setCurrentPage} */ />
        </div>
      </div>
      <div>
        <h3>FILTROS</h3>
      </div>
    </nav>
  );
}
