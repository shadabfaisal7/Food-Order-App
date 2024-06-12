import React, { useContext } from "react";

import useHttp from "../hooks/use-http";

import { UserProgressContext } from "../../contexts/user-progress-context";
import { CartContext } from "../../contexts/cart-context";

import Input from "../UI/input";
import Modal from "../UI/modal";
import Button from "../UI/button";
import Error from "../error";

import { currencyFormatter } from "../../helpers/formatter";

import { CHECKOUT } from "../../constants/modal";
import { ORDERS_END_POINT } from "../../constants/api-endpoints";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const CheckoutForm = () => {
  const { closeModal, show } = useContext(UserProgressContext);
  const { totalCartPrice, items, clearCart } = useContext(CartContext);
  const {
    data,
    sendRequest,
    isLoading: isSendingData,
    error,
    clearData,
  } = useHttp(ORDERS_END_POINT, requestConfig);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const customerData = Object.fromEntries(formData.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items,
          customer: customerData, //compare with BE for knowing the fields
        },
      })
    );
  };

  const handleFinish = () => {
    closeModal();
    clearCart();
    clearData();
  };

  console.log(data, error);
  if (data && !error) {
    return (
      <Modal isOpen={show === CHECKOUT} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>{data.message}</p>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  const fomattedPrice = currencyFormatter.format(totalCartPrice);

  return (
    <Modal isOpen={show === CHECKOUT} onClose={closeModal}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {fomattedPrice}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">
          {isSendingData ? (
            <span>Sending order data...</span>
          ) : (
            <>
              <Button type="button" textOnly onClick={closeModal}>
                Close
              </Button>
              <Button>Submit Order</Button>
            </>
          )}
        </p>
      </form>
    </Modal>
  );
};

export default CheckoutForm;
