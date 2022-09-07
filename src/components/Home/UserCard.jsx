import ubicacion from "../../assets/images/ubicacion.png";
import { Link } from "react-router-dom";
// import blackpaw from "../../assets/images/blackpaw.png";
// import diamantepaw from "../../assets/images/diamantepaw.png";
// import goldenpaw from "../../assets/images/goldenpaw.png";
import goldenblack from "../../assets/images/goldenblackgif.gif";
import share from "../../assets/images/share.png";
import donator from "../../assets/images/donator.png";
import { React } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { Dropdown, Tooltip, Carousel } from "flowbite-react";
export default function UserCard({
  _id,
  first_name,
  last_name,
  username,
  image,
  email,
  about,
  telephone,
  pets,
  place,
  donations,
  interestedUsers,
}) {
  const pettit = pets;

  return (
    <div class="flex flex-col-3 justify-between w-11/12 lg:w-3/6 h-56 opacity-100 mt-5 lg:mb-2 bg-gray-100 rounded-lg border shadow-md hover:bg-yellow-500  hover:opacity-100">
      <img
        className="object-cover w-1/2 h-50 rounded-lg rounded-t-lg lg:h-auto lg:rounded-none lg:rounded-l-lg"
        src={image}
        alt=""
      />
      <div className="flex flex-col mt-2 justify-between">
        <Link to={`/users/${_id}`}>
          <div className="flex  flex-col">
            <h5 class=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {username?.length > 15 ? `${username.slice(0, 10)}...` : username}
            </h5>
            <span className="font-normal text-gray-700 dark:text-gray-400">
              {first_name} {last_name}
            </span>

            {donations?.length > 0 ? (
              <div className="flex">
                <span className="font-bold text-xl text-gnormalray-700 dark:text-gray-400">
                  Donador Activo
                </span>
                <img src={donator} className="ml-1 h-6 w-6" alt="" />
              </div>
            ) : (
              false
            )}

            {pettit?.length === 1 ? (
              <div className="flex">
                <span className="text-md font-bold text-gray-700 dark:text-gray-400">
                  Mi mascota
                </span>
              </div>
            ) : pettit?.length > 1 ? (
              <div className="flex">
                <span className="text-md font-bold text-gray-700 dark:text-gray-400">
                  Mis mascotas
                </span>
              </div>
            ) : (
              <div className="flex">
                <span className="text-md font-bold text-gray-700 dark:text-gray-400">
                  Sin mascotas
                </span>
              </div>
            )}
          </div>
        </Link>
        {/* info */}
        <div className=" flex items-center w-50 h-56 lg:w-56 lg:h-56 justify-center">
          {pettit?.length === 1 ? (
            <img
              className=" h-24 w-24 rounded-full shadow-lg"
              src={pettit[0].image}
              alt="ProfilePicture"
            />
          ) : pettit?.length > 1 ? (
            <Carousel indicators={true} leftControl=" " rightControl=" ">
              {pettit?.map((pet) => (
                <img
                  key={pet._id}
                  className="w-24 h-24 lg:h-24 lg:w-24 rounded-full shadow-lg"
                  src={pet.image}
                  alt="ProfilePicture"
                />
              ))}
            </Carousel>
          ) : (
            false
          )}
        </div>
        {/* imagencarrusel */}
      </div>
      <Tooltip content="Compartir" trigger="hover" animation="duration-1000">
        <div className="flex flex-col justify-between h-10 w-10 m-4">
          <Dropdown
            arrowIcon={false}
            inline={true}
            floatingArrow={false}
            label={<img src={share} className="h-6 w-6" />}
          >
            <Dropdown.Item>
              <div className="flex justify-center ">
                <Tooltip content="Compartir en Facebook" placement="top">
                  <div className="rounded-full  flex items-center justify-center overflow-hidden ">
                    <FacebookShareButton
                      url={`Mira mis mascotas en https://happytails.vercel.app/users/${_id}`}
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
                      body={`Mira mis mascotas en https://happytails.vercel.app/users/${_id}`}
                    >
                      <EmailIcon size={40} />
                    </EmailShareButton>
                  </div>
                </Tooltip>
              </div>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </Tooltip>
    </div>
  );
}
