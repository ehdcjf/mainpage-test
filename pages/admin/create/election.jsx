import { showRequest } from "../../../components/api/admin";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createElection } from "../../../components/api/admin";
import Router from "next/router";
const Election = () => {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [candidate, setCandidate] = useState("");

  useEffect(async () => {
    const data = {
      type: "politician",
    };
    const result = await showRequest(data);
    setList(result);
  }, []);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleCandidate = (e) => {
    setCandidate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      candidate: candidate,
    };
    const result = await createElection(data);
    console.log(result);
    // await dispatch(UserLoginAction(result));
    Router.push(`/admin/show/election/list`);
  };

  const renderList = (list) => {
    return list.map((v, i) => {
      return (
        <tr key={i}>
          <td>{v.idx}</td>
          <td>{v.name}</td>
          <td>
            <img src={v.image} style={{ width: 200, height: 150 }} alt="" />
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>인덱스</th>
              <th>이름</th>
              <th>이미지</th>
            </tr>
          </thead>
          <tbody>{renderList(list)}</tbody>
        </table>
      </div>

      <div> 정치인 인덱스로 투표만들기 </div>

      <form onSubmit={handleSubmit}>
        투표이름:
        <input
          type="text"
          onChange={handleName}
          placeholder="투표제목을 입력해주세요"
        />
        <br />
        후보: (인덱스로 표현) ex)1,3,5,6,2
        <br />
        <input
          type="text"
          onChange={handleCandidate}
          placeholder="정치인 인덱스를 입력해주세요"
        />
        <br />
        <button type="submit">추가</button>
      </form>
    </>
  );
};

export default Election;
