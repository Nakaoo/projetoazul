import React from "react";
import OrderPlacedComponent from "../../OrderPlaced/Page/Component/index"
import { useContext } from "react";
import { UserContext } from "../../../../../hooks/UserContext";
import MenuBar from "../../../../../components/MenuBar";
import { HiMenu } from "react-icons/hi";
import './OrderPlaced.css'

export default function OrderPlaced({menu}){
    const { value, setValue } = useContext(UserContext);

    return (
    <div className="__containerOrderPlaced">
             {window.innerWidth <= "600" && value == true ? (
        <div className="__menuBar">
          <MenuBar menu={menu} />
        </div>
      ) : ( <>
        
        {window.innerWidth <= "600" && value == false ? (
            <>
            <div className="__contentOrderPlaced">
              <div className="__menuIsOpen">
                <HiMenu size={30} onClick={() => setValue(true)} />
              </div>
               <div className="__orderPlacedComponent">
                  <OrderPlacedComponent />
               </div>
            </div>
              </> )
        : (

            <>
           
             <div className="__menuBar">
          <MenuBar menu={menu} />
        </div>
            <div className="__orderPlacedComponent">
                  <OrderPlacedComponent />
            </div>
            
            
            </>
        ) }




      </>)
      }
    </div>
    )
}