import './SignUp.css';
import '../App.css'

function SignUp() {

    return (
        <div className='App'>
            <button className="button-54" type='button'>Sing In</button><br/><br/>
            <button className="button-54" type='button' onClick={(event) => window.location.assign('/set_login')}>Sing Up</button>
        </div>
    )
}

export default SignUp;