"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import axios from "axios";
import { useRouter } from "next/navigation";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>();
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  // const getCookie = (name: string) => {
  //   const cookies = document.cookie.split("; ");
  //   for (let i = 0; i < cookies.length; i++) {
  //     const cookie = cookies[i];
  //     const [cookieName, cookieValue] = cookie.split("=");
  //     if (cookieName === name) {
  //       return cookieValue;
  //     }
  //   }
  //   return null;
  // };
  useEffect(() => {
    // const token = getCookie("jwt");
    setToken(localStorage.getItem("jwt_token"));
    if (token) {
      getRole(token);
    }
  }, [token]);

  const getRole = async (token: string) => {
    try {
      const response = await axios.post(`${process.env.HOST}/currentUser`, {
        jwt: token,
      });
      const role = response.data.role;
      setUserRole(role);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    try {
      const response = axios.post(`${process.env.HOST}/logout`);
      localStorage.removeItem("jwt_token");
      setToken(null);;
      router.push("/Home");
    } catch (error) {
      console.error(error);
    }
  };

  const redirectToProfile = useCallback(() => {
    if (userRole === "admin") {
      router.push("/Admin/Profile ");
    } else if (userRole === "user") {
      router.push("/User/Profile");
    } else if (userRole === "vet") {
      router.push("/Vet/Profile");
    } else if (userRole === "trainer") {
      router.push("/Trainer/Profile");
    } else {
      console.log("Unknown role or no role assigned");
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
              href="/Home"
              className="block py-2 px-3 text-dark text-decoration-none text-white rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
              aria-current="page"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/Adopt"
              className="block py-2 px-3 text-dark text-decoration-none text-white rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
            >
              Adopt
            </a>
          </li>
          <li>
            <a
              href="/PetService"
              className="block py-2 px-3 text-dark text-decoration-none text-white rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="/PetTraining"
              className="block py-2 px-3 text-dark text-decoration-none text-white rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
            >
              Trainings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-3 text-dark text-decoration-none text-white rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
            >
              Contact Us
            </a>
          </li>
        </ul>

        <div className="flex items-center space-x-6">
          <ul className="flex flex-col font-medium md:p-0 m-0 md:space-x-8 rtl:space-x-reverse md:flex-row">
            <li>
              <button className="text-white flex items-center bg-red-600 py-2 px-3 rounded-pill fs-6">
                <img
                  src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1710150406/call-192-svgrepo-com_djygmx.svg"
                  className="w-6"
                  alt="Emergency Consultation"
                />
                <span className="ml-3">Emergency</span>
              </button>
            </li>
          </ul>
          {token && (
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="relative flex rounded-full bg-dark-blue text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="http://localhost:3000/assets/user.png"
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
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Your Profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={handleLogout}
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
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
                className="text-gray-700   flex items-center bg-saddle-brown py-2 px-3 rounded-pill fs-6 no-underline"
                href="/Login"
              >
                Login
              </a>
            </li>
          )}

          {/* <Link href="/Login" className="bg-saddle-brown hover:text-white text-dark-blue font-bold py-2 px-4 rounded ">
            Log In
          </Link> */}
        </div>

        <div
          className="items-center justify-between w-full md:hidden"
          id="navbar-user"
        >
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={menuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
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

// function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [token, setToken] = useState<string | null>();
//   const [userRole, setUserRole] = useState<string | null>();
//   const [isLogin, setIsLogin] = useState(false);
//   const router = useRouter();

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };
//   // const getCookie = (name: string) => {
//   //   const cookies = document.cookie.split("; ");
//   //   for (let i = 0; i < cookies.length; i++) {
//   //     const cookie = cookies[i];
//   //     const [cookieName, cookieValue] = cookie.split("=");
//   //     if (cookieName === name) {
//   //       return cookieValue;
//   //     }
//   //   }
//   //   return null;
//   // };

//   // useEffect(() => {
//   //   const jwtToken = localStorage.getItem("jwt_token");
//   //   console.log("---->", jwtToken, isLogin);
//   //   if (jwtToken) {
//   //     setIsLogin(true);
//   //   }
//   //   setToken(jwtToken);
//   //   if (token) {
//   //     getRole(token);
//   //   }
//   // }, [token, isLogin]);

//   // useEffect(() => {
//   //   const jwtToken = localStorage.getItem("jwt_token");
//   //   console.log("---->", jwtToken, isLogin);
//   //   if (jwtToken) {
//   //     setIsLogin(true);
//   //     setToken(jwtToken);
//   //   } else {
//   //     setIsLogin(false);
//   //     setToken(null);
//   //   }
//   // }, []); // Only run once when component mounts

//   // useEffect(() => {
//   //   console.log("--->", token, isLogin);
//   //   if (token && isLogin) {
//   //     getRole(token);
//   //   }
//   // }, [token, isLogin]); // Run whenever token or isLogin changes

//   const getRole = async (token: string) => {
//     try {
//       const response = await axios.post(`${process.env.HOST}/currentUser`, {
//         jwt: token,
//       });
//       const role = response.data.role;
//       setUserRole(role);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleLogout = () => {
//     try {
//       localStorage.removeItem("jwt_token");
//       setIsLogin(false);
//       const response = axios.post(`${process.env.HOST}/logout`);
//       router.push("/Home");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const redirectToProfile = useCallback(() => {
//     if (userRole === "admin") {
//       router.push("/Admin/Profile ");
//     } else if (userRole === "user") {
//       router.push("/User/Profile");
//     } else if (userRole === "vet") {
//       router.push("/Vet/Profile");
//     } else if (userRole === "trainer") {
//       router.push("/Trainer/Profile");
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
//               href="/Home"
//               className="block py-2 px-3 text-dark text-decoration-none text-white rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
//               aria-current="page"
//             >
//               Home
//             </a>
//           </li>
//           <li>
//             <a
//               href="/Adopt"
//               className="block py-2 px-3 text-dark text-decoration-none text-white rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
//             >
//               Adopt
//             </a>
//           </li>
//           <li>
//             <a
//               href="/PetService"
//               className="block py-2 px-3 text-dark text-decoration-none text-white rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
//             >
//               Services
//             </a>
//           </li>
//           <li>
//             <a
//               href="/PetTraining"
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
//               <button className="text-white flex items-center bg-red-600 py-2 px-3 rounded-pill fs-6">
//                 <img
//                   src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1710150406/call-192-svgrepo-com_djygmx.svg"
//                   className="w-6"
//                   alt="Emergency Consultation"
//                 />
//                 <span className="ml-3">Emergency</span>
//               </button>
//             </li>
//           </ul>
//           {isLogin ? (
//             <Menu as="div" className="relative ml-3">
//               <div>
//                 <Menu.Button className="relative flex rounded-full bg-dark-blue text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                   <span className="absolute -inset-1.5" />
//                   <span className="sr-only">Open user menu</span>
//                   <img
//                     className="h-8 w-8 rounded-full"
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
//                           active ? "bg-gray-100" : "",
//                           "block px-4 py-2 text-sm text-gray-700"
//                         )}
//                       >
//                         Your Profile
//                       </a>
//                     )}
//                   </Menu.Item>
//                   <Menu.Item>
//                     {({ active }) => (
//                       <a
//                         onClick={handleLogout}
//                         href="#"
//                         className={classNames(
//                           active ? "bg-gray-100" : "",
//                           "block px-4 py-2 text-sm text-gray-700"
//                         )}
//                       >
//                         Sign out
//                       </a>
//                     )}
//                   </Menu.Item>
//                 </Menu.Items>
//               </Transition>
//             </Menu>
//           ) : (
//             <li>
//               <a
//                 className="text-gray-700 flex items-center bg-saddle-brown py-2 px-3 rounded-pill fs-6 no-underline"
//                 href="/Login"
//               >
//                 Login
//               </a>
//             </li>
//           )}

//           {/* <Link href="/Login" className="bg-saddle-brown hover:text-white text-dark-blue font-bold py-2 px-4 rounded ">
//             Log In
//           </Link> */}
//         </div>

//         <div
//           className="items-center justify-between w-full md:hidden"
//           id="navbar-user"
//         >
//           <button
//             onClick={toggleMenu}
//             type="button"
//             className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//             aria-controls="navbar-user"
//             aria-expanded={menuOpen ? "true" : "false"}
//           >
//             <span className="sr-only">Open main menu</span>
//             <svg
//               className="w-5 h-5"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 17 14"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M1 1h15M1 7h15M1 13h15"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Header;
