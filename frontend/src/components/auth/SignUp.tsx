// "use client";
// import React, { ChangeEvent } from "react";

// function SignUp() {
//   const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     e.preventDefault();
//     const role = e.target.value;
//     switch (role) {
//       case "vet":
//         window.location.href = "/vet/register";
//         break;
//       case "trainer":
//         window.location.href = "/trainer/register";
//         break;
//       case "user":
//         window.location.href = "/user/register";
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <div
//       className="flex-col p-32 justify-center items-center object-cover "
//       style={{
//         height: "42rem",
//         backgroundImage: "url(http://localhost:3000/assets/signup.webp)",
//         opacity: "0.9",
//         backgroundPosition: "center",
//       }}
//     >
//       <div
//         className="bg-gray-200 p-12 shadow rounded-xl "
//         style={{ width: "450px", height: "250px" }}
//       >
//         <div
//           className="mb-3 font-bold"
//           style={{ fontFamily: "open-sans", fontSize: "35px" }}
//         >
//           <label htmlFor="role">🌀 What is your role?</label>
//         </div>
//         <div
//           className="ml-5  bg-gray-200"
//           style={{ fontFamily: "open-sans", fontSize: "20px" }}
//         >
//           <select
//             id="role"
//             className="bg-gray-200 border-black"
//             onChange={handleChange}
//           >
//             <option value="">Select Role</option>
//             <option value="vet">Vet</option>
//             <option value="trainer">Trainer</option>
//             <option value="user">User</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUp;

// "use client";
// import React, { ChangeEvent, FormEvent } from "react";

// function SignUp() {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const role = e.target.value;
//     switch (role) {
//       case "vet":
//         window.location.href = "/vet/register";
//         break;
//       case "trainer":
//         window.location.href = "/trainer/register";
//         break;
//       case "user":
//         window.location.href = "/user/register";
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     // <div
//     //   className="flex-col p-32 justify-center items-center object-cover "
//     //   style={{
//     //     height: "42rem",
//     //     backgroundImage: "url(http://localhost:3000/assets/signup.webp)",
//     //     opacity: "0.9",
//     //     backgroundPosition: "center",
//     //   }}
//     // >
//     //   <div
//     //     className="bg-gray-200 p-12 shadow rounded-xl "
//     //     style={{ width: "450px", height: "250px" }}
//     //   >
//     //     <div
//     //       className="mb-3 font-bold"
//     //       style={{ fontFamily: "open-sans", fontSize: "35px" }}
//     //     >
//     //       <label htmlFor="role">🌀 What is your role?</label>
//     //     </div>
//     //     <div
//     //       className="ml-5  bg-gray-200"
//     //       style={{ fontFamily: "open-sans", fontSize: "20px" }}
//     //     >
//     //       <select
//     //         id="role"
//     //         className="bg-gray-200 border-black"
//     //         onChange={handleChange}
//     //       >
//     //         <option value="">Select Role</option>
//     //         <option value="vet">Vet</option>
//     //         <option value="trainer">Trainer</option>
//     //         <option value="user">User</option>
//     //       </select>
//     //     </div>
//     //   </div>
//     // </div>
//     <form onSubmit={handleSubmit}>
//     <section className="form-02-main">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-12">
//             <div className="_lk_de">
//               <div className="form-03-main">
//                 <div className="form-group">
//                   <label className="mb-2 font-bold">
//                     Please Provide the email you have signed up with!
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     onChange={handleChange}
//                     className="form-control _ge_de_ol"
//                     placeholder="Enter Email"
//                     required
//                     aria-required="true"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <button type="submit" className="_btn_04">
//                     Send Mail
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   </form>
    
//   );
// }

// export default SignUp;
"use client"
import React, { useState } from "react";

function SignUp() {
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
        window.location.href = "/vet/register";
        break;
      case "trainer":
        window.location.href = "/trainer/register";
        break;
      case "user":
        window.location.href = "/user/register";
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
                    <button type="submit" className="_btn_04" disabled={isLoading}>
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

