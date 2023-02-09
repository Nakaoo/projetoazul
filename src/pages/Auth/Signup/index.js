import React from "react";
import './index.css'
import Steps from "../../../components/Stepper";
import { useState, useRef } from "react";

// Pages
import RegisterForm from "./Form/RegisterForm";
import { globalImg } from "../../../utils/globalImg";

const Signup = () => {
    const [step, setStep] = useState(0);
    const logo_principal = globalImg.logo

    const routeProps = {
        0: { name: "Pessoais", route: "personal" },
        1: { name: "Login", route: "complement" },
        2: { name: "Contato", route: "contact" },
        3: { name: "Endereço", route: "address" },
        4: { name: "Segurança", route: "security" },
        5: { name: "Termos", route: "agreement" },
        6: { name: "Details", route: "details" },
    };

    return (
        <div className="__signup_container">
            <div className="__signup_content">
                <div className="__signup_header">
                    <div className="__signup_logo">
                        <img src={logo_principal} alt="Logo principal ESG TECH" width="350px" />
                    </div>
                    <div className="__signup_title">
                        <h3 className="__signup_span_title">Cadastre-se na pré-venda e tenha acesso a
                            um universo de novas possibilidades</h3>
                    </div>
                    <div className="__signup_steps">
                        <Steps current={step}>
                            <Steps.Item title="Pessoais" />
                            <Steps.Item title="Login" />
                            <Steps.Item title="Contato" />
                            <Steps.Item title="Endereço" />
                            <Steps.Item title="Segurança" />
                            <Steps.Item title="Termos" />
                        </Steps>
                    </div>
                </div>
                <div className="__signup_container_content">
                    <div className="__signup_form">
                        <RegisterForm step={step} setStep={setStep} routeProps={routeProps} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;