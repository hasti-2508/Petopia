"use client";
import React, { useEffect, useCallback } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import axios from "axios";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "@/redux/auth/authSlice";
import { currentUser, logout } from "@/redux/auth/authService";
import { dividerClasses } from "@mui/material";

function Header() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { token, userRole, imageUrl } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const AuthToken = localStorage.getItem("jwt");
      if (AuthToken) {
        dispatch(setToken(AuthToken));
      }
    }

    if (token) {
      getRole();
    }
  }, [token]);

  const getRole = async () => {
    try {
      const result = await dispatch(currentUser());
      if (result.type === "currentUser/rejected") {
        throw result;
      } else {
        return result;
      }
    } catch (error) {
      toast.error(error.payload);
    }
  };

  const handleLogout = () => {
    try {
      const result = dispatch(logout());
      localStorage.removeItem("jwt");
      dispatch(setToken(null));
      toast.success("Logout Successful!");
      setTimeout(() => {
        router.push("/home");
      }, 1000);
    } catch (error) {
      toast.success("Error Occurred! Please Try Again Later");
      // console.error(error);
    }
  };

  const handleClick = () => {
    router.push("/availableVet");
  };

  const redirectToProfile = useCallback(() => {
    if (userRole === "admin") {
      router.push("/admin/profile ");
    } else if (userRole === "user") {
      router.push("/user/profile");
    } else if (userRole === "vet") {
      router.push("/vet/profile");
    } else if (userRole === "trainer") {
      router.push("/trainer/profile");
    } else {
      toast.success("Unknown role or no role assigned");
    }
  }, [userRole]);

  return (
    <nav className="border-gray-200 bg-dark-blue h-16 sticky top-0 z-10">
      <div className="max-w-screen-xl mx-auto h-full flex justify-between align-items-center px-4">
        <div className="flex items-center">
          <img
            src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1710142650/petopia_logo-removebg-preview_1_gkh4v6.jpg"
            className="h-16 w-16"
            alt="Petopia Logo"
          />
          <span className="self-center text-2xl font-semibold text-saddle-brown ml-2">
            Petopia
          </span>
        </div>

        <ul className="flex flex-col font-medium md:p-0 m-0 md:space-x-8 rtl:space-x-reverse md:flex-row ">
          <li>
            <a
              href="/home"
              className="block py-2 px-3 text-dark text-decoration-none text-white rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
              aria-current="page"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/adopt"
              className="block py-2 px-3 text-dark text-decoration-none text-white rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
            >
              Adopt
            </a>
          </li>
          <li>
            <a
              href="/servicePlan"
              className="block py-2 px-3 text-dark text-decoration-none text-white rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="/trainingPlan"
              className="block py-2 px-3 text-dark text-decoration-none text-white rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
            >
              Trainings
            </a>
          </li>
        </ul>

        <div className="flex items-center space-x-6">
          <ul className="flex flex-col font-medium md:p-0 m-0 md:space-x-8 rtl:space-x-reverse md:flex-row">
            <li>
              {(userRole === "vet" || userRole === "admin")  ? (<div></div>): ( <div className="fixed bottom-6 right-6">
                <button
                  className="text-white flex items-center bg-red-600 py-3 px-4 rounded-pill fs-6"
                  onClick={handleClick}
                >
                  <img
                    src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1710150406/call-192-svgrepo-com_djygmx.svg"
                    className="w-6"
                    alt="Emergency Consultation"
                  />
                  <span className="ml-3">
                    Need a vet Urgently?
                  </span>
                </button>
              </div>)}
            </li>
          </ul>
          {token && (
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="relative flex rounded-full bg-dark-blue text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                  style={{width: "55px", height:"50px"}}
                    className="rounded-full"
                    // src={`${process.env.LOCAL}/assets/user.png`}
                    src={imageUrl? imageUrl: "http://localhost:3000/assets/user.png"}
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        onClick={redirectToProfile}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-saddle-brown font-bold font-2xl border-saddle-brown"
                            : "",
                          "block px-4 py-2 text-dark-blue hover:text-saddle-brown no-underline"
                        )}
                      >
                        My Profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={handleLogout}
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-saddle-brown font-bold font-2xl border-saddle-brown"
                            : "",
                          "block px-4 py-2 text-dark-blue hover:text-saddle-brown no-underline"
                        )}
                      >
                        Sign out
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
          {!token && (
            <li>
              <a
                className="text-saddle-brown   flex items-center bg-gray-500 py-2 px-3 rounded-pill fs-6 no-underline"
                href="/login"
              >
                Login / SignUp
              </a>
            </li>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;

// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import { Fragment } from "react";
// import { Menu, Transition } from "@headlessui/react";
// import classNames from "classnames";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import axiosInstance from "@/utils/axios";
// import toast from "react-hot-toast";

// function Header() {
//   const [token, setToken] = useState<string | null>(null);
//   const [userRole, setUserRole] = useState<string | null>();
//   const router = useRouter();
// console.log(token)
//   useEffect(() => {
//     setToken(localStorage.getItem("jwt"));
//     if (token) {
//       getRole();
//     }
//   }, [token]);

//   const getRole = async () => {
//     try {
//       // const response = await axios.post(`${process.env.HOST}/currentUser`, {
//       //   jwt: token,
//       // });
//       const response = await axiosInstance.get("/currentUser");
//       const role = response.data.role;
//       setUserRole(role);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleLogout = () => {
//     try {
//       const response = axios.post(`${process.env.HOST}/logout`);
//       localStorage.removeItem("jwt");
//       setToken(null);
//       toast.success("Logout Successful!")
//       setTimeout(() => {
//         router.push("/home");
//       },2000)
//     } catch (error) {
//       toast.success("Error Occurred! Please Try Again Later")
//       // console.error(error);
//     }
//   };

//   const handleClick = () => {
//     router.push("/availableVet");
//   };

//   const redirectToProfile = useCallback(() => {
//     if (userRole === "admin") {
//       router.push("/admin/profile ");
//     } else if (userRole === "user") {
//       router.push("/user/profile");
//     } else if (userRole === "vet") {
//       router.push("/vet/profile");
//     } else if (userRole === "trainer") {
//       router.push("/trainer/profile");
//     } else {
//       console.log("Unknown role or no role assigned");
//     }
//   }, [userRole]);

//   return (
//     <nav className="border-gray-200 bg-dark-blue h-16 sticky top-0 z-10">
//       <div className="max-w-screen-xl mx-auto h-full flex justify-between align-items-center px-4">
//         <div className="flex items-center">
//           <img
//             src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1710142650/petopia_logo-removebg-preview_1_gkh4v6.jpg"
//             className="h-16 w-16"
//             alt="Petopia Logo"
//           />
//           <span className="self-center text-2xl font-semibold text-saddle-brown ml-2">
//             Petopia
//           </span>
//         </div>

//         <ul className="flex flex-col font-medium md:p-0 m-0 md:space-x-8 rtl:space-x-reverse md:flex-row ">
//           <li>
//             <a
//               href="/home"
//               className="block py-2 px-3 text-dark text-decoration-none text-white rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
//               aria-current="page"
//             >
//               Home
//             </a>
//           </li>
//           <li>
//             <a
//               href="/adopt"
//               className="block py-2 px-3 text-dark text-decoration-none text-white rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
//             >
//               Adopt
//             </a>
//           </li>
//           <li>
//             <a
//               href="/servicePlan"
//               className="block py-2 px-3 text-dark text-decoration-none text-white rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
//             >
//               Services
//             </a>
//           </li>
//           <li>
//             <a
//               href="/trainingPlan"
//               className="block py-2 px-3 text-dark text-decoration-none text-white rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
//             >
//               Trainings
//             </a>
//           </li>
//           <li>
//             <a
//               href="#"
//               className="block py-2 px-3 text-dark text-decoration-none text-white rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
//             >
//               Contact Us
//             </a>
//           </li>
//         </ul>

//         <div className="flex items-center space-x-6">
//           <ul className="flex flex-col font-medium md:p-0 m-0 md:space-x-8 rtl:space-x-reverse md:flex-row">
//             <li>
//               <button
//                 className="text-white flex items-center bg-red-600 py-2 px-3 rounded-pill fs-6"
//                 onClick={handleClick}
//               >
//                 <img
//                   src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1710150406/call-192-svgrepo-com_djygmx.svg"
//                   className="w-6"
//                   alt="Emergency Consultation"
//                 />
//                 <span className="ml-3">Emergency</span>
//               </button>
//             </li>
//           </ul>
//           {token && (
//             <Menu as="div" className="relative ml-3">
//               <div>
//                 <Menu.Button className="relative flex rounded-full bg-dark-blue text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                   <span className="absolute -inset-1.5" />
//                   <span className="sr-only">Open user menu</span>
//                   <img
//                     className="h-8 w-8 rounded-full"
//                     // src={`${process.env.LOCAL}/assets/user.png`}
//                     src="http://localhost:3000/assets/user.png"
//                     alt=""
//                   />
//                 </Menu.Button>
//               </div>
//               <Transition
//                 as={Fragment}
//                 enter="transition ease-out duration-100"
//                 enterFrom="transform opacity-0 scale-95"
//                 enterTo="transform opacity-100 scale-100"
//                 leave="transition ease-in duration-75"
//                 leaveFrom="transform opacity-100 scale-100"
//                 leaveTo="transform opacity-0 scale-95"
//               >
//                 <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                   <Menu.Item>
//                     {({ active }) => (
//                       <a
//                         href="#"
//                         onClick={redirectToProfile}
//                         className={classNames(
//                           active
//                             ? "bg-gray-100 text-saddle-brown font-bold font-2xl border-saddle-brown"
//                             : "",
//                           "block px-4 py-2 text-dark-blue hover:text-saddle-brown no-underline"
//                         )}
//                       >
//                         My Profile
//                       </a>
//                     )}
//                   </Menu.Item>
//                   <Menu.Item>
//                     {({ active }) => (
//                       <a
//                         onClick={handleLogout}
//                         href="#"
//                         className={classNames(
//                           active
//                             ? "bg-gray-100 text-saddle-brown font-bold font-2xl border-saddle-brown"
//                             : "",
//                           "block px-4 py-2 text-dark-blue hover:text-saddle-brown no-underline"
//                         )}
//                       >
//                         Sign out
//                       </a>
//                     )}
//                   </Menu.Item>
//                 </Menu.Items>
//               </Transition>
//             </Menu>
//           )}
//           {!token && (
//             <li>
//               <a
//                 className="text-gray-700   flex items-center bg-saddle-brown py-2 px-3 rounded-pill fs-6 no-underline"
//                 href="/login"
//               >
//                 Login
//               </a>
//             </li>
//           )}
//         </div>

//       </div>
//     </nav>
//   );
// }

// export default Header;
