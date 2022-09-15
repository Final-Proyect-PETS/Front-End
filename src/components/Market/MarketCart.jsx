import React from "react";
import NavBar from "../NavBar/NavBar";
import ProductCard from "./ProductCard";
import { useState } from "react";
import { notificationSwal } from "../../utils/notificationSwal";
import { useDispatch, useSelector } from "react-redux";
import { paymentCart } from "../../redux/Actions";

export default function MarketCart() {
  const dispatch = useDispatch();

  const products = localStorage.getItem("carrito");

  const pro = JSON.parse(products);

  console.log(pro);

  const user = useSelector((state) => state.userProfile);

  const [generating0, setGenerating0] = useState(false);

  function handleInput(e) {
    e.preventDefault(); //se crea orden de pago
    // setInput({
    //   price: product?.price,
    // });
    if (pro.length > 0) {
      setGenerating0(true);
      dispatch(paymentCart(user._id, pro))
        .then((payment) => {
          console.log(payment, "PAYMENT");
          const script = document.createElement("script");
          const attr_data_preference =
            document.createAttribute("data-preference-id");
          attr_data_preference.value = payment.payload.id; //que carajo eseste payload
          script.src =
            "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
          script.setAttributeNode(attr_data_preference);
          document.getElementById("form0").appendChild(script);
        })
        .then(() => {
          setGenerating0(false);
        });
    } else if (pro?.length) {
      notificationSwal(
        "¡Ooops!",
        "Sólo se permite pagar con números",
        "error",
        "Aceptar"
      );
    } else if (!pro?.length) {
      notificationSwal(
        "¡Ooops!",
        "Debe ingresar el monto a pagar",
        "error",
        "Aceptar"
      );
    } else {
      notificationSwal(
        "¡Ooops!",
        "El monto a pagar debe ser mayor a cero",
        "error",
        "Aceptar"
      );
    }
  }

  return (
    <>
      <NavBar />
      <section className="w-full h-full flex flex-col items-center">
        <div className="pt-24 flex flex-col justify-center items-center gap-10">
          <div>
            <h1>Carrito</h1>
          </div>
          <div className="flex flex-col gap-10">
            {pro?.map((d) => (
              <>
                <ProductCard
                  name={d.product.name}
                  image={d.product.image}
                  price={d.product.price}
                  stock={d.product.stock}
                  quantity={d.quantity}
                />
              </>
            ))}
          </div>
          <div className="flex items-center mb-6 -mt-4 w-full">
            <button
              type="submit"
              className="py-2 px-4 w-full bg-yellow-900 hover:bg-yellow-800 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg flex items-center justify-center ml-2"
              onClick={(e) => handleInput(e)}
            >
              Comprar
            </button>
            <p className="text-xl text-gray-800 font-normal text-center">
              {generating0 ? "Generando orden..." : null}
            </p>
            <form id="form0" className="place-self-center pl-2"></form>
          </div>
        </div>
      </section>
    </>
  );
}
