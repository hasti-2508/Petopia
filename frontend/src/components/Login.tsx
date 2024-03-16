"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Login() {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleForm = () => {
    setIsFlipped(!isFlipped);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      const cookieToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("jwt="));
      if (cookieToken) {
        setToken(cookieToken.split("=")[1]);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let role = formData.role;
    console.log(role);
    setIsLoading(true); 
    try {
      const response = await axios.post(
        `${process.env.HOST}/login`,
        formData
      );
      const data = response.data;
      setToken(data.token);
      localStorage.setItem("token", data.token);
      document.cookie = `jwt=${data.token}; path=/`;
      console.log("User logged in successfully!");
      setTimeout(() => {
        setIsLoading(false);
        console.log(role);
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
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container">
      <div className={`flip-container ${isFlipped ? "flipped" : ""}`}>
        <div className="flipper">
          <div className="front ">
            <div>
              {isLoading && (
                <div className="loader">
                  <img
                    src="http://localhost:3000/assets/LoginSuccess.gif"
                    alt="Loading..."
                  />
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="role"
                  placeholder="role"
                  value={formData.role}
                  onChange={handleChange}
                />
                <button type="submit">Log in</button>

                <div>
                  <p>Dont have an account?</p>
                  <Link href="/SignUp">Sign up</Link>
                </div>
                <div>
                  <p>Forget password</p>
                </div>
              </form>
              <button type="button" onClick={toggleForm}>
                Switch to {isFlipped ? "Sign Up" : "Login"}
              </button>
            </div>
          </div>
          <div className="back">
            <form className="form" action="">
              <h2>{isFlipped ? "Sign Up" : "Login"}</h2>
              {!isFlipped && <input type="text" placeholder="Email" />}
              <input type="password" placeholder="Password" />
              {!isFlipped && <input type="text" placeholder="Role" />}
              <button type="button" onClick={toggleForm}>
                Switch to {isFlipped ? "Login" : "Sign Up"}
              </button>
            </form>
            <button type="button" onClick={toggleForm}>
              Switch to {isFlipped ? "Sign Up" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Link from "next/link";

// function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     role: "",
//   });
//   const [token, setToken] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       setToken(storedToken);
//     } else {
//       const cookieToken = document.cookie
//         .split("; ")
//         .find((row) => row.startsWith("jwt="));
//       if (cookieToken) {
//         setToken(cookieToken.split("=")[1]);
//       }
//     }
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     let role = formData.role;
//     console.log(role);
//     setIsLoading(true); // Set loading state to true
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/login",
//         formData
//       );
//       const data = response.data;
//       setToken(data.token);
//       localStorage.setItem("token", data.token);
//       document.cookie = `jwt=${data.token}; path=/`;
//       console.log("User logged in successfully!");
//       // Show animation for 2 seconds and then redirect
//       setTimeout(() => {
//         setIsLoading(false);
//         console.log(role);
//         switch (role) {
//           case "admin":
//             window.location.href = "/Home";
//             break;
//           case "user":
//             window.location.href = "/Home";
//             break;
//           case "trainer":
//             window.location.href = "/Home";
//             break;
//           case "vet":
//             window.location.href = "/Home";
//         }
//       }, 1000);
//     } catch (error) {
//       setIsLoading(false); // Set loading state to false
//       console.error("Login error:", error);
//     }
//   };

//   return (
//     <div>
//       {isLoading && (
//         <div className="loader">
//           <img
//             src="http://localhost:3000/assets/LoginSuccess.gif"
//             alt="Loading..."
//           />
//         </div>
//       )}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           placeholder="email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="password"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="role"
//           placeholder="role"
//           value={formData.role}
//           onChange={handleChange}
//         />
//         <button type="submit">Log in</button>

//         <div>
//           <p>Dont have an account?</p>
//           <Link href="/SignUp">Sign up</Link>
//         </div>
//         <div>
//           <p>Forget password</p>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login;
