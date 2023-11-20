import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function CheckoutForm() {
  const { user } = useAuth();
  const [error, setError] = useState([]);
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { carts, cartsRefetch } = useCart();
  const totalPrice = carts?.reduce((total, item) => total + item.price, 0);
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post(`/create-payment-intent`, { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log(`payment method`, paymentMethod);
      setError("");
    }
    //confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user.email || "anonymous",
            name: user.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log(`transation id`, paymentIntent.id);
        setTransactionId(paymentIntent.id);
        //NOTE -  NOW save the info on the database
        const payment = {
          email: user.email,
          price: totalPrice,
          date: new Date(), //utc date convert . use moments js
          transactionID: paymentIntent.id,
          cartIDs: carts.map((item) => item._id),
          menuItemIds: carts.map((item) => item.menuID),
          status: "pending",
        };
        const res = await axiosSecure.post("/payments", payment);
        console.log("payment saved", res.data);
        cartsRefetch();
        if (res.data.paymentResult.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment  has been Done",
            showConfirmButton: false,
            timer: 1000,
          });
          navigate("/dashBord/paymentHistory");
        }
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        type="submit"
        className="my-4 btn btn-sm btn-primary"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-600">your transition ID {transactionId}</p>
      )}
    </form>
  );
}

export default CheckoutForm;
