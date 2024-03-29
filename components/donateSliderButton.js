import { useState } from "react";
import DonateModal, { giftFrequency } from "./modals/donateModal";
import OtherModal from "./modals/otherModal";
import StripeCCInfoModal from "./modals/stripeCCInfoModal";

import getStripe from '../utils/get-stripe';
import { fetchPostJSON } from '../utils/api-helpers';

const modalTypes = {
  donate: 'donate',
  other: 'other',
}

export default function Modal() {
  const minDonationAmount = 12;
  const maxDonationAmount = 300;
  const step = 12;
  const startingDonationAmount = 12;
  const [showModal, setShowModal] = useState(modalTypes.donate);
  const [donationAmount, setDonationAmount] = useState({ amount: startingDonationAmount, frequency: giftFrequency.oneTime });
  const [loading, setLoading] = useState(false);

  function openOtherModal() {
    setShowModal(modalTypes.other);
  }
  function closeModal() {
    setShowModal(modalTypes.donate);
  }
  function openDonateModal(amount = false) {
    if (amount !== false) {
      setDonationAmount({ ...donationAmount, amount });
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
      <DonateModal minDonationAmount={minDonationAmount} maxDonationAmount={maxDonationAmount}
                   startingDonationAmount={donationAmount} step={step} otherClick={openOtherModal}
                   buttonClick={handleSubmit} closeModal={closeModal} loading={loading} />
      {showModal === modalTypes.other && (
        <OtherModal buttonClick={openDonateModal} closeModal={closeModal} loading={loading} />
      )}
    </>
  );
}
