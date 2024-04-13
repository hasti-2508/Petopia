// "use client";
// import { Service } from "@/interfaces/service";
// import { Vet } from "@/interfaces/vet";
// import axiosInstance from "@/utils/axios";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { VetCard, VetUpdateCard } from "./VetCard";

// const imageUrls = [
//   "http://localhost:3000/assets/service1.jpeg",
//   "http://localhost:3000/assets/service2.jpeg",
//   "http://localhost:3000/assets/service3.jpeg",
//   "http://localhost:3000/assets/service4.jpeg",
// ];

// function VetProfile() {
//   const [vet, setVet] = useState<Vet>();
//   const [bookings, setBookings] = useState<Service[]>([]);
//   const [isChecked, setIsChecked] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedUser, setEditedUser] = useState(null);

//   const [activeTab, setActiveTab] = useState("Profile");
//   const handleTabClick = (tab: string) => {
//     setActiveTab(tab);
//   };

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const response = await axiosInstance.get("/currentUser");
//         setEditedUser(response.data);
//         setVet(response.data);
//         const bookingDetailsPromises = response.data.bookings.map(
//           async (bookingId: string) => {
//             const bookingResponse = await axios.get(
//               `${process.env.HOST}/serviceBooking/booking/${bookingId}`
//             );
//             return bookingResponse.data;
//           }
//         );
//         const bookingDetails = await Promise.all(bookingDetailsPromises);
//         setBookings(bookingDetails);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     getUser();
//   }, []);
//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setEditedUser(vet);
//   };

//   const handleSaveEdit = async () => {
//     setIsEditing(false);
//     const response = await axiosInstance.patch(
//       `vet/update/${vet._id}`,
//       editedUser
//     );
//     setVet(response.data);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedUser((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };

//   const handleComplete = async (bookingId) => {
//     try {
//       await axios.patch(
//         `${process.env.HOST}/serviceBooking/${bookingId}/complete`,
//         {
//           isComplete: true,
//         }
//       );

//       setBookings((prevBookings) =>
//         prevBookings.filter((booking) => booking._id !== bookingId)
//       );
//     } catch (error) {
//       console.error("Error completing booking:", error.response.data.message);
//     }
//   };

//   const handleCheckboxChange = async () => {
//     setIsChecked(!isChecked);
//     try {
//       const response = await axios.patch(
//         `${process.env.HOST}/vet/${vet._id}/available`
//       );
//     } catch (error) {
//       console.error(error.response.data.message);
//     }
//   };

//   // function Light({ value }) {
//   //   useEffect(() => {
//   //     let soundPlayed = false;

//   //     if (value && !soundPlayed) {
//   //       const audio = new Audio(
//   //         "http://localhost:3000/assets/audio/emergency-alarm-with-reverb-29431.mp3"
//   //       );
//   //       audio.play();
//   //       soundPlayed = true;
//   //     }
//   //   }, [value]);

//   //   const lightClass = value ? "bg-red-500" : "bg-green-500";

//   //   const divStyle = {
//   //     width: "15px",
//   //     height: "15px",
//   //     borderRadius: "50%",
//   //     boxShadow:
//   //       "0 0 10px 5px #fff, 0 0 20px 10px #fff, 0 0 30px 15px #fff, 0 0 40px 20px #fff, 0 0 50px 25px #fff, 0 0 60px 30px #fff, 0 0 70px 35px #fff",
//   //     background: value
//   //       ? "radial-gradient(circle, rgba(50, 205, 50, 1) 0%, rgba(0, 100, 0, 1) 100%)"
//   //       : "radial-gradient(circle, rgba(255, 50, 50, 1) 0%, rgba(139, 0, 0, 1) 100%)",
//   //   };

