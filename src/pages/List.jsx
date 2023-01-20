// import React, { useEffect, useState } from "react";
// import Layout from "../shared/Layout";
// import axios from "axios";
// import styled from "styled-components";
// import { Link } from "react-router-dom";

// // 작동 되는것
// const List = () => {
//   const [cats, setCats] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:3001/index`).then((response) => {
//       setCats(response.data);
//     });
//   }, []);

//   return (
//     <Layout>
//       <div className="listArray">
//         <StGroup>
//           {cats?.map((music) => {
//             return (
//               <StBox key={music.id}>
//                 <StHeadBox>
//                   <StyledLink to={`/Detail/${music.id}`} key={music.id}>
//                     <div> DETAIL </div>
//                   </StyledLink>
//                 </StHeadBox>
//                 <div>
//                   <li>제목 : "{music.catName}"</li>
//                   <li>가수 : "{music.age}"</li>
//                   <li>후기 : "{music.text}"</li>
//                 </div>
//               </StBox>
//             );
//           })}
//         </StGroup>
//         <div></div>
//       </div>
//     </Layout>
//   );
// };

// export default List;

// //CSS

// const StBox = styled.div`
//   background-image: url(${"data:image/jpeg;base64,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"});
//   /* opacity: 0.6; */
//   color: #f3f3f3;
//   font-size: small;
//   border: 8px outset #ff00f2;
//   width: 300px;
//   height: 150px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   margin: 10px 10px 10px 10px;

//   overflow: hidden;
//   text-overflow: ellipsis;
//   word-break: break-all;
// `;

// const StGroup = styled.div`
//   display: flex;
//   justify-content: flex-start;
// `;

// const StyledLink = styled(Link)`
//   color: #fafcfa;
//   text-decoration: none;
//   font-size: large;
//   margin-bottom: 10px;
//   border-radius: 10px 10px 10px 10px;
// `;

// const StHeadBox = styled.div`
//   display: flex;
//   justify-content: space-around;
// `;
