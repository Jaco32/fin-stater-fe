import '../css/SignUp.css';
import '../App.css';
import { useNavigate } from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();

    return (
        <div className='App'>
            <button className="button-54" type='button'>Sing In</button><br/><br/>
            <button className="button-54" type='button' onClick={(event) => navigate('/set_login')}>Sing Up</button>
        </div>
    )
}

export default SignUp;