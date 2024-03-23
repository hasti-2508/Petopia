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

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    // } else {
    //   const cookieToken = document.cookie
    //     .split("; ")
    //     .find((row) => row.startsWith("jwt="));
    //   if (cookieToken) {
    //     setToken(cookieToken.split("=")[1]);
    //   }
    // }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let role = formData.role;
    try {
      const response = await axios.post(`${process.env.HOST}/login`, formData);
      const data = response.data;
      setToken(data.token);
      localStorage.setItem("token", data.token);
      document.cookie = `jwt=${data.token}; path=/`;
      switch (role) {
        case "admin":
          router.push("/Home");
          break;
        case "user":
          router.push("/Home");
          break;
        case "trainer":
          router.push("/Home");
          break;
        case "vet":
          router.push("/Home");
      }
    } catch (error) {
      alert("No Account Found! Please Sign Up!");
      router.push("/SignUp")
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
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="form-control _ge_de_ol"
                      placeholder="Enter Password"
                      required
                      aria-required="true"
                    />
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
