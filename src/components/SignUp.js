import '../css/SignUp.css';
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();

    function handleSignUp() {
        // Get form data
        const form = document.getElementById('id_sign_up_form');
        const formData = new FormData(form);

        // Convert form data to an object
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        var xhr = new XMLHttpRequest();
        const createUserUrl = process.env.REACT_APP_BACKEND_URL + '/user/create/' + data['name-set-login-input'] + "/" + data['name-set-psw-input']
        xhr.open("POST", createUserUrl, false);
        xhr.setRequestHeader('mode', 'no-cors');
        xhr.send(null);
        navigate('/upload_transactions')
    }

    return (
        <div className='App'>
            <form id="id_sign_up_form" onSubmit={handleSignUp}>
                <input
                    type="text"
                    id="id-set-login-input"
                    name="name-set-login-input"
                    form="id_sign_up_form"
                    placeholder='Login..'
                    required
                /><br/><br/>
                <input
                    type="password"
                    id="id-set-psw-input"
                    name="name-set-psw-input"
                    form="id_sign_up_form"
                    placeholder='Password..'
                    required
                /><br/><br/>
                <input className="button-54" type="submit" value="Create"></input>
            </form>
        </div>
    )
}

export default SignUp;