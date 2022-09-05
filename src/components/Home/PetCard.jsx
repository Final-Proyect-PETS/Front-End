import React from "react";
import likeim from "../../assets/images/like.png";
import ubicacion from "../../assets/images/ubicacion.png";
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
      // likesPets: likesPets, //array DESCOMMENTE SI SE ROMPE NORIFICACION
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
    <>
      <div className="max-w-sm my-2">
        <Card horizontal={true} imgSrc={imagePet}>
          <div className="flex justify-end">
            <Dropdown inline={true} label="">
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
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {namePet}
          </h5>
          <span className="font-normal text-gray-700 dark:text-gray-400">
            Tamaño:
            {size === "big"
              ? "Grande"
              : size === "medium"
              ? "Mediano"
              : "Chico"}
          </span>
          <span className="font-normal text-gray-700 dark:text-gray-400">
            {gender === "female" ? "Hembra" : "Macho"}
          </span>
          <div className="flex justify-end">
            <h1 className="text-black font-bold text-2x1">
              {/* aACA VA EL NUMERITO DEEEE LIKES */}
              {buttonLike.number}
              {/* aACA VA EL NUMERITO DE LIKES */}
            </h1>
            <div className="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden mr-2">
              <Tooltip
                trigger="hover"
                animation="duration-1000"
                content={
                  likes?.length > 1
                    ? `A   ${likes.slice(0, 2).reverse()} y ${
                        likes.length
                      } mas les gusta esto...`
                    : likes?.length === 1
                    ? `A ${likes[0]} le gusta esto`
                    : "Dame me gusta"
                }
                placement="bottom"
              >
                {" "}
                <button onClick={(e) => likeHandler(e)}>
                  <img src={likeim} alt="<3" />
                </button>
              </Tooltip>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
