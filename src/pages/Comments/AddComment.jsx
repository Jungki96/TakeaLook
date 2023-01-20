import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";

const AddCommentForm = () => {
  // const [cookies, setCookie] = useCookies(["쿠키 이름"]);
  const { id } = useParams();
  const [comment, setComment] = useState({
    comment: "",
  });

  const Authorizationtest =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLsoJXquLAiLCJhdXRoIjoiVVNFUiIsImV4cCI6MTY3NDI4Mjk5NywiaWF0IjoxNjc0MTk2NTk3fQ.W1BpuVS4OymRI2eRcTZZXiuq6M0hl8hmxxFm7qaxyQM";

  // const submitCommentHandler = (comment) => {
  //   fetch(`${process.env.REACT_APP_CAT}/board/${id}`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json", Authorization: Authorizationtest },
  //     body: JSON.stringify(comment),
  //   }).then((response) => response.json());
  // };

  const submitCommentHandler = (comment) => {
    axios.post(`${process.env.REACT_APP_CAT}/board/${id}`, comment, {
      headers: {
        Authorization: Authorizationtest,
      },
    });
  };

  return (
    <StForm
      onSubmit={(e) => {
        e.preventDefault();
        submitCommentHandler(comment);
      }}
    >
      <StIncludeBtnandInput>
        <StInput
          placeholder="댓글을 추가하세요. (100자 이내)"
          name="content"
          type="text"
          onChange={(ev) => {
            setComment({
              ...comment,
              comment: ev.target.value,
            });
          }}
          maxLength={100}
        />
        <StButton type="submit">추가하기</StButton>
      </StIncludeBtnandInput>
    </StForm>
  );
};

export default AddCommentForm;

const StForm = styled.form`
  gap: 12px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StInput = styled.input`
  width: 350px;
  height: 40px;
  border-radius: 20px;
  border: solid white 1px;
  background-color: #f1f1f1;
  padding-left: 10px;
`;
const StButton = styled.button`
  /* margin: -40px auto auto 420px; */
  background-color: black;
  text-align: center;
  width: 70px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 1px solid black;
  font-weight: bold;
  font-size: 13px;
  color: white;
  cursor: pointer;
  /* justify-content: center; */
  align-items: center;
  text-align: center;
  /* font-family: "Noto Sans KR", sans-serif; */
`;
const StIncludeBtnandInput = styled.div`
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 50px auto auto auto;
`;
