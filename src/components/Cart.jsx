import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  return <div>{cart && cart.map((value) => <li>{value.productName}</li>)}</div>;
}