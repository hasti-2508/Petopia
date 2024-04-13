"use client";

import { UserData } from "@/interfaces/user";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { userAdd } from "@/redux/user/userService";
import {
  setPasswordError,
  setShowPassword,
  setUserDataForm,
  setUserImageFile,
} from "@/redux/user/userSlice";

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
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const {
    userDataForm,
    showPassword,
    passwordError,
    userImageFile,
  } = useSelector((state: RootState) => state.user);
  // const [userDataForm, setData] = useState(UserData);
  // const [showPassword, setShowPassword] = useState(false);
  // const [passwordError, setPasswordError] = useState("");
  // const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateEmail(userDataForm.email)) {
      toast.error("Invalid email format");
      return;
    }
    try {
      const result = await dispatch(userAdd(userDataForm));
      if (result.type === "userAdd/rejected") {
        throw result;
      } else {
        const useId = result.payload._id;
        if (userImageFile) {
          const formData = new FormData();
          formData.append("image", userImageFile);
          console.log(formData);
          const res = await axios.post(
            `${process.env.HOST}/user/${useId}/uploadImage`,
            formData
          );
          toast.success("You have Registered Successfully!");
          router.push("/login");
        }
      }
    } catch (error) {
      toast.error(error.payload);
      // console.error("Error:", error.response.userDataForm.message);
    }
  };

  const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "password") {
      // setPasswordError(validatePassword(value));
      dispatch(setPasswordError(validatePassword(value)));
    }
    dispatch(setUserDataForm({ [name]: value }));

    // setData((prevData) => ({
    //   ...prevData,
    //   [name]: value,
    // }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      // setImageFile(event.target.files[0]);
      dispatch(setUserImageFile(event.target.files[0]));
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
    // setShowPassword((prevShowPassword) => !prevShowPassword);
    dispatch(setShowPassword(!showPassword));
  };

  function validateEmail(email: string) {
    const parts = email.split("@");
    if (parts.length !== 2) {
      return false;
    }

    const localPart = parts[0];
    const domainPart = parts[1];

    if (!localPart || !domainPart) {
      return false;
    }

    if (localPart.length > 64 || domainPart.length > 255) {
      return false;
    }

    const domainParts = domainPart.split(".");
    if (domainParts.length < 2) {
      return false;
    }

    for (const part of domainParts) {
      if (part.length > 63) {
        return false;
      }
    }

    return true;
  }

  return (
    // <div>
    //   <h2>User Registration</h2>
    //   <form onSubmit={handleSubmit}>
    //     <label htmlFor="name">Name:</label>
    //     <input
    //       type="text"
    //       id="name"
    //       name="name"
    //       required
    //       onChange={handleDataChange}
    //       value={userDataForm.name}
    //     />
    //     <label htmlFor="email">Email:</label>
    //     <input
    //       type="email"
    //       id="email"
    //       name="email"
    //       required
    //       onChange={handleDataChange}
    //       value={userDataForm.email}
    //     />
    //     <label htmlFor="password">Password:</label>
    //     <div className="relative">
    //       <input
    //         type={showPassword ? "text" : "password"}
    //         id="password"
    //         name="password"
    //         required
    //         onChange={handleDataChange}
    //         value={userDataForm.password}
    //         className="pr-10"
    //       />
    //       <button
    //         type="button"
    //         className="absolute inset-y-0 right-0 px-4 py-2 bg-dark-blue text-white rounded-xl flex items-center"
    //         onClick={togglePasswordVisibility}
    //         style={{ top: 0, bottom: 0, width: "92px", marginLeft: "19px" }}
    //       >
    //         {showPassword ? "Hide" : "Show"}
    //       </button>
    //     </div>
    //     {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
    //     <label htmlFor="phoneNo">Phone Number:</label>
    //     <input
    //       type="tel"
    //       id="phoneNo"
    //       name="phoneNo"
    //       pattern="[0-9]{10}"
    //       maxLength={10}
    //       onChange={handleDataChange}
    //       value={userDataForm.phoneNo}
    //       required
    //     />
    //     <label htmlFor="address">Address:</label>
    //     <input
    //       type="text"
    //       id="address"
    //       name="address"
    //       required
    //       onChange={handleDataChange}
    //       value={userDataForm.address}
    //     />
    //     <label htmlFor="city">City:</label>
    //     <input
    //       type="text"
    //       id="city"
    //       name="city"
    //       required
    //       onChange={handleDataChange}
    //       value={userDataForm.city}
    //     />
    //     <label htmlFor="state">State:</label>
    //     <input
    //       type="text"
    //       id="state"
    //       name="state"
    //       required
    //       onChange={handleDataChange}
    //       value={userDataForm.state}
    //     />

    //     <label>
    //       Pet Image:
    //       <input
    //         type="file"
    //         accept="image/*"
    //         onChange={handleFileChange}
    //         required
    //       />
    //     </label>

    //     <button
    //       type="submit"
    //       value="Submit"
    //       className="bg-dark-blue my-3 mx-96 w-1/5"
    //     >
    //       Register
    //     </button>
    //   </form>
    // </div>

    <div className="w-full max-w-md mx-auto">
      <h2
        className="text-3xl font-bold mb-4 mt-6"
        style={{ fontFamily: "open-sans", fontSize: "40px" }}
      >
        User Registration
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            onChange={handleDataChange}
            value={userDataForm.name}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={handleDataChange}
            value={userDataForm.email}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1">
            Password:
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              onChange={handleDataChange}
              value={userDataForm.password}
              className="border border-gray-300 rounded-md px-4 py-2 pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-4 py-2 bg-dark-blue text-white rounded-md flex items-center"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {passwordError && <div className="text-red-500">{passwordError}</div>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="phoneNo" className="mb-1">
            Phone Number:
          </label>
          <input
            type="tel"
            id="phoneNo"
            name="phoneNo"
            pattern="[0-9]{10}"
            maxLength={10}
            onChange={handleDataChange}
            value={userDataForm.phoneNo}
            required
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address" className="mb-1">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            onChange={handleDataChange}
            value={userDataForm.address}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="city" className="mb-1">
            City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            required
            onChange={handleDataChange}
            value={userDataForm.city}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="state" className="mb-1">
            State:
          </label>
          <input
            type="text"
            id="state"
            name="state"
            required
            onChange={handleDataChange}
            value={userDataForm.state}
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="petImage" className="mb-1">
            Profile Picture:
          </label>
          <input
            type="file"
            id="petImage"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <div className="w-full max-w-md mx-auto">
          {/* Other form elements */}
          <button
            type="submit"
            value="Submit"
            className="bg-dark-blue text-white py-2 px-4 rounded-md mt-4"
            style={{ marginBottom: "20px" }} // Add margin bottom here
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserRegister;
