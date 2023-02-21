// eslint-disable-next-line
import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line
import Input from '../../../../components/Input'
// eslint-disable-next-line
import InputDate from '../../../../components/InputDate'
// eslint-disable-next-line
import InputMask from '../../../../components/InputMask'
// eslint-disable-next-line
import InputSelect from "../../../../components/InputSelect";
// eslint-disable-next-line
import InputCheckbox from "../../../../components/InputCheckbox";
// eslint-disable-next-line
import BiArrowBack, { BiAbacus } from 'react-icons/ai'
// eslint-disable-next-line
import { Row, Col, Form, Select, Modal } from "antd";
// eslint-disable-next-line
import { formatISO } from "date-fns";
// eslint-disable-next-line
import { dateToFront } from "../../../../utils/removeMask";
// eslint-disable-next-line
import { VscEye, VscEyeClosed } from "react-icons/vsc"
// eslint-disable-next-line
import countStar from "../utils/countStar";
// eslint-disable-next-line
import { LoadingOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const FormInformation = (
    // eslint-disable-next-line
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