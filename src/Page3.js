import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./NavBar";

export let clientChoice;
export let assentsChoice = [];
export let movieAndSession;

export default function Page3() {
  const [sits, setSits] = useState([]);
  let { idSessao } = useParams();
  let [clickedValue, setClickedValue] = useState([]);
  let [clickedSeatID, setClickedSeatID] = useState([]);
  let [nameValue, setNameValue] = useState("");
  let [cpfValue, setCpfValue] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
      )
      .then((e) => confirmFilm(e.data))
      .catch((e) => fail(e));
  }, []);

  function fail(e) {}

  function verify(newValue) {
    if (clickedValue.includes(newValue.name)) {
      return <IndividualSitSelected>{newValue.name}</IndividualSitSelected>;
    }
    if (newValue.isAvailable) {
      return <IndividualSitOk>{newValue.name}</IndividualSitOk>;
    }
    if (!newValue.isAvailable) {
      return <IndividualSitNotOk>{newValue.name} </IndividualSitNotOk>;
    }
  }

  function wrongClick() {
    alert("O assento já foi selecionado, por favor, escolha um disponível.");
  }

  function confirmFilm(value) {
    setSits([value]);
    console.log(value);
    movieAndSession = {
      day: value.day.date,
      filmName: value.movie.title,
      hour: value.name,
    };
    console.log(movieAndSession);
  }

  function post() {
    if (clickedSeatID.length === 0) {
      return alert("Por favor, selecione os assentos que deseja");
    }
    if (nameValue === "" || cpfValue === "") {
      return alert("Por favor, preencha os campos Nome e CPF");
    }
    clientChoice = {
      ids: clickedSeatID,
      name: nameValue,
      cpf: cpfValue,
    };

    console.log(clientChoice);
    axios
      .post(
        "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many",
        clientChoice
      )
      .then(() => <Link to="/sucesso"> </Link>)
      .catch(() => console.log("fail"));
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
              <div
                data-identifier="seat"
                key={newValue.id}
                onClick={() =>
                  newValue.isAvailable
                    ? setClickedValue(
                        [...clickedValue, newValue.name],
                        setClickedSeatID(() => [...clickedSeatID, newValue.id]),
                        (assentsChoice = [...assentsChoice, newValue.name])
                      )
                    : wrongClick()
                }
              >
                {verify(newValue)}{" "}
              </div>
            ))}
          </Chair>

          <Options>
            <Button data-identifier="seat-selected-subtitle">
              <p>SELECIONADO</p>
              <IndividualSitSelected></IndividualSitSelected>
            </Button>
            <Button data-identifier="seat-available-subtitle">
              <p>DISPONÍVEL</p>
              <IndividualSitOk></IndividualSitOk>
            </Button>

            <Button data-identifier="seat-unavailable-subtitle">
              <p>INDISPONÍVEL</p>
              <IndividualSitNotOk></IndividualSitNotOk>
            </Button>
          </Options>
          <Inputs>
            <div>
              <p>Nome do comprador:</p>
              <input
                data-identifier="buyer-name-input"
                onChange={(e) => setNameValue(e.target.value)}
                id="name"
                type="text"
                placeholder="Digite seu nome..."
                pattern="[0-9]{11}"
              ></input>
            </div>
            <div>
              <p>CPF do comprador:</p>
              <input
                data-identifier="buyer-cpf-input"
                onChange={(e) => setCpfValue(e.target.value)}
                id="cpf"
                type="text"
                placeholder="Digite seu CPF..."
                maxLength={11}
              ></input>
            </div>
          </Inputs>
          {clickedSeatID.length !== 0 && nameValue !== "" && cpfValue !== "" ? (
            <Link to="/sucesso">
              <Post onClick={() => post()} data-identifier="reservation-btn">
                <p>Reservar assento(s)</p>
              </Post>
            </Link>
          ) : (
            <Post
              onClick={() =>
                alert("Preencha os campos como nome, assentos e CPF")
              }
            >
              <p>Reservar assento(s)</p>
            </Post>
          )}

          <Footer data-identifier="movie-and-session-infos-preview">
            <div id="movieDiv" data-identifier="movie-img-preview">
              <img src={e.movie.posterURL} />
            </div>
            <FooterText>
              <p>{e.movie.title}</p>
              <p>
                {e.day.weekday} {e.name}
              </p>
            </FooterText>
          </Footer>
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
  * {
    box-sizing: border-box;
  }
`;

const Chair = styled.div`
  width: 96%;
  height: 230px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: auto auto;
  div {
    height: 25px;
  }
`;

const IndividualSitOk = styled.div`
  width: 26px;
  height: 26px;
  background-color: #c3cfd9;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  margin-left: 10px;
  font-size: 14px;
  cursor: pointer;
  p {
    color: #000000;
    font-family: "Roboto";
    font-weight: 400;
    size: 5px;
  }
`;

const IndividualSitNotOk = styled.div`
  width: 26px;
  height: 26px;
  background-color: #f7c52b;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  margin-left: 10px;
  font-size: 14px;
  cursor: pointer;
`;

const IndividualSitSelected = styled.div`
  width: 26px;
  height: 26px;
  background-color: #0e7d71;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  margin-left: 10px;
  font-size: 14px;
  cursor: pointer;
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

const Options = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  p {
    font-size: 13px;
    font-family: "Roboto";
    font-weight: 400;
    line-height: 16px;
    color: #4e5a65;
  }
`;

const Button = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 50px;
`;

const Inputs = styled.div`
  height: 180px;
  width: 80%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    font-family: "Roboto";
    line-height: 22px;
    color: #293845;
  }
  input {
    width: 100%;
    height: 51px;
    border-color: #0000002e;
    border-radius: 5px;
    ::placeholder {
      font-style: italic;
      padding-left: 30px;
      margin-left: 30px !important;
    }
  }
`;

const Post = styled.div`
  width: 225px;
  height: 42px;
  font-family: "Roboto";
  font-weight: 400;
  line-height: 22px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e8833a;
  border-radius: 5px;
  margin: auto auto;
  margin-top: 57px;
  color: #ffffff;
  text-decoration-line: none !important;
  p {
    text-decoration-line: none !important;
  }
`;

const Footer = styled.div`
  width: 375px;
  height: 117px;
  display: flex;
  align-items: center;
  border: 1px;
  border-width: 1px;
  border-color: #9eadba;
  background-color: #9eadba;
  position: fixed;
  bottom: 0px;

  img {
    width: 48px;
    height: 72px;
    border-radius: 3px;
  }

  p {
    font-size: 23px;
    font-weight: 400;
    font-family: "Roboto";
    color: #293845;
    line-height: 31px;
  }

  #movieDiv {
    width: 80px;
    height: 89px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    border-radius: 5px;
  }
`;

const FooterText = styled.div`
  width: 100%;
  height: 89px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  border-radius: 5px;
`;
