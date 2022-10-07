import styled from "styled-components";

export default function NavBar() {
  return (
    <Title>
      <p>CINEFLEX</p>
    </Title>
  );
}

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
