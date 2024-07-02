"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import GitHubIcon from "@mui/icons-material/GitHub";
import SettingsIcon from "@mui/icons-material/Settings";
import { Button } from "./ui/button";
import CloseIcon from "@mui/icons-material/Close";
import { CardTitle } from "./ui/card";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "./ui/toaster";
import { ToastClose } from "./ui/toast";

const usePersistentState = (key, initialValue) => {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [key, state]);

  return [state, setState];
};

const ChatApp = () => {
  const [message, setMessage] = usePersistentState("message", "");
  const [chatHistory, setChatHistory] = usePersistentState("chatHistory", []);
  const [model, setModel] = usePersistentState("model", "");
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("testKey", "testValue");
      const testValue = localStorage.getItem("testKey");
      console.log(
        "localStorage test:",
        testValue === "testValue" ? "passed" : "failed"
      );
      localStorage.removeItem("testKey");
    } catch (error) {
      console.error("localStorage test failed:", error);
    }
  }, []);

  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  const handleSendMessage = useCallback(async () => {
    if (!message.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:11434/api/generate",
        {
          model: model || "default",
          prompt: message,
          stream: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setChatHistory((prevHistory) => [
        ...prevHistory,
        { type: "user", text: message },
        { type: "bot", text: res.data.response },
      ]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        variant: "destructive",
        title: "No model selected",
        description: `Please select a model in settings to continue`,
        onClick: modalStateTrue,
      });
    }
  }, [message, model, setChatHistory, setMessage]);

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

  const modalStateTrue = () => setModalState(true);
  const modalStateFalse = () => setModalState(false);

  gsap.registerPlugin(useGSAP);

  const container = useRef();

  useGSAP(() => {
    gsap.from(".blob", {
      left: 0,
      top: 0,
      right: 0,
      duration: 3,
      scrub: 1,
      yoyo: true,
      ease: "sine.out",
    });
    gsap.to(".blob", {
      left: 40,
      top: 20,
      right: 40,
      duration: 3,
      repeat: -1,
      scrub: 1,
      yoyo: true,
      ease: "sine.out",
    });
    gsap.from(".blob-2", {
      left: 0,
      top: 0,
      right: 0,
      duration: 2,
      scrub: 1,
      yoyo: true,
      ease: "sine.out",
    });
    gsap.to(".blob-2", {
      left: 30,
      top: 10,
      right: 20,
      duration: 2,
      repeat: -1,
      scrub: 1,
      yoyo: true,
      ease: "sine.out",
    });
  });

  const { toast } = useToast();

  return (
    <>
      <nav>
        <div className="blob-container absolute">
          <div className="blob bg-[#17ccf0] h-40 w-40 absolute rounded-full blur-2xl opacity-40"></div>
          <div className="blob-2 bg-yellow-600 h-40 w-40 absolute rounded-full blur-2xl opacity-30"></div>
        </div>
        <h1 className="text-[60px] text-[#dfeef1] absolute top-4 left-10 font-medium tracking-tighter">
          Electro
        </h1>
        <div className="absolute right-10 top-10">
          <Button
            onClick={modalStateTrue}
            className="rounded-full text-[#052D23] w-10 scale-90 bg-[#17ccf0] mr-1 my-1 hover:bg-[#17ccf0] hover:rotate-[-45deg] duration-300 ease-in-out"
          >
            <SettingsIcon />
          </Button>
        </div>
        {modalState && (
          <Card className="absolute p-7 ml-auto mr-auto left-0 right-0 top-[25%] w-[30rem] h-[20rem] bg-[#09090B] border-[#27272A]">
            <div className="flex flex-row justify-between">
              <CardTitle className="text-[#FAFAFA]">Settings</CardTitle>
              <button onClick={modalStateFalse}>
                <CloseIcon className="text-white" />
              </button>
            </div>
            <div className="flex flex-col mt-6 w-full items-center">
              <div className="w-[25rem] mb-2">
                <label className="text-[#17ccf0] self-start">Model</label>
              </div>
              <Input
                value={model}
                onChange={handleModelChange}
                className="text-[#DFEEF1] rounded-full px-4 py-1 w-[25rem] outline-none border border-[#27272A] border-2 focus:border-[#17ccf0] ease-in-out duration-300 bg-[#09090B] focus-visible:ring-[none]"
              ></Input>
            </div>
            <div className="w-full flex justify-end w-[26rem] mt-24">
              <Button
                onClick={() => {
                  setModalState(false);
                  {
                    model &&
                      toast({
                        title: "Model Setup successful!",
                        description: `Model set to ${model}`,
                        style: { backgroundColor: "#17ccf0", border: "0px" },
                      });
                  }
                  {
                    !model &&
                      toast({
                        variant: "destructive",
                        title: "No model selected",
                        description: `Please select a model in settings to continue`,
                        onClick: modalStateTrue,
                      });
                  }
                }}
                className="bg-[#17ccf0] text-black hover:bg-[#17ccf0]"
              >
                Save
              </Button>
            </div>
          </Card>
        )}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.0/CustomEase.min.js"></script>
      </nav>
      <div className="h-screen flex flex-col bg-[#050e10]">
        <div className="flex-grow overflow-y-auto p-4 w-[75%] lg:w-[40%] self-center flex flex-col items-center scrollbar scrollbar-none h-[40rem] lg:mt-0 mt-[10rem]">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`mb-4 p-2 rounded-lg max-w-[70%] ${
                chat.type === "user"
                  ? "bg-[#001a1f] text-[#dfeef1] self-end text-right text-[14px]"
                  : "bg-[#17ccf0] text-[#052D23] self-start text-left text-[14px]"
              }`}
            >
              {chat.text.includes("<code>") ? (
                <div className="relative">
                  <pre
                    className={`w-full p-2 overflow-auto ${
                      chat.type === "user"
                        ? "bg-[#001a1f] text-[#dfeef1]"
                        : "bg-[#17ccf0] text-[#052D23] "
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
          <div className="flex items-center gap-3 justify-end w-[75%] lg:w-[40%]">
            <div className="flex flex-row bg-[#001a1f] items-center rounded-full w-full">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                className="text-[#dfeef1] bg-[#001a1f] py-2 px-4 rounded-full outline-none border border-[#001a1f] border-2 focus:border-[#17ccf0] ease-in-out duration-300 w-full"
              />
              <Button
                onClick={handleSendMessage}
                className="rounded-full w-10 scale-90 mr-1 my-1 bg-white hover:bg-[#17ccf0]"
              >
                <ArrowOutwardIcon className="text-[#052D23]" />
              </Button>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p className="py-2 text-[#DFEEF1] text-[14px]">
              Created by Parshv Limbad{" "}
            </p>
            <button>
              <a
                href="https://github.com/ParshvLimbad/electro-llm-ui"
                target="_blank"
              >
                <GitHubIcon className="text-[#17ccf0] h-5" />
              </a>
            </button>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default ChatApp;
