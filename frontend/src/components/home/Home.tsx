"use client";
import Link from "next/link";
import React from "react";
import {
  AdoptLove,
  BookIcon,
  RelaxIcon,
  SearchIcon,
  SearchPet,
  Vet,
} from "./Icon";

function Home() {
  return (
    <div className=" bg-saddle-brown ">
      <div className="position-relative">
        <img
          src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379125/pet-banner-tpn-12052020-v1_wsem9r.jpg"
          alt="Background"
          className="inset-0 w-full h-full object-cover fade-in-up"
        />
        <div
          style={{ width: "1100px" }}
          className=" bg-white position-absolute custom-box border-gray-300 border-2 p-4 rounded-xl shadow hover:shadow-2xl mx-auto flex-col items-center"
        >
          <h1
            className="text-center text-dark-blue font-bold text-2xl "
            style={{ fontFamily: "open-sans", fontSize: "35px" }}
          >
            Petopia: To make your pet Happy
          </h1>
          <p
            className="text-center text-dark-blue  text-xl mt-3"
            style={{ fontFamily: "open-sans", fontSize: "20px" }}
          >
            Book Pet Care Service Appointments At Home
          </p>
          <div className="row mt-3 gap-5">
            <div className="col-sm-5 mb-3 mb-sm-0">
              <div
                className="card flex-row  mt-2 rounded-xl box"
                style={{ width: "450px", marginLeft: "70px" }}
              >
                <div className="bg-white hover:bg-saddle-brown"></div>
                <Link
                  href="/adopt"
                  className="card-body no-underline text-gray-600 custom-border rounded-xl flex flex-col items-center justify-center"
                >
                  <img
                    style={{ height: "10vh", width: "12vh" }}
                    className="h-20 "
                    src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379262/3725584_fteulg.jpg"
                  />
                  <h5
                    className="card-title font-bold mt-2 "
                    style={{ fontFamily: "open-sans", fontSize: "25px" }}
                  >
                    Pet Adoption
                  </h5>
                  <p className="card-text ">
                    Adopt, Don't Shop: Save a Life Today
                  </p>
                </Link>
              </div>
            </div>

            <div className="col-sm-5">
              <div
                className="card flex-row ml-7 mt-2 rounded-xl box"
                style={{ width: "450px" }}
              >
                <div className="bg-white hover:bg-saddle-brown"></div>
                <Link
                  href="/servicePlan"
                  className="card-body no-underline text-gray-600 custom-border rounded-xl flex flex-col items-center justify-center"
                >
                  <img
                    style={{ height: "10vh", width: "10vh" }}
                    className="h-20 "
                    src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379345/9459988_el1lvl.jpg"
                  />
                  <h5
                    className="card-title font-bold mt-2 "
                    style={{ fontFamily: "open-sans", fontSize: "25px" }}
                  >
                    Pet Grooming
                  </h5>
                  <p className="card-text">
                    Book In-Home Grooming Session For Your Pet
                  </p>
                </Link>
              </div>
            </div>
          </div>

          <div className="row mt-3 gap-5">
            <div className="col-sm-5 mb-3 mb-sm-0">
              <div
                className="card flex-row ml-7 mt-2 rounded-xl box"
                style={{ width: "450px", marginLeft: "70px" }}
              >
                <div className="bg-white hover:bg-saddle-brown"></div>
                <Link
                  href="/availableVet"
                  className="card-body no-underline text-gray-600 custom-border rounded-xl flex flex-col items-center justify-center"
                >
                  <img
                    style={{ height: "11vh", width: "15vh" }}
                    className="h-20 "
                    src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379713/veterinarian_03_rlywxg.jpg"
                  />
                  <h5
                    className="card-title font-bold mt-2 "
                    style={{ fontFamily: "open-sans", fontSize: "25px" }}
                  >
                    Vet on Call
                  </h5>
                  <p className="card-text">
                    Expert Veterinary Care Service At Your Home
                  </p>
                </Link>
              </div>
            </div>

            <div className="col-sm-5">
              <div
                className="card flex-row ml-7 mt-2 rounded-xl box"
                style={{ width: "450px" }}
              >
                <div className="bg-white hover:bg-saddle-brown"></div>
                <Link
                  href="/trainingPlan"
                  className=" no-underline card-body text-gray-600 custom-border rounded-xl flex flex-col items-center justify-center"
                >
                  <img
                    style={{ height: "11vh", width: "15vh" }}
                    className="h-20 "
                    src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379439/3805957_mjnxbb.jpg"
                  />
                  <h5
                    className="card-title font-bold mt-2"
                    style={{ fontFamily: "open-sans", fontSize: "25px" }}
                  >
                    Pet Training
                  </h5>
                  <p className="card-text">Join Our Dog Training Programs</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section
        className="py-12 shadow-2xl bg-dark-blue mb-4 "
        style={{ marginTop: "400px" }}
      >
        <div className=" mx-auto md:px-0 md:max-w-screen-md lg:max-w-screen-lg">
          <h2
            className="text-xl font-bold text-white  text-center  "
            style={{ fontFamily: "open-sans", fontSize: "40px" }}
          >
            How it works?
          </h2>
          <p
            className="text-sm font-semibold text-white  text-center mt-3"
            style={{ fontFamily: "open-sans", fontSize: "20px" }}
          >
            Charges may vary based on Pet and City.
          </p>
          <div className="flex justify-evenly gap-5 items-center mt-8 ">
            {/* Card 1 */}
            <div className="max-w-[388px] w-full text-center flex flex-col items-center bg-white  p-5 rounded-lg shadow-2xl card-container  ">
              <div className="svg mb-4">
                <SearchIcon />
              </div>
              <h4
                className="text-black font-bold"
                style={{ fontFamily: "open-sans", fontSize: "40px" }}
              >
                Search
              </h4>
              <p
                style={{ fontFamily: "open-sans", fontSize: "20px" }}
                className="text-black"
              >
                Search pet care heroes by location and service.
              </p>
            </div>

            {/* Card 2 */}
            <div className="max-w-[388px] w-full text-center flex flex-col items-center bg-white p-5 rounded-lg shadow-2xl card-container">
              <div className="svg mb-4">
                <BookIcon />
              </div>
              <h4
                className="text-black font-bold"
                style={{ fontFamily: "open-sans", fontSize: "40px" }}
              >
                Book
              </h4>
              <p
                className="mb-4 text-black"
                style={{ fontFamily: "open-sans", fontSize: "20px" }}
              >
                Schedule your appointment at home.
              </p>
            </div>

            {/* Card 3 */}
            <div className="max-w-[388px] w-full text-center flex flex-col items-center bg-white p-5 rounded-lg shadow-2xl card-container  ">
              <div className="svg mb-4">
                <RelaxIcon />
              </div>
              <h4
                className="text-black font-bold"
                style={{ fontFamily: "open-sans", fontSize: "40px" }}
              >
                Relax
              </h4>
              <p
                className="text-black"
                style={{ fontFamily: "open-sans", fontSize: "20px" }}
              >
                Sit back and relax! Your pet hero is on his way.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white p-8 ">
        <h1
          className="text-center text-3xl font-bold text-gray-700 mb-12 "
          style={{ fontFamily: "open-sans", fontSize: "35px" }}
        >
          Your Pet Adoption Journey with Petopia
        </h1>
        <div className="flex px-56">
          <div className="w-full h-full mr-6 mt-32">
            <img
              src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379460/home_r2xsnm.avif"
              alt=""
            />
          </div>
          <div>
            <div className="flex gap-5 ml-11">
              <div>
                <SearchPet />
              </div>
              <div>
                <label
                  className="font-bold text-gray-700"
                  style={{ fontFamily: "open-sans", fontSize: "25px" }}
                >
                  Search Pet
                </label>
                <div style={{ fontFamily: "open-sans", fontSize: "19px" }}>
                  Adopt a dog or cat who's right for you. Simply enter your city
                  above to start your search.
                </div>
              </div>
            </div>
            <div className="flex gap-0 mt-9">
              <img
                src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379454/connect_k2fvky.avif"
                className=" w-1/5 h-1/3 mx-3"
                alt=""
              />

              <div>
                <label
                  className="font-bold text-gray-700"
                  style={{ fontFamily: "open-sans", fontSize: "25px" }}
                >
                  Connect
                </label>
                <div style={{ fontFamily: "open-sans", fontSize: "19px" }}>
                  Once you find a pet, click "show number" to get contact info
                  for their pet parent or rescue. Contact them to learn more
                  about how to meet and adopt the pet.
                </div>
              </div>
            </div>
            <div className="flex gap-5 mt-8 ml-11 ">
              <div>
                <AdoptLove />
              </div>
              <div>
                <label
                  className="font-bold text-gray-700"
                  style={{ fontFamily: "open-sans", fontSize: "25px" }}
                >
                  AdoptLove
                </label>
                <div style={{ fontFamily: "open-sans", fontSize: "19px" }}>
                  The rescue or pet parents will walk you through their adoption
                  process. Prepare your home for the arrival of your fur baby to
                  help them adjust to their new family.
                </div>
              </div>
            </div>
            <div className="flex gap-5 mt-12 ml-11">
              <div>
                <Vet />
              </div>
              <div>
                <label
                  className="font-bold text-gray-700"
                  style={{ fontFamily: "open-sans", fontSize: "25px" }}
                >
                  Free Vet Consultation
                </label>
                <div style={{ fontFamily: "open-sans", fontSize: "19px" }}>
                  Petopia will help your pet to settle down in its new home,
                  once you complete the Adoption journey reach out to us for
                  free vet consultation.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white w-full bg-home"></div>
    </div>
  );
}

export default Home;
