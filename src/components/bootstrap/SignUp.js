import Header from './Header';
import { useNavigate } from 'react-router-dom';

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
        <>
            <Header />
            <form className="mt-5" id="id_sign_up_form" onSubmit={handleSignUp}>
                <div className="row">
                    <div className="col d-grid">
                        <input type="text" className="form-control mb-3 w-25 mx-auto" placeholder="Enter login..." id="id-set-login-input" name="name-set-login-input" form="id_sign_up_form" required></input>
                        <input type="password" className="form-control mb-3 w-25 mx-auto" placeholder="Enter password..." id="id-set-psw-input" name="name-set-psw-input" form="id_sign_up_form" required></input>
                        <button type="submit" className="btn btn-primary w-25 mx-auto">Create</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default SignUp;