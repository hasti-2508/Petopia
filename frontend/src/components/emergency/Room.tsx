"use client";
import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function Room() {
  const router = useRouter();
  const searchResult = useSearchParams();
  const roomId = searchResult.get("roomId");

  const elementRef = useRef(null);

  useEffect(() => {
    const meeting = async () => {
      const appID = 2099456814;
      const server = "677ee4b64711df7671170b0ca9c0fa2a";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        server,
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
        showPreJoinView: true,
        onReturnToHomeScreenClicked: () => {
          router.push("/home");
        },
      });
    };

    meeting();
  }, [roomId]);

  return (
    <div
      style={{
        marginBottom: "120px",
        marginTop: "5px",
        marginLeft: "120px",
        marginRight: "120px",
      }}
    >
      <div className="zego-main" ref={elementRef}></div>
      <p className="text-gray-600 italic mt-10 container text-center">
        Please allow a moment for a veterinarian to join after you've entered.
      </p>
    </div>
  );
}

export default Room;
