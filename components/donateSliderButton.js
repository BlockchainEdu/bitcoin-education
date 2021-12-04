import { createRef, useCallback, useEffect, useState } from "react";
import DonateModal, { giftFrequency } from "./modals/donateModal";
import OtherModal from "./modals/otherModal";
import StripeCCInfoModal from "./modals/stripeCCInfoModal";

const modalTypes = {
  none: 'none',
  donate: 'donate',
  other: 'other',
  ccInfo: 'cc info',
}

export default function Modal() {
  const [showModal, setShowModal] = useState(modalTypes.none);
  const [donationAmount, setDonationAmount] = useState({ amount: 0.00, frequency: giftFrequency.oneTime });
  const minDonationAmount = 10;
  const maxDonationAmount = 1000;
  const startingDonationAmount = 10;

  function openOtherModal() {
    setShowModal(modalTypes.other);
  }
  function openStripeCCInfoModal(amount, frequency=giftFrequency.oneTime) {
    setDonationAmount({ amount, frequency });
    setShowModal(modalTypes.ccInfo);
  }
  function closeModal() {
    setShowModal(modalTypes.none);
  }

  return (
    <>
      <button
        className="bg-benorange-500 hover:bg-bengrey-300 transition duration-500 shadow-button text-white font-bold text-xl px-16 rounded-full py-4"
        type="button"
        onClick={() => setShowModal(modalTypes.donate)}
      >
        Donate
      </button>
      {showModal === modalTypes.donate && (
        <DonateModal minDonationAmount={minDonationAmount} maxDonationAmount={maxDonationAmount}
                     startingDonationAmount={startingDonationAmount} sliderClick={openOtherModal}
                     buttonClick={openStripeCCInfoModal} closeModal={closeModal} />
      )}
      {showModal === modalTypes.other && (
        <OtherModal buttonClick={openStripeCCInfoModal} closeModal={closeModal} />
      )}
      {showModal === modalTypes.ccInfo && (
        <StripeCCInfoModal donationAmount={donationAmount} closeModal={closeModal} />
      )}
    </>
  );
}
