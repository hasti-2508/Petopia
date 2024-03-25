"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios"; // Import axios here

function Payment() {
  const [loading, setLoading] = useState(false);
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);
  const createCheckOutSession = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    const checkoutSession = await axios.get(
      `${process.env.HOST}/stripe/65fa7c4a262e2b3606ff5785`
    );

      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });
      console.log(result);

      if (result.error) {
        alert(result.error.message);
      } else {
        console.log("payment intent created");
      }
    setLoading(false);
  };
  return (
    <div>
      <main>
        <div className="shadow-lg border rounded p-2 ">
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToBW2LTHLLfU-NdkD1Ah3gyQn4os18lz3rxULFCOc9gA&s"
            }
            width={300}
            height={150}
            alt={"Test Image"}
          />
          <h3 className="text-xl">Test Product</h3>
          <p className="text-gray-500">description</p>
          <p>Total: ${200}</p>
          <button
            onClick={createCheckOutSession}
            className={`bg-blue-500 hover:bg-blue-600 text-white block w-full py-2 rounded mt-2 ${
              loading ? "disabled:cursor-not-allowed disabled:bg-blue-100" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Buy"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Payment;
