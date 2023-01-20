import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Comment from "./Commment";
import AddComent from "./AddComment";

const Comments = () => {
  const [isShow, setisShow] = useState(false);
  const [mycomment, setMycomment] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_CAT}/board/${id}`).then((res) => {
      console.log(mycomment);
      setMycomment(res.data);
    });
  }, []);

  return (
    <>
      <StContainer isShow={isShow}>
        <StCenter>
          <StToggleContainer
            onClick={() => {
              setisShow((pre) => !pre);
            }}
          >
            <StUpDown>
              {" "}
              {isShow ? "🐾  눌러서 댓글내리기 👇  🐾" : "🐾  눌러서 댓글보기 ☝🏻 🐾"}
            </StUpDown>
          </StToggleContainer>
          <AddComent />
          <StCommentList>
            {mycomment?.map((comment) => (
              <Comment key={comment.commentId} boardId={id} comment={comment} />
            ))}
          </StCommentList>
        </StCenter>
      </StContainer>
    </>
  );
};
export default Comments;

///댓글 기능
const StContainer = styled.div`
  height: ${({ isShow }) => (isShow ? "400px" : "40px")};
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background-color: #f8f8f8;
  transition: height 400ms ease-in-out;
  /* display: flex;
  justify-content: center;
  align-items: center; */
`;

const StToggleContainer = styled.div`
  height: 50px;
  padding: 0 12px;
  border-top: 1px solid #eee;
`;

const StCommentList = styled.div`
  /* height: 350px; */
  overflow: scroll;
`;
const StUpDown = styled.div`
  background-color: #dadada;
  width: 500px;
  height: 40px;
  border-radius: 30px;
  align-items: center;
  text-align: center;
  color: black;
  font-weight: bold;
  padding-top: 15px;
  margin-bottom: 30px;
  margin-left: 15px;
`;
const StCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
