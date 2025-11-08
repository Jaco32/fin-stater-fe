export function getTransactionsSynch() {
    console.log("getTransactionsSynch - entered")

    let xhr = new XMLHttpRequest();
    xhr.open("GET", process.env.REACT_APP_BACKEND_URL + '/transaction', false);
    xhr.setRequestHeader('mode', 'no-cors');
    xhr.send(null);

    console.log("getTransactionsSynch - exiting")

    return JSON.parse(xhr.responseText)
}

export function getStatsSynch()
{
    console.log("getStatsSynch - entered")

    let stats = {};

    let xhr0 = new XMLHttpRequest();
    xhr0.open("GET", process.env.REACT_APP_BACKEND_URL + '/stat', false);
    xhr0.setRequestHeader('mode', 'no-cors');
    xhr0.send(null);
    stats.stat = JSON.parse(xhr0.responseText)

    let xhr1 = new XMLHttpRequest();
    xhr1.open("GET", process.env.REACT_APP_BACKEND_URL + '/stat/month', false);
    xhr1.setRequestHeader('mode', 'no-cors');
    xhr1.send(null);
    stats.statMonth = JSON.parse(xhr1.responseText)

    let xhr2 = new XMLHttpRequest();
    xhr2.open("GET", process.env.REACT_APP_BACKEND_URL + '/stat/categorized', false);
    xhr2.setRequestHeader('mode', 'no-cors');
    xhr2.send(null);
    stats.statCategorized = JSON.parse(xhr2.responseText)

    let xhr3 = new XMLHttpRequest();
    xhr3.open("GET", process.env.REACT_APP_BACKEND_URL + '/stat/avarage', false);
    xhr3.setRequestHeader('mode', 'no-cors');
    xhr3.send(null);
    stats.statAvarage = JSON.parse(xhr3.responseText)

    console.log("getStatsSynch - exiting")

    return stats;
}