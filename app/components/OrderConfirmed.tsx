"use client";

import { motion } from "framer-motion";
import giphy from "@/public/giphy.webp";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store";
import { useEffect } from "react";

export default function OrderConfirmed() {
  const cartStore = useCartStore();

  useEffect(() => {
    cartStore.setPaymentIntent('')
    cartStore.clearCart()
  },[])

  const checkoutOrder = () => {
    setTimeout(() => {
        cartStore.setCheckout('cart')
     }, 1000)
    cartStore.toggleCart()
  }

  return (
    <motion.div
      className="flex items-center justify-center my-12"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="p-12 rounded-md text-center">
        <h1>Your Order has been placed 💕</h1>
        <h2>Check your email for the receipt</h2>
        <Image src={giphy} className="py-8" alt="cartoon dancing" />
        <div className="flex items-center justify-center gap-12">
          <Link href={"/dashboard"}>
            <button onClick={checkoutOrder} className="font-medium">Check your Order</button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
