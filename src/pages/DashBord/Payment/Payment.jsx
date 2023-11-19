import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

//TODO - we have to add publiccable KEY
const stripePromise = loadStripe(import.meta.env.VITE_PAYMANT_KEY);
function Payment() {
  return (
    <div>
      <SectionTitle
        heading={`payment`}
        subHeading={`please pay to eat`}
      ></SectionTitle>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}

export default Payment;
