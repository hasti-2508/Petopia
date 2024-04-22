import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="bg-dark-blue mb-0">
      <div className="mx-auto w-full max-w-screen-xl pt-10 pb-5">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0 ">
            <div className="flex items-center">
              <img
                src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1710142650/petopia_logo-removebg-preview_1_gkh4v6.jpg"
                className="h-20 w-20"
                alt="Petopia Logo"
              />
              <span className="self-center text-4xl font-semibold whitespace-nowrap text-saddle-brown">
                Petopia
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-3 sm:grid-cols-4">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-saddle-brown uppercase ml-8">
                Petopia
              </h2>
              <ul className="text-white font-medium ml-8 ps-0">
                <li className="mb-4">
                  <Link
                    href="/home"
                    className="hover:underline text-white no-underline"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/home"
                    className="hover:underline text-white no-underline"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <h2 className="mb-6 text-sm font-semibold text-saddle-brown uppercase">
                Home Services
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium ps-0">
                <li className="mb-4">
                  <Link
                    href="/servicePlan"
                    className="hover:underline text-white no-underline"
                  >
                    Pet Grooming
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    href="/trainingPlan"
                    className="hover:underline text-white no-underline"
                  >
                    Pet Training
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    href="/availableVet"
                    className="hover:underline text-white no-underline"
                  >
                    Home Vet Consultation
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    href="/availableVet"
                    className="hover:underline text-white no-underline"
                  >
                    Online Vet Consultation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-saddle-brown uppercase  ml-8">
                Partner
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium ml-8 ps-0">
                <li className="mb-4">
                  <Link
                    href="/vet/register"
                    className="hover:underline text-white no-underline"
                  >
                    Become a Vet
                  </Link>
                </li>
                <li>
                  <Link
                    href="/trainer/register"
                    className="hover:underline text-white no-underline"
                  >
                    Become a Trainer
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-saddle-brown uppercase ml-8">
                Policy
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium ml-8 ps-0">
                <li className="mb-4">
                  <Link
                    href="/home"
                    className="hover:underline text-white no-underline"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/home"
                    className="hover:underline text-white no-underline "
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-200 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-400 sm:text-center ">
            © 2023
            <Link href="/home" className="hover:underline">
              Petopia™
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <div className="text-gray-200">
              Designed & Developed by @Hasti Kapadiya
            </div>
            <Link
              href="https://github.com/hasti-2508"
              target="_blank"
              className="text-gray-200 hover:text-gray-900 dark:hover:text-white ml-2"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">GitHub account</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
