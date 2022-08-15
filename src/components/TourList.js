import { useState,useEffect } from "react";
import {Link,useNavigate } from "react-router-dom";
function TourList() {
    const [data,setData] = useState([]);
    useEffect(()=>{
        
        fetch("https://api.kcg.gov.tw/api/service/Get/9c8e1450-e833-499c-8320-29b36b7ace5c")
        .then(res=>res.json())
        .then(result=>{
            const newData = result.data.XML_Head.Infos.Info;
            setData(newData)
        })
    },[])
    const navigate = useNavigate();
    return (
      <>
        <main>
          <h3>旅遊詳細列表</h3>
          <ul>
          {
            data.map((item,index)=>{
                return (
                    <li key={index}><Link to={`/tour/${item.Id}`}>{item.Name}</Link></li>
                )
            })
          }
          </ul>
        </main>
      </>
    );
  }
export default TourList;