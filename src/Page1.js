import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Page1() {
  const [getData, setGetData] = useState(false);
  const [filmList, setFilmList] = useState([]);
  useEffect(() => {
    axios
      .get("https://mock-api.driven.com.br/api/v5/cineflex/movies")
      .then((moviesList) => sucess(moviesList))
      .catch((error) => fail(error));
  }, []);

  function sucess(moviesList) {
    let valor = true;
    setGetData(valor);
    setFilmList(moviesList.data);
    console.log(moviesList.data);
    return <></>;
  }

  function fail(error) {
    return <>{console.log("deu erro", error)}</>;
  }

  return (
    <Body1>
      <Title>
        <p>CINEFLEX</p>
      </Title>
      <SubTitle>
        <p>Selecione o filme</p>
      </SubTitle>
      <Films>
        {filmList.map((e) => {
          return (
            <Film>
              <img src={e.posterURL} />
            </Film>
          );
        })}
      </Films>
    </Body1>
  );
}

const Body1 = styled.div`
  width: 375px;
  background-color: #e5e5e5;
  * {
    box-sizing: border-box;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c3cfd9;
  color: #e8833a;
  font-family: "ROBOTO";
  font-size: 35px;
  font-weight: 400;
  height: 67px;
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

const Films = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Film = styled.div`
  display: flex;
  width: 145px;
  height: 209px;
  margin: 10px auto;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 4px;

  img {
    width: 129px;
    heigth: 193px;
    box-shadow: 0px 2px 4px 2px #0000001a;
    border-radius: 4px;
  }

  p {
    position: absolute;
  }
`;
