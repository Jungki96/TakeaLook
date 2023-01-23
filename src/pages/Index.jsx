import React, { useEffect, useState } from "react";
import "./../App.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../shared/Layout";
import Love from "./Love/Love";
import Rank from "./Rank/Rank";

const Authorizationtest =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLthYzsiqTtirgiLCJhdXRoIjoiVVNFUiIsImV4cCI6MTY3NDI5NDgwMiwiaWF0IjoxNjc0MjA4NDAyfQ.pUZUgtKQisgIvH8YnkDnXqxU0C_oImZpb6f0qwXBxGA";

const Index = () => {
  const navigate = useNavigate();
  const [cats, setCats] = useState([]);
  const [rankcats, setRankcats] = useState([]);

  function moveToChatroomHandler() {
    window.location.href = "http://43.200.163.145/chatroom";
  }

  const fetchCat = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_CAT}/index/boardList`, {
      headers: {
        Authorization: Authorizationtest,
      },
    });
    setCats(data);
    const { datas } = await axios.get(`${process.env.REACT_APP_CAT}/index/rankBoard`, {
      headers: {
        Authorization: Authorizationtest,
      },
    });
    setRankcats(datas);
  };

  const onClickDeleteCats = async (id) => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      await axios.delete(`${process.env.REACT_APP_CAT}/index/detail/${id}`, {
        headers: {
          Authorization: Authorizationtest,
        },
      });
      return window.location.reload();
    } else {
      return;
    }
  };

  useEffect(() => {
    fetchCat();
  }, []);

  return (
    <div>
      <Layout>
        <StFirstLine>
          <div className="one">
            <StCrown src="img/1등.png" alt="crown 1" />
            <StOneCatBox>
              <div>
                <StImage src="img/main2.png" />
                <div>
                  <StOneCat>
                    <br />
                    <div>
                      <span>
                        <Unit> 채(정)고(양이){/* <img src={rankcats[0].imageUrl} /> */}</Unit>
                      </span>
                    </div>
                    <br />
                  </StOneCat>
                </div>
              </div>
            </StOneCatBox>
          </div>
        </StFirstLine>
        <br />
        <StSecondLine>
          <div className="two">
            <StSecondThird src="img/crown.png" alt="crown 2" />
            <StOneCatBox>
              <div>
                <StImage src="img/타뮤.png" />
              </div>
              <div>
                <StOneCat>
                  <br />
                  <div>
                    <span>
                      <Unit>타뮤</Unit>
                    </span>
                  </div>
                  <br />
                </StOneCat>
              </div>
            </StOneCatBox>
          </div>
          <div className="three">
            {" "}
            <StSecondThird src="img/crown.png" alt="crown 3" />
            <StOneCatBox>
              <div>
                <StImage src="img/아문.png" />
              </div>
              <div>
                <StOneCat>
                  <br />
                  <div>
                    <span>
                      <Unit>아문</Unit>
                    </span>
                  </div>
                  <br />
                </StOneCat>
              </div>
            </StOneCatBox>
          </div>
        </StSecondLine>
        <div>
          <Header>
            <Btn
              onClick={() => {
                window.localStorage.clear();
                navigate("/");
              }}
            >
              로그아웃
            </Btn>
            <Btn
              onClick={() => {
                navigate("/Add");
              }}
            >
              고양이 소개 추가하기
            </Btn>
            <Btn type="button" value="버튼" onClick={moveToChatroomHandler}>
              다른 집사와 대화하기
            </Btn>
          </Header>
        </div>
        <Listt>
          {cats?.map((cat) => {
            return (
              <StOneCatBox key={cat.boardId}>
                <div
                  key={cat.boardId}
                  onClick={() => {
                    navigate(`/Detail/${cat.boardId}`);
                  }}
                >
                  <StImage src={cat.imageUrl} />
                </div>
                <div>
                  <StOneCat>
                    <br />
                    <div>
                      <span>
                        <Unit>{cat.catName}</Unit>
                      </span>
                    </div>

                    <br />
                    <div>
                      <StButton
                        type="button"
                        onClick={() => {
                          onClickDeleteCats(cat.boardId);
                        }}
                      >
                        삭제하기
                      </StButton>
                    </div>
                    <Love key={cat.boardId} cat={cat} />
                  </StOneCat>
                </div>
              </StOneCatBox>
            );
          })}
        </Listt>
      </Layout>
    </div>
  );
};

export default Index;

const StOneCatBox = styled.div`
  margin-left: 20px;
  background-color: #dadada;
  /* border: 1px solid gray; */
  padding: 15px;
  border-radius: 20px;
  width: 300px;
  height: fit-content;
`;

const StOneCat = styled.div``;

const Header = styled.div`
  margin-top: 80px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 24px;
`;

const Btn = styled.button`
  width: 170px;
  background-color: #343434;
  border: none;
  color: white;
  align-items: center;
  min-height: 10px;
  border-radius: 25px;
  padding: 15px;
  margin: auto;
  font-weight: bold;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
`;

const Listt = styled.div`
  height: fit-content;
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  gap: 70px 0px;
  margin-top: 35px;
`;

const Unit = styled.div`
  text-align: center;
  font-size: 30px;
  line-height: 20px;
  color: #000000;
`;
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
const StImage = styled.img`
  width: 240px;
  height: 240px;
  justify-content: center;
  margin: auto;
  display: flex;
  align-items: center;
`;

const StFirstLine = styled.div`
  margin-top: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StSecondLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StCrown = styled.img`
  width: 220px;
  height: 140px;
  justify-content: center;
  margin: auto;
  display: flex;
  align-items: center;
`;
const StSecondThird = styled.img`
  width: 110px;
  height: 70px;
  justify-content: center;
  margin: auto;
  display: flex;
  align-items: center;
`;

//
