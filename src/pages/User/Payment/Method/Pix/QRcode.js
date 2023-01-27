import './QRcode.css'
import { AiOutlineClose } from "react-icons/ai";

export default function QRcode({ImgQrCode, setModalQrCode}){
    return (
    <>
       <div className="__qrcode">
            <div className="__closedModalPix">
             <AiOutlineClose onClick={() => setModalQrCode(false)} 
             size={40} color={`#FFFFFF`} />
            </div>
            <div className="__titleQrcode">
                <h1>ESCANEIE O QR CODE <br/>
                E EFETUE O PAGAMENTO
                </h1>
            </div>
            <img src={ImgQrCode} />
       
       </div>    
    </>
)

}