//   //   return <div style={divStyle} />;
//   // }

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "Profile":
//         return (
//           <div>
//             <div>
//               {isEditing ? (
//                 <>
//                   <VetUpdateCard
//                     editedUser={editedUser}
//                     handleChange={handleChange}
//                   />
//                   <div className="flex mt-8 mx-6 ">
//                     <button
//                       className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline"
//                       onClick={handleSaveEdit}
//                     >
//                       Save
//                     </button>
//                     <button
//                       className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline mx-3"
//                       onClick={handleCancelEdit}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div className="flex justify-between relative">
//                     <VetCard user={vet} />
//                     {/* <Light value={vet?.isHavingCall} /> */}
//                     <label className="inline-flex items-center cursor-pointer absolute top-0 end-0 mt-2 me-2">
//                       <input
//                         type="checkbox"
//                         value=""
//                         className="sr-only peer"
//                         checked={isChecked}
//                         onChange={handleCheckboxChange}
//                       />
//                       <div className="relative w-11 h-6 bg-gray-200 rounded-full peer   peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-dark-blue"></div>
//                       <span className="ms-3 text-sm font-medium text-gray-900 ">
//                         {isChecked ? (
//                           <span className="font-bold text-xl mb-2">
//                             Available
//                           </span>
//                         ) : (
//                           <span className="font-bold text-xl mb-2">
//                             Not Available
//                           </span>
//                         )}
//                       </span>
//                     </label>
//                   </div>
//                   <div className="flex mt-12 mx-6">
//                     <button
//                       onClick={handleEditClick}
//                       className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline"
//                     >
//                       Edit Profile
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//             {/* <div className="flex justify-between relative">
//               <VetCard user={vet} />
//               <label className="inline-flex items-center cursor-pointer absolute top-0 end-0 mt-2 me-2">
//                 <input
//                   type="checkbox"
//                   value=""
//                   className="sr-only peer"
//                   checked={isChecked}
//                   onChange={handleCheckboxChange}
//                 />
//                 <div className="relative w-11 h-6 bg-gray-200 rounded-full peer   peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-dark-blue"></div>
//                 <span className="ms-3 text-sm font-medium text-gray-900 ">
//                   {isChecked ? (
//                     <span className="font-bold text-xl mb-2">Available</span>
//                   ) : (
//                     <span className="font-bold text-xl mb-2">
//                       Not Available
//                     </span>
//                   )}
//                 </span>
//               </label>
//             </div> */}

//             {/* <div className="flex justify-between relative">
//               <VetCard user={vet} />
//               <label className="inline-flex items-center cursor-pointer mb-12 ">
//                 <input
//                   type="checkbox"
//                   value=""
//                   className="sr-only peer"
//                   checked={isChecked}
//                   onChange={handleCheckboxChange}
//                 />
//                 <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
//                 <span className="ms-3 text-sm font-medium text-gray-900 ">
//                   {isChecked ? "Available" : "Not Available"}
//                 </span>
//               </label>
//             </div> */}
//             {/* <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//               <div className="flex justify-between">
//                 <div className="">
//                   <label
//                     className="block text-gray-700 text-sm font-bold mt-4 "
//                     htmlFor="profileImage"
//                   >
//                     Profile Image
//                   </label>
//                 </div>
//                 <label className="inline-flex items-center cursor-pointer mb-12">
//                   <input
//                     type="checkbox"
//                     value=""
//                     className="sr-only peer"
//                     checked={isChecked}
//                     onChange={handleCheckboxChange}
//                   />
//                   <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
//                   <span className="ms-3 text-sm font-medium text-gray-900 ">
//                     {isChecked ? "Available" : "Not Available"}
//                   </span>
//                 </label> */}

