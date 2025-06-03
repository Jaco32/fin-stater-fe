import '../css/SignUp.css';
import '../App.css';
import { useNavigate } from "react-router-dom";

function Main() {
    const navigate = useNavigate();

    return (
        <div className='App'>
            <button className="button-54" type='button' onClick={(event) => navigate('/sign_in')}>Sing In</button><br/><br/>
            <button className="button-54" type='button' onClick={(event) => navigate('/sign_up')}>Sing Up</button>
        </div>
    )
}

export default Main;