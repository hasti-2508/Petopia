"use client";
import React, { useState } from "react";

// SVG components for cat and dog icons
const CatIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    viewBox="0 0 511.292 511.292"
  >
    {/* Cat icon paths */}
  </svg>
);

const DogIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    viewBox="0 0 511.999 511.999"
  >
    {/* Dog icon paths */}
  </svg>
);

const BookService = () => {
  const [petType, setPetType] = useState("");

  return (
    <div>
      {petType === "cat" ? <CatIcon /> : petType === "dog" ? <DogIcon /> : null}

      <div className="pet-details-box">
        <h1 className="funnel-heading">Add Pet Details</h1>
        <form
          name="petInfoForm"
          className="ng-pristine ng-valid ng-valid-required"
        >
          <div className="details">
            <div id="pet-type" className="pet-type-root">
              <label>What type of pet?</label>
              <div className="flex-pet-type">
                <div
                  className={`flex-pet-type-item${
                    petType === "cat" ? " active" : ""
                  }`}
                  onClick={() => {
                    setPetType("cat");
                  }}
                >
                  <CatIcon />
                  <div className="text">Cat</div>
                </div>
                <div
                  className={`flex-pet-type-item${
                    petType === "dog" ? " active" : ""
                  }`}
                  onClick={() => {
                    setPetType("dog");
                  }}
                >
                  <DogIcon />
                  <div className="text">Dog</div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookService;
