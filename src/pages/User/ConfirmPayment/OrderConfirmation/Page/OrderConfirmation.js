import React from "react";
import OrderComponent from "../../OrderConfirmation/Page/Component/index"
import { useContext } from "react";
import { UserContext } from "../../../../../hooks/UserContext";
import MenuBar from "../../../../../components/MenuBar";
import { HiMenu } from "react-icons/hi";
import './OrderConfirmation.css'

export default function OrderConfirmation({menu}){
    const { value, setValue } = useContext(UserContext);

    return (
    <div className="__containerOrderConfirmation">
             {window.innerWidth <= "600" && value == true ? (
        <div className="__menuBar">
          <MenuBar menu={menu} />
        </div>
      ) : ( <>
        
        {window.innerWidth <= "600" && value == false ? (
            <>
            <div className="__contentOrderConfir">
              <div className="__menuIsOpen">
                <HiMenu size={30} onClick={() => setValue(true)} />
              </div>
               <div className="__orderComponent">
                  <OrderComponent />
               </div>
            </div>
              </> )
        : (

            <>
            <div className="__contentOrderConfir">
             <div className="__menuBar">
          <MenuBar menu={menu} />
        </div>
            <div className="__orderComponent">
                  <OrderComponent />
            </div>
            </div>
            
            </>
        ) }




      </>)
      }
    </div>
    )
}