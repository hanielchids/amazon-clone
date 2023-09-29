const orders = [
  {
    id: "1",
    paid: true,
    customerId: "customer12",
    products: [],
    total: 200.99,
  },
  {
    id: "2",
    paid: true,
    customerId: "customer21",
    products: [],
    total: 200.99,
  },
];

export default async function handler(req, res) {
  if (req.method === "GET") {
    const orderId = req.query.id;
    const order = orders.find((p) => p.id === orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } else if (req.method === "POST") {
    const { id, name, description, price } = req.body;
    if (!id || !name || !description || !price) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const newOrder = { id, name, description, price };
    orders.push(newOrder);

    return res.status(201).json(newOrder);
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
