import Image from "next/image";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import Currency from "react-currency-formatter";
import CheckoutProduct from "../components/CheckoutProduct";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  const createCheckoutSession = async () => {
    setIsLoading(true);
    const response = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.data.user.email,
    });

    const sessionUrl = response.data.url;

    setIsLoading(false);
    router.push(sessionUrl);
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            alt="header image"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0 ? "Your Basket is empty" : "Shopping Basket"}
            </h1>

            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):{" "}
                <span className="font-bold">
                  <Currency quantity={total} currency="ZAR" />
                </span>
              </h2>

              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={session.status === "unauthenticated"}
                className={`button mt-2 ${
                  session.status === "unauthenticated" &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {session.status === "unauthenticated"
                  ? "Sign in to checkout"
                  : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>

        {isLoading && (
          <div className="w-full h-full fixed block top-0 left-0 bg-black opacity-50 z-50">
            <span className="opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
              <span className="relative flex h-12 w-12">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-12 w-12 bg-sky-500"></span>
              </span>
            </span>
          </div>
        )}
      </main>
    </div>
  );
}

export default Checkout;
