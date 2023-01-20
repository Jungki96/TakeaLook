import Router from "../shared/Router";
import React, { useCallback, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // axios import 합니다
import styled from "styled-components";
import { TextField } from "@mui/material";

// axios.defaults.baseURL = "http://localhost:3001/";
// axios.defaults.withCredentials = true;
//hi
function Join() {
  const [confirmpassword, setConfirmpassword] = useState("");
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate;

  const onChange = useCallback((e) => {
    setConfirmpassword(e.target.value);
  }, []);
  const register = () => {
    if (password.length < 5) {
      alert("비밀번호는 5자리 이상이어야합니다.");
    } else if (username.length < 1) {
      alert("이름을 작성해주세요!");
    } else if (email.length < 1) {
      alert("아이디를 작성해주세요! ");
    } else if (confirmpassword !== password) {
      console.log("confirmpassword 틀림");
      alert("비밀번호를 다시 확인해주세요!");
    } else if (!email.includes("@")) {
      alert("이메일형식으로 작성해주세요!");
    } else {
      axios({
        method: "post",
        url: "http://43.200.163.145/user/signup",
        // url: `${process.env.REACT_APP_CAT}/user/signup`,
        data: { username: username, email: email, password: password },
      })
        .then((response) => {
          console.log("Well done!");
          console.log("User profile", response.data.username, response.data.email);
          //이게 마중나오는 개념인지?????????
          // localStorage.setItem("token", response.data.jwt); //있어도 되고 없어도 되는데 리덕스를 사용하지 않으면 필수 // context.api 공부하세요
          console.log(response);
          alert("회원가입 성공! 로그인으로 이동합니다");
          navigate(`/Login`);
        })
        .catch((ex) => {
          if (ex.response && ex.response.status === 404) {
            // 404 에러가 발생한 경우

            console.log("또 404에러지롱.", ex);
          } else {
            console.log("Oops......another error occurred:", ex);
          }
        });

      // .catch((error) => {
      //   console.log(
      //     "OMG.....OTL.....OTZ.....sorry ..........An error occurred:",
      //     error
      //   );
      // });
    }
  };

  return (
    <>
      <Stimage src="img/main.png" alt="logo" />
      <Stloginbox>
        <StSignup> Sign up🐾(ฅ•.•ฅ)</StSignup>
        <StDiv>
          Name:
          <TextField
            autoFocus
            required
            onChange={(event) => {
              setName(event.target.value);
            }}
            value={username}
            placeholder="이름을 입력하세요."
          />
          <hr></hr>
          Email:
          <TextField
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
            placeholder="이메일을 입력하세요."
          />
          <hr></hr>
          Password:
          <TextField
            type="password"
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
            placeholder="이용하실 패스워드를 입력하세요."
          />
          <hr></hr>Confirm your Password:
          <TextField
            type="password"
            value={confirmpassword}
            onChange={onChange}
            placeholder="패스워드를 다시 한번 입력해주세요."
          />
        </StDiv>
        <Stdiv2>
          <StButton
            type="submit"
            onClick={() => {
              register();
            }}
          >
            register
          </StButton>

          <StButton
            onClick={() => {
              window.location.replace("/");
            }}
          >
            cancel
          </StButton>
        </Stdiv2>
      </Stloginbox>
    </>
  );
}

export default Join;

const Stloginbox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  margin: 50px auto 0 auto;
  height: 70%;
  width: 300px;
  background-color: #dadada;
  border-radius: 15px;
  border: none;
`;
const StButton = styled.button`
  margin: auto;
  background-color: black;
  margin-top: 10px;
  padding: 20px 20px;
  text-align: center;
  width: 60px;
  height: 30px;
  opacity: 0.9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 1px solid black;
  font-weight: bold;
  font-size: 13px;
  color: white;
  cursor: pointer;
`;
const StDiv = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
`;
const Stdiv2 = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;
const StSignup = styled.div`
  font-size: 19px;
  font-weight: bold;
`;
const Stimage = styled.img`
  width: 250px;
  height: 100px;
`;
