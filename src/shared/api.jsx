import axios from "axios";
import { tokenManager } from "../utils/tokenManager";

// 테스트용
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJidXp6IiwiYXV0aCI6IlVTRVIiLCJleHAiOjE2NzM5NDUzMTEsImlhdCI6MTY3Mzk0MTcxMX0.RPFBk53OaCwL7dfwuZth3ulMI5pS0X1q5h3ltFSm77I";

export const client = axios.create({
  baseURL: process.env.REACT_APP_CAT,
  timeout: 100000,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
});

client.defaults.withCredentials = true;
client.defaults.headers.post["Content-Type"] = "application/json";
client.defaults.headers.common["Authorization"] = `Bearer ${tokenManager.token}`;

/* interceptors */
client.interceptors.response.use(
  function (response) {
    // Status Code 200범위 내, 즉 성공했을때
    return response;
  },
  function (error) {
    // Status Code 200범위 밖, 즉 실패했을때
    if (error.response.status === 401 || error.response.satus === 406) {
      window.alert("다시 로그인이 필요합니다.");
      window.location.href = "/signin";
    }
    if (error.response.status === 403) {
      window.alert("권한이 없는 사용자입니다.");
    }
    if (error.response.status === 404) {
      window.alert("데이터를 찾을 수 없습니다.");
    }
    if (error.response.status === 500) {
      window.alert("서버 오류가 발생하였습니다.");
    }

    return Promise.reject(error);
  }
);
