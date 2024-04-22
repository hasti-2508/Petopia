"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function SignUp() {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    switch (role) {
      case "vet":
        router.push("/vet/register");
        break;
      case "trainer":
        router.push("/trainer/register");
        break;
      case "user":
        router.push("/user/register");
        break;
      default:
        break;
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
                  <div className="form-group">
                    <label htmlFor="role" className="mb-2 font-bold">
                      What role would you like to sign up for?
                    </label>
                    <select
                      id="role"
                      className="form-control"
                      onChange={handleChange}
                      value={role}
                      required
                      aria-required="true"
                    >
                      <option value="">Select Role</option>
                      <option value="vet">Vet</option>
                      <option value="trainer">Trainer</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="_btn_04"
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Continue"}
                    </button>
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

export default SignUp;
