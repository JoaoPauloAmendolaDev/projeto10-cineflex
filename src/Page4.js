import styled from "styled-components";
import { clientChoice } from "./Page3";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import { assentsChoice } from "./Page3";
import { movieAndSession } from "./Page3";

export default function Page4() {
  console.log(clientChoice, assentsChoice);

  return (
    <Body>
      <NavBar />
      <SubTitle>
        <p>Pedido feito com sucesso!</p>
      </SubTitle>
      <Content>
        <ContentTitle>
          <p>Filme e Sessão</p>
          <div>{movieAndSession.filmName} </div>{" "}
          <div>
            {" "}
            {movieAndSession.day} {movieAndSession.hour}{" "}
          </div>
        </ContentTitle>
        <ContentTitle>
          <p>Ingressos</p>
          <div>
            {clientChoice === undefined
              ? "carregando"
              : assentsChoice.map((e) => (
                  <TicketList>
                    <p>Assento {e}</p> 
                  </TicketList>
                ))}
          </div>
          <div></div>
        </ContentTitle>
        <ContentTitle>
          <p>Comprador</p>
          <div>
            <Text>
              Nome:{" "}
              {clientChoice === undefined ? "carregando" : clientChoice.name}
            </Text>
            CPF: {clientChoice === undefined ? "carregando" : clientChoice.cpf}
          </div>
        </ContentTitle>
      </Content>
    </Body>
  );
}

const Body = styled.div`
  width: 375px;
  height: fit-content;
  margin-bottom: 170px;
  * {
    box-sizing: border-box;
  }
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 110px;
  color: #293845;
  font-family: "Roboto";
  font-size: 24px;
  font-weight: 400;
  p{
    color: #247A6B;
  }
`;

const ContentTitle = styled.div`
  width: 100%;
  height: fit-content;
  margin-left: 29px;
  display: flex;
  flex-direction: column;
  > p {
    width: 40%;
    color: #247a6b;
    font-weight: 700;
    font-family: "Roboto";
    font-size: 24px;
    line-height: 29px;
  }

  div {
    display: flex;
    flex-direction: column;
    font-size: 22px;
    font-weight: 400;
    line-height: 24px;
    color: #293845;
  }
`;
const Content = styled.div`
  width: 100%;
  p {
    font-size: 24px;
    line-height: 30px;
    font-family: "Roboto";
    font-weight: 700;
    color: #293845;
    padding-bottom: 10px;
    padding-top: 15px;
  }
`;

const TicketList = styled.div`
  display: flex;
  font-family: "Roboto";
  font-weight: 400;
  line-height: 20px;
  color: #293845;
  p{
    font-family: 'Roboto';
    font-weight: 400;
  }
`;

const Text = styled.div``;
