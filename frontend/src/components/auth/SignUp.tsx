"use client";
import React, { ChangeEvent } from "react";

function SignUp() {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const role = e.target.value;
    {
      console.log(role);
    }
    switch (role) {
      case "vet":
        window.location.href = "/Vet/register";
        break;
      case "trainer":
        window.location.href = "/Trainer/register";
        break;
      case "user":
        window.location.href = "/User/register";
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="flex-col p-32 justify-center items-center object-cover "
      style={{
        height: "42rem",
        backgroundImage: "url(http://localhost:3000/assets/signup.webp)",
        opacity: "0.9",
        backgroundPosition: "center",
      }}
    >
      <div
        className="bg-gray-200 p-12 shadow rounded-xl "
        style={{ width: "450px", height: "250px" }}
      >
        <div
          className="mb-3 font-bold"
          style={{ fontFamily: "open-sans", fontSize: "35px" }}
        >
          <label htmlFor="role">🌀 What is your role?</label>
        </div>
        <div
          className="ml-5  bg-gray-200"
          style={{ fontFamily: "open-sans", fontSize: "20px" }}
        >
          <select
            id="role"
            className="bg-gray-200 border-black"
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="vet">Vet</option>
            <option value="trainer">Trainer</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
