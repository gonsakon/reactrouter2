import { Outlet } from "react-router-dom";
function Tour(){
    return (
       <>
       <h2>旅遊頁面</h2>
        <Outlet />
       </>
    )
}
export default Tour;