import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/Actions";
import NavBar from "../NavBar/NavBar";
import ProductCard from "./ProductCard";

export default function Market() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <div className="w-full flex bg-red-200 pt-24 gap-10">
        {products?.map((d) => (
          <ProductCard
            name={d.name}
            image={d.image}
            price={d.price}
            stock={d.stock}
          />
        ))}
      </div>
    </>
  );
}
