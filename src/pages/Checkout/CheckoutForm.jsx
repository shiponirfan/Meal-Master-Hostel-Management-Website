import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const CheckoutForm = ({ selectedPackage }) => {
  const axiosSecure = useAxiosSecure();
  const QueryClient = useQueryClient();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [paymentMethodError, setPaymentMethodError] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const { mutate: userPaymentIntent, isPending } = useMutation({
    mutationKey: ["userPaymentIntent", user?.email],
    mutationFn: async () => {
      const res = await axiosSecure.post("/auth/create-payment-intent", {
        price: selectedPackage.price,
      });
      return setClientSecret(res.data.clientSecret);
    },
  });

  useEffect(() => {
    userPaymentIntent();
  }, [userPaymentIntent]);

  if (isPending) {
    <LoadingSpinner />;
  }

  const { mutate: paymentsHistory } = useMutation({
    mutationKey: ["paymentsHistory", user?.email],
    mutationFn: async (membershipPayment) => {
      return await axiosSecure.post(
        "/auth/payments-history",
        membershipPayment
      );
    },
    onSuccess: () => {
      badgeUpdate();
    },
  });
  const setBadge = `${selectedPackage.title}-Badge`;
  const { mutate: badgeUpdate } = useMutation({
    mutationKey: ["badgeUpdate", user?.email],
    mutationFn: async () => {
      return await axiosSecure.post(`/auth/user/${user?.email}`, {
        badge: setBadge,
      });
    },
    onSuccess: () => {
      toast.success("Payment Successful");
      QueryClient.invalidateQueries({ queryKey: ["userRole", user?.email] });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const paymentTost = toast.loading("Loading...");

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("Error", error);
      setPaymentMethodError(error.message);
      toast.error(error.message, { id: paymentTost });
    } else {
      setPaymentMethodError("");
    }
    const { paymentIntent, error: paymentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });
    if (paymentError) {
      console.log("Payment error: ", paymentError);
      toast.error(paymentError.message, { id: paymentTost });
    }
    if (paymentIntent) {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        const membershipPayment = {
          date: new Date(),
          email: user?.email,
          price: selectedPackage.price,
          transactionId: paymentIntent.id,
          membershipName: selectedPackage.Title,
        };
        paymentsHistory(membershipPayment);
        toast.dismiss(paymentTost);
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
        disabled={!stripe || !clientSecret}
        className="text-xl text-white cursor-pointer rounded-lg font-bold py-5 px-44 bg-indigo-600 hover:bg-indigo-700 transition"
      >
        Pay
      </button>
      <p className="text-red-600 font-bold my-5">{paymentMethodError}</p>
      {transactionId && (
        <p className="text-green-600 font-bold">
          {" "}
          Transaction Id: {transactionId}
        </p>
      )}
    </form>
  );
};
CheckoutForm.propTypes = {
  selectedPackage: PropTypes.object,
};
export default CheckoutForm;
