"use client";
import React, { useEffect } from "react";

declare global {
  interface Window {
    kommunicate: any;
  }
}

const KommunicateChat: React.FC = () => {
  useEffect(() => {
    if (!window.kommunicate) {
      (function (d,m) {
        var kommunicateSettings = {
          appId: process.env.NEXT_PUBLIC_CHATBOTID,
          popupWidget: true,
          automaticChatOpenOnNavigation: false,
        };
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        document.getElementsByTagName("head")[0].appendChild(s);
        window.kommunicate = m;
        m._globals = kommunicateSettings;
      })(document, window.kommunicate || {});
    }
  }, []);

  return <></>;
};

export default KommunicateChat;
