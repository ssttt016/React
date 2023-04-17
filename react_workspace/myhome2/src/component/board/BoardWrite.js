import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { SERVERIP } from "../../CommonUtil";
import {Link, useNavigate, useParams} from "react-router-dom";


function BoardWrite(props) {
    let {id} = useParams(); //보내는 쪽에서 json객체로 보냄
    let history = useNavigate();

    // const [title, setTitle] = useState("");
    // const [writer, setWriter] = useState("");
    // const [contents, setContents] = useState("");
    
    //변수 4개를 하나의 JSON객체로 저장 - 필드가 많을 때 변수 하나씩 만들면 힘들다
    const [inputs, setInputs] = useState({
        title:'', writer:'', contents:'', filename:''
    });

    //BoardWrite 컴포넌트가 /board/write 일때는 undefined가 오고 /board/view/1 id에는 1이 온다.
    // useEffect(() => {
    //     console.log('id', id);
    //     async function loadData(id){
    //         let results = await axios.get(SERVERIP+"/rest_board/view/"+id);
    //         console.log(results);

    //         setTitle(results.data.title);
    //         setWriter(results.data.writer);
    //         setContents(results.data.contents);
    //     }   
    //     if(id!= undefined) //write가 아니고 view로 호출할 때
    //     loadData(id); 
    //   }, []); 
    
    // 모든 필드의 입력 이벤트 처리를 여기서 한다.
    const onChange = (e)=>{
        const {value, name} = e.target;  //입력객체로부터 값과 이름을 가져온다.
        console.log(value, name);

        setInputs({...inputs, [name]:value}) // {...inputs}-json 객체 복사
         // let temp = inputs;  / temp[name] = value; / setInputs(temp);   를 한줄로 축약한것
    }
    

    // const titleChange = (e)=>{
    //     setTitle(e.target.value);
    // }
    // const writerChange = (e)=>{
    //     setWriter(e.target.value);
    // }
    // const contentsChange = (e)=>{
    //     setContents(e.target.value);
    // }

    // 서버로 전송하기
    const postData = ()=>{
        // 데이터를 JSON으로 묶어서 보내야 한다.
        // let data = {title,writer, contents};
        let frmData = new FormData();
        frmData.append("title", inputs.title);
        frmData.append("writer", inputs.writer);
        frmData.append("contents", inputs.contents);
        frmData.append("file", window.document.myform.file.files[0]);
        // 파일 첨부 시 자바스크립트가 파일이 여러개 첨부하는거로 처리한다. 그래서 무조건 배열의 형태이다.
        // document.폼이름.file태그의 name속성.files[0];   / 여러개 추가할 수도 있다.
        axios.post(SERVERIP+"/rest_board/write", frmData)
        .then( (res)=>{
            console.log(res.data);
            history("/board/list/1")
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    //json객체 해체 디스트럭션
    const {title, writer, contents, file} = inputs;
    return (
        <div className="container">
            <form name="myform" encType="multipart/form-data">
            <h1>게시판 글쓰기</h1>
            <table className="table table-hover " style={{marginTop:"30px"}}>
            <colgroup>
                <col width="25%"/>
                <col width="*"/>
            </colgroup>
            <tbody>
              <tr>
                <td>타이틀</td>
                <td>
                    <div className="mb-3" style={{marginTop:"13px"}}>
                        <input type="text" className="form-control" name="title" value={title} placeholder="타이틀을 입력하세요" onChange={onChange} />
                    </div>
                </td>
              </tr>       
              <tr>
                <td>작성자</td>
                <td>
                    <div className="mb-3" style={{marginTop:"13px"}}>
                        <input type="text" className="form-control" name="writer" value={writer} placeholder="이름을 입력하세요" onChange={onChange} />
                    </div>
                </td>
              </tr>
              <tr>
                <td>내용</td>
                <td>
                    <div className="mb-3" style={{marginTop:"13px"}}>
                        <input type="text" className="form-control" name="contents" value={contents} placeholder="내용을 입력하세요" onChange={onChange} />
                    </div>
                </td>
              </tr>
              <tr>
                <td>파일</td>
                <td>
                    <div className="mb-3" style={{marginTop:"13px"}}>
                        <input type="file" className="form-control" name="file" value={file} placeholder="파일을 첨부하세요" onChange={onChange} />
                    </div>
                </td>
              </tr>
            </tbody>
          </table>
       
          <div className="container mt-3" style={{textAlign:"right"}}>
            <Link className="btn btn-secondary" onClick={postData}>등록</Link>&nbsp;&nbsp;
            <Link className="btn btn-secondary">취소</Link>
          </div>
        </form>
        </div>
    );
}
export default BoardWrite;