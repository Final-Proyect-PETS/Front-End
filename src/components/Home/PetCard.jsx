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
      <div class="flex justify-between w-full h-56 mt-14 opacity-100  bg-gray-100 rounded-lg border shadow-md hover:bg-yellow-500  hover:opacity-100">
        <img
          class="object-cover w-1/2 h-56 rounded-t-lg lg:h-auto lg:rounded-none lg:rounded-l-lg"
          src={imagePet}
          alt=""
        />

        <div className="flex flex-col justify-between">
          <div className="flex justify-between ml-2 ">
            <Link to={`/pet/${idPet}`}>
              <h5 class=" font-bold tracking-tight text-gray-900 dark:text-white">
                {namePet}
              </h5>
            </Link>
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
          <div className="rounded-full h-24 w-24 m-5 flex items-center justify-center overflow-hidden ">
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
              <button onClick={(e) => likeHandler(e)}>
                <img src={likeim} alt="<3" />
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
                className=" z-50 flex items-center cursor-pointer "
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

          <div className="flex">
            <h1 className="text-black font-bold text-2x1">
              {buttonLike.number}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* 
  <>
  <div class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 m-2 ">
  <div className="w-96 h-56 flex ">
  <img
  class="object-cover rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
  src={image}
  alt=""
  />

          <div class="flex flex-col justify-start  m-2   w-11/12 rounded leading-normal">
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
            <h5 class=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {username}
            </h5>
             <h5 class=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {first_name} {last_name}
            </h5>

          
   <div className="text-sm flex">
              <img src={ubicacion} alt="ubicacion" width="16px" />
              <span className="font-medium text-xs mx-3">
                {place?.length <= 25 ? place : `${place?.slice(0, 25)}...`}
              </span>
            </div>

           
{pettit?.length ? (
            <div className="flex">
              <h3 className="text-2xl font-normal text-white">Mis mascotas</h3>
            </div>
          ) : (
            <div className="flex">
              <span className="text-2xl font-bold">En búsqueda</span>
            </div>
          )}
          <div className="text-sm flex">
            <div className="grid grid-cols-2 place-content-center">
              {pettit?.length
                ? pettit?.map((pet) => (
                    <div key={pet._id} className="m-1">
                      <Link key={pet._id} to={`/pet/${pet._id}`}>
                        <img
                          key={pet._id}
                          className="w-96 h-24 bg-cover border-solid border-2 border-[#B99782] rounded-full "
                          src={pet.image}
                          alt="ProfilePicture"
                        />
                      </Link>
                    </div>
                  ))
                : ""}
                  
      </div></div></div>
    </>
 */
}
