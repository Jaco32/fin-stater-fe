import '../css/SignUp.css';

function Logo() {

    function handleFileAdd() {
        var file = document.getElementById('id-transactions-file-add').files[0];
        let myPromise = file.arrayBuffer();
        myPromise.then(
            function(value) {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", 'http://localhost:8080/transaction/upload/', false);
                xhr.setRequestHeader('mode', 'no-cors');
                xhr.setRequestHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
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
                <input type='file' onChange={handleFileAdd} id='id-transactions-file-add' required/>
                <span className='button-54' style={{display: 'inline', top: '-35px', left: '40px'}}>Add file</span>
            </label>
            <button className="button-54" type='button' style={{display: 'inline', position: 'relative', top: '-35px', left: '65px'}}>Log out</button>
        </div>
    )
}

export default Logo;