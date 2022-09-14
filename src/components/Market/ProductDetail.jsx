import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../../redux/Actions";
import { notificationSwal } from "../../utils/notificationSwal";
import NavBar from "../NavBar/NavBar";
import { paymentMerp } from "../../redux/Actions";
export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch]);

  const product = useSelector((state) => state.productDetail);

  //PARTE DE PAGO---------------------
  const user = useSelector((state) => state.userProfile);
  const [input, setInput] = useState("");
  const [generating0, setGenerating0] = useState(false);

  function handleAmmount(e) {
    console.log("click");
    console.log(e.target.value, "input value");
    setInput(e.target.value);
    //input setea estado local
  }

  function handleInput(e) {
    e.preventDefault(); //se crea orden de pago
    // setInput({
    //   price: product?.price,
    // });
    if (product?.price && Number(product?.price) > 0) {
      setGenerating0(true);
      dispatch(paymentMerp(user._id, product._id, input))
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
    } else if (product?.price && isNaN(product?.price)) {
      notificationSwal(
        "¡Ooops!",
        "Sólo se permite pagar con números",
        "error",
        "Aceptar"
      );
    } else if (!product.price) {
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
  //----------------------------------
  return Object.keys(product).length ? (
    <section className="flex flex-col h-full items-center">
      <NavBar />
      <div className="m-32 flex flex-col lg:flex lg:flex-row w-full lg:w-2/3 h-full lg:h-96 bg-yellow-800 rounded-lg ring-2 ring-yellow-600">
        <div className="w-full lg:w-2/3 flex flex-col items-center lg:flex lg:flex-row">
          <div className="w-1/2 flex justify-center items-center">
            <img src={product?.image} alt="" />
          </div>
          <div className="w-1/2 h-full gap-6 lg:gap-0 flex flex-col items-center justify-around">
            <h1 className="font-semibold text-white text-2xl">
              {product?.name}
            </h1>
            <h1 className="font-semibold text-white text-2xl">
              $ {product?.price}
            </h1>
            <h2 className="font-semibold text-white">{product?.description}</h2>
            <h3 className="font-semibold text-gray-400">
              {product?.stock} en stock
            </h3>
          </div>
        </div>
        <div className="w-full lg:w-1/3 border-l mt-10 lg:mt-0 border-yellow-400 flex flex-col items-center justify-around gap-10 lg:gap-0">
          <h3 className="font-semibold text-white">En {product?.place}</h3>
          <h2 className="font-semibold text-white">
            Vendedor: {product?.user[0]?.first_name}{" "}
            {product?.user[0]?.last_name}
          </h2>

          <input
            onChange={(e) => handleAmmount(e)}
            type="number"
            min="1"
            max={product?.stock}
            className="py-2 w-1/2 px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          />

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

          <button className="py-2 w-1/2 px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
            Añadir al carrito
          </button>
        </div>
      </div>
    </section>
  ) : (
    <></>
  );
}
