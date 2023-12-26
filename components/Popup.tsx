import { PopupProps } from "@/types";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";

const Popup = ({ children, title, state, handleSubmit }: PopupProps) => {
  return (
    <div className="popup-wrapper">
      <div className="glassmorphism">
        <div className="max-w-[575px] w-full p-10 bg-white rounded-xl">
          <div className="flex justify-between items-center">
            <h1 className="w-full text-center text-3xl font-bold">{title}</h1>
            {handleSubmit ? (
              <IoCloseOutline
                size={25}
                className="cursor-pointer"
                onClick={() => {
                  state(false);
                  handleSubmit();
                }}
              />
            ) : (
              <IoCloseOutline 
                size={25}
                className="cursor-pointer"
                onClick={async () => {
                  await state(false)
                  console.log("VAI TOMAR NO CU TODO MUNDO VAI SE FODER VAI PRA PUTA QUE PARIU TODO MUNDO")
                }}
              />
            )}
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
