import React from "react";
import likeim from "../../assets/images/like.png";
import compartir from "../../assets/images/compartir.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { patchLikes, likePet } from "../../redux/Actions";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { Toast, Tooltip, Dropdown } from "flowbite-react";
import { ToastContext } from "flowbite-react/lib/esm/components/Toast/ToastContext";
import { Card } from "flowbite-react";

export default function PetCard({
  idUser,
  first_name,
  last_name,
  imageUser,
  idPet,
  namePet,
  imagePet,
  place,
  size,
  gender,
  likes,
}) {
  //likes***----de aca
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.userProfile);
  const allUsers = useSelector((state) => state.allUsers);
  const [buttonLike, setButtonLike] = useState({
    a: false,
    number: likes?.length,
  });
  function likeHandler(e) {
    e.preventDefault();

    let payload = {
      petId: idPet, //el likeado
      userId: loggedUser._id, //el que da like
      ownerId: idUser, //al que le llega el like
      // likesPets: likesPets, //array DESCOMMENTE SI SE ROMPE NOtIFICACION .jajajaj
    };
    if (buttonLike.a === false) {
      setButtonLike({ a: true, number: buttonLike.number + 1 });
    }
    if (buttonLike.a === true) {
      setButtonLike({ a: false, number: buttonLike.number - 1 });
    }
    let nameLike = {
      id: idPet,
      likeName: loggedUser.username,
    };

    dispatch(patchLikes(payload));

    dispatch(likePet(nameLike));
  }
  //hover quien te gusta ------ POSIBLE FALLO DE RENDIMIENTO-

  //likes--hasta aca , casi te vas
  return (
    <Link to={`/pet/${idPet}`}>
      <div class="flex justify-between w-full h-56 mt-14 opacity-100  bg-gray-100 rounded-lg border shadow-md hover:bg-yellow-500  hover:opacity-100">
        <img
          className="object-cover w-1/2 h-56 rounded-t-lg lg:h-auto lg:rounded-none lg:rounded-l-lg"
          src={imagePet}
          alt=""
        />

        <div className="flex flex-col justify-between">
          <div className="flex justify-between ml-2 ">
            <h5 class=" font-bold tracking-tight text-gray-900 dark:text-white">
              {namePet}
            </h5>
          </div>
          <span className="font-normal ml-2 text-sm text-gray-700 dark:text-gray-400">
            Tamaño:
            {size === "big"
              ? " Grande"
              : size === "medium"
              ? " Mediano"
              : " Chico"}
          </span>

          <span className="font-normal ml-2  text-sm text-gray-700 dark:text-gray-400">
            {gender === "female" ? "Hembra" : "Macho"}
          </span>
          <div className="h-24 w-24 m-5 flex items-center justify-center overflow-hidden ">
            <Tooltip
              trigger="hover"
              animation="duration-1000"
              content={
                likes?.length > 1
                  ? likes?.length === 2
                    ? `A ${likes[0]} y ${likes[1]} les gusta esto...`
                    : `A   ${likes.slice(0, 2).reverse()} y ${
                        likes.length - 2
                      } mas les gusta esto...`
                  : likes?.length === 1
                  ? `A ${likes[0]} le gusta esto`
                  : "Me gusta"
              }
              placement="bottom"
            >
              <button
                className=" flex items-center justify-center w-14 h-14"
                onClick={(e) => likeHandler(e)}
              >
                <img
                  src={likeim}
                  alt="<3"
                  className="absolute h-24  rounded-full shadow-lg"
                />
                <h1 className="relative flex justify-center items-center text-2xl  text-black font-bold  mt-5 ">
                  {buttonLike.number}
                </h1>
              </button>
            </Tooltip>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <Dropdown
            arrowIcon={false}
            inline={true}
            floatingArrow={false}
            label={
              <svg
                // onClick={() => setShowSidebar(!showSidebar)}
                className="  flex items-center cursor-pointer "
                fill=""
                viewBox="0 0 100 80"
                width="20"
                height="40"
              >
                <rect width="20" height="20"></rect>
                <rect y="30" width="20" height="20"></rect>
                <rect y="60" width="20" height="20"></rect>
              </svg>
            }
          >
            <Dropdown.Item>
              <div className="flex justify-center ">
                <Tooltip content="Compartir en Facebook" placement="top">
                  <div className="rounded-full  flex items-center justify-center overflow-hidden ">
                    <FacebookShareButton
                      url={`https://www.happytails.com/pet/${idPet}`}
                      quote={"Adoptame"}
                      hashtag={"#happytails"}
                    >
                      <FacebookIcon size={40} />
                    </FacebookShareButton>
                  </div>
                </Tooltip>
              </div>
            </Dropdown.Item>

            <Dropdown.Item>
              <div className="flex justify-center">
                <Tooltip content="Compartir por e-mail" placement="top">
                  <div className="rounded-full  flex items-center justify-center overflow-hidden">
                    <EmailShareButton
                      subject="Quiero que me adoptes"
                      body={`Adoptame en https://www.happytails.com/pet/${idPet}`}
                    >
                      <EmailIcon size={40} />
                    </EmailShareButton>
                  </div>
                </Tooltip>
              </div>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </Link>
  );
}
