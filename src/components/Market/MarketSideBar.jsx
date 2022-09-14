import React from "react"
import SearchBarProduct from "../SearchBars/SearchBarProduct.jsx"

export default function MarketSideBar({ setCurrentPage }) {


    return (
        <nav className="w-full h-full flex flex-col items-center justify-around bg-yellow-700">
            <div>
                <h1 className="text-2xl text-white font-semibold">MarketPlace</h1>
            </div>
            <div>
                <SearchBarProduct
                    setCurrentPage={setCurrentPage}
                />
            </div>
            <div>
                <h3>FILTROS</h3>
            </div>
        </nav>
    )
}