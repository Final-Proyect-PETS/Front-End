import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./PetCard";
import UserCard from "./UserCard";
import Loader from "../Loaders/Loader";
import "./Home.css";

export default function Cards() {

  const getPets = useSelector((state) => state.pets);
  const query = useSelector((state) => state.query)
  const getUsers = useSelector((state) => state.users);
  const switchRender = useSelector((state) => state.switchRender);
  //PAGINADO-0----------------------------------------------------------------------
  const [CurrentPag, setCurrentPag] = useState(1);
  const [CardsPerPage, setCardsPerPage] = useState(6);
  const IndexLastCard = CurrentPag * CardsPerPage;
  const IndexFirstCard = IndexLastCard - CardsPerPage;
  const CurrentPages = getPets.slice(IndexFirstCard, IndexLastCard);
  const fetchMoreData = async () => {
    setCardsPerPage(CardsPerPage + 6);
  };

  return (
    <InfiniteScroll
      dataLength={CurrentPages.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<h2 className="inline sr-only">Loading...</h2>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      className="flex flex-col justify-center items-center w-screen"
    >
      {getPets.length > 0 ? (
        switchRender === "mascota" ? (
          query !== "empty" ? (
          CurrentPages.map((pets) => (
            <Card
              key={pets._id}
              idUser={pets.user?._id}
              first_name={pets.user?.first_name}
              last_name={pets.user?.last_name}
              imageUser={pets.user?.image}
              idPet={pets._id}
              namePet={pets.name}
              imagePet={pets.image}
              type={pets.type}
              place={pets.place}
              size={pets.size}
              description={pets.description}
              age={pets.age}
              vaccination={pets.vaccination}
              castrated={pets.castrated}
              gender={pets.gender}
              likes={pets.likes}
            />
          ))
          ) : <div className="mt-20 text-yellow-600 text-2xl">NO HAY MASCOTAS QUE COINCIDAN CON TU BUSQUEDA...</div>
        ) : (
          getUsers.map((user) => (
            <UserCard
              key={user._id}
              _id={user._id}
              first_name={user.first_name}
              last_name={user.last_name}
              username={user.username}
              image={user.image}
              email={user.email}
              about={user.about}
              telephone={user.telephone}
              pets={user.pets}
              place={user.place}
              interestedUsers={user.interestedUsers}
              donations={user.donations}
            />
          ))
        )
      ) : (
        <>
          <Loader />
        </>
      )}
    </InfiniteScroll>
  );
}
