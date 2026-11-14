import Header from './Header';
import { useNavigate } from "react-router-dom";

function SignIn()
{
    console.log("SignIn - Rendering")

    const navigate = useNavigate();

    function addSessionCookie(cookie) {
        document.cookie = "session-id=" + cookie.value
    }

    function handleSignIn() {
        window.event.preventDefault();

        const form = document.getElementById('id_sign_in_form');
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        var xhr = new XMLHttpRequest();
        const creds = btoa(data['name-enter-login-input'] + ":" + data['name-enter-psw-input'])
        const loginUserUrl = process.env.REACT_APP_BACKEND_URL + '/user/login'
        xhr.open("POST", loginUserUrl, false);
        xhr.setRequestHeader('Authorization', 'Basic ' + creds)
        xhr.send(null);
        
        if (xhr.status === 200) navigate('/overall', {
            state: {
                username: data['name-enter-login-input'],
                password: data['name-enter-psw-input']
            },
            replace: true
        });
    }

    return (
        <>
            <Header />
            <form className="mt-5" id="id_sign_in_form" onSubmit={handleSignIn}>
                <div className="row">
                    <div className="col d-grid">
                        <input type="text" className="form-control mb-3 w-25 mx-auto" placeholder="Enter login..." id="id-enter-login-input" name="name-enter-login-input" form="id_sign_in_form" required></input>
                        <input type="password" className="form-control mb-3 w-25 mx-auto" placeholder="Enter password..." id="id-enter-psw-input" name="name-enter-psw-input" form="id_sign_in_form" required></input>
                        <button type="submit" className="btn btn-primary w-25 mx-auto">Login</button>
                    </div>
                </div>
            </form>
        </> 
    )
}

export default SignIn;