//             {/* </div>
//               <img
//                 className="w-40 h-40 rounded-full object-cover mb-3"
//                 src={
//                   vet?.imageUrl
//                     ? vet.imageUrl
//                     : "http://localhost:3000/assets/user.png"
//                 }
//                 alt="Profile Image"
//               />
//               <div className="mb-4">
//                 <label
//                   className="block text-gray-700 text-sm font-bold mb-2"
//                   htmlFor="username"
//                 >
//                   Username
//                 </label>
//                 <p className="text-gray-700">{vet?.name}</p>
//               </div>
//               <div className="mb-4">
//                 <label
//                   className="block text-gray-700 text-sm font-bold mb-2"
//                   htmlFor="email"
//                 >
//                   Email
//                 </label>
//                 <p className="text-gray-700">{vet?.email}</p>
//               </div>
//               <div className="mb-4">
//                 <label
//                   className="block text-gray-700 text-sm font-bold mb-2"
//                   htmlFor="role"
//                 >
//                   Phone No:
//                 </label>
//                 <p className="text-gray-700">{vet?.phoneNo}</p>
//               </div>
//               <div className="mb-4">
//                 <label
//                   className="block text-gray-700 text-sm font-bold mb-2"
//                   htmlFor="role"
//                 >
//                   Years Of Experience
//                 </label>
//                 <p className="text-gray-700">{vet?.YearsOfExperience}</p>
//               </div>
//               <div className="mb-4">
//                 <label
//                   className="block text-gray-700 text-sm font-bold mb-2"
//                   htmlFor="role"
//                 >
//                   City
//                 </label>
//                 <p className="text-gray-700">{vet?.city}</p>
//               </div>
//               <div className="mb-4">
//                 <label
//                   className="block text-gray-700 text-sm font-bold mb-2"
//                   htmlFor="role"
//                 >
//                   Services
//                 </label>
//                 {vet?.services.map((service, index) => (
//                   <p key={index} className="text-gray-700">
//                     {service}
//                   </p>
//                 ))}
//               </div>
//             </div> */}
//           </div>
//         );
//       case "ongoingBookings":
//         return (
//           <div>
//             {bookings.length > 0 ? (
//               bookings
//                 .filter((booking) => !booking.isCompleted)
//                 .map((booking, index) => (
//                   // <div
//                   //   className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
//                   //   key={index}
//                   // >
//                   //   <p>{`User Name: ${booking.user_name}`}</p>
//                   //   <p>{`Address: ${booking.address}`}</p>
//                   //   <p>{`City: ${booking.city}`}</p>
//                   //   <p>{`Booking Date: ${booking.booking_date}`}</p>
//                   //   <p>{`Booking Time: ${booking.booking_time}`}</p>
//                   //   <p>{`Total Price: ${booking.totalPrice}`}</p>
//                   //   {booking.isCompleted ? (
//                   //     <span>Completed</span>
//                   //   ) : (
//                   //     <button
//                   //       className="bg-blue-600 text-white px-3 py-1 rounded-md mr-2 no-underline"
//                   //       onClick={() => handleComplete(booking._id)}
//                   //     >
//                   //       Complete
//                   //     </button>
//                   //   )}
//                   // </div>
//                   <div
//                     style={{
//                       height: "680px",
//                       width: "400px",
//                     }}
//                     className="col-md-5 mr-7 mb-6 flex justify-between rounded overflow-hidden shadow border border-light border-1 rounded-3 bg-light-subtle card-custom p-4"
//                     key={index}
//                   >
//                     <div>
//                       <img
//                         // src={serviceImages[index]} // Use random image for each service
//                         alt={`Service ${index}`}
//                         className="w-full h-48 mb-4 border-2"
//                       />
//                       <div>
//                         <p>
//                           {" "}
//                           <label
//                             htmlFor="species"
//                             className="font-bold text-dark-blue mx-2 "
//                           >
//                             Name:
//                           </label>
//                           {booking.user_name}
//                         </p>
//                         <p>
//                           {" "}
//                           <label
//                             htmlFor="species"
//                             className="font-bold text-dark-blue mx-2 "
//                           >
//                             Pet Species:
//                           </label>
//                           {booking.email}
//                         </p>
//                         <p>
//                           {" "}
//                           <label
//                             htmlFor="species"
//                             className="font-bold text-dark-blue mx-2 "
//                           >
//                             Pet Gender:
//                           </label>
//                           {booking.city}
//                         </p>
//                         <p>
//                           {" "}
//                           <label
//                             htmlFor="species"
//                             className="font-bold text-dark-blue mx-2  "
//                           >
//                             Booking Date:
//                           </label>
//                           {booking.booking_date}
//                         </p>
//                         <p>
//                           <label
//                             htmlFor="species"
//                             className="font-bold text-dark-blue mx-2  "
//                           >
//                             Booking Time:
//                           </label>
//                           {booking.booking_time}
//                         </p>
//                         <p>
//                           {" "}
//                           <label
//                             htmlFor="species"
//                             className="font-bold text-dark-blue mx-2  "
//                           >
//                             Payment Status:
//                           </label>
//                           {booking.isConfirmed ? `Done` : `Pending`}
//                         </p>
//                         <p>
//                           {" "}
//                           <label
//                             htmlFor="species"
//                             className="font-bold text-dark-blue mx-2  "
//                           >
//                             Booking Status:
//                           </label>
//                           {booking.pet_species}
//                         </p>
//                         {booking.isCompleted ? (
//                           <span>Completed</span>
//                         ) : (
//                           <button
//                             className="bg-blue-600 text-white px-3 py-1 rounded-md mr-2 no-underline"
//                             onClick={() => handleComplete(booking._id)}
//                           >
//                             Complete
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))
//             ) : (
//               <p>You have no services Assigned!</p>
//             )}
//           </div>
//         );
//       case "bookingHistory":
//         return (
//           <div>
//             {bookings.length > 0 ? (
//               bookings
//                 .filter((booking) => booking.isCompleted)
//                 .map((booking, index) => (
//                   <div
//                     className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
//                     key={index}
//                   >
//                     <p>{`User Name: ${booking.user_name}`}</p>
//                     <p>{`Address: ${booking.address}`}</p>
//                     <p>{`City: ${booking.city}`}</p>
//                     <p>{`Booking Date: ${booking.booking_date}`}</p>
//                     <p>{`Booking Time: ${booking.booking_time}`}</p>
//                     <p>{`Total Price: ${booking.totalPrice}`}</p>
//                   </div>
//                 ))
//             ) : (
//               <p>You have no completed bookings!</p>
//             )}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       <div className="p-9">
//         <div className="text-sm font-medium text-center text-gray-500 ">
//           <ul className="flex flex-wrap -mb-px">
//             <li className="me-2">
//               <button
//                 style={{ fontSize: "18px" }}
//                 onClick={() => handleTabClick("Profile")}
//                 className={`inline-block p-4 border-b-2 rounded-t-lg ${
//                   activeTab === "Profile"
//                     ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
//                     : " border-transparent text-dark-blue hover:text-saddle-brown"
//                 }`}
//               >
//                 Profile
//               </button>
//             </li>

