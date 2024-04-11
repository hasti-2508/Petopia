"use client";
import React, { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";

function Room() {
  const searchResult = useSearchParams();
  const roomId = searchResult.get("roomId");

  //   const router = useRouter();
  //   const [roomId, setRoomId] = useState(null);

  //   useEffect(() => {
  //     if (typeof window !== "undefined") {
  //       const urlParams = new URLSearchParams(window.location.search);
  //       const id = urlParams.get("roomId");
  //       setRoomId(id);
  //     }
  //   }, []);

  const elementRef = useRef(null);

  useEffect(() => {
    const meeting = async () => {
      const appID = 2099456814;
      const serverSecret = "677ee4b64711df7671170b0ca9c0fa2a";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(),
        "Hasti Kapadiya"
      );
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: elementRef.current,
        sharedLinks: [
          {
            name: "Copy Link",
            url: `http://localhost:3000/room/${roomId}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: true,
        showRoomTimer: true,
        // showPreJoinView: false
        // onReturnToHomeScreenClicked?: () => void; // When the "Return to home screen" button is clicked, this callback is triggered. After setting up this callback, clicking the button will not navigate to the home screen; instead, you can add your own page navigation logic here.
      });
    };

    meeting();
  }, [roomId]);

  return (
    <div>
      <div ref={elementRef}></div>
    </div>
  );
}

export default Room;
