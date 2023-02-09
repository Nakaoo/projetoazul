import './QRcode.css'
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from 'react';

export default function QRcode({ImgQrCode, setModalQrCode}){
    const [img2, setImg2] = useState();
    let img;
    useEffect(() => {
        img = ImgQrCode.substring(ImgQrCode.indexOf(`h`))
        setImg2(img)
    }, [])

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
            <img src={img2} />
       </div>    
    </>
)

}