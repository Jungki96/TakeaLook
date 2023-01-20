import React from "react";
import styled from "styled-components";
import axios from "axios";

const Authorizationtest =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLsoJXquLAiLCJhdXRoIjoiVVNFUiIsImV4cCI6MTY3NDI4Mjk5NywiaWF0IjoxNjc0MTk2NTk3fQ.W1BpuVS4OymRI2eRcTZZXiuq6M0hl8hmxxFm7qaxyQM";

const Love = ({ cat }) => {
  const onEditLove = async () => {
    await axios.post(`${process.env.REACT_APP_CAT}/board/love/${cat.boardId}`, cat.boardId, {
      headers: {
        Authorization: Authorizationtest,
      },
    });
  };

  return (
    <>
      {cat.islove ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onEditLove();
          }}
        >
          <StButton type="submit" onClick={() => {}}>
            💜 {cat.love}
          </StButton>
        </form>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onEditLove();
          }}
        >
          <StButton type="submit" onClick={() => {}}>
            🤍 {cat.love}
          </StButton>
        </form>
      )}
    </>
  );
};
export default Love;

const StButton = styled.button`
  margin: auto;
  background-color: black;
  margin-top: 10px;
  text-align: center;
  width: 70px;
  height: 30px;
  opacity: 0.9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 1px solid black;
  font-weight: bold;
  font-size: 10px;
  color: white;
  cursor: pointer;
  /* font-family: "Noto Sans KR", sans-serif; */
`;
