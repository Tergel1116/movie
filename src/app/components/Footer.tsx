import React from "react";

export const Footer = () => {
  return (
    <div className="h-[280px] w-screen  bg-[#4338CA] flex items-center justify-center mt-20">
      <div className=" h-[200px] w-[90vw] flex justify-between">
        <div className="flex flex-col gap-[20px]">
          <img src="/footer.png" alt="" className="w-[92px] h-[20px]" />
          <span className="text-white">
            © 2024 Movie Z. All Rights Reserved.
          </span>
        </div>
        <div className="flex text-white gap-40">
          <div className="text-white flex flex-col gap-10">
            <span>Contact Information</span>
            <div className="flex items-center gap-2">
              <img src="/footermail.png" alt="" className="size-4" />
              <div className="flex flex-col">
                <span>Email:</span>
                <span>support@movieZ.com</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src="/footerphone.png" alt="" className="size-4" />
              <div className="flex flex-col">
                <span>Phone:</span>
                <span>+976 (11) 123-4567</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col  gap-3">
            <span>Follow us</span>
            <div className="flex gap-4">
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
