import Header from './Header';
import { useNavigate } from "react-router-dom";

function SignIn()
{
    console.log("Rendering - SignIn")

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