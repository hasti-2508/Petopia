"use client";
import React from "react";
import About from "./About";

function Home() {
  return (
    <div className="bg-saddle-brown">
      <div className="position-relative ">
        <img
          src="http://localhost:3000/assets/pet-banner-tpn-12052020-v1.jpg"
          alt="Background"
          className="inset-0 w-full h-full object-cover"
        />
        <div className=" bg-white position-absolute custom-box border-gray-300 border-2 p-4 ml-8 rounded-xl shadow-md w-4/5 flex-col items-center">
          <h1
            className="text-center text-gray-600 font-bold text-2xl"
            style={{ fontFamily: "open-sans", fontSize: "40px" }}
          >
            Petopia: To make your pet Happy
          </h1>
          <p
            className="text-center text-gray-600  text-xl mt-3"
            style={{ fontFamily: "open-sans", fontSize: "20px" }}
          >
            Book Pet Care Service Appointments At Home
          </p>
          <div className="row mt-3">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <div
                className="card flex-row  mt-2 rounded-xl box"
                style={{ width: "450px", marginLeft: "70px" }}
              >
                <div className="bg-white hover:bg-saddle-brown"></div>
                <div className="card-body text-gray-600 custom-border rounded-xl flex flex-col items-center justify-center">
                  <img
                    style={{ height: "10vh", width: "12vh" }}
                    className="h-20 "
                    src="http://localhost:3000/assets/3725584.jpg"
                  />
                  <h5
                    className="card-title font-bold "
                    style={{ fontFamily: "open-sans", fontSize: "30px" }}
                  >
                    Pet Adoption
                  </h5>
                  <p className="card-text ">
                    Adopt, Don't Shop: Save a Life Today
                  </p>
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div
                className="card flex-row ml-7 mt-2 rounded-xl box"
                style={{ width: "450px" }}
              >
                <div className="bg-white hover:bg-saddle-brown"></div>
                <div className="card-body text-gray-600 custom-border rounded-xl flex flex-col items-center justify-center">
                  <img
                    style={{ height: "10vh", width: "10vh" }}
                    className="h-20 "
                    src="http://localhost:3000/assets/9459988.jpg"
                  />
                  <h5
                    className="card-title font-bold "
                    style={{ fontFamily: "open-sans", fontSize: "30px" }}
                  >
                    Pet Grooming
                  </h5>
                  <p className="card-text">
                    Book In-Home Grooming Session For Your Pet
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <div
                className="card flex-row ml-7 mt-2 rounded-xl box"
                style={{ width: "450px", marginLeft: "70px" }}
              >
                <div className="bg-white hover:bg-saddle-brown"></div>
                <div className="card-body text-gray-600 custom-border rounded-xl flex flex-col items-center justify-center">
                  <img
                    style={{ height: "11vh", width: "15vh" }}
                    className="h-20 "
                    src="http://localhost:3000/assets/veterinarian_03.jpg"
                  />
                  <h5
                    className="card-title font-bold "
                    style={{ fontFamily: "open-sans", fontSize: "30px" }}
                  >
                    Vet on Call
                  </h5>
                  <p className="card-text">
                    Expert Veterinary Care Service At Your Home
                  </p>
                </div>
              </div>
            </div>

            <div className="col-sm-6">
              <div
                className="card flex-row ml-7 mt-2 rounded-xl box"
                style={{ width: "450px" }}
              >
                <div className="bg-white hover:bg-saddle-brown"></div>
                <div className="card-body text-gray-600 custom-border rounded-xl flex flex-col items-center justify-center">
                  <img
                    style={{ height: "11vh", width: "15vh" }}
                    className="h-20 "
                    src="http://localhost:3000/assets/3805957.jpg"
                  />
                  <h5
                    className="card-title font-bold "
                    style={{ fontFamily: "open-sans", fontSize: "30px" }}
                  >
                    Pet Training
                  </h5>
                  <p className="card-text">Join Our Dog Training Programs</p>
                </div>
              </div>
            </div>
          </div>

          <form className="flex items-center max-w-sm mx-auto mt-5">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center  pointer-events-none">
                <img
                  className="w-10 h-7 mr-0"
                  src="http://localhost:3000/assets/19406483.jpg"
                />
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-white border border-saddle-brown text-gray-600 text-sm rounded-lg  block w-full ps-10 p-2.5"
                placeholder="Search city name..."
                required
              />
            </div>
            <button
              type="submit"
              className=" p-2.5 ml-5 text-sm font-bold text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
              style={{ width: "200px", height: "45px" }}
            >
              Adopt pet
              <span className="sr-only">Search</span>
            </button>
          </form>
          {/* <p className="text-center mt-2 text-red-700">
              Sorry, we are not providing service in this city
            </p> */}
        </div>
      </div>

      <section style={{ marginTop: "500px" }}>
        <div className="bg-white mb-10">
          <h1
            className="text-xl font-bold text-gray-600  text-center "
            style={{ fontFamily: "open-sans", fontSize: "40px" }}
          >
            <br />
            Services for every Pet
          </h1>
        </div>
      </section>

      {/* 
how it works ---component -------DO NOT DELETE --------------
      <section className="py-12 bg-gray-100" >
        <div className=" mx-auto md:px-0 md:max-w-screen-md lg:max-w-screen-lg">
          <h2
            className="text-xl font-bold text-gray-600  text-center "
            style={{ fontFamily: "open-sans", fontSize: "40px" }}
          >
            How it works?
          </h2>
          <p
            className="text-sm font-semibold text-gray-600  text-center mt-3"
            style={{ fontFamily: "open-sans", fontSize: "20px" }}
          >
            Charges may vary based on Pet and City.
          </p>
          <div className="flex justify-evenly gap-5 items-center mt-8">
            <div className="max-w-[388px] w-full text-center flex flex-col items-center">
              <div className="svg mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="40"
                  version="1.1"
                  viewBox="-1 0 136 136.21852"
                  width="40"
                >
                  {" "}
                  <g id="surface1">
                    {" "}
                    <path
                      d="M 93.148438 80.832031 C 109.5 57.742188 104.03125 25.769531 80.941406 9.421875 C 57.851562 -6.925781 25.878906 -1.460938 9.53125 21.632812 C -6.816406 44.722656 -1.351562 76.691406 21.742188 93.039062 C 38.222656 104.707031 60.011719 105.605469 77.394531 95.339844 L 115.164062 132.882812 C 119.242188 137.175781 126.027344 137.347656 130.320312 133.269531 C 134.613281 129.195312 134.785156 122.410156 130.710938 118.117188 C 130.582031 117.980469 130.457031 117.855469 130.320312 117.726562 Z M 51.308594 84.332031 C 33.0625 84.335938 18.269531 69.554688 18.257812 51.308594 C 18.253906 33.0625 33.035156 18.269531 51.285156 18.261719 C 69.507812 18.253906 84.292969 33.011719 84.328125 51.234375 C 84.359375 69.484375 69.585938 84.300781 51.332031 84.332031 C 51.324219 84.332031 51.320312 84.332031 51.308594 84.332031 Z M 51.308594 84.332031 "
                      style={{
                        stroke: "none",
                        fillRule: "nonzero",
                        fill: "#4A5568",
                        fillOpacity: "1",
                      }}
                    ></path>{" "}
                  </g>{" "}
                </svg>
              </div>
              <h4
                className="text-gray-600 font-bold"
                style={{ fontFamily: "open-sans", fontSize: "40px" }}
              >
                Search
              </h4>
              <p style={{ fontFamily: "open-sans", fontSize: "20px" }}>
                Search pet care heroes by location and service.
              </p>
            </div>

            <div className="max-w-[388px] w-full text-center flex flex-col items-center">
              <div className="svg mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="40"
                  viewBox="-21 -47 682.66669 682"
                  width="40"
                >
                  <path
                    d="m552.011719-1.332031h-464.023438c-48.515625 0-87.988281 39.472656-87.988281 87.988281v283.972656c0 48.421875 39.300781 87.824219 87.675781 87.988282v128.871093l185.183594-128.859375h279.152344c48.515625 0 87.988281-39.472656 87.988281-88v-283.972656c0-48.515625-39.472656-87.988281-87.988281-87.988281zm-83.308594 330.011719h-297.40625v-37.5h297.40625zm0-80h-297.40625v-37.5h297.40625zm0-80h-297.40625v-37.5h297.40625zm0 0"
                    fill="#4A5568"
                  ></path>
                </svg>
              </div>
              <h4
                className="text-gray-600 font-bold  "
                style={{ fontFamily: "open-sans", fontSize: "40px" }}
              >
                Book
              </h4>
              <p
                className="mb-4"
                style={{ fontFamily: "open-sans", fontSize: "20px" }}
              >
                Schedule your appointment at home.
              </p>
            </div>

            <div className="max-w-[388px] w-full text-center flex flex-col items-center">
              <div className="svg mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 469.333 469.333"
                  style={
                    {
                      enableBackground: "new 0 0 469.333 469.333",
                    } as React.CSSProperties
                  }
                  xmlSpace="preserve"
                >
                  {" "}
                  <g>
                    {" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path
                          d="M434.979,42.667H85.333c-1.053,0-2.014,0.396-3.001,0.693l-8.594-28.241C71.005,6.138,62.721,0,53.333,0H10.667     C4.776,0,0,4.776,0,10.667V32c0,5.891,4.776,10.667,10.667,10.667h26.865l66.646,219.01l-24.891,29.039     c-9.838,11.477-14.268,27.291-9.74,41.713c5.791,18.445,22.07,30.237,40.839,30.237H416c5.891,0,10.667-4.776,10.667-10.667     v-21.333c0-5.891-4.776-10.667-10.667-10.667H110.385l33.813-39.448c0.85-0.992,1.475-2.112,2.12-3.219h206.703     c16.533,0,31.578-9.548,38.618-24.507l74.434-158.17c2.135-4.552,3.26-9.604,3.26-14.615v-3.021     C469.333,58.048,453.952,42.667,434.979,42.667z"
                          fill="#4A5568"
                        ></path>{" "}
                        <circle
                          cx="128"
                          cy="426.667"
                          r="42.667"
                          fill="#4A5568"
                        ></circle>{" "}
                        <circle
                          cx="384"
                          cy="426.667"
                          r="42.667"
                          fill="#4A5568"
                        ></circle>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                  <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{" "}
                  <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{" "}
                  <g> </g>{" "}
                </svg>
              </div>
              <h4
                className="text-gray-600 font-bold"
                style={{ fontFamily: "open-sans", fontSize: "40px" }}
              >
                Relax
              </h4>
              <p style={{ fontFamily: "open-sans", fontSize: "20px" }}>
                Sit back and relax! Your pet hero is on his way.
              </p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default Home;
