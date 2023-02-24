import { useRef, useEffect } from "react";
import { Modal, Button } from "antd";
import { jsPDF } from "jspdf";
import { useReactToPrint } from "react-to-print";
import { globalImg } from "../../../../utils/globalImg";
import { useOutletContext } from "react-router";
import './Proof.css'
import { dateToFront } from '../../../../utils/removeMask'

export default function ProofModal({ showModal, onOk, contract, product, orderDetails }) {
  let logo = globalImg.logo_black
  const [accountType, people] = useOutletContext();

  const handleDownloadPdf = async () => {

    const input = document.getElementById("proof");
    const pdf = new jsPDF("p", "px", "a4");

    pdf
      .html(input, {
        html2canvas: { scale: 0.7 },
        margin: [10, 50, 0, 50],
      })
      .then(() => {
        pdf.save("Comprovante.pdf");
      });
  };

  const componentRef = useRef();

  useEffect(() => {
    console.log(people)
    console.log(orderDetails)
  }, [])

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  let dateWithdrawal = new Date().toISOString().substring(0, 10);

  return (
    <Modal
      open={showModal}
      wrapClassName="__proof_modal"
      closable={false}
      footer={[
        <Button type="primary" key="back" onClick={onOk}>
          Voltar
        </Button>,

        <Button type="primary" onClick={handlePrint}>
          Imprimir
        </Button>,
      ]}
    >
      <main id="proof" ref={componentRef}>
        <header className="__proof_table_header">
          <img src={logo} className="proof_modal_logo" />
          <span className="proof_modal_min">[CONTRATO DE COMPRA, VENDA E LOCAÇÃO DE ATIVOS DIGITAIS ] – V1.03/21012023</span>
          <div className="__proof_modal_title">
            CONTRATO DE COMPRA E VENDA PARA
            LOCAÇÃO DE ATIVO DIGITAL
          </div>
        </header>
        <section className="__proof_section">
          <b>LOCADOR:</b>
          <div className="__proof_table">
            <div className="__proof_table_flex">
              <span className="__proof_table_flex_name">NOME</span>
              <span className="__proof_table_flex_name">CPF</span>
              <span className="__proof_table_flex_name">ENDEREÇO</span>
              <span className="__proof_table_flex_name">CIDADE</span>
              <span className="__proof_table_flex_name">ESTADO</span>
              <span className="__proof_table_flex_name">PAÍS</span>
              <span className="__proof_table_flex_name">TELEFONE</span>
              <span className="__proof_table_flex_name">EMAIL</span>
            </div>
            <div className="__proof_table_flex">
              <span className="__proof_table_flex_value">{people.user.person.first_name} {people.user.person.last_name} </span>
              <span className="__proof_table_flex_value">{people.user.person.doc_fiscal}</span>
              <span className="__proof_table_flex_value">{people.user.person.neighborhood}</span>
              <span className="__proof_table_flex_value">{people.user.person.city}</span>
              <span className="__proof_table_flex_value">{people.user.person.state}</span>
              <span className="__proof_table_flex_value">BRASIL</span>
              <span className="__proof_table_flex_value">{people.user.person.celular1}</span>
              <span className="__proof_table_flex_value">{people.user.person.email}</span>
            </div>
          </div>
          <div className="__proof_table_body">
            <div className="__proof_table_body_content">
              <span className="__proof_table_title_span">LOCATÁRIO</span>
              <span className="__proof_table_content">HARTFORD CAPITAL S/A, pessoa jurídica de Direito Privado, inscrita
                no CNPJ 26.054.652/0001-00, com sede fiscal em Rua Gal. Osório,
                1031, Andar 20, Centro – Campinas – SP, CEP 13010908,</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content">Tendo em vista a Emissão de 122.000.000 Tokens Digitais por usina
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
                escolhidos,</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content">Sendo: PRODUTOR INTERVENIENTE-ANUENTE: POWER WATER DO BRASIL S/A,
                Pessoa Jurídica de Direito Privado inscrita sob o número de CNPJ
                11.854.914/0003-06, localizada Rua Nafta, 535, Polo Comercial de
                Camaçari BA, Bahia, CEP 42816-150, que também subscreve este.</span>
            </div>gg
            <div className="__proof_table_body_content">
              <span className="__proof_table_content">As partes acima qualificadas vêm através do presente CONTRATO DE
                COMPRA E VENDA PARA LOCAÇÃO DE ATIVOS DIGITAIS, acordar, dento
                dos princípios da boa fé e legalidade, com base na Lei 10.406/02,
                o que segue</span>
            </div>
            <div className="__proof_table_body_content">
              <div className="__proof_table_body_content_title">OBJETO</div>
              <span className="__proof_table_content"><b>CLÁUSULA 1</b> - É objeto do presente a COMPRA E VENDA PARA LOCAÇÃO
                TEMPORÁRIA de ATIVO DIGITAL de propriedade do LOCADOR à LOCATÁRIA
                por um prazo de 48 (quarenta e oito) meses conforme “Quadro de
                Discriminação” abaixo:</span>
            </div>
            <div className="__proof_table_body_content">
              <table className="__proof_table_">
                <thead>
                  <tr>
                    <td>ITEM</td>
                    <td>QUADRO DE DISCRIMINAÇÃO</td>
                    <td>VALOR</td>
                  </tr>
                </thead>
                <tbody>
                  <td>
                    <tr>1</tr>
                    <tr>2</tr>
                    <tr>3</tr>
                    <tr>4</tr>
                  </td>
                  <td>
                    <tr>
                      ATIVO ALOCADO
                    </tr>
                    <tr>
                      QUANTIDADE ALOCADA
                    </tr>
                    <tr>
                      VALOR DO CONTRATO EM BRL
                    </tr>
                    <tr>
                      DATA INICIAL
                    </tr>
                    <tr>
                      PERCENTUAL MÉDIO VARIÁVEL ANUAL
                    </tr>
                  </td>
                  <td>
                    <tr>
                      {product.name}
                    </tr>
                    <tr>
                      1
                    </tr>
                    <tr>
                      {product.price}
                    </tr>
                    <tr>
                      {dateToFront(dateWithdrawal)}
                    </tr>
                    <tr>
                      {(product.cdi * 100).toFixed(2) + ' %'}
                    </tr>
                  </td>
                </tbody>
              </table>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"><b>CLÁUSULA 2</b> – O LOCATÁRIO pagará ao LOCADOR a título de ALUGUEL o
                percentual médio variável mensal do item 8 do Quadro Discriminação
                aplicado sobre o valor do Contrato, no item 4 do mesmo quadro.
                PARÁGRAFO ÚNICO – O LOCADOR declara estar ciente dos riscos
                inerentes às operações do mercado de risco de ativos digitais e
                sua imprevisibilidade.</span>
            </div>
            <div className="__proof_table_body_content">
              <div className="__proof_table_body_content_title">OBRIGAÇÕES DAS PARTES</div>
              <span className="__proof_table_title_span">LOCADOR</span>
              <span className="__proof_table_content"><b>CLÁUSULA 3</b> – É Obrigação do LOCADOR manter seus dados atualizados
                em especial, mas não só: cadastro em Exchange Homologada, dados
                bancários, telefone e email.</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"><b>CLÁUSULA 4</b> - Prestar informações a Autoridade Fazendária do Brasil
                na forma prevista na IN 1888/19 bem como outras que surgirem, ou
                do Estado a que pertence, e realizar o pagamento de eventual
                imposto decorrente da presente locação, observando as instruções
                atualizadas da Autoridade Fazendária do Estado de seu domicílio
                fiscal.</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_title_span">LOCATÁRIA</span>
              <span className="__proof_table_content"><b>CLÁUSULA 5</b> – Remunerar o LOCADOR calculado com o percentual médio
                variável sobre o valor do contrato conforme “Quadro de
                Discriminação” da Cláusula 1.</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"><b>CLÁUSULA 6</b> – A remuneração será calculada, creditada e liquidada
                pelo LOCATÁRIO ao LOCADOR sendo feita em ativo digital, podendo
                ser liquidada para Reais para conta do LOCATÁRIO.
                PARÁGRAFO ÚNICO – A liquidação somente será feita ao LOCATÁRIO.</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"><b>CLÁUSULA 7</b> – O crédito da remuneração será feito o primeiro em 30
                (trinta) dias a contar da efetivação do Contrato, e as demais a
                cada 30 (trinta) dias a contar daí, obedecendo as 2 (duas) datas
                fixas de liquidação, que são dia 15 (quinze) e 30 (trinta) de cada
                mês.</span>
              <div className="__proof_table_body_content_clausule">PARÁGRAFO ÚNICO – Caso a data de liquidação do Aluguel seja em
                final de semana ou feriado, será realizada no primeiro dia útil
                subsequente.</div>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"><b>CLÁUSULA 8</b> – É dever do LOCATÁRIA suas obrigações fiscais
                derivadas do presente.</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"><b>CLÁUSULA 9</b> – É dever do LOCATÁRIO prestar todas informações e
                suporte cabíveis ao LOCADOR referente as operações, índice de
                remuneração, sempre que o LOCADOR solicitar.</span>
            </div>
            <div className="__proof_table_body_content">
              <div className="__proof_table_body_content_title">OBRIGAÇÕES GERAIS</div>
              <span className="__proof_table_content"><b>CLÁUSULA 10</b> – Na ocorrência de trespasse empresarial, fica o
                novo proprietário/administrador automaticamente obrigado
                pelas obrigações ora assumidas neste contrato, nos termos do
                artigo 1.146 do Código Civil.</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"><b>CLÁUSULA 11</b> – O presente instrumento está embasado em
                conformidade com as premissas dispostas na Lei Geral de
                Proteção de Dados Pessoais – Lei n. 13.709/2018 e as partes se
                obrigam expressamente a guardar sigilo absoluto de toda e
                qualquer informação que venha a ter acesso, nela compreendidas
                as suas mais variadas formas, por mais irrelevantes que
                possam vir a ser ou parecer, em decorrência do desempenho
                de suas funções, sejam elas atinentes às parceiras propriamente
                ditas e/ou a terceiros, clientes ou não desta.</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"><b>PARÁGRAFO PRIMEIRO </b> – As partes comprometem-se a não manipular as
                informações de uma e de outra, seus representantes e prepostos,
                sem que para isso tenha expressa autorização;</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"><b>PARÁGRAFO SEGUNDO </b> – Todas as informações decorrentes desta relação
                jurídica, incluindo, mas não limitando-se as: tratativas,
                negociações, contratos, know-how, manuais, notificações,
                treinamentos, certidões, documentos contábeis, documentos e
                informações pessoais das partes e seus respectivos procuradores
                e ou representantes, bem como quaisquer outras informações
                a respeito da atividade desenvolvida, são
                estritamente confidencias, não podendo ser divulgadas por
                qualquer meio, mídia ou sob qualquer justificativa, com exceção
                das previstas na lei, e/ou sob exigência judicial, sob pena de
                multa contratual.</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"><b>CLÁUSULA 12</b> – Este instrumento, bem como seus eventuais aditivos
                são confidenciais, portanto, sua existência não poderá ser
                revelada a terceiros, senão mediante autorização prévia e expressa
                das demais partes.</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"><b>PARÁGRAFO PRIMEIRO</b> –  Em caso de dúvida sobre a confidencialidade
                de determinada informação, a parte dúbia permanecerá em absoluto
                sigilo, até que a outra parte se manifeste expressamente a
                respeito.</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"><b>PARÁGRAFO SEGUNDO</b> –  Por fim, as partes declaram-se cientes de
                que a não observância do que acima consta, seja por culpa ou
                dolo, tornará passível a rescisão presente contrato, sem
                prejuízo da competente ação civil e/ou criminal que o caso vier
                a merecer.</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"><b>CLÁUSULA 13</b> –  As comunicações oficiais entre as partes serão
                através dos e-mails constantes nas qualificações de cada.</span>
            </div>
            <div className="__proof_table_body_content">
              <div className="__proof_table_body_content_title">PRAZO E VIGÊNCIA</div>
              <span className="__proof_table_content"><b>CLÁUSULA 14</b> – O Presente tem o prazo de duração de 48 (quarenta
                e oito) meses a contar da efetivação do mesmo que seja a
                assinatura e transferência do ativo digital.</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"><b>CLÁUSULA 15</b> – Ajustado que o presente foi lido previamente e
                enviado por email conforme Cláusula 13, e deverá ser devolvido em
                um prazo máximo de 72 (setenta e duas horas) com a devida
                assinatura eletrônica, ficando pendente a contagem de prazo, que
                se dará somente a partir daí, caso o ativo já tenha sido
                transferido.</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"><b>PARÁGRAFO ÚNICO</b> – Caso o presente seja assinado eletronicamente
                mas não efetivada a transferência do ativo dentro do mesmo prazo,
                fica pendente a contagem de prazo que se dará somente a partir de
                ambas situações – assinatura e transferência – realizados.</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"><b>CLÁUSULA 16</b> –  Ao final do período de 48 (quarenta e oito) meses o
                LOCADOR deverá comunicar o LOCATÁRIO o desejo de resgate do valor;
                o que será realizado imediatamente pelo mesmo; observando-se o
                valor efetivamente investido, bem como as demais disposições do
                presente instrumento</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"><b>PARÁGRAFO ÚNICO</b> –  O crédito de devolução tem como referência o
                item 4 do Quadro de Discriminação Cláusula 1, descrito no
                presente. Se o valor for restituído em Ativo Digital, esse
                obedecerá a cotação do dia da liquidação.</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"><b>CLÁUSULA 17</b> –  Caso o LOCADOR queira aumentar o valor de seu
                Contrato deverá ser feita a rescisão do presente, sem qualquer
                ônus para as partes, e feito novo Contrato com o novo valor,
                obedecendo nova contagem de prazo e as demais cláusulas.</span>
            </div>
            <div className="__proof_table_body_content">
              <div className="__proof_table_body_content_title">RESCISÃO E/OU SUSPENSÃO</div>
              <span className="__proof_table_content"><b>CLÁUSULA 18</b> – Poderá o presente Contrato ser rescindido por
                qualquer das partes, em qualquer momento, com aviso prévio,
                devendo o LOCADOR observar o percentual redutor da Cláusula 19.
                PARÁGRAFO ÚNICO – A outra parte deverá ser comunicada oficialmente
                e com prazo de 30 (trinta) dias através do email constante na
                qualificação da parte.</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"><b>CLÁUSULA 19</b> – Caso seja por iniciativa do LOCADOR será aplicado
                um percentual redutor de 40% (quarenta por cento) sobre o valor
                do contrato para fins de ressarcimento dos custos da empresa.</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"><b>CLÁUSULA 20</b> – Caso a LOCATÁRIA perceba qualquer inconsistência
                nas informações prestadas pelo LOCADOR assim como venha o mesmo a
                quebrar qualquer uma das regras deste contrato ou das cláusulas
                gerais que fazem parte do presente instrumento, o mesmo será
                rescindido imediatamente e o valor do Ativo Digital, objeto do
                contrato, será transferido no prazo de 30 (trinta) dias para a
                conta digital do LOCADOR, aplicando o percentual redutor de 40%
                (quarenta por cento) a título de multa para ressarcimento dos
                custos de operação da empresa.</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"><b>CLÁUSULA 21</b> – Em caso de falecimento do LOCADOR, os pagamentos de
                aluguéis serão automaticamente suspensos, até que se processe o inventário
                ou arrolamento, nos moldes da legislação civil.</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"><b>PARÁGRAFO PRIMEIRO</b> – A suspensão do prazo e dos pagamentos, que
                trata essa cláusula, se dará a partir da data do conhecimento pelo
                LOCATÁRIO, do falecimento do LOCADOR, não se responsabilizando o
                LOCATÁRIO por eventuais pagamentos realizados enquanto não
                comunicada, oficialmente, do falecimento do LOCADOR.</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"> <b>PARÁGRAFO SEGUNDO</b> – O LOCATÁRIO declara expressamente, dentro dos
                princípios da legalidade e legislação civil, acatará as ordens
                judiciais que acaso seja devidamente comunicado, tais como as de
                natureza alimentar, podendo direcionar os créditos de acordo a
                determinação judicial, quer seja de suspensão, beneficiário, entre
                outros, sem que para isso seja considerada quebra de contrato.</span>
            </div>
            <div className="__proof_table_body_content">
              <div className="__proof_table_body_content_title">FORMA</div>
              <span className="__proof_table_content"><b>CLÁUSULA 22</b> – As Partes e as testemunhas envolvidas neste
                instrumento afirmam e declaram que esse será assinado
                eletronicamente através de plataforma legalmente habilitada, com
                fundamento no Artigo 10, parágrafo 2º da MP 2200-2/2001, e do
                Artigo 6º do Decreto 10.278/2020 do Brasil, sendo as assinaturas
                consideradas válidas, vinculantes e executáveis, desde que
                firmadas pelos representantes legais das Partes. Consigna-se no
                presente instrumento que a assinatura com Certificado
                Digital/eletrônica tem a mesma validade jurídica de um registro e
                autenticação feita em cartório, seja mediante utilização de
                certificados e-CPF, e-CNPJ e/ou NF-e (Brasil). As Partes renunciam
                à possibilidade de exigir a troca, envio ou entrega das vias
                originais (não-eletrônicas) assinadas do instrumento, bem como
                renunciam ao direito de recusar ou contestar a validade das
                assinaturas eletrônicas, na medida máxima permitida pela
                legislação aplicável.</span>
            </div>
            <div className="__proof_table_body_content">
              <div className="__proof_table_body_content_title">FORO, MEDIAÇÃO E ARBITRAGEM</div>
              <span className="__proof_table_content"><b>CLÁUSULA 23</b> – O Presente é firmado com base na legislação do
                Brasil, independente do local de residência de seu signatário
                COMPRADOR, que em caso de estrangeiro, ou morador de fora no
                Território Nacional, deverá anexar cópia de seu passaporte
                comprovando sua capacidade civil.</span>
            </div>
            <div className="__proof_table_body_content">
              <b>CLÁUSULA 25</b> – Para qualquer ação ou questão de direito oriunda
              deste instrumento, fica desde já eleito o foro da Comarca de São
              Paulo/SP, Brasil, com exclusão de qualquer outro, por mais
              privilegiado que seja.
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"><b>CLÁUSULA 26</b> – Qualquer litígio originado do presente Contrato,
                inclusive no tocante à sua interpretação ou execução, não
                resolvido pela Mediação, será definitivamente resolvido por
                Arbitragem.</span>
            </div>
            <div className="__proof_table_body_content">
              <span className="__proof_table_content"> São Paulo, 21 de janeiro de 2023.</span>
            </div>
          </div>
        </section>
      </main>
    </Modal>
  )
}