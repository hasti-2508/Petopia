"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [token, setToken] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    if (storedToken) {
      setToken(storedToken);
    }
    // const encryptedToken = localStorage.getItem("token");
    // const storedToken = decryptToken(encryptedToken);
    // } else {
    //   const cookieToken = document.cookie
    //     .split("; ")
    //     .find((row) => row.startsWith("jwt="));
    //   if (cookieToken) {
    //     setToken(cookieToken.split("=")[1]);
    //   }
    // }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "email" || e.target.name === "password") {
      setEmailError("");
      setPasswordError("");
    }
  };
  function validateEmail(email: string) {
    const parts = email.split("@");
    if (parts.length !== 2) {
      return false; // If email doesn't contain exactly one '@', it's invalid
    }

    const localPart = parts[0];
    const domainPart = parts[1];

    if (!localPart || !domainPart) {
      return false; // If local part or domain part is empty, it's invalid
    }

    if (localPart.length > 64 || domainPart.length > 255) {
      return false; // If local part or domain part is too long, it's invalid
    }

    const domainParts = domainPart.split(".");
    if (domainParts.length < 2) {
      return false; // If domain part doesn't contain at least one '.', it's invalid
    }

    for (const part of domainParts) {
      if (part.length > 63) {
        return false; // If any part of domain is too long, it's invalid
      }
    }

    return true;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setEmailError("Invalid email format");
      return;
    }
    let role = formData.role;
    try {
      const response = await axios.post(`${process.env.HOST}/login`, formData);
      const data = response.data;
      setToken(data.token);
      // const encryptedToken = encryptToken(data.token);
      // localStorage.setItem("jwt", encryptedToken);
      localStorage.setItem("jwt", data.token);
      document.cookie = `jwt=${data.token}; path=/`;

      switch (role) {
        case "admin":
          window.location.href = "/Home";
          break;
        case "user":
          window.location.href = "/Home";
          break;
        case "trainer":
          window.location.href = "/Home";
          break;
        case "vet":
          window.location.href = "/Home";
      }
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        alert("No Account Found! Please Sign Up!");
        router.push("/SignUp");
      } else if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 403
      ) {
        setPasswordError("Incorrect Password");
        // alert("Password Incorrect!");
        setFormData((prevState) => ({
          ...prevState,
          password: "",
        }));
      } else if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 404
      ) {
        alert("No Account Found! Please Sign Up!");
        router.push("/SignUp");
      } else {
        console.error("Error posting user data:", error.response.data.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="form-02-main">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="_lk_de">
                <div className="form-03-main">
                  <div className="logo">
                    <img
                      className="rounded-full"
                      src="http://localhost:3000/assets/user.png"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control _ge_de_ol"
                      placeholder="Enter Email"
                      required
                      aria-required="true"
                    />
                    {emailError && <p className="text-red-500">{emailError}</p>}
                  </div>

                  <div className="form-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control _ge_de_ol"
                      placeholder="Enter Password"
                      required
                      aria-required="true"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 px-5 py-2 text-black rounded-xl flex items-center cursor-pointer"
                      onClick={togglePasswordVisibility}
                      style={{
                        top: 0,
                        bottom: 0,
                        width: "92px",
                        marginLeft: "19px",
                      }}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                    {passwordError && (
                      <p className="text-red-500">{passwordError}</p>
                    )}
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input mr-3 mt-2"
                      type="radio"
                      name="role"
                      onChange={handleChange}
                      value="user"
                      required
                    />
                    <label className="form-check-label mt-2">User</label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input mr-3 mt-2"
                      type="radio"
                      name="role"
                      onChange={handleChange}
                      value="vet"
                    />
                    <label className="form-check-label mt-2">Vet</label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input mr-3 mt-2"
                      type="radio"
                      name="role"
                      onChange={handleChange}
                      value="trainer"
                    />
                    <label className="form-check-label mt-2">Trainer</label>
                  </div>

                  <div className="flex justify-end mb-0">
                    <a href="/ForgetPassword">Forgot Password</a>
                  </div>

                  <div className="form-group">
                    <button type="submit" className="_btn_04">
                      <a href="/Adopt">Login</a>
                    </button>
                    <p className="mt-4 flex justify-center">
                      Don't have an account?
                    </p>
                    <a href="/SignUp" className="flex justify-center">
                      Signup
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}

export default Login;
