import React from "react";
import OrderComponent from "../../OrderConfirmation/Page/Component/index"
// eslint-disable-next-line
import { useContext } from "react";
// eslint-disable-next-line
import { UserContext } from "../../../../../hooks/UserContext";
// eslint-disable-next-line
import MenuBar from "../../../../../components/MenuBar";
// eslint-disable-next-line
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