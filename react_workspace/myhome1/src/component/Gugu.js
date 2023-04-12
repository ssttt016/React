import React, {useState} from 'react';

function Gugu(props) {
    const [dan, setDan] = useState(0);
    const [danList, setDanList] = useState([
        {a: 0*1,b:0*2,c:0*3,d:0*4,e:0*5,f:0*6,g:0*7,h:0*8,i:0*9}
    ]);

    const danChange = (e) => {
        let d = dan;
        d.a = parseInt(e.target.value);
        d.b = parseInt(e.target.value);
        d.c = parseInt(e.target.value);
        d.d = parseInt(e.target.value);
        d.e = parseInt(e.target.value);
        d.f = parseInt(e.target.value);
        d.g = parseInt(e.target.value);
        d.h = parseInt(e.target.value);
        d.i = parseInt(e.target.value);
        setDan(d);
    }

    const danListChange = (e) =>{
        setDanList(danList.concat(dan));
    }


    return (
        <div>
            단 : <input type="text" onChange={danChange}></input>
            변경 : <button type="button" onClick={danListChange}>실행</button>

            <table>
                {
                    danList.map((num, index)=>{
                        return(
                            <li key={index}>
                                <p>{num.a}</p>
                                <p>{num.b}</p>
                                <p>{num.c}</p>
                                <p>{num.d}</p>
                                <p>{num.e}</p>
                                <p>{num.f}</p>
                                <p>{num.g}</p>
                                <p>{num.h}</p>
                                <p>{num.i}</p>
                            </li>
                        )
                    })
                }    
            </table>        
        </div>
    );
}

export default Gugu;