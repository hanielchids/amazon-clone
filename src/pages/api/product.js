const products = [
  {
    id: "1",
    name: "Product 1",
    description: "Description for Product 1",
    price: 10.99,
  },
  {
    id: "2",
    name: "Product 2",
    description: "Description for Product 2",
    price: 19.99,
  },
];

export default async function handler(req, res) {
  if (req.method === "GET") {
    const productId = req.query.id;
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } else if (req.method === "POST") {
    const { id, name, description, price } = req.body;
    if (!id || !name || !description || !price) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const newProduct = { id, name, description, price };
    products.push(newProduct);

    return res.status(201).json(newProduct);
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
