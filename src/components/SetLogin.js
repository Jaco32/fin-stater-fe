import './SignUp.css';

function SetLogin() {

    function handleSignUp() {

        // Get form data
        const form = document.getElementById('id_set_login_form');
        const formData = new FormData(form);

        // Convert form data to an object
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://localhost:8080/user/create/' + data['name-set-login-input-text'], false);
        xhr.setRequestHeader('mode', 'no-cors');
        xhr.send(null);
    }

    async function handleSubmit() {

        // Get form data
        const form = document.getElementById('id_set_login_form');
        const formData = new FormData(form);
    
        // Convert form data to an object
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
    
        const response = await fetch('http://localhost:8080/user/create/' + data['name-set-login-input-text'], {
            method: 'POST',
            headers: {
                "mode": "no-cors"
            }
        })
    }

    return (
        <div className='App'>
            <form id="id_set_login_form" action='upload_transactions' onSubmit={handleSignUp}>
                <input type="text" id="id-set-login-input-text" name="name-set-login-input-text" form="id_set_login_form" placeholder='Login..'></input><br/><br/>
                <input className="button-54" type="submit" value="Create"></input>
            </form>
        </div>
    )
}

export default SetLogin;