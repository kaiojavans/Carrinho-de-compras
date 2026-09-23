import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((response) => setProducts(response.products));
  }, []);

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-2 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col border border-zinc-400"
        >
          <img src={product.thumbnail} alt={product.title} />

          <div className="flex flex-col gap-1 flex-1 p-2">
            <h1 className="text-2xl font-semibold">{product.title}</h1>

            <p className="text-emerald-500 text-2xl font-bold">
              R$ {product.price}
            </p>

            <Link
              to={`/produto/${product.id}`}
              className="text-center bg-zinc-800 text-white py-2 rounded"
            >
              Ver detalhes
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}