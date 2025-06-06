import '../css/SignUp.css';
import { useNavigate } from "react-router-dom";

function Logo() {
    const navigate = useNavigate();

    function handleFileAdd() {
        var file = document.getElementById('id-transactions-file-add').files[0];
        let myPromise = file.arrayBuffer();
        myPromise.then(
            function(value) {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", 'http://localhost:8080/transaction/upload/', false);
                xhr.setRequestHeader('mode', 'no-cors');
                if (file.name.split(".")[1] === "xlsx") {
                    xhr.setRequestHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                } else {
                    xhr.setRequestHeader('Content-Type', 'text/csv');
                }
                xhr.send(value);
        });
        window.location.assign("/stats")
    }

    return (
        <div>
            <span style={{fontFamily: 'Open Sans, sans-serif'}}>
                <h1 style={{textAlign: 'left', fontSize: '60px', marginTop: '0px', marginBottom: '0px', display: 'inline'}}>FinStat</h1>
                <br></br>
                <h4 style={{textAlignLast: 'left', marginTop: '0px', display: 'inline'}}>Basic Financial Statistics</h4>
            </span>
            <label className='label'>
                <input
                    type='file'
                    onChange={handleFileAdd}
                    id='id-transactions-file-add'
                    accept=".xlsx,.csv"
                    required
                />
                <span className='button-54' style={{display: 'inline', top: '-35px', left: '40px'}}>Add file</span>
            </label>
            <button
                className="button-54"
                type='button'
                style={{display: 'inline', position: 'relative', top: '-35px', left: '65px'}}
                onClick={(event) => navigate('/')}
            >
                Log out
            </button>
        </div>
    )
}

export default Logo;