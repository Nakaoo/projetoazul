import React, { useState, useEffect } from "react";
import { message } from "antd"
import { FormUpdate } from "./Pages/FormUpdate";
import { SendDocs } from "./Pages/SendDocs";
import { BsFillPersonFill } from 'react-icons/bs'
import { ChangePassword } from "./Pages/ChangePassword";
import './index.css'

export const Account = () => {
    const [selectedType, setSelectedType] = useState(1)

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const [isModalVisible, setIsModalVisible] = useState();

    return (
        <main className="__account_container">
            <section className="__account_section">
                <header className="__account_header">
                    <div className="__account-type-radio">
                        <input type="radio" className="__account__radio" id="fechadas" name="tipoMes" />
                        <div className={selectedType === 1 ? '__account__divisaoOpcaoAtivo' : '__account__divisaoOpcao'}
                            value={1}
                            onClick={() => {
                                setSelectedType(1)
                            }}
                            checked={selectedType === 1}>
                            <div className={selectedType === 1 ? '__account__divisaoIconeOpcoesAtivo' : '__account__divisaoIconeOpcoes'}>
                                <div className={selectedType === 1 ? '__account_IconAtivo' : '__account_Icon'}><BsFillPersonFill /></div>
                            </div>
                            <p className="__account__opcao">Pessoal</p>
                        </div>
                        <div className={selectedType === 2 ? '__account__divisaoOpcaoAtivo' : '__account__divisaoOpcao'}
                            value={1}
                            onClick={() => {
                                message.error('Funcionalidade não implementada')
                                // setSelectedType(2)
                            }}
                            checked={selectedType === 2}>
                            <div className={selectedType === 2 ? '__account__divisaoIconeOpcoesAtivo' : '__account__divisaoIconeOpcoes'}>
                                <div className={selectedType === 2 ? '__account_IconAtivo' : '__account_Icon'}><BsFillPersonFill /></div>
                            </div>
                            <p className="__account__opcao">Endereço</p>
                        </div>
                        <div className={selectedType === 2 ? '__account__divisaoOpcaoAtivo' : '__account__divisaoOpcao'}
                            value={1}
                            onClick={() => {
                                message.error('Funcionalidade não implementada')
                                // setSelectedType(2)
                            }}
                            checked={selectedType === 3}>
                            <div className={selectedType === 3 ? '__account__divisaoIconeOpcoesAtivo' : '__account__divisaoIconeOpcoes'}>
                                <div className={selectedType === 3 ? '__account_IconAtivo' : '__account_Icon'}><BsFillPersonFill /></div>
                            </div>
                            <p className="__account__opcao">Dados bancarios</p>
                        </div>
                    </div>
                </header>
                <article className="__account_article">
                    <div className="__account-title">
                        <h4 className="__account-h4">Meu perfil</h4>
                        <button className="__account-btn" onClick={showModal}>
                            Alterar senha
                        </button>
                    </div>
                    {selectedType === 1 && (
                        <FormUpdate />
                    )}

                    {selectedType === 2 && (
                        <SendDocs />
                    )}

                    <ChangePassword handleCancel={handleCancel} isModalVisible={isModalVisible} />
                </article>
            </section>
        </main>
    )
}