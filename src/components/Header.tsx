// "use client";
// import React, { useState } from "react";
// import SettingsIcon from "@mui/icons-material/Settings";
// import { Button } from "./ui/button";
// import CloseIcon from "@mui/icons-material/Close";
// import { CardTitle } from "./ui/card";
// import { Card } from "@mui/material";
// import { Input } from "./ui/input";

// const Header = () => {
//   return (
//     <nav>
//       <div className="blob-container absolute">
//         <div className="blob bg-[#17ccf0] h-40 w-40 absolute rounded-full blur-2xl opacity-40"></div>
//         <div className="blob-2 bg-yellow-600 h-40 w-40 absolute rounded-full blur-2xl opacity-30"></div>
//       </div>
//       <h1 className="text-[60px] text-[#dfeef1] absolute top-4 left-10 font-medium tracking-tighter">
//         Electro
//       </h1>
//       <div className="absolute right-10 top-10">
//         <Button
//           onClick={modalStateTrue}
//           className="rounded-full text-[#052D23] w-10 scale-90 bg-[#17ccf0] mr-1 my-1 hover:bg-[#17ccf0] hover:rotate-[-45deg] duration-300 ease-in-out"
//         >
//           <SettingsIcon />
//         </Button>
//       </div>
//       {modalState && (
//         <Card className="absolute p-7 ml-auto mr-auto left-0 right-0 top-[25%] w-[30rem] h-[20rem] bg-[#09090B] border-[#27272A]">
//           <div className="flex flex-row justify-between">
//             <CardTitle className="text-[#FAFAFA]">Settings</CardTitle>
//             <button onClick={modalStateFalse}>
//               <CloseIcon className="text-white" />
//             </button>
//           </div>
//           <div className="flex flex-col mt-6 w-full items-center">
//             <div className="w-[20rem] mb-2">
//               <label className="text-[#17ccf0] self-start">Model</label>
//             </div>
//             <Input className="text-[#DFEEF1] rounded-full px-4 py-1 w-[20rem] outline-none border border-[#27272A] border-2 focus:border-[#17ccf0] ease-in-out duration-300 bg-[#09090B] focus-visible:ring-[none]"></Input>
//           </div>
//         </Card>
//       )}
//       <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.0/CustomEase.min.js"></script>
//     </nav>
//   );
// };

// export default Header;
