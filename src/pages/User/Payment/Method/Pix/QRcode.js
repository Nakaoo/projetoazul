import './QRcode.css'
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from 'react';
import { globalImg } from '../../../../../utils/globalImg';

export default function QRcode({ImgQrCode, setModalQrCode}){
    // eslint-disable-next-line
    const [img2, setImg2] = useState();
    let img;
    let imgEstatica = globalImg.pixQrCode
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
            <img src={imgEstatica} width="200px" height="200px" alt="QRCode" />
       </div>    
    </>
)

}