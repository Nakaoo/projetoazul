import React, { useState, useEffect, useRef } from "react";
import Input from '../../../../components/Input'
import InputDate from '../../../../components/InputDate'
import InputMask from '../../../../components/InputMask'
import InputSelect from "../../../../components/InputSelect";
import InputCheckbox from "../../../../components/InputCheckbox";
import BiArrowBack, { BiAbacus } from 'react-icons/ai'
import { Row, Col, Form, Select, Modal } from "antd";
import { formatISO } from "date-fns";
import { dateToFront } from "../../../../utils/removeMask";
import { VscEye, VscEyeClosed } from "react-icons/vsc"
import countStar from "../utils/countStar";
import { LoadingOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const FormInformation = (
    { register, control, errors, onNext, onPrevious, watch, loading}
) => {
    let navigate = useNavigate();

    return (
        <div key="FormInformation">
            <div className="__signup_subtitle">
                <span className="__signup_span_subtitle">PARABÉNS PELA SUA INICIATIVA</span>
            </div>

            <div className="__signup_form_information_content">
                <p>Foi enviado um email de verificação para <b>{watch('email')}</b>, aceite para que possa ativar a sua conta</p>
                <span className="__signup_form_information_span">Verifique a sua caixa de SPAM</span>
            </div>

            <Row gutter={16} className="__signup_buttons_end">
                <div className="__signup_button_proximo2">
                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                    >FAZER LOGIN</button>
                </div>
            </Row>
        </div>

    )

}


export default FormInformation