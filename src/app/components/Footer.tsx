import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { TbMovie } from "react-icons/tb";

export const Footer = () => {
  return (
    <div className="h-[280px] w-screen max-sm:h-[400px]  bg-[#4338CA] flex items-center justify-center mt-20">
      <div className=" h-[200px] w-[90vw] flex justify-between max-sm:gap-5 flex-col">
        <div className="flex flex-col gap-[20px]">
          <div className="flex">
            <div className="flex items-center justify-center gap-1 max-sm:w-22">
              <TbMovie className="size-5 text-white" />
              <span>
                <span className="text-white italic font-bold">Movie Z</span>
              </span>
            </div>
          </div>
          <span className="text-white max-sm:w-70">
            © 2024 Movie Z. All Rights Reserved.
          </span>
        </div>
        <div className="flex text-white gap-40 max-sm:gap-25">
          <div className="text-white flex flex-col max-sm:gap-5 gap-10">
            <span>Contact Information</span>
            <div className="flex items-center gap-2">
              <MdOutlineEmail className="size-5" />
              <div className="flex flex-col">
                <span>Email:</span>
                <span>support@movieZ.com</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FiPhone className="size-5" />
              <div className="flex flex-col">
                <span>Phone:</span>
                <span>+976 (11) 123-4567</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col  gap-3 ">
            <span>Follow us</span>
            <div className="flex gap-4 max-sm:flex-col">
              <span>Facebook</span>
              <span>Instagram</span>
              <span>Twitter</span>
              <span>Youtube</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
