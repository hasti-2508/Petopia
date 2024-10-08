"use client";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setForgetPasswordData } from "@/redux/auth/authSlice";
import { forgetPassword } from "@/redux/auth/authService";

function ForgetPassword() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { forgetPasswordData } = useSelector((state: RootState) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setForgetPasswordData({ [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await dispatch(forgetPassword(forgetPasswordData));
      if (result.type === "forgetPassword/rejected") {
        throw result;
      } else {
        toast.success("Mail sent to your email id!");
        router.push("/login");
      }
    } catch (error) {
      toast.error("No Account Found! Please Sign Up!");
      setTimeout(() => {
        router.push("/signup");
      }, 1000);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section className="form-02-main">
          <div className="container fade-in-right">
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