//             <li className="me-2">
//               <button
//                 style={{ fontSize: "18px" }}
//                 onClick={() => handleTabClick("ongoingBookings")}
//                 className={`inline-block p-4 border-b-2 rounded-t-lg ${
//                   activeTab === "ongoingBookings"
//                     ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
//                     : " border-transparent text-dark-blue hover:text-saddle-brown"
//                 }`}
//               >
//                 Ongoing Bookings
//               </button>
//             </li>
//             <li className="me-2">
//               <button
//                 style={{ fontSize: "18px" }}
//                 onClick={() => handleTabClick("bookingHistory")}
//                 className={`inline-block p-4 border-b-2 rounded-t-lg ${
//                   activeTab === "bookingHistory"
//                     ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
//                     : " border-transparent text-dark-blue hover:text-saddle-brown"
//                 }`}
//               >
//                 Booking History
//               </button>
//             </li>
//           </ul>
//         </div>
//         <div className=" p-6">{renderTabContent()}</div>
//       </div>
//     </div>
//   );
// }

// export default VetProfile;

"use client";
import { Service } from "@/interfaces/service";
import React, { useEffect, useState } from "react";
import { VetCard, VetUpdateCard } from "./VetCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  setActiveVetTab,
  setBookingImages,
  setBookings,
  setEditedVet,
  setIsChecked,
  setVet,
  setVetIsEditing,
} from "@/redux/vet/vetSlice";
import {
  getServiceBookingData,
  getVetData,
  notifyVet,
  setAvailable,
  setBookingComplete,
  vetUpdate,
} from "@/redux/vet/vetService";
import toast from "react-hot-toast";


