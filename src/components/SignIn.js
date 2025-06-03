import '../css/SignUp.css';
import { useNavigate } from "react-router-dom";

function SignIn() {
    const navigate = useNavigate();

    function handleSignIn() {
        // Get form data
        const form = document.getElementById('id_sign_in_form');
        const formData = new FormData(form);

        // Convert form data to an object
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        var xhr = new XMLHttpRequest();
        const loginUserUrl = process.env.REACT_APP_BACKEND_URL + '/user/login/' + data['name-enter-login-input'] + "/" + data['name-enter-psw-input']
        xhr.open("POST", loginUserUrl, false);
        xhr.setRequestHeader('mode', 'no-cors');
        xhr.send(null);
        navigate('/stats')
    }

    return (
        <div className='App'>
            <form id="id_sign_in_form" onSubmit={handleSignIn}>
                <input
                    type="text"
                    id="id-enter-login-input"
                    name="name-enter-login-input"
                    form="id_sign_in_form"
                    placeholder='Login..'
                    required
                /><br/><br/>
                <input
                    type="password"
                    id="id-enter-psw-input"
                    name="name-enter-psw-input"
                    form="id_sign_in_form"
                    placeholder='Password..'
                    required
                /><br/><br/>
                <input className="button-54" type="submit" value="Log in"></input>
            </form>
        </div>
    )
}

export default SignIn;