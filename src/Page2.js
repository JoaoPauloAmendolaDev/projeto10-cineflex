import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import styled from "styled-components";

export default function Page2() {
  let { idFilme } = useParams();
  const [session, setSession] = useState([]);
  const [day, setDay] = useState("");
  console.log(session);

  useEffect(() => {
    axios
      .get(
        `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`
      )
      .then((e) => setSession([e.data]))
      .catch((e) => e);
  }, []);
  return (
    <Body>
      <NavBar />
      <SubTitle>
        <p>Selecione o horário</p>
      </SubTitle>
      {console.log(session)}
      {session.map((e) => (
        <>
          {e.days.map((newElement) => (
            <>
              {console.log(e.title)}
              <Day key={newElement.id} data-identifier="session-date">
                {newElement.weekday} - {newElement.date}
              </Day>
              <HourContainer>
                {newElement.showtimes.map((e) => (
                  <Link to={`/assentos/${e.id}`}>
                    <Hour data-identifier="hour-minute-btn">{e.name} </Hour>
                  </Link>
                ))}
              </HourContainer>
            </>
          ))}
          <Footer  data-identifier="movie-and-session-infos-preview">
            <div data-identifier="movie-img-preview">
              <img src={e.posterURL} />{" "}
            </div>
            <p>{e.title}</p>
          </Footer>
        </>
      ))}
    </Body>
  );
}

const Body = styled.div`
  width: 375px;
  height: fit-content;
  margin: auto auto;
  margin-bottom: 170px;
  position: relative;
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
`;

const Selection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
  margin: auto 30px;
  p {
    font-family: "Roboto";
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    color: #293845;
  }
`;

const Day = styled.div`
  display: flex;
  width: fit-content;
  height: 35px;
  margin-left: 24px;
  font-family: "Roboto";
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #293845;
`;

const Hour = styled.div`
  width: 83px;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background-color: #e8833a;
  margin-right: 9px;
  border-radius: 5px;
`;

const HourContainer = styled.div`
  display: flex;
  margin-left: 24px;
  width: 300px;
  margin-top: 22px;
  margin-bottom: 23px;
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
    font-size: 26px;
    font-weight: 400;
    font-family: "Roboto";
    margin-left: 22px;
    color: #293845;
    line-height: 31px;
  }
  div {
    width: 64px;
    height: 89px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    border-radius: 5px;
  }
`;
