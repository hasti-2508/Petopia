import React from "react";
import {MultiInput} from "@refinitiv-ui/elements/lib/multi-input";

function VetRegister() {
  return (
    <div>
      <h2>User Registration</h2>
      <form action="/submit" method="post">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <label htmlFor="phoneNo">Phone Number:</label>
        <input
          type="tel"
          id="phoneNo"
          name="phoneNo"
          pattern="[0-9]{10}"
          required
        />

        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" required />

        <label htmlFor="city">City:</label>
        <input type="text" id="city" name="city" required />

        <label htmlFor="state">State:</label>
        <input type="text" id="state" name="state" required />

        <label htmlFor="YearsOfExperience">Years of Experience:</label>
        <input
          type="number"
          id="YearsOfExperience"
          name="YearsOfExperience"
          required
        />

        <label htmlFor="services">Services:</label>
        <input type="text" id="services" name="services" required />
        
        <MultiInput placeholder="Enter text here" />

        <button type="submit" value="Submit"></button>
      </form>
    </div>
  );
}

export default VetRegister;
