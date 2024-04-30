"use client";
import React from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/auth/authService";
import { AppDispatch, RootState } from "@/redux/store";
import { setFormData, setShowPassword } from "@/redux/auth/authSlice";
import Link from "next/link";

function Login() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { formData, showPassword, token } = useSelector(
    (state: RootState) => state.auth
  );
  const togglePasswordVisibility = () => {
    dispatch(setShowPassword(!showPassword));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormData({ [e.target.name]: e.target.value }));
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      toast.error("Invalid email format");
      return;
    }
    try {
      const result = await dispatch(login(formData));
      if (result.type === "login/rejected") {
        throw result;
      } else {
        toast.success("Login Successful!");
            setTimeout(() => {
              router.replace("/home")
            }, 1000);
      }
    } catch (error) {
      toast.error(error.payload);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="form-02-main ">
        <div className="container fade-in-right">
          <div className="row">
            <div className="col-md-12">
              <div className="_lk_de">
                <div className="form-03-main">
                  <div className="logo">
                    <img
                      className="rounded-full"
                      src="https://res.cloudinary.com/dgmdafnyt/image/upload/v1714379708/user_yqmdpt.png"
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
                  </div>
                  <div className="flex justify-end mb-0 ">
                    <Link href="/forgetPassword" className="hover:text-red-400">Forgot Password</Link>
                  </div>

                  <div className="form-group">
                    <button type="submit" className="_btn_04">
                      Login
                    </button>
                    <p className="mt-4 flex justify-center">
                      Don't have an account?
                    </p>
                    <Link href={"/signup"} className="flex justify-center hover:text-red-400 mt-2">
                      Signup
                    </Link>
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

