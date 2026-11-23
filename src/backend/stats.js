export function getTransactionsSynch(creds) {
    console.log("getTransactionsSynch - entered")

    let xhr = new XMLHttpRequest();
    const encryptedCreds = btoa(creds[0] + ":" + creds[1]);
    xhr.open("GET", process.env.REACT_APP_BACKEND_URL + '/transaction', false);
    xhr.setRequestHeader('Authorization', 'Basic ' + encryptedCreds)
    xhr.send(null);

    console.log("getTransactionsSynch - exiting")

    return JSON.parse(xhr.responseText)
}

export function getOverallStatsSynch(creds) {
    console.log("getOverallStatsSynch - entered")
    let xhr = new XMLHttpRequest();
    const encryptedCreds = btoa(creds[0] + ":" + creds[1]);
    xhr.open("GET", process.env.REACT_APP_BACKEND_URL + '/stat', false);
    xhr.setRequestHeader('Authorization', 'Basic ' + encryptedCreds)
    xhr.send(null);
    return JSON.parse(xhr.responseText)
}

export function getCategorizedStatsSynch(creds) {
    console.log("getCategorizedStatsSynch - entered")
    let xhr = new XMLHttpRequest();
    const encryptedCreds = btoa(creds[0] + ":" + creds[1]);
    xhr.open("GET", process.env.REACT_APP_BACKEND_URL + '/stat/categorized', false);
    xhr.setRequestHeader('Authorization', 'Basic ' + encryptedCreds)
    xhr.send(null);
    return JSON.parse(xhr.responseText)
}

export function getMonthlyStatsSynch(creds) {
    console.log("getMonthlyStatsSynch - entered")
    let xhr = new XMLHttpRequest();
    const encryptedCreds = btoa(creds[0] + ":" + creds[1]);
    xhr.open("GET", process.env.REACT_APP_BACKEND_URL + '/stat/month', false);
    xhr.setRequestHeader('Authorization', 'Basic ' + encryptedCreds)
    xhr.send(null);
    return JSON.parse(xhr.responseText)
}
