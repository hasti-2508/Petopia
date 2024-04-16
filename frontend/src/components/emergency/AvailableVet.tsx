// "use client";
// import { Vet } from "@/interfaces/vet";
// import axiosInstance from "@/utils/axios";
// import React, { useEffect, useState, useCallback } from "react";
// // import { useRouter } from "next/router";
// import Link from "next/link";

// function AvailableVet() {
//   //   const router = useRouter();

//   const [vet, setVet] = useState<Vet[]>([]);
//   const [vetId, setVetId] = useState<string>("");
//   useEffect(() => {
//     getVet();
//   }, []);

//   //   const makeCall = (vetId: string) => {
//   //  const [value, setValue] = useState();

//   //   const makeCall = useCallback(
//   //     (id: string) => {
//   //       setVetId(id);
//   //       router.push(`/room/${id}`);
//   //     },
//   //     [vetId]
//   //   );
//   //   };

//   const getVet = async () => {
//     try {
//       const response = await axiosInstance.get("/vet/available");
//       setVet(response.data);
//     } catch (error) {
//       console.error("Error fetching available vets:", error);
//     }
//   };
//   return (
//     <div>
//       {vet.map((v, index) => (
//         <div key={index}>
//           <div className="border-5 w-1/3 m-8">
//             <p>{v.name}</p>
//             {/* <button
//               onClick={() => makeCall(v._id)}
//               className="text-white flex items-center bg-red-600 py-2 px-3 rounded-pill fs-6"
//             >
//               call
//             </button> */}
//             <Link
//                 href={`/room/${v._id}`}
//               className="text-white flex items-center bg-red-600 py-2 px-3 rounded-pill fs-6 no-underline"
//             >
//               Call
//             </Link>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default AvailableVet;

"use client";
import { Vet } from "@/interfaces/vet";
import axiosInstance from "@/utils/axios";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getVetData, notifyVet } from "@/redux/vet/vetService";
import { VetCard } from "../vet/VetCard";

function AvailableVet() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const [vet, setVet] = useState<Vet[]>([]);

  useEffect(() => {
    getVet();
  }, []);

  const makeCall = useCallback(
    async (id: string) => {
      //   const notify = await axios.get(`${process.env.HOST}/${id}/notify`);
      try {
        // const notify = await axiosInstance.patch(`vet/${id}/notify`);
        dispatch(notifyVet(id));
        // dispatch(getVetData());

        router.push(`/room?roomId=${id}`);
      } catch (error) {
        console.log(error.message);
      }
    },
    [router]
  );

  //   const elementRef = useRef(null);
  //   const makeCall = (roomId: string) => {
  //     const appID = 2099456814;
  //     const serverSecret = "677ee4b64711df7671170b0ca9c0fa2a";
  //     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
  //       appID,
  //       serverSecret,
  //       roomId,
  //       Date.now().toString(),
  //       "Hasti Kapadiya"
  //     );
  //     const zc = ZegoUIKitPrebuilt.create(kitToken);
  //     zc.joinRoom({
  //       container: elementRef.current,
  //       sharedLinks: [
  //         {
  //           name: "Copy Link",
  //           url: `http://localhost:3000/room/${roomId}`,
  //         },
  //       ],
  //       scenario: {
  //         mode: ZegoUIKitPrebuilt.OneONoneCall,
  //       },
  //       showScreenSharingButton: true,
  //       showRoomTimer: true,
  //     });
  //   };

  const getVet = async () => {
    try {
      const response = await axiosInstance.get("/vet/available");
      setVet(response.data);
    } catch (error) {
      console.error("Error fetching available vets:", error);
    }
  };

  return (
    <div className="container text-center col-md-7 mt-10 ">
      <h1
        className="font-bold mb-5 mt-6"
        style={{ fontFamily: "open-sans", fontSize: "35px" }}
      >
        Veterinarians Available for Call
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vet.map((v, index) => (
          <div className="flex flex-col">
            <VetCard user={v} />
            <button
              onClick={() => makeCall(v._id)}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline max-w-sm"
            >
              Call
            </button>
          </div>
        ))}
      </div>
      <p className="text-gray-600 italic mt-8">
        Please allow a moment for a veterinarian to join after you've entered.
      </p>
    </div>
  );
}

export default AvailableVet;
