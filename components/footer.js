import React, { useState, useEffect } from "react";
import Subscribe from "./subscribe";
import Popup from "./popup";
import Image from "next/image";

export default function Footer() {
  const popupDelayInSeconds = 15;
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (typeof window !== "undefined" && !window.sessionStorage.getItem("hasShownPopup")) {
      timeoutId = setTimeout(() => {
        window.sessionStorage.setItem("hasShownPopup", true);
        setShowPopup(true);
      }, popupDelayInSeconds * 1000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <section className="pt-20 pb-4" style={{ background: "#191C1F" }}>
      {showPopup && <Popup></Popup>}
      <div
        className="w-11/12 mx-auto flex flex-col lg:flex-row items-center justify-start lg:justify-between pb-20"
        style={{ maxWidth: "1000px" }}
      >
        <div className="w-full lg:w-1/2 lg:max-w-xs">
          <Image width="71px" height="73px" src="/images/ben-footer.svg" />
          <div
            className="font-inter mt-10 text-sm"
            style={{ color: "#CFD2DC" }}
          >
            <div className="font-bold mb-3">
              Blockchain Education Network EST. 2014
            </div>
            <div className="mb-6">
              BEN is a global education company providing crypto lessons, news, events, and job opportunities around the world.
            </div>
            <div className="mb-6">
              625 Kenmoor Ave Suite <br />
              301-97251 Grand Rapids, MI 49546
            </div>
{/*
            <div className="mb-6">
              <a target="_blank" href="https://drive.google.com/file/d/1DeVoRAEAOzxJQ1jSlykklOakaLs8o_fb/view?usp=sharing" className="text-white underline">
                Blockchain Education Network is qualified non-profit with designation as a 501 (c)(3) public charity, EIN: 46-5280397
              </a>
            </div>
            <a target="_blank" href="https://drive.google.com/file/d/1FmpY4Lmy5kX1U26q2b13NtQBf4mni5Es/view" className="text-white underline">
              Blockchain Education Network is a qualified Puerto Rico 1101.01(a)(2)(A)(iv) public charity, as an Educational Organization.
            </a>
          */}

          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div
            className="mt-10 lg:mt-0 space-y-10 md:space-y-0 flex flex-col sm:flex-row justify-start  md:space-x-20 font-inter"
            style={{ color: "#CFD2DC" }}
          >
            <div>
              <ul className="space-y-3">
                <li className="uppercase font-bold text-xs">Initiatives</li>
                <li className="text-sm"><a href="https://beats.blockchainedu.org/">Subscribe</a></li>
                <li className="text-sm"><a href="/donate">Scholarships</a></li>
                <li className="text-sm"><a href="/join">Join Now</a></li>
                {/* <li className="text-sm">Programs</li>
                    <li className="text-sm">For Professors</li>
                    <li className="text-sm">For Projects</li>
                    <li className="text-sm">For Clubs</li> */}
                <li className="text-sm">
                    <a href="https://drive.google.com/drive/folders/1Y97OoDNiaM-zdge2TbQSTmXL4iK_wT6X?usp=share_link">Media Kit</a>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-3">
                <li className="uppercase font-bold text-xs">Company</li>
                <li className="text-sm">
                  <a href="/about/team">About Us</a>
                </li>
                <li className="text-sm">
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </div>
            <div>
                  <ul className="space-y-3">
                    <li className="uppercase font-bold text-xs">Socials</li>
                    <li className="text-sm"><a href="https://twitter.com/blockchainedu">Twitter</a></li>
                    <li className="text-sm"><a href="https://facebook.com/blockchainedu">Facebook</a></li>
                    <li className="text-sm"><a href="https://instagram.com/blockchainedu">Instagram</a></li>
                    <li className="text-sm"><a href="https://linkedin.com/in/blockchainedu">LinkedIn</a></li>
                    <li className="text-sm"><a href="https://tiktok.com/@blockchainedu.org">TikTok</a></li>
                  </ul>
                </div>
          </div>
        </div>
      </div>
      <div className="border-t border-bengrey-500 pt-6">
        <div
          className="flex flex-col lg:flex-row justify-between items-center mx-auto"
          style={{ maxWidth: "1000px" }}
        >
          <div className="flex space-x-3">
            <Image width="10px" height="10px" src="/images/green-dot.svg" />
            <div className="font-inter text-white text-sm">
              All Services Operational
            </div>
          </div>
          <div className="my-6 lg-my-0">
            <Image
              width="25px"
              height="25px"
              src="/images/ben-footer-small.svg"
            />
          </div>
          <div className="font-inter text-white text-sm">
            © 2023 Blockchain Education Network
          </div>
        </div>
      </div>
    </section>
  );
}
