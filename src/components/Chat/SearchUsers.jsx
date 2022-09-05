// import React, {useState} from "react";
// import { useDispatch, useSelector } from "react-redux";
// import search from "./../../assets/search.svg";
// import { getUserByName, getUserDetail } from "../../redux/Actions";

// export default function SearchUsers() {

//     const dispatch = useDispatch()
//     const [nameUser, setNameUser] = useState("");

//     const conversations = useSelector((state) => state.conversations) 
//     const users = useSelector(state => state.users)

//     console.log(conversations.map(e => e.members[1])); // array id de users invitados

//     const idUsersss = conversations.map(e => e.members[1]) //array

//     function handleInputChange(e) {
//         e.preventDefault();
//         setNameUser(e.target.value);
//     }

//     function handleSubmit(e){
//         e.preventDefault();
//         dispatch(getUserByName(nameUser));
//         const guachin = idUsersss.includes(nameUser._id)
//         console.log(guachin);
//     }

//     return (
//         <div className="p-3 flex">
//             {/* busqueda de usuariooooosssssssss */}
//             <input className="p-2 w-10/12 rounded-tl-md border-transparent rounded-bl-md bg-gray-100 ring-2 ring-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-800 focus:border-transparent shadow-md" type="text" placeholder="Buscar usuario..." value={nameUser} onChange={e => handleInputChange(e)} onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}/>

//             <div className="w-2/12 flex justify-center items-center bg-gray-100 ring-2 ring-yellow-800 rounded-tr-md rounded-br-md">
//                 <img src={search} alt="icon" className="w-5 self-center" />
//             </div>
//         </div>
//     )
// }