import React from "react";
import OrderComponent from "../../OrderConfirmation/Page/Component/index"
import { useContext } from "react";
import { UserContext } from "../../../../../hooks/UserContext";
import MenuBar from "../../../../../components/MenuBar";
import { HiMenu } from "react-icons/hi";
import './OrderConfirmation.css'

export default function OrderConfirmation({ menu }) {

  return (
    <div className="__contentOrderConfir">
      <div className="__orderComponent">
        <OrderComponent />
      </div>
    </div>
  )
}