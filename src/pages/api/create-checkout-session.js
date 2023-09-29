const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  const transformedItems = items.map((item) => ({
    // description: item.description,
    quantity: 1,
    price_data: {
      currency: "zar",
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));

  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],

        // shipping_address_collection: {
        //   allowed_countries: ["PL", "ZA", "US"],
        // },
        // shipping_options: [
        //   {
        //     shipping_rate: ["shr_1NvN8zG2WC1dRg5dNyUuv8tl"],
        //   },
        // ],
        line_items: transformedItems,
        //     [
        //     {
        //       price: "{{PRICE_ID}}",
        //       quantity: 1,
        //     },
        //   ],
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/checkout`,
        metadata: {
          email,
          images: JSON.stringify(items.map((item) => item.image)),
        },
      });
      res.status(200).json({ id: session.id, url: session.url });
      console.log("session url: ", session.url);

      // res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
