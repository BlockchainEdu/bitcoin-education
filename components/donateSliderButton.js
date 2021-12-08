import { useState } from "react";
import DonateModal, { giftFrequency } from "./modals/donateModal";
import OtherModal from "./modals/otherModal";
import StripeCCInfoModal from "./modals/stripeCCInfoModal";

import getStripe from '../utils/get-stripe';
import { fetchPostJSON } from '../utils/api-helpers';

const modalTypes = {
  none: 'none',
  donate: 'donate',
  other: 'other',
}

export default function Modal() {
  const minDonationAmount = 500;
  const maxDonationAmount = 5000;
  const step = 500;
  const startingDonationAmount = 50;
  const [showModal, setShowModal] = useState(modalTypes.none);
  const [donationAmount, setDonationAmount] = useState({ amount: startingDonationAmount, frequency: giftFrequency.oneTime });
  const [loading, setLoading] = useState(false);

  function openOtherModal() {
    setShowModal(modalTypes.other);
  }
  function closeModal() {
    setShowModal(modalTypes.none);
  }
  function openDonateModal(amount = false) {
    if (amount !== false) {
      setDonationAmount({ ...donationAmount, amount })
    }
    setShowModal(modalTypes.donate);
  }
  async function handleSubmit(amount) {
    setLoading(true);

    // Create a Checkout Session.
    const response = await fetchPostJSON('/api/checkout_sessions', {
      amount: amount,
    });

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
    setLoading(false);
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
                     startingDonationAmount={donationAmount.amount} step={step} otherClick={openOtherModal}
                     buttonClick={handleSubmit} closeModal={closeModal} loading={loading} />
      )}
      {showModal === modalTypes.other && (
        <OtherModal buttonClick={openDonateModal} closeModal={closeModal} loading={loading} />
      )}
    </>
  );
}
