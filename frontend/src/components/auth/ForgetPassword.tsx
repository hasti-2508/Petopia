"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function ForgetPassword() {
  const router = useRouter();
  const [Data, setData] = useState({
    email: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/forgetPassword",
        Data
      );
      {
        console.log(Data);
      }
      toast.success("Mail sent to you email id!");
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error("No Account Found! Please Sign Up!");
      router.push("/signup");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section className="form-02-main">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="_lk_de">
                  <div className="form-03-main">
                    <div className="form-group">
                      <label className="mb-2 font-bold">
                        Please Provide the email you have signed up with!
                      </label>
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        className="form-control _ge_de_ol"
                        placeholder="Enter Email"
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

                    <div className="form-group">
                      <button type="submit" className="_btn_04">
                        Send Mail
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}

export default ForgetPassword;
