import ubicacion from "../../assets/images/ubicacion.png";
import { Link } from "react-router-dom";
// import blackpaw from "../../assets/images/blackpaw.png";
// import diamantepaw from "../../assets/images/diamantepaw.png";
// import goldenpaw from "../../assets/images/goldenpaw.png";
import goldenblack from "../../assets/images/goldenblackgif.gif";
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
    <>
      <div class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 m-2 ">
        <div className="w-96 h-56 flex ">
          <img
           class="object-cover w-1/2 rounded-t-lg md:h-auto md:w-auto md:rounded-none md:rounded-l-lg"
            src={image}
            alt=""
          />

          <div class="flex flex-col justify-center  m-2   w-11/12 rounded leading-normal">
            <div className="flex justify-end">
              <Dropdown inline={true} label="">
                <Dropdown.Item>
                  <div className="flex justify-center ">
                    <Tooltip content="Compartir en Facebook" placement="top">
                      <div className="rounded-full  flex items-center justify-center overflow-hidden ">
                        <FacebookShareButton
                          url={`https://www.happytails.com/users/${_id}`}
                          quote={"Adoptante"}
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
                          body={`Adoptante https://www.happytails.com/users/${_id}`}
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
              "{username}"
            </h5>
            <span className="font-normal text-gray-700 dark:text-gray-400">
              {first_name} {last_name}
            </span>

            {pettit?.length === 1 ? (
              <div className="flex">
                <span className="text-xs text-gray-700 dark:text-gray-400">
                  Mi mascota
                </span>
              </div>
            ) : pettit?.length > 1 ? (
              <div className="flex">
                <span className="text-xs text-gray-700 dark:text-gray-400">
                  Mis mascotas
                </span>
              </div>
            ) : (
              <div className="flex">
                <span className="text-xs text-gray-700 dark:text-gray-400">
                  Sin mascotas
                </span>
              </div>
            )}

            {pettit?.length === 1 ? (
              <img
                className="mb-3 h-24 w-24 rounded-full shadow-lg"
                src={pettit[0].image}
                alt="ProfilePicture"
              />
            ) : (
              <Carousel>
                {pettit?.map((pet) => (
                  <img
                    key={pet._id}
                    className="mb-3 h-24 w-24 rounded-full shadow-lg"
                    src={pet.image}
                    alt="ProfilePicture"
                  />
                ))}
              </Carousel>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
