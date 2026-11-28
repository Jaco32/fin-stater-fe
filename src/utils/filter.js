export function filterTableByTransactionCategory() {
    const tr = document.getElementById("transactions-table").getElementsByTagName("tr");
    const clickedCategory = window.event.target.parentNode.getElementsByTagName("td")[1].textContent
    
    for (let i = 1; i < tr.length; i++) {
        const tdCategory = tr[i].getElementsByTagName("td")[2].textContent;
        if (tdCategory === clickedCategory) tr[i].style.display = "";
        else tr[i].style.display = "none";
    }
}

export function filterTableByMonth(event) {
    const month = event.target.parentNode.getElementsByTagName("td")[1].textContent;
    const tr = document.getElementById("transactions-table").getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        const tdDate = tr[i].getElementsByTagName("td")[0].textContent;
        if (tdDate.indexOf(month) > -1) tr[i].style.display = "";
        else tr[i].style.display = "none";
    }
}