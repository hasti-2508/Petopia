"use client";

import { UserData } from "@/interfaces/user";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";

const UserData: UserData = {
  name: "",
  email: "",
  password: "",
  phoneNo: "",
  address: "",
  city: "",
  state: "",
  imageUrl: "",
  pets: [],
};

function UserRegister() {
  const [data, setData] = useState(UserData);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.HOST}/user/register`,
        data
      );

      const useId = response.data._id;
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        console.log(formData)
        const res = await axios.post(
          `${process.env.HOST}/pet/${useId}/uploadImage`,
          formData
        );
        console.log(res);
      }
      // window.location.href = "/Login";
    } catch (error:any) {
      console.error("Error:", error.response.data.message);
    }
  };

  const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "password") {
      setPasswordError(validatePassword(value));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImageFile(event.target.files[0]);
    }
  };

  const validatePassword = (password: string): string => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }

    if (!/\d/.test(password)) {
      return "Password must contain at least one digit";
    }

    if (!/[!@#$%^&*()_+{}[\]:";<>?,./\\|`~-]/.test(password)) {
      return "Password must contain at least one special character";
    }

    if (/\s/.test(password)) {
      return "Password must not contain whitespace";
    }

    return "";
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          onChange={handleDataChange}
          value={data.name}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={handleDataChange}
          value={data.email}
        />
        <label htmlFor="password">Password:</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            required
            onChange={handleDataChange}
            value={data.password}
            className="pr-10"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-4 py-2 bg-dark-blue text-white rounded-xl flex items-center"
            onClick={togglePasswordVisibility}
            style={{ top: 0, bottom: 0, width: "92px", marginLeft: "19px" }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
        <label htmlFor="phoneNo">Phone Number:</label>
        <input
          type="tel"
          id="phoneNo"
          name="phoneNo"
          pattern="[0-9]{10}"
          maxLength={10}
          onChange={handleDataChange}
          value={data.phoneNo}
          required
        />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          required
          onChange={handleDataChange}
          value={data.address}
        />
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          required
          onChange={handleDataChange}
          value={data.city}
        />
        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          name="state"
          required
          onChange={handleDataChange}
          value={data.state}
        />

        <label>
          Pet Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </label>

        <button
          type="submit"
          value="Submit"
          className="bg-dark-blue my-3 mx-96 w-1/5"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default UserRegister;
