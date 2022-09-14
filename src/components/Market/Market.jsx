import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/Actions";
import NavBar from "../NavBar/NavBar";
import ProductCard from "./ProductCard";

import FooterComponent from "../FooterComponent";

import { Link } from "react-router-dom";
import Paginate from "./Paginate";
import { useState } from "react";
import MarketSideBar from "./MarketSideBar";

export default function Market() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const [CurrentPag, setCurrentPage] = useState(1);
  const [CardsPerPage, setCardsPerPage] = useState(6);
  const TotalPages = Math.ceil(products.length / CardsPerPage);

  const nextPag = () => {
    setCurrentPage(CurrentPag + 1);
  };

  const prevPag = () => {
    if (CurrentPag !== 1) setCurrentPage(CurrentPag - 1);
  };

  const firstPag = () => {
    setCurrentPage(1);
  };

  const lastPage = () => {
    setCurrentPage(TotalPages);
  };

  const IndexLastCard = CurrentPag * CardsPerPage;

  const IndexFirstCard = IndexLastCard - CardsPerPage;

  const CurrentCards = products.slice(IndexFirstCard, IndexLastCard);

  return (
    <section className="flex flex-col h-full">
      <NavBar />
      <div className="mt-14 flex w-screen h-screen justify-center">
        <div className="w-1/4">
          <MarketSideBar
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className="w-3/4 flex flex-col gap-10">
          <div className="flex bg-red-200 h-screen pt-24 gap-10 flex-wrap">
            {CurrentCards?.map((d) => (
              <Link to={"/market/product/" + d._id}>
                <ProductCard
                  name={d.name}
                  image={d.image}
                  price={d.price}
                  stock={d.stock}
                />
              </Link>
            ))}
          </div>
          <div className="flex justify-center">
            <Paginate
              CardsPerPage={CardsPerPage}
              products={products.length}
              CurrentPag={CurrentPag}
              setCurrentPage={setCurrentPage}
              firstPag={firstPag}
              prevPag={prevPag}
              nextPag={nextPag}
              lastPag={lastPage}
            ></Paginate>
          </div>
        </div>
      </div>
    </section>
  );
}
