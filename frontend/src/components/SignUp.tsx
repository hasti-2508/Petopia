"use client";
import React, { ChangeEvent } from "react";

function SignUp() {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault(); 
    const role = e.target.value;
    {console.log(role)}
    switch (role) {
      case "vet":
        window.location.href = "/Vet/register";
        break;
      case "trainer":
        window.location.href = "/Trainer/register";
        break;
      case "user":  
        window.location.href = "/User/register";
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <label htmlFor="role">What is your role?</label>
      <select id="role" onChange={handleChange}>
        <option value="">Select Role</option>
        <option value="vet">Vet</option>
        <option value="trainer">Trainer</option>
        <option value="user">User</option>
      </select>
    </div>
  );
}

export default SignUp;
