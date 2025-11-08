import '../../css/SignUp.css';
import Header from './Header';
import { useNavigate } from "react-router-dom";

function UploadTransactions() {
    console.log("Rendering - UploadTransactions")

    const navigate = useNavigate();

    function handleFileUpload() {
        const file = document.getElementById('id-transactions-file-upload').files[0];
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
                navigate("/stats")
        });
    }

    return (
        <>
            <Header />
            <h1 className='display-2 mt-5' style={{textAlign: 'center'}}>Welcome to FinStat</h1>
            <h2 className='display-6' style={{textAlign: 'center'}}>Start with uploading a file with transactions using the form below</h2>
            <div className='input-group w-25 mx-auto mt-5'>
                <input
                    type='file'
                    onChange={handleFileUpload}
                    id='id-transactions-file-upload'
                    accept=".xlsx,.csv"
                    required
                    className='form-control'
                />
                <label className='input-group-text bg-primary text-white' for='id-transactions-file-upload'>Upload</label>
            </div>
        </>
    )
}

export default UploadTransactions;