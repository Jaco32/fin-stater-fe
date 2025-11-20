import { useState, useRef, useEffect } from 'react';

function Categorized({stPerCt}) {

    const categorisedTableRef = useRef(null)
    const [firstRender, setFirstRender] = useState(true)

    useEffect(() => {
      console.log("Categorized component - calling useEffect");

      if(firstRender) {
        const categorisedRows = categorisedTableRef.current.getElementsByTagName("tr");
        for(const categorisedRow of categorisedRows) {
          categorisedRow.addEventListener("click", (event) => filterTableByTransactionCategory(event))
        }
        setFirstRender((prev) => !prev)
      }
    })

    function filterTableByTransactionCategory(event) {
      const tr = document.getElementById("transactions-table").getElementsByTagName("tr");
      const clickedCategory = event.target.parentNode.getElementsByTagName("td")[0].textContent
      
      for (let i = 1; i < tr.length; i++) {
        const tdCategory = tr[i].getElementsByTagName("td")[2].textContent;
        if (tdCategory === clickedCategory) tr[i].style.display = "";
        else tr[i].style.display = "none";
      }
    }

    return (
        <table className="table table-striped table-sm table-hover">
            <thead className="table-primary">
                <tr>
                    <th>Category</th>
                    <th>Expenses</th>
                </tr>
            </thead>
            <tbody ref={categorisedTableRef}>{stPerCt}</tbody>
        </table>
    )
}

export default Categorized;