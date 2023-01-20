import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments/Comments";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mycat, setMycat] = useState([]);
  //수정 모드 설정
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedCat, setUpdatedCat] = useState({
    catName: "",
    age: "",
    gender: "",
    text: "",
  });

  const Authorizationtest =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLsoJXquLAiLCJhdXRoIjoiVVNFUiIsImV4cCI6MTY3NDI4Mjk5NywiaWF0IjoxNjc0MTk2NTk3fQ.W1BpuVS4OymRI2eRcTZZXiuq6M0hl8hmxxFm7qaxyQM";

  // 게시물 CRUD
  const onEditThisCat = (e) => {
    axios.patch(`${process.env.REACT_APP_CAT}/index/detail/${id}`, e, {
      headers: {
        Authorization: Authorizationtest,
      },
    });
  };

  const onDeletThisCat = () => {
    const result = window.confirm("주인님을 지울까요?");
    if (result) {
      axios.delete(`${process.env.REACT_APP_CAT}/index/detail/${id}`, {
        headers: {
          Authorization: Authorizationtest,
        },
      });
      return navigate("/Index");
    } else {
      return;
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_CAT}/index/detail/${id}`, {
        headers: {
          Authorization: Authorizationtest,
        },
      })
      .then((appData) => {
        setMycat(appData.data);
      }, []);
  }, [id]);

  return (
    <>
      <img src={process.env.PUBLIC_URL + "/img/main1.png"} alt="logo" />

      <StDetailALl>
        {!isEditMode && (
          <StDetailBox>
            <StPicwithDesc>
              <StCatPic>그림</StCatPic>
              <StDecsBox>
                <StDescDIv>
                  <h3>{mycat.catName}</h3>
                  <br />

                  <StDesc>주인님 나이: </StDesc>
                  {mycat.age}
                  <hr />

                  <StDesc>주인님 성별: </StDesc>
                  {mycat.gender}
                  <hr />
                  {mycat.text}
                </StDescDIv>
              </StDecsBox>
            </StPicwithDesc>
            <StButtonDiv>
              <StButton
                size="large"
                onClick={() => {
                  setIsEditMode(true);
                }}
              >
                글 수정
              </StButton>
              <StButton
                size="large"
                onClick={() => {
                  onDeletThisCat();
                }}
              >
                글 삭제
              </StButton>
            </StButtonDiv>
            <StLoveVIew>
              <StLove>💜 {mycat.love}</StLove>
              <StView>{mycat.visit}</StView>
            </StLoveVIew>
          </StDetailBox>
        )}
        {isEditMode && (
          <StDetailBox>
            <StDecs2Box>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onEditThisCat(updatedCat);
                  setIsEditMode(false);
                }}
              >
                <h3>🐾 게시글 수정하기 🐾</h3>
                이름 :
                <StInput
                  required
                  type="text"
                  placeholder={mycat.catName}
                  onChange={(ev) => {
                    setUpdatedCat({
                      ...updatedCat,
                      catName: ev.target.value,
                    });
                  }}
                />
                <br />
                나이 :{" "}
                <StInput
                  required
                  type="number"
                  min="1"
                  placeholder={mycat.age}
                  onChange={(ev) => {
                    setUpdatedCat({
                      ...updatedCat,
                      age: ev.target.value,
                    });
                  }}
                />
                <br />
                성별 :{" "}
                <StInput
                  required
                  type="text"
                  placeholder={mycat.gender}
                  onChange={(ev) => {
                    setUpdatedCat({
                      ...updatedCat,
                      gender: ev.target.value,
                    });
                  }}
                />
                <input type="file" />
                <br />
                설명 :{" "}
                <StDescInput
                  required
                  type="text"
                  placeholder={mycat.text}
                  onChange={(ev) => {
                    setUpdatedCat({
                      ...updatedCat,
                      text: ev.target.value,
                    });
                  }}
                />
                <br />{" "}
                <StButtonDiv1>
                  <StButton type="submit " size="large">
                    저장
                  </StButton>
                  <StButton
                    size="large"
                    onClick={() => {
                      setIsEditMode(false);
                    }}
                  >
                    뒤로
                  </StButton>
                </StButtonDiv1>
              </form>
            </StDecs2Box>
          </StDetailBox>
        )}
      </StDetailALl>
      {!isEditMode && <Comments />}
    </>
  );
};

export default Detail;
const StDetailALl = styled.div`
  margin-top: 20px;
  text-align: center;
  display: flex;
  //아래로 정열
  flex-direction: column;
  //가운데 배열
  align-items: center;
`;

const StDetailBox = styled.div`
  display: flex;
  //가운데 배열
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StCatPic = styled.div`
  width: 300px;
  height: 300px;
  margin: auto;
  margin-left: 10px;
`;
const StDecs2Box = styled.div`
  width: 600px;
  height: 700px;
  margin: auto;
  margin-left: 10px;
  display: flex;
  align-items: center;
  background-color: #ececec;
  border-radius: 15px;
`;
const StDecsBox = styled.div`
  border-left: solid #dadada 1px;
  width: 300px;
  height: 300px;
  margin: auto;
  margin-left: 10px;
`;

const StPicwithDesc = styled.div`
  display: flex;
  //가운데 배열
  align-items: center;
  border-radius: 15px;
  background-color: aliceblue;
  justify-content: center;
`;

const StLoveVIew = styled.div`
  border-radius: 20px;
  padding: 20px;
  width: 600px;
  height: 50px;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
`;

const StLove = styled.div`
  margin-top: 5px;
  background-color: #ececec;
  border-radius: 20px;
  text-align: center;
  padding-top: 15px;
  width: 200px;
  height: 40px;
`;

const StView = styled.div`
  margin-top: 5px;
  background-color: #ececec;
  border-radius: 20px;
  text-align: center;
  padding-top: 15px;
  width: 200px;
  height: 40px;
`;
const StButton = styled.button`
  margin: 10px auto auto 10px;
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
  /* justify-content: space-between; */
  cursor: pointer;
  /* align-items: left; */
  /* font-family: "Noto Sans KR", sans-serif; */
`;
const StButtonDiv1 = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 170px;
  margin-top: 10px;
  margin-bottom: 20px;
`;
const StButtonDiv = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: auto;
`;
const StInput = styled.input`
  width: 300px;
  height: 20px;
  border-radius: 15px;
  border: none;
  padding: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
`;
const StDescInput = styled.input`
  width: 300px;
  height: 400px;
  border-radius: 15px;
  border: none;
  padding: 5px;
  margin-top: 15px;
`;
const StDesc = styled.div`
  color: gray;
`;
const StDescDIv = styled.div`
  width: 200px;
  justify-content: center;
  align-items: center;
  margin: auto;
`;
