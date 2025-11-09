import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { sdk } from "../configs/medusa";
import useCart from "../hooks/useCart.js";
import {useRegion} from "../hooks/useRegion.js";
import {formatPrice} from "../lib/price.js";

const ProductDetailPage = () => {
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(null)
  const [mainImageIndex, setMainImageIndex] = useState(0)
  const { region } = useRegion()
  const { addToCart } = useCart()
  const { productId } = useParams()
  const navigate = useNavigate()

  // Fetch product details
  useEffect(() => {
    if (!region) return

    const fetchProduct = async () => {
      try {
        const { products } = await sdk.store.product.list({
          handle: productId,
          region_id: region.id,
          fields: `*variants.calculated_price,+variants.inventory_quantity,+images`,
        })
        if (products.length) {
          setProduct(products[0])
        }
      } catch (err) {
        console.error("Error fetching product:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId, region])

  if (loading) return <div className="text-center py-20">Loading...</div>
  if (!product) return <div className="text-center py-20">Product not found</div>

  const variant = product.variants?.[0]
  const price = formatPrice(
    variant?.calculated_price?.calculated_amount ||
    variant?.prices?.[0]?.amount ||
    0,
    region?.currency_code?.toUpperCase()
  )

  const images = product.images?.length
    ? product.images.map((img) => ({ id: img.id, url: img.url }))
    : [{ id: "noimg", url: product.thumbnail }]

  const handleAddToCart = async () => {
    try {
      await addToCart(variant.id, 1)
      navigate("/cart")
    } catch (err) {
      console.error("Error adding to cart:", err)
    }
  }

  // Extract dimensions if found in description or product metadata
  const hasDimensions =
    (product.length && product.width && product.height) ||
    (variant?.length && variant?.width && variant?.height)

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
        <p className="text-xl font-semibold">{price}</p>
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

          {hasDimensions && (
            <div>
              <h3 className="uppercase font-semibold mb-1">Dimensions</h3>
              <p className="text-sm">
                {product.length && product.width && product.height
                  ? `${product.length} x ${product.width} x ${product.height}`
                  : `${variant.length} x ${variant.width} x ${variant.height}`}
              </p>
            </div>
          )}

          {variant?.weight && (
            <div>
              <h3 className="uppercase font-semibold mb-1">Weight</h3>
              <p className="text-sm">{variant.weight} g</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage;