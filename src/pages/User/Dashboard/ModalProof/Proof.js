import { useRef, useEffect } from "react";
import { Modal, Button } from "antd";
import { jsPDF, html2canvas, onePageCanvas, quotes } from "jspdf";
import { useReactToPrint } from "react-to-print";
import { globalImg } from "../../../../utils/globalImg";
import './Proof.css'

export default function ProofModal({ showModal, onOk, orderDetails }) {
  let logo = globalImg.logo

  const handleDownloadPdf = async () => {
    const input = document.getElementById("proof");
    const pdf = new jsPDF({
      orientation: "p", 
      unit: "mm",
      format: "a4",
      precision: 5
    });

    html2canvas(input).then((canvas) => {

      for (var i = 0; i <= quotes.clientHeight / 980; i++) {
        //! This is all just html2canvas stuff
        var srcImg = canvas;
        var sX = 0;
        var sY = 980 * i; // start 980 pixels down for every new page
        var sWidth = 900;
        var sHeight = 980;
        var dX = 0;
        var dY = 0;
        var dWidth = 900;
        var dHeight = 980;

        window.onePageCanvas = document.createElement("canvas");
        onePageCanvas.setAttribute('width', 900);
        onePageCanvas.setAttribute('height', 980);
        var ctx = onePageCanvas.getContext('2d');
        // details on this usage of this function: 
        // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
        ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

        // document.body.appendChild(canvas);
        var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

        var width = onePageCanvas.width;
        var height = onePageCanvas.clientHeight;

        //! If we're on anything other than the first page,
        // add another page
        if (i > 0) {
          pdf.addPage(612, 791); //8.5" x 11" in pts (in*72)
        }
        //! now we declare that we're working on that page
        pdf.setPage(i + 1);
        //! now we add content to that page!
        pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width * .62), (height * .62));

      }
      //! after the for loop is finished running, we save the pdf.
      pdf.save('Test.pdf');
    });
  };

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    console.log(people)
  })

  return (
    <Modal
      open={showModal}
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
          <span className="proof_modal_min">[CONTRATO DE COMPRA, VENDA E LOCA????O DE ATIVOS DIGITAIS ] ??? V1.03/21012023</span>
          <div className="__proof_modal_title">
            CONTRATO DE COMPRA E VENDA PARA
            LOCA????O DE ATIVO DIGITAL
          </div>
        </header>
        <section>
          LOCADOR:
          <div className="__proof_table">
            <div className="__proof_table_flex">
              <span className="__proof_table_flex_name">NOME</span>
              <span className="__proof_table_flex_name">QUALIFICA????O</span>
              <span className="__proof_table_flex_name">CPF</span>
              <span className="__proof_table_flex_name">RG</span>
              <span className="__proof_table_flex_name">ENDERE??O</span>
              <span className="__proof_table_flex_name">CIDADE</span>
              <span className="__proof_table_flex_name">ESTADO</span>
              <span className="__proof_table_flex_name">PA??S</span>
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
              <span className="__proof_table_flex_value"></span>
            </div>
          </div>
          <div className="__proof_table_body">
            <div className="__proof_table_body_content">
              LOCAT??RIO:
              HARTFORD CAPITAL S/A, pessoa jur??dica de Direito Privado, inscrita
              no CNPJ 26.054.652/0001-00, com sede fiscal em Rua Gal. Os??rio,
              1031, Andar 20, Centro ??? Campinas ??? SP, CEP 13010908,
            </div>
            <div className="__proof_table_body_content">
              Tendo em vista a Emiss??o de 122.000.000 Tokens Digitais por usina
              em que o Locador declara expressamente ter conhecimento, emitidos
              com lastramento em Debentures e que embasam o Projeto de
              Desenvolvimento e Execu????o de Energia, firmam o presente,
              ratificando a ci??ncia de que o mesmo tomar?? 2 (duas) formas de
              c??lculo de loca????o sobre o ativo durante seu per??odo de vig??ncia:
              - Fase I ??? At?? 12?? m??s ser?? calculado o valor do cr??dito da
              loca????o em cima de at?? 240% do CDI oficial anual, valor vari??vel
              de acordo com o plano e valores escolhidos, creditado mensalmente
              conforme datas espec??ficas abaixo, condicionada a finaliza????o da
              obra da Planta de Energia, conforme Whitepaper.
              - Fase II ??? Do 13?? ao 24?? ser?? calculado conforme retorno da
              produ????o da Planta da Usina, tendo como valor m??nimo o percentual
              de at?? 240% do CDI, valor vari??vel de acordo com o plano e valores
              escolhidos,
            </div>
            <div className="__proof_table_body_content">
              Sendo: PRODUTOR INTERVENIENTE-ANUENTE: POWER WATER DO BRASIL S/A,
              Pessoa Jur??dica de Direito Privado inscrita sob o n??mero de CNPJ
              11.854.914/0003-06, localizada Rua Nafta, 535, Polo ComerciaL de
              Cama??ari BA, Bahia, CEP 42816-150, que tamb??m subscreve este.
            </div>
            <div className="__proof_table_body_content">
              As partes acima qualificadas v??m atrav??s do presente CONTRATO DE
              COMPRA E VENDA PARA LOCA????O DE ATIVOS DIGITAIS, acordar, dento
              dos princ??pios da boa f?? e legalidade, com base na Lei 10.406/02,
              o que segue
            </div>
            <div className="__proof_table_body_content">
              <div className="__proof_table_body_content_title">OBJETO</div>
              CL??USULA 1 - ?? objeto do presente a COMPRA E VENDA PARA LOCA????O
              TEMPOR??RIA de ATIVO DIGITAL de propriedade do LOCADOR ?? LOCAT??RIA
              por um prazo de 48 (quarenta e oito) meses conforme ???Quadro de
              Discrimina????o??? abaixo:
            </div>
          </div>
        </section>
      </main>
    </Modal>
  )
}