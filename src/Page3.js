import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./NavBar";

export default function Page3() {
  const [sits, setSits] = useState([]);
  let { idSessao } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
      )
      .then((e) => setSits([e.data]))
      .catch((e) => fail(e));
  }, []);

  function fail(e) {
    console.log(e);
  }

  function verify(newValue){
    console.log(newValue)
    if (newValue.isAvailable){
        return '123'
    }else{
        return 'não tem lugar'
    }
  }

  console.log(sits);
  return (
    <Body>
      <NavBar />
      <SubTitle>
        <p>Selecione o assento</p>
      </SubTitle>

      {sits.map((e) => (
        <>
          <Chair>
            {e.seats.map((newValue) => (
              <IndividualSit>
               {verify(newValue)}
              </IndividualSit>
            ))}
          </Chair>
          ;
        </>
      ))}
    </Body>
  );
}

const Body = styled.div`
  width: 375px;
  height: fit-content;
  margin-bottom: 170px;
  position: relative;
`;

const Chair = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
`;

const IndividualSit = styled.div`
  width: 26px;
  height: 26px;
  background-color: #c3cfd9;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  margin-left: 10px;
  font-size: 14px;
  p {
    color: #000000;
    font-family: "Roboto";
    font-weight: 400;
    size: 5px;
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
`;
