import React, { useState } from "react";
import { Card, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import CloseIcon from "@mui/icons-material/Close";

const SettingsModal = () => {
  return (
    <Card className="absolute p-7 ml-auto mr-auto left-0 right-0 top-[25%] w-[30rem] h-[20rem] bg-[#09090B] border-[#27272A]">
      <div className="flex flex-row justify-between">
        <CardTitle className="text-[#FAFAFA]">Settings</CardTitle>
        <button>
          <CloseIcon className="text-white" />
        </button>
      </div>
      <div className="flex flex-col mt-6 w-full items-center">
        <div className="w-[20rem] mb-2">
          <label className="text-[#A1A1AA] self-start">Model</label>
        </div>
        <Input className="text-[#DFEEF1] rounded-full px-4 py-1 w-[20rem] outline-none border border-[#27272A] border-2 focus:border-[#17ccf0] ease-in-out duration-300 bg-[#09090B] focus-visible:ring-[none]"></Input>
      </div>
    </Card>
  );
};

export default SettingsModal;