const imageUrls = [
  "http://localhost:3000/assets/service1.jpeg",
  "http://localhost:3000/assets/service2.jpeg",
  "http://localhost:3000/assets/service3.jpeg",
  "http://localhost:3000/assets/service4.jpeg",
];

function VetProfile() {
  const dispatch: AppDispatch = useDispatch();
  const {
    vet,
    bookings,
    isChecked,
    isEditing,
    editedVet,
    bookingImages,
    activeVetTab,
  } = useSelector((state: RootState) => state.vet);
  const handleTabClick = (tab: string) => {
    dispatch(setActiveVetTab(tab));
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await dispatch(getVetData());
        if (result.type === "getVetData/rejected") {
          throw result;
        } else {
          dispatch(setEditedVet(result.payload));
          dispatch(setVet(result.payload));
        }
        const bookingDetailsPromises = result.payload.bookings.map(
          async (bookingId: string) => {
            const bookingResponse = await dispatch(
              getServiceBookingData(bookingId)
            );
            return bookingResponse.payload;
          }
        );
        const bookingDetails = await Promise.all(bookingDetailsPromises);
        dispatch(setBookings(bookingDetails));
      } catch (error) {
        toast.error(error.payload);
      }
    };

    getUser();
  }, []);

  useEffect(() => {

  const randomImages = Array.from({ length: bookings.length }, () => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  });

  dispatch(setBookingImages(randomImages));
  }, [bookings]);

  const handleEditClick = () => {
    dispatch(setVetIsEditing(true));
  };

  const handleCancelEdit = () => {
    dispatch(setVetIsEditing(false));
    dispatch(setEditedVet(vet));
  };

  const handleSaveEdit = async () => {
    dispatch(setVetIsEditing(false));
    try {
      const vetResult = await dispatch(
        vetUpdate({ editedVet, vetId: vet._id })
      );
      if (vetResult.type === "vetUpdate/rejected") {
        throw vetResult;
      } else {
        // dispatch(setVet(vetResult.payload));
        return vetResult;
      }
    } catch (error) {
      toast.error(error.payload);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setEditedVet({ [name]: value }));
  };

  const handleComplete = async (bookingId) => {
    try {
      const response = await dispatch(
        setBookingComplete({ bookingId, isComplete: true })
      );
      const bookingDetailsPromises = bookings.map(async (booking: Service) => {
        const bookingResponse = await dispatch(
          getServiceBookingData(booking._id)
        );
        return bookingResponse.payload;
      });

      const bookingDetails = await Promise.all(bookingDetailsPromises);
      dispatch(setBookings(bookingDetails));
    } catch (error) {
      toast.error(error.payload);
    }
  };

  const handleCheckboxChange = async () => {
    dispatch(setIsChecked(!isChecked));
    try {
      const availableResult = await dispatch(setAvailable(vet._id));
      if (availableResult.type === "setAvailable/rejected") {
        throw availableResult;
      } else {
        return availableResult;
      }
    } catch (error) {
      toast.error(error.payload);
    }
  };
  // const [soundPlayed, setSoundPlayed] = useState(false);
  // function Light({ value }) {
  //   useEffect(() => {
  //     if (value && !soundPlayed) {
  //       const audio = new Audio(
  //         "http://localhost:3000/assets/audio/emergency-alarm-with-reverb-29431.mp3"
  //       );
  //       audio.play();
  //       setSoundPlayed(true);
  //     }
  //   }, [value]);

  //   const lightClass = value ? "bg-red-500" : "bg-green-500";

  //   const divStyle = {
  //     width: "15px",
  //     height: "15px",
  //     borderRadius: "50%",
  //     // boxShadow:
  //     //   "0 0 10px 5px #fff, 0 0 20px 10px #fff, 0 0 20px 5px #fff, 0 0 20px 10px #fff, 0 0 25px 12px #fff, 0 0 30px 15px #fff, 0 0 35px 17px #fff",
  //     background: value
  //       ? "radial-gradient(circle, rgba(50, 205, 50, 1) 0%, rgba(0, 100, 0, 1) 100%)"
  //       : "radial-gradient(circle, rgba(255, 50, 50, 1) 0%, rgba(139, 0, 0, 1) 100%)",
  //   };

  //   return <div style={divStyle} />;
  // }

  const renderTabContent = () => {
    switch (activeVetTab) {
      case "Profile":
        return (
          <div>
            <div>
              {isEditing ? (
                <>
                  <VetUpdateCard
                    editedUser={editedVet}
                    handleChange={handleChange}
                  />
                  <div className="flex mt-8 mx-6 ">
                    <button
                      className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline"
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                    <button
                      className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline mx-3"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between relative">
                    <VetCard user={vet} />
                    <div className="flex flex-col items-center">
                      <label className="inline-flex items-center cursor-pointer bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline mx-3">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-dark-blue"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 ">
                          {isChecked ? (
                            <span className="font-bold text-xl mb-2">
                              Available
                            </span>
                          ) : (
                            <span className="font-bold text-xl mb-2">
                              Not Available
                            </span>
                          )}
                        </span>
                      </label>
                    </div>
                  </div>
{/* 
                  <div className="flex mt-12 mx-6">
                    <button
                      onClick={handleEditClick}
                      className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-xl fs-6 no-underline"
                    >
                      Edit Profile
                    </button>
                  </div> */}
                </>
              )}
            </div>
          </div>
        );
      case "ongoingBookings":
        return (
          <div>
            {bookings.length > 0 &&
            bookings.filter((booking) => !booking.isCompleted).length > 0 ? (
              bookings
                .filter((booking) => !booking.isCompleted)
                .map((booking, index) => (
                  <div
                    style={{
                      height: "630px",
                      width: "400px",
                    }}
                    className="col-md-5 mr-7 mb-6 flex justify-between rounded overflow-hidden shadow border border-light border-1 rounded-3 bg-light-subtle card-custom p-4"
                    key={index}
                  >
                    <div>
                      <img
                        src={bookingImages[index]} 
                        alt={`Service ${index}`}
                        className="w-full h-48 mb-4 border-2"
                      />
                      <div>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2 "
                          >
                            Name:
                          </label>
                          {booking.user_name}
                        </p>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2 "
                          >
                            Email:
                          </label>
                          {booking.email}
                        </p>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2 "
                          >
                            City:
                          </label>
                          {booking.city}
                        </p>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2 "
                          >
                            Pet Species:
                          </label>
                          {booking.pet_species}
                        </p>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2  "
                          >
                            Booking Date:
                          </label>
                          {booking.booking_date}
                        </p>
                        <p>
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2  "
                          >
                            Booking Time:
                          </label>
                          {booking.booking_time}
                        </p>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2  "
                          >
                            Payment Status:
                          </label>
                          {booking.isConfirmed ? `Done` : `Pending`}
                        </p>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2  "
                          >
                            Booking Status:
                          </label>
                          {booking.isCompleted ? `Completed`: `Not Completed`}
                        </p>
                        <div className="my-4 ">{booking.isCompleted ? (
                          <span className="bg-blue-600 text-white px-3 py-2 rounded-md mr-2 no-underline my-3">Completed</span>
                        ) : (
                          <button
                            className="bg-blue-600 text-white px-3 py-2 rounded-md mr-2 no-underline"
                            onClick={() => handleComplete(booking._id)}
                          >
                            Complete
                          </button>
                        )}</div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <p>You have no services Assigned!</p>
            )}
          </div>
        );
      case "bookingHistory":
        return (
          <div>
            {bookings.length > 0 &&
            bookings.filter((booking) => booking.isCompleted).length > 0 ? (
              bookings
                .filter((booking) => booking.isCompleted)
                .map((booking, index) => (
                  <div
                    style={{
                      height: "630px",
                      width: "400px",
                    }}
                    className="col-md-4 mr-7 mb-6 flex justify-between rounded overflow-hidden shadow border border-light border-1 rounded-3 bg-light-subtle card-custom p-4"
                    key={index}
                  >
                    <div>
                      <img
                        src={bookingImages[index]} 
                        alt={`Service ${index}`}
                        className="w-full h-48 mb-4 border-2"
                      />
                      <div>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2 "
                          >
                            Name:
                          </label>
                          {booking.user_name}
                        </p>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2 "
                          >
                            Email:
                          </label>
                          {booking.email}
                        </p>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2 "
                          >
                            City:
                          </label>
                          {booking.city}
                        </p>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2 "
                          >
                            Pet Species:
                          </label>
                          {booking.pet_species}
                        </p>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2  "
                          >
                            Booking Date:
                          </label>
                          {booking.booking_date}
                        </p>
                        <p>
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2  "
                          >
                            Booking Time:
                          </label>
                          {booking.booking_time}
                        </p>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2  "
                          >
                            Payment Status:
                          </label>
                          {booking.isConfirmed ? `Done` : `Pending`}
                        </p>
                        <p>
                          {" "}
                          <label
                            htmlFor="species"
                            className="font-bold text-dark-blue mx-2  "
                          >
                            Booking Status:
                          </label>
                          {booking.isCompleted ? `Completed`: `Not Completed`}
                        </p>
                        
                        <div className="my-4 ">{booking.isCompleted ? (
                          <span className="bg-green-600 text-white px-3 py-2 rounded-md mr-2 no-underline my-3">Completed</span>
                        ) : (
                          <button
                            className="bg-blue-600 text-white px-3 py-2 rounded-md mr-2 no-underline"
                            onClick={() => handleComplete(booking._id)}
                          >
                            Complete
                          </button>
                        )}</div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-black">You have no completed bookings!</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="p-9">
        <div className="text-sm font-medium text-center text-gray-500 ">
          <ul className="flex flex-wrap -mb-px">
            <li className="me-2">
              <button
                style={{ fontSize: "18px" }}
                onClick={() => handleTabClick("Profile")}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeVetTab === "Profile"
                    ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                    : " border-transparent text-dark-blue hover:text-saddle-brown"
                }`}
              >
                Profile
              </button>
            </li>

            <li className="me-2">
              <button
                style={{ fontSize: "18px" }}
                onClick={() => handleTabClick("ongoingBookings")}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeVetTab === "ongoingBookings"
                    ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                    : " border-transparent text-dark-blue hover:text-saddle-brown"
                }`}
              >
                Ongoing Bookings
              </button>
            </li>
            <li className="me-2">
              <button
                style={{ fontSize: "18px" }}
                onClick={() => handleTabClick("bookingHistory")}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeVetTab === "bookingHistory"
                    ? "text-saddle-brown font-bold font-2xl border-saddle-brown"
                    : " border-transparent text-dark-blue hover:text-saddle-brown"
                }`}
              >
                Booking History
              </button>
            </li>
          </ul>
        </div>
        <div className=" p-6">{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default VetProfile;
