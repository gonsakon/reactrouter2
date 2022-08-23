import { useNavigate,Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useAuth } from "./Context";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
const Login = () => {
    const { token, setToken } = useAuth()
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const _url = "https://todoo.5xcamp.us/users/sign_in";
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        fetch(_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: data
            })
        })
        .then(res => {
            console.log(res)
            if(res.status===401){
                throw new Error('登入失敗，請重新檢驗！');
            }
            setToken(res.headers.get("authorization"));
            return res.json()
        })
        .then(res => {
            navigate('/todo')
        })
        .catch(err=>{
            console.log(err)
            return MySwal.fire({
                title: err.message,
                })
        })
    }
    return (
        <main>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 >最實用的線上代辦事項服務</h2>
                <label>Email</label>
                <input
                    type="text"
                    placeholder="email"
                    {...register("email", {
                        required: {
                            value: true,
                            message: '請輸入資料內容!'
                        },
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "格式有誤!"
                        }
                    })} />
                <p>{errors.email?.message}</p>
                <label>密碼</label>
                <input
                    type="Password"
                    placeholder="Password"
                    {...register("password", {
                        required: {
                            value: true,
                            message: '請輸入資料內容!'
                        },
                        minLength: {
                            value: 6,
                            message: "密碼長度至少6位字元"
                        }
                    })} />
                <p>{errors.password?.message}</p>
                <input
                    type="submit"
                    value="登入"
                />
                <br />
                <Link to="/">回首頁</Link>  <Link to="/signup">註冊帳號</Link>
            </form>
        </main>
    );
}

export default Login;

