import React, { useState } from "react";
import { useSelector } from "react-redux";
import CartPreview from "./CartPreview";
import { useAddTransactionMutation } from "@api";
import { useNavigate } from "react-router-dom";

export default function (props) {
  const navigate = useNavigate();
  const { cartItems, onRemoveFromCart, onClearCart } = props;

  const [addTransaction] = useAddTransactionMutation();
  const auth = useSelector((state) => state.auth);
  const [isCartPreviewOpen, setIsCartPreviewOpen] = useState(false);

  const handleConfirmPurchase = async () => {
    const transactionDate = new Date();
    const formattedDate = transactionDate.toLocaleDateString("en-PH");

    await addTransaction({
      user: auth.user._id,
      product: cartItems.map((item) => item?._id),
      date: formattedDate,
    });

    onClearCart();

    navigate("/customer/transactionHistory");

    setIsCartPreviewOpen(false);
  };

  const handleToggleCartPreview = () => {
    setIsCartPreviewOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <>
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
        onClick={handleToggleCartPreview}
      >
        {isCartPreviewOpen
          ? "Close Cart"
          : `Open Cart ${
              cartItems.length === 0
                ? `(No Items)`
                : `(${cartItems.length} items)`
            }`}
      </button>
      {isCartPreviewOpen && (
        <CartPreview
          cartItems={cartItems}
          onRemoveFromCart={onRemoveFromCart}
          onConfirmPurchase={handleConfirmPurchase}
          onClose={() => setIsCartPreviewOpen(false)}
        />
      )}
    </>
  );
}
