"use client";

import { useCartStore } from "@/store";
import Image from "next/image";
import formatPrice from "@/utils/PriceFormat";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import box from "@/public/box.svg";
import { motion, AnimatePresence } from "framer-motion";
import Checkout from "./Checkout";
import OrderConfirmed from "./OrderConfirmed";

export default function Cart() {
  const CartStore = useCartStore();

  //total price
  const totalPrice = CartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => CartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
    >
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        className="bg-base-100 absolute right-0 top-0 w-full lg:w-2/5  h-screen p-12 overflow-y-scroll"
      >
        {CartStore.onCheckout === "cart" && (
          <button
            onClick={() => CartStore.toggleCart()}
            className="text-sm font-bold pb-12"
          >
            Back to store
          </button>
        )}
        {CartStore.onCheckout === "checkout" && (
          <button
            onClick={() => CartStore.setCheckout("cart")}
            className="text-sm font-bold pb-12"
          >
            Check your cart
          </button>
        )}
        {CartStore.onCheckout === "cart" && (
          <>
            {CartStore.cart.map((item) => (
              <motion.div layout key={item.id} className="flex p-4 gap-4 bg-base-200 my-4 rounded--md">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={90}
                  height={90}
                  className="rounded-md h-30 w-auto"
                />
                <div>
                  <h2>{item.name}</h2>
                  <div className="flex gap-2">
                    <h2>Quantity: </h2>
                    <button
                      onClick={() =>
                        CartStore.removeProduct({
                          id: item.id,
                          image: item.image,
                          name: item.name,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity,
                        })
                      }
                    >
                      <IoRemoveCircle />
                    </button>
                    <h2>{item.quantity}</h2>
                    <button
                      onClick={() =>
                        CartStore.addProduct({
                          id: item.id,
                          image: item.image,
                          name: item.name,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity,
                        })
                      }
                    >
                      <IoAddCircle />
                    </button>
                  </div>
                  <p className="text-sm">
                    {item.unit_amount && formatPrice(item.unit_amount)}
                  </p>
                </div>
              </motion.div>
            ))}
          </>
        )}
        {CartStore.cart.length > 0 && CartStore.onCheckout === "cart" ? (
          <motion.div layout>
            <p>Total: {formatPrice(totalPrice)}</p>
            <button
              onClick={() => CartStore.setCheckout("checkout")}
              className="py-2 mt-4 bg-primary w-full rounded-md text-white"
            >
              Checkout
            </button>
          </motion.div>
        ) : null }
        {/* Checkout form */}
        {CartStore.onCheckout === "checkout" && <Checkout />}
        {CartStore.onCheckout === "success" && <OrderConfirmed />}
        <AnimatePresence>
          {!CartStore.cart.length && CartStore.onCheckout === "cart" && (
            <motion.div
              animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              className="flex flex-col items-center text-2xl pt-56 font-medium opacity-75"
            >
              <h1>There's nothing here... </h1>
              <Image src={box} alt="empty box" width={200} height={200} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
