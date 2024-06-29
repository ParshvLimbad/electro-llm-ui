"use client";
import React, { useState } from "react";
import axios from "axios";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Button } from "./ui/button";

const ChatApp = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    try {
      const res = await axios.post(
        "http://localhost:11434/api/generate",
        {
          model: "dolphin-llama3:8b",
          prompt: message,
          stream: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setChatHistory([
        ...chatHistory,
        { type: "user", text: message },
        { type: "bot", text: res.data.response },
      ]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Text copied to clipboard");
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  return (
    <div className="h-screen flex flex-col bg-[#050e10]">
      <div className="flex-grow overflow-y-auto p-4 w-[40%] self-center flex flex-col items-center scrollbar scrollbar-none">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`mb-4 p-2 rounded-lg max-w-[70%] ${
              chat.type === "user"
                ? "bg-[#001a1f] text-[#dfeef1] self-end text-right"
                : "bg-[#17ccf0] text-[#052D23] self-start text-left"
            }`}
          >
            {chat.text.includes("<code>") ? (
              <div className="relative">
                <pre
                  className={`w-full p-2 overflow-auto ${
                    chat.type === "user"
                      ? "bg-[#001a1f] text-[#dfeef1]"
                      : "bg-[#17ccf0] text-[#052D23]"
                  } rounded-lg`}
                >
                  {chat.text.replace(/<code>|<\/code>/g, "")}
                </pre>
                <Button
                  onClick={() =>
                    handleCopy(chat.text.replace(/<code>|<\/code>/g, ""))
                  }
                  className="absolute top-1 right-1 p-1"
                >
                  <ContentCopyIcon />
                </Button>
              </div>
            ) : (
              chat.text
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full items-center bg-[#050e10] sticky bottom-0">
        <div className="flex items-center gap-3 justify-end w-[40%]">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="text-[#dfeef1] bg-[#001a1f] py-2 px-4 rounded-full outline-none border border-[#001a1f] border-2 focus:border-[#17ccf0] ease-in-out duration-300 w-full"
          />
          <Button
            onClick={handleSendMessage}
            className="rounded-full w-10 bg-white hover:bg-[#17ccf0]"
          >
            <ArrowOutwardIcon className="text-[#052D23]" />
          </Button>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p className="py-2 text-[#DFEEF1] text-[14px]">
            Created by Parshv Limbad{" "}
          </p>
          <GitHubIcon className="text-[#17ccf0]" />
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
