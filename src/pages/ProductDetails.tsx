import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../context/context";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  stock: number;
};

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  const { items, addToCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((response) => setProduct(response));
  }, [id]);

  if (!product) {
    return <p className="p-4">Carregando...</p>;
  }

  const itemInCart = items.find((item) => item.id === product.id);
  const quantity = itemInCart?.quantity ?? 0;

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <button
        onClick={() => navigate("/")}
        className="self-start text-sm text-zinc-600 underline"
      >
        ← Voltar para a lista
      </button>

      <img src={product.thumbnail} alt={product.title} className="rounded" />

      <h1 className="text-3xl font-semibold">{product.title}</h1>
      <p className="text-zinc-700 text-justify">{product.description}</p>
      <p className="text-emerald-500 text-2xl font-bold">
        R$ {product.price}
      </p>
      <p className="text-sm text-zinc-500">Estoque: {product.stock}</p>

      {quantity === 0 ? (
        <button
          onClick={() => addToCart(product)}
          className="bg-emerald-600 text-white font-semibold py-3 rounded hover:bg-emerald-700 transition"
        >
          Adicionar ao carrinho
        </button>
      ) : (
        <div className="flex items-center justify-between border border-zinc-300 rounded p-2">
          <button
            onClick={() => removeFromCart(product.id)}
            className="px-4 py-2 border border-zinc-600 rounded"
          >
            -
          </button>

          <span className="text-xl font-semibold">{quantity} no carrinho</span>

          <button
            onClick={() => addToCart(product)}
            className="px-4 py-2 border border-zinc-600 rounded"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}