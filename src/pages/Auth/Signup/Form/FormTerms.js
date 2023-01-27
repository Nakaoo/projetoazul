import React, { useState, useEffect, useRef } from "react";
import InputCheckbox from "../../../../components/InputCheckbox";
import BiArrowBack, { BiAbacus } from 'react-icons/bi'
import { Row, Col, Form, Select, Modal } from "antd";
import { LoadingOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const FormTerms = (
    { register, control, errors, onNext, onPrevious, loading }
) => {
    const [showModal, setShowModal] = useState(false)
    const [showModalPolitic, setShowModalPolitic] = useState(false)

    function handleTerms() {
        if (showModal == false) {
            setShowModal(true)
        } else {
            setShowModal(false)
        }
    }

    function handleTermsPolitic() {
        if (showModalPolitic == false) {
            setShowModalPolitic(true)
        } else {
            setShowModalPolitic(false)
        }
    }

    <Modal
        title="Termos e condições de uso"
        open={showModal}
        style={{ textAlign: "center" }}
        width={600}
        onCancel={() => setShowModal(false)}
        closable={true}
        footer={null}
    >
        <embed id="teste" src="https://drive.google.com/file/d/1Kf1LJO9wTqNaV9QQvRLvUBs9soDElzQ0/preview" width="100%" height="480" allow="autoplay"></embed>

        <div className="__signup_button_proximo">
            <button
                type="button"
                onClick={onNext}
            >Finalizar</button>
        </div>
    </Modal>

    return (
        <div key="formTerms">

            <div className="__signup_form_terms">
                <Col sm={10} className="__signup_col_term">
                    <h3 className="__signup_form_term_title">Leia e aceite os termos e condições de uso</h3>
                    <InputCheckbox
                        label="Li e aceito os termos e condições de uso"
                        name="terms"
                        register={register("terms")}
                        onClick={handleTerms}
                        error={errors.terms?.message}
                        required
                    />
                    <div className="__sign">
                        <button className="__signup_form_button" type="button" onClick={handleTerms}>Visualizar</button>
                    </div>
                </Col>

                <Col sm={10} className="__signup_col_term">
                    <h3 className="__signup_form_term_title">Leia e aceite a politica de privacidade</h3>
                    <InputCheckbox
                        label="Li e aceito a politica de privacidade"
                        register={register("politic")}
                        error={errors.politic?.message}
                        onClick={handleTermsPolitic}
                        name="politic"
                        required
                    />
                    <div className="__sign">
                        <button className="__signup_form_button" onClick={handleTermsPolitic}>Visualizar</button>
                    </div>
                </Col>

            </div>
            <Row className="__signup_buttons">
                <Col sm={10}>
                    <div className="__signup_button_anterior">
                        <div className="__signup_button_anterior">
                            <button
                                type="button"
                                onClick={onPrevious}
                            >Voltar</button>
                        </div>
                    </div>
                </Col>
                <Col sm={10}>
                    <div className="__signup_button_proximo">
                        <button
                            type="button"
                            id="proximo"
                            onClick={onNext}
                        >
                            {loading ? <LoadingOutlined /> : "Próximo"}
                        </button>
                    </div>
                </Col>

                <Modal
                    title="Termos e condições de uso"
                    open={showModal}
                    style={{ textAlign: "center" }}
                    width={600}
                    onCancel={() => setShowModal(false)}
                    closable={true}
                    footer={null}
                >
                    <embed id="teste" src="https://drive.google.com/file/d/1Kf1LJO9wTqNaV9QQvRLvUBs9soDElzQ0/preview" width="100%" height="480" allow="autoplay"></embed>

                    <div className="__signup_button_finalizar">
                        <button
                            type="button"
                            onClick={handleTerms}
                        >Finalizar</button>
                    </div>
                </Modal>

                <Modal
                    title="Politica de Privacidade"
                    open={showModalPolitic}
                    style={{ textAlign: "center" }}
                    width={600}
                    onCancel={() => setShowModalPolitic(false)}
                    closable={true}
                    footer={null}
                >
                    <embed id="teste" src="https://drive.google.com/file/d/1Kf1LJO9wTqNaV9QQvRLvUBs9soDElzQ0/preview" width="100%" height="480" allow="autoplay"></embed>

                    <div className="__signup_button_finalizar">
                        <button
                            type="button"
                            onClick={handleTermsPolitic}
                        >Finalizar</button>
                    </div>
                </Modal>
            </Row>


        </div>

    )

}


export default FormTerms