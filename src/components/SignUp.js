import { useNavigate,Link } from "react-router-dom";
import { useAuth } from "./Context";
import { useForm} from 'react-hook-form';
function SignUp() {
    const { token, setToken } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit,watch , formState: { errors } } = useForm();
    const onSubmit = data => {
        const _url = "https://todoo.5xcamp.us/users";
        console.log({
            user: data
        });
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
                setToken(res.headers.get("authorization"));
                return res.json()
            })
            .then(res => {
                navigate('/todo')
            })
    }
    return (
        <main>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>註冊帳號</h2>
                <label htmlFor="email">Email</label>
                <input type="text" placeholder="請輸入 email"
                    {...register("email",
                        {
                            required: {
                                value: true,
                                message: '請輸入資料內容!'
                            },
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "格式有誤!"
                            }
                        }
                    )} />
                <p>{errors.email?.message}</p>
                <label htmlFor="name">您的暱稱</label>
                <input type="text" placeholder="Nnickname"
                    {...register("nickname", {})} />
                <p>{errors.Nickname?.message}</p>
                <label htmlFor="pwd">密碼</label>
                <input type="password" placeholder="password"
                    {...register("password",
                        {
                            required: {
                                value: true,
                                message: '請輸入資料內容!'
                            },
                            minLength: {
                                value: 6,
                                message: "密碼長度至少6位字元"
                            }
                        }
                    )} />
                <p>{errors.password?.message}</p>
                <label htmlFor="pwd">再次輸入密碼</label>
                <input type="password" placeholder="password"
                    {...register("passwordConfirm",
                        {
                            required: {
                                value: true,
                                message: '請輸入資料內容!'
                            },
                            minLength: {
                                value: 6,
                                message: "密碼長度至少6位字元"
                            },validate: (val) => {
                                if (watch('password') !== val) {
                                  return "密碼不一致";
                                }
                              }
                        }
                    )} />
                <p>{errors.passwordConfirm?.message}</p>
                <input type="submit" value="註冊帳號" />
                <br />
                <Link to="/">回首頁</Link>
            </form>
        </main>
    );
}
export default SignUp;