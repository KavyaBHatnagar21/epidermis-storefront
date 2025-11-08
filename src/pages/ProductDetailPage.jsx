import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sdk } from "../configs/medusa";
import useCart from "../hooks/useCart.js";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (!product || !product.variants || product.variants.length === 0) {
      console.error("No product variant available to add to cart");
      return;
    }
    try {
      await addToCart(product.variants[0].id, 1);
    } catch (error) {
      console.error("Failed to add to cart", error);
      alert("Failed to add to cart");
    }
  };

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const { product } = await sdk.store.product.retrieve(productId);
        setProduct(product);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span>Loading...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-96">
        <span>Product not found.</span>
      </div>
    );
  }

  const images = product.images || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
      {/* Left thumbnails */}
      <div className="flex flex-col gap-4">
        {images.map((img, idx) => (
          <img
            key={img.id}
            src={img.url}
            alt={product.title}
            className={`w-20 h-20 object-cover cursor-pointer border ${
              idx === mainImageIndex ? "border-black" : "border-transparent"
            }`}
            onClick={() => setMainImageIndex(idx)}
          />
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1 flex justify-center items-center">
        {images[mainImageIndex] ? (
          <img
            src={images[mainImageIndex].url}
            alt={product.title}
            className="max-w-full max-h-[400px] object-contain"
          />
        ) : (
          <div className="w-full h-96 bg-gray-100 flex justify-center items-center">
            No Image
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="flex-1 flex flex-col justify-start gap-6">
        <h1 className="text-2xl font-serif tracking-widest">{product.title}</h1>
        <p className="text-xl font-semibold">₹ {product.variants?.[0]?.prices?.[0]?.amount || product.variants?.[0]?.calculated_price || "N/A"}</p>
        <button
          className="bg-gray-900 text-white py-3 px-6 w-40 hover:bg-gray-800 transition"
          onClick={handleAddToCart}
        >
          ADD TO BAG
        </button>

        <div className="flex flex-col gap-6 text-gray-700">
          {product.description && (
            <div>
              <h3 className="uppercase font-semibold mb-1">Description</h3>
              <p className="text-sm">{product.description}</p>
            </div>
          )}
          {(product.material || product.variants?.[0]?.material) && (
            <div>
              <h3 className="uppercase font-semibold mb-1">Material</h3>
              <p className="text-sm">
                {product.material || product.variants?.[0]?.material}
              </p>
            </div>
          )}
          {((product.length && product.width && product.height) || (product.variants?.[0]?.length && product.variants?.[0]?.width && product.variants?.[0]?.height)) && (
            <div>
              <h3 className="uppercase font-semibold mb-1">Dimensions</h3>
              <p className="text-sm">
                {product.length && product.width && product.height
                  ? `${product.length} x ${product.width} x ${product.height}`
                  : `${product.variants[0].length} x ${product.variants[0].width} x ${product.variants[0].height}`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
