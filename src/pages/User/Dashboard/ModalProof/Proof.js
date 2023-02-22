import { useRef } from "react";
import { Modal, Button } from "antd";
import { jsPDF } from "jspdf";
import { useReactToPrint } from "react-to-print";
import { globalImg } from "../../../../utils/globalImg";
import './Proof.css'

export default function ProofModal({ showModal, onOk }) {
  let logo = globalImg.logo

  const handleDownloadPdf = async () => {
    const input = document.getElementById("proof");
    const pdf = new jsPDF("p", "px", "a4");

    pdf
      .html(input, {
        html2canvas: { scale: 0.7 },
        margin: [10, 50, 0, 50],
      })
      .then(() => {
        pdf.save("comprovante_esgtech.pdf");
      });
  };

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Modal
      open="true"
      wrapClassName="__proof_modal"
      closable={false}
      footer={[
        <Button type="primary" key="back" onClick={onOk}>
          Voltar
        </Button>,

        <Button type="primary" onClick={handleDownloadPdf}>
          Salvar como PDF
        </Button>,
      ]}
    >
      <main id="proof">
        <header>
          <img src={logo} className="proof_modal_logo" />
          <span className="proof_modal_min">[CONTRATO DE COMPRA, VENDA E LOCAÇÃO DE ATIVOS DIGITAIS ] – V1.03/21012023</span>
          <div className="__proof_modal_title">
            CONTRATO DE COMPRA E VENDA PARA
            LOCAÇÃO DE ATIVO DIGITAL
          </div>
        </header>
        <section>
          LOCADOR:
          <div className="__proof_table">
            <div className="__proof_table_flex">
              <span className="__proof_table_flex_name">NOME</span>
              <span className="__proof_table_flex_name">QUALIFICAÇÃO</span>
              <span className="__proof_table_flex_name">CPF</span>
              <span className="__proof_table_flex_name">RG</span>
              <span className="__proof_table_flex_name">ENDEREÇO</span>
              <span className="__proof_table_flex_name">CIDADE</span>
              <span className="__proof_table_flex_name">ESTADO</span>
              <span className="__proof_table_flex_name">PAÍS</span>
              <span className="__proof_table_flex_name">TELEFONE</span>
              <span className="__proof_table_flex_name">EMAIL</span>
            </div>
            <div className="__proof_table_flex">
              <span className="__proof_table_flex_value"></span>
              <span className="__proof_table_flex_value"></span>
              <span className="__proof_table_flex_value"></span>
              <span className="__proof_table_flex_value"></span>
              <span className="__proof_table_flex_value"></span>
              <span className="__proof_table_flex_value"></span>
              <span className="__proof_table_flex_value"></span>
              <span className="__proof_table_flex_value"></span>
              <span className="__proof_table_flex_value"></span>
              <span className="__proof_table_flex_valued"></span>
            </div>
          </div>
          <div className="__proof_table_body">
            <div className="__proof_table_body_content">
              LOCATÁRIO:
              HARTFORD CAPITAL S/A, pessoa jurídica de Direito Privado, inscrita
              no CNPJ 26.054.652/0001-00, com sede fiscal em Rua Gal. Osório,
              1031, Andar 20, Centro – Campinas – SP, CEP 13010908,
            </div>
            <div className="__proof_table_body_content">
              Tendo em vista a Emissão de 122.000.000 Tokens Digitais por usina
              em que o Locador declara expressamente ter conhecimento, emitidos
              com lastramento em Debentures e que embasam o Projeto de
              Desenvolvimento e Execução de Energia, firmam o presente,
              ratificando a ciência de que o mesmo tomará 2 (duas) formas de
              cálculo de locação sobre o ativo durante seu período de vigência:
              - Fase I – Até 12º mês será calculado o valor do crédito da
              locação em cima de até 240% do CDI oficial anual, valor variável
              de acordo com o plano e valores escolhidos, creditado mensalmente
              conforme datas específicas abaixo, condicionada a finalização da
              obra da Planta de Energia, conforme Whitepaper.
              - Fase II – Do 13º ao 24º será calculado conforme retorno da
              produção da Planta da Usina, tendo como valor mínimo o percentual
              de até 240% do CDI, valor variável de acordo com o plano e valores
              escolhidos,
            </div>
            <div className="__proof_table_body_content">
              Sendo: PRODUTOR INTERVENIENTE-ANUENTE: POWER WATER DO BRASIL S/A,
              Pessoa Jurídica de Direito Privado inscrita sob o número de CNPJ
              11.854.914/0003-06, localizada Rua Nafta, 535, Polo ComerciaL de
              Camaçari BA, Bahia, CEP 42816-150, que também subscreve este.
            </div>
            <div className="__proof_table_body_content">
              As partes acima qualificadas vêm através do presente CONTRATO DE
              COMPRA E VENDA PARA LOCAÇÃO DE ATIVOS DIGITAIS, acordar, dento
              dos princípios da boa fé e legalidade, com base na Lei 10.406/02,
              o que segue
            </div>
            <div className="__proof_table_body_content">
              <div className="__proof_table_body_content_title">OBJETO</div>
              CLÁUSULA 1 - É objeto do presente a COMPRA E VENDA PARA LOCAÇÃO
              TEMPORÁRIA de ATIVO DIGITAL de propriedade do LOCADOR à LOCATÁRIA
              por um prazo de 48 (quarenta e oito) meses conforme “Quadro de
              Discriminação” abaixo:
            </div>
          </div>
        </section>
      </main>
    </Modal>
  )
}