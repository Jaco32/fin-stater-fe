import '../App.css'
import '../css/SignUp.css';

function TransactionsFileUpload() {

    function handleFileUpload() {
        var file = document.getElementById('id-transactions-file-upload').files[0];
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

    function handleFileSubmit() {
        var file = document.getElementById('id-transactions-file-upload').files[0];
        let myPromise = file.arrayBuffer();
        myPromise.then(
            async function(value) {
            const response = await fetch('http://localhost:8080/transaction/upload/', {
                method: 'POST',
                headers: {
                    "mode": "no-cors",
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                },
                body: value
            })
        });
        window.location.assign("/stats")
    }


    return (
        <div className='App'>
            <label className='label'>
                <input type='file' onChange={handleFileUpload} id='id-transactions-file-upload' required/>
                <span className='button-54'>Upload file</span>
            </label>
        </div>
    )
}

export default TransactionsFileUpload;