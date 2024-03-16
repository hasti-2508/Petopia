"use client";
import Link from "next/link";
import React, { useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav style={{ background: "#727aaa" }} className="border-gray-200 h-16">
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

        <ul className="flex flex-col font-medium md:p-0 m-0 md:space-x-8 rtl:space-x-reverse md:flex-row">
          <li>
            <a
              href="#"
              className="block py-2 px-3 text-dark text-decoration-none rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
              aria-current="page"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-3 text-dark text-decoration-none rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-3 text-dark text-decoration-none rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-3 text-dark text-decoration-none rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
            >
              Pricing
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-3 text-dark text-decoration-none rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
            >
              Contact
            </a>
          </li>
        </ul>

        <div className="flex items-center space-x-6">
          <ul className="flex flex-col font-medium md:p-0 m-0 md:space-x-8 rtl:space-x-reverse md:flex-row">
            <li>
              <button className="text-white flex items-center bg-dark-blue py-2 px-3 rounded-pill fs-6">
                <img
                  src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1710150406/call-192-svgrepo-com_djygmx.svg"
                  className="w-6"
                  alt="Emergency Consultation"
                />
                <span className="ml-3">Emergency</span>
              </button>
            </li>
          </ul>

          <Link href="/Login" className="bg-saddle-brown hover:text-white text-dark-blue font-bold py-2 px-4 rounded ">
            Log In
          </Link>
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

// <nav className="border-gray-200 bg-dark-blue h-20">
//       <div
//         className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto"
//         style={{ paddingBottom: "-100px" }}
//       >
//         <div className="flex items-center">
//           <img
//             src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1710142650/petopia_logo-removebg-preview_1_gkh4v6.jpg"
//             className="h-20 w-20"
//             alt="Petopia Logo"
//           />
//           <span className="self-center text-4xl font-semibold whitespace-nowrap text-saddle-brown">
//             Petopia
//           </span>
//         </div>
//         <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
//           <button className="flex items-center bg-transparent text-red-500 mr-8">
//             <img
//               src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1710150406/call-192-svgrepo-com_djygmx.svg"
//               className="w-6 mr-3"
//             />
//             Emergency Consultation
//           </button>

//           <div className="flex ml-8">
//             <button className="bg-saddle-brown hover:text-white text-dark-blue font-bold py-2 px-4 rounded ml-5">
//               Log In
//             </button>
//           </div>
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
//         <div
//           className={`${
//             menuOpen ? "block" : "hidden"
//           } w-full md:flex md:w-auto md:order-1`}
//           id="navbar-user"
//         >
//           <ul className="flex flex-col font-medium p-5 md:p-0 mt-1 md:space-x-8 rtl:space-x-reverse md:flex-row">
//             <li>
//               <a
//                 href="#"
//                 className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
//                 aria-current="page"
//               >
//                 Home
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
//               >
//                 About
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
//               >
//                 Services
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
//               >
//                 Pricing
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 hover:text-saddle-brown"
//               >
//                 Contact
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
