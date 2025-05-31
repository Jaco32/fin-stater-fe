import '../App.css'
import '../css/SignUp.css';
import { useNavigate } from "react-router-dom";

function TransactionsFileUpload() {
    const navigate = useNavigate();

    function handleFileUpload() {
        var file = document.getElementById('id-transactions-file-upload').files[0];
        let myPromise = file.arrayBuffer();
        myPromise.then(
            function(value) {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", process.env.REACT_APP_BACKEND_URL + '/transaction/upload/', false);
                xhr.setRequestHeader('mode', 'no-cors');
                if (file.name.split(".")[1] === "xlsx") {
                    xhr.setRequestHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                } else {
                    xhr.setRequestHeader('Content-Type', 'text/csv');
                }
                xhr.send(value);
        });
        navigate("/stats")
    }

    return (
        <div className='App'>
            <label className='label'>
                <input
                    type='file'
                    onChange={handleFileUpload}
                    id='id-transactions-file-upload'
                    accept=".xlsx,.csv"
                    required
                />
                <span className='button-54'>Upload file</span>
            </label>
        </div>
    )
}

export default TransactionsFileUpload;