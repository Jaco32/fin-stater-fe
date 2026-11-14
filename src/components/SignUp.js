import Header from './Header';
import { useNavigate } from 'react-router-dom';

function SignUp() {

    console.log("Rendering - SignUp")

    const navigate = useNavigate();

    function handleSignUp() {
        window.event.preventDefault();

        const form = document.getElementById('id_sign_up_form');
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        var xhr = new XMLHttpRequest();
        const creds = btoa(data['name-set-login-input'] + ":" + data['name-set-psw-input'])
        const createUserUrl = process.env.REACT_APP_BACKEND_URL + '/user/create'
        xhr.open("POST", createUserUrl, false);
        xhr.send(creds);

        if (xhr.status === 200) navigate('/upload_transactions', {
            state: {
                username: data['name-set-login-input'],
                password: data['name-set-psw-input']
            },
            replace: true
        });
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