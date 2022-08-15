import { useState,useEffect } from "react";
import {Link,useNavigate,useParams } from "react-router-dom";
function TourDetail() {
    const { Id } = useParams();
    const [data,setData] = useState({});
    const {Name,Toldescribe,Picture1} = data;
    useEffect(()=>{
        fetch("https://api.kcg.gov.tw/api/service/Get/9c8e1450-e833-499c-8320-29b36b7ace5c")
        .then(res=>res.json())
        .then(result=>{
            const newData = result.data.XML_Head.Infos.Info.filter(item=>item.Id===Id);
            setData({...newData[0]})
        })
    },[])
    const navigate = useNavigate();
    return (
      <>
        <main>
            <h2>{Name}</h2>
            <input type="button" value="回列表" onClick={()=>{
                navigate("/tour")
            }} />
            <br />
            <img src={Picture1} alt={Name} />
          <p>{Toldescribe}</p>
        </main>
      </>
    );
  }
export default TourDetail;