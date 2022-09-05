import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "flowbite-react/lib/esm/components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  getUserDetail,
  clearState,
  getPetDetail,
  chatWithUser,
} from "../../redux/Actions";
import NavBar from "../NavBar/NavBar";
import OwnedPet from "./OwnedPet";
import Loader from "./../Loaders/Loader";
import "./userDetailStyle.css";
import mapboxgl from "mapbox-gl";
import portada from "./../../assets/images/Background2.png"

export default function UserDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearState());
    dispatch(getUserDetail(id));
    dispatch(getPetDetail(id));
  }, [dispatch, id]);

  const loggedUser = useSelector((state) => state.userProfile);
  const userDetail = useSelector((state) => state.userDetail);
  const mapDiv = useRef(null);

  useLayoutEffect(() => {
    createNewMap(userDetail.place_longitude, userDetail.place_latitude);
  }, [userDetail.place_latitude, userDetail.place_longitude]);

  function createNewMap(long, lat) {
    if (userDetail.place_latitude && userDetail.place_longitude) {
      new mapboxgl.Map({
        container: mapDiv.current, // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [long, lat], // starting position [lng, lat]
        zoom: 12, // starting zoom
        projection: "globe", // display the map as a 3D globe
      });
    }
  }

  console.log(userDetail);

  const [show, setShow] = useState(false);

  const onClick = () => {
    setShow(true);
  };

  const onClose = () => {
    setShow(false);
  };

  function chat() {
    dispatch(
      chatWithUser({ senderId: loggedUser._id, receiverId: userDetail._id })
    ).then((e) => {
      navigate("/chat");
    });
  }

  mapboxgl.accessToken =
    "pk.eyJ1IjoicG9saW5vIiwiYSI6ImNsN2FtdWNybTB0bmk0MHNqZXZxMzM0OTYifQ.O2Y9sZnF-K1k_KhC8MzJbA";

  return Object.keys(userDetail).length ? (
    <div className="h-screen">
      <NavBar />
      <Modal
        show={show}
        popup={true}
        onClose={onClose}
        class="bg-gray-800 bg-opacity-500"
      >
        <div className="pl-2 p-3 bg-yellow-600 rounded-md">
          <Modal.Header>
            <p className="text-white">
              {userDetail.first_name} {userDetail.last_name}
            </p>
          </Modal.Header>
        </div>
        <Modal.Body class="p-6">
          <div className="space-y-6">
            <div>
              <div>
                <div className="h-80">
                  <div className="h-1/4 flex items-center justify-center flex-col">
                    <div className="bg-white flex justify-center">

                      <h2 className="text-xl font-semibold">
                        📩 Email: {userDetail.email}
                      </h2>

                    </div>
                  </div>
                  <div className="h-1/4 flex items-center justify-center flex-col">
                    <div className="bg-white flex justify-center">

                      <h2 className="text-xl font-semibold">
                        📞Telefono:{" "}
                        {userDetail.telephone
                          ? userDetail.telephone
                          : "No hay información detallada"}
                      </h2>
                    </div>
                  </div>
                  <div className="h-1/4 flex items-center justify-center flex-col">
                    <div className="bg-white flex justify-center">
                      <h2 className="text-xl font-semibold">
                        📍 Ubicación: {userDetail.place}
                      </h2>
                    </div>
                  </div>
                  <div className="h-1/4 flex items-center justify-center flex-col">
                    <div className="bg-white flex justify-center">
                      <h2 className="text-xl font-semibold">
                        Cuenta creada el: {userDetail.createdAt.slice(0, 10)}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <>
        <div className="lg:mx-36 my-12 h-5/6 rounded-xl bg-yellow-800 ring-2 ring-[#e1a13f]">
          <div className="h-2/3">
            <div className="flex h-2/5">
              <img
                src={portada}
                alt=""
                className="w-screen object-cover rounded-t-xl"
              />
              <div className="absolute lg:mt-4 lg:ml-4 mt-48 ml-4">
                <img
                  src={userDetail.image}
                  alt=""
                  className="w-20 h-20 lg:w-80 lg:h-80 bg-cover border-solid border-2 border-[#e1a13f] rounded-full"
                />
              </div>
              
            </div>
            <div className="h-1/2 flex">
              <div className="w-1/3"></div>
              <div className="w-2/3 flex">
                <div className="w-1/2 flex flex-col justify-around">
                  <div>
                    <h3 className="text-5xl mt-4 text-white font-semibold">
                      {userDetail.first_name} {userDetail.last_name}
                    </h3>
                    <p className="font-semibold text-white">
                      ({userDetail.username})
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#e1a13f] ">
                      Descripción:{" "}
                      {userDetail.about
                        ? userDetail.about
                        : "Este usuario no ha aportado descripción aún"}
                    </h3>
                  </div>
                </div>
                <div className="w-3/4 lg:m-8">
                  {userDetail.place_latitude && userDetail.place_longitude ? (
                    <div
                      ref={mapDiv}
                      className="ring-[#f19d3d] ring-2 h-60 rounded-xl"
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="h-1/3 pt-5 flex">
            <div className="w-full flex justify-center items-center mt-10">
              {loggedUser._id !== userDetail._id ? (
                <div>
                  <button
                    onClick={() => chat()}
                    className="lg:py-2 lg:px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  >
                    Enviar mensaje
                  </button>
                </div>
              ) : (
                <></>
              )}
              {loggedUser._id === userDetail._id ? (

                <>

                  <Link to="/interestedtraders">
                    <button className="py-2 mt-5 ml-5 px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                      Traspaso de mascotas
                    </button>
                  </Link>
                  <Link to="/updateuser">
                    <button className="py-2 mt-5 ml-5 px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                      ✏️Editar Perfil
                    </button>
                  </Link>
                </>
              ) : (
                false
              )}
              <Button
                onClick={() => {
                  onClick();
                }}
                class="ml-5 px-2 py-0.5 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                Más información
              </Button>
              <Link to={`/reportuser`}>
                <button className="py-2 ml-5 px-4 md:px-4 bg-yellow-600 hover:bg-yellow-900 focus:ring-yellow-900 focus:ring-offset-yellow-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                  Denunciar
                </button>
              </Link>
            </div>

            <div className="lg:w-3/4 lg:flex lg:items-center lg:mt-14 bg-yellow-800 rounded-xl">
              
            </div>
          </div>
          <div className="bg-yellow-600 ring-2 ring-yellow-900 my-10 rounded-xl">
            <div className="w-full py-4">
                <h3 className="text-2xl font-semibold text-white text-center">Mascotas del usuario
                </h3>
              </div>
              <div id="editPet" className="grid grid-cols-3 place-content-center">
              
              {userDetail.pets?.length ? (
                userDetail.pets.map((pets) => (
                  <OwnedPet
                    key={pets._id}
                    idUser={userDetail._id}
                    idPet={pets._id}
                    namePet={pets.name}
                    imagePet={pets.image}
                    isAdopted={pets.isAdopted}
                    pets={userDetail.pets}
                    isDeleted={pets.deleted}
                    interestedUsers={userDetail.interestedUsers}
                  />
                ))
              ) : (
                <div className="h-50">
                  <h3 className="text-2xl font-semibold text-gray-700 mt-8 text-center">
                    No hay mascotas que mostrar...
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  ) : (
    <>
      <NavBar />
      <Loader />
    </>
  );
}
