"use client";
import React, { FormEvent, useEffect, useState } from "react";
import useMultipleStep from "@/Hooks/useMultipleStep";
import PetDataForm from "./PetDataForm";
import UserDataForm from "./UserDataForm";
import DateAndTime from "./DateAndTime";
import axios from "axios";
import { ServicePlanBooking } from "@/interfaces/servicePlanBooking";
import { Notifications } from "react-push-notification";
import addNotification from "react-push-notification";

const serviceBookingData: ServicePlanBooking = {
  pet_species: "cat",
  pet_breed: "",
  pet_size: "small",
  pet_gender: "female",
  pet_age: "",
  aggressiveness: "low",
  user_name: "",
  email: "",
  phoneNo: "",
  address: "",
  city: "",
  state: "",
  notes: "",
  booking_date: "",
  booking_time: "",
};

function BookService() {
  const [data, setData] = useState(serviceBookingData);
  const [servicePlanId, setServicePlanId] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);


  function warningNotification() {
    addNotification({
      title: "Warning",
      subtitle: "Sorry",
      message: "We are not providing Training in your city.",
      theme: "red",
      closeButton: "X",
    });
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("servicePlanId");
      setServicePlanId(id);
    }
  }, []);

  function updateFields(fields: Partial<ServicePlanBooking>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { step, isFirstStep, isLastStep, back, next } = useMultipleStep([
    <PetDataForm {...data} updateFields={updateFields} />,
    <UserDataForm {...data} updateFields={updateFields} />,
    <DateAndTime {...data} updateFields={updateFields} />,
  ]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const jwt = localStorage.getItem("token");
    const requestData = {
      ...data,
      jwt: jwt,
    };

    if (!isLastStep) return next();
    async function postData() {
      try {
        const response = await axios.post(
          `${process.env.HOST}/serviceBooking/${servicePlanId}`,
          requestData
        );
        setBookingSuccess(true);
        setTimeout(() => {
          window.location.href = `/payment/${response.data.id}`;
        }, 3000);
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 409
        ) {
          warningNotification();
          window.location.href = "/Home"
        } else if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 401
        ) {
          window.location.href = "/Login";
        } else {
          console.error("Error posting booking data:", error);
        }
      }
    }

    postData();
  }
  return (
    <div>  
       <Notifications />
      <div
        style={{
          position: "relative",
          background: "white",
          padding: "2rem",
          margin: "1rem",
          borderRadius: ".5rem",
          fontFamily: "Arial",
          maxWidth: "max-content",
        }}
      >
        <form onSubmit={onSubmit}>
          {step}
          <div
            className="bg-black text-white"
            style={{
              marginTop: "1rem",
              display: "flex",
              gap: ".5rem",
              justifyContent: "flex-end",
            }}
          >
            {!isFirstStep && (
              <button type="button" onClick={back}>
                Back
              </button>
            )}
            <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
          </div>
        </form>
      </div>

      {bookingSuccess && (
        <div >
          <img
            src="http://localhost:3000/assets/bookingSuccess.gif"
            alt="Booking Confirmation"
          />
          <p>Redirecting to payment integration page...</p>
        </div>
      )}
    </div>
  );
}

export default BookService;

// import React, { FormEvent, useEffect, useState } from "react";
// import useMultipleStep from "@/Hooks/useMultipleStep";
// import PetDataForm from "./PetDataForm";
// import UserDataForm from "./UserDataForm";
// import DateAndTime from "./DateAndTime";
// import axios from "axios";
// import { ServicePlanBooking } from "@/interfaces/servicePlanBooking";

// const serviceBookingData: ServicePlanBooking = {
//   pet_species: "",
//   pet_breed: "",
//   pet_size: "",
//   pet_gender: "",
//   pet_age: 0,
//   aggressiveness: "",
//   user_name: "",
//   email: "",
//   phoneNo: 0,
//   address: "",
//   city: "",
//   state: "",
//   notes: "",
//   booking_date: "",
//   booking_time: "",
// };

// function BookService() {
//   const [data, setData] = useState<ServicePlanBooking>(serviceBookingData);
//   const [servicePlanId, setServicePlanId] = useState<string | null>(null);
//   const [bookingSuccess, setBookingSuccess] = useState(false);
//   const [error, setError] = useState<string>("");
//   const [isValid, setIsValid] = useState<boolean>(false);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const urlParams = new URLSearchParams(window.location.search);
//       const id = urlParams.get("servicePlanId");
//       setServicePlanId(id);
//     }
//   }, []);

//   const { step, isFirstStep, isLastStep, back, next } = useMultipleStep([
//     <PetDataForm data={data} setData={setData} />,
//     <UserDataForm data={data} setData={setData} />,
//     <DateAndTime data={data} setData={setData} />,
//   ]);

//   function validateForm() {
//     setIsValid(Object.values(data).every(value => !!value));
//   }

//   useEffect(() => {
//     validateForm();
//   }, [data]);

//   function onSubmit(e: FormEvent) {
//     e.preventDefault();

//     const jwt = localStorage.getItem("token");
//     const requestData = {
//       ...data,
//       jwt: jwt,
//     };

//     if (!isLastStep) return next();

//     async function postData() {
//       try {
//         const response = await axios.post(
//           `${process.env.HOST}/serviceBooking/${servicePlanId}`,
//           requestData
//         );
//         setBookingSuccess(true);
//         setTimeout(() => {
//           window.location.href = `/payment/${response.data.id}`;
//         }, 3000);
//       } catch (error) {
//         console.error("Error posting booking data:", error);
//       }
//     }

//     postData();
//   }

//   return (
//     <div>
//       <div>
//         <form onSubmit={onSubmit}>
//           {step}
//           {error && <p style={{ color: "red" }}>{error}</p>}
//           <div>
//             {!isFirstStep && (
//               <button type="button" onClick={back}>
//                 Back
//               </button>
//             )}
//             <button type="submit" disabled={!isValid}>{isLastStep ? "Finish" : "Next"}</button>
//           </div>
//         </form>
//       </div>

//       {bookingSuccess && (
//         <div>
//           <img
//             src="http://localhost:3000/assets/bookingSuccess.gif"
//             alt="Booking Confirmation"
//           />
//           <p>Redirecting to payment integration page...</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BookService;
