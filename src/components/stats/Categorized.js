import { useState, useRef, useEffect } from 'react';
import {
  mapCategories
} from '../../utils/parse';

function Categorized({stPerCt}) {

    const categorisedTableRef = useRef(null)
    const [firstRender, setFirstRender] = useState(true)
    const [toogle, setToggle] = useState([]);

    useEffect(() => {
      console.log("Categorized component - calling useEffect");

      if(firstRender) {
        const categorisedRowsFilterByCategory = categorisedTableRef.current.getElementsByClassName("filter-by-category");
        for(const categorisedRow of categorisedRowsFilterByCategory) {
          categorisedRow.addEventListener("click", (event) => filterTableByTransactionCategory(event))
        }
        setFirstRender((prev) => !prev)
      }
    })

    function filterTableByTransactionCategory(event) {
      const tr = document.getElementById("transactions-table").getElementsByTagName("tr");
      const clickedCategory = event.target.parentNode.getElementsByTagName("td")[1].textContent
      
      for (let i = 1; i < tr.length; i++) {
        const tdCategory = tr[i].getElementsByTagName("td")[2].textContent;
        if (tdCategory === clickedCategory) tr[i].style.display = "";
        else tr[i].style.display = "none";
      }
    }

    function toogleSubcategorized(event) {
      const toogleCopy = toogle.slice(0)
      toogleCopy[event.target.parentNode.rowIndex-1] = !toogle[event.target.parentNode.rowIndex-1]
      setToggle(toogleCopy)
    }

    function parseCategorizedStats(categorizedStats)
    {
      const categorizedStatsTBody = []
      if (categorizedStats !== undefined)
      {
        if (toogle.length === 0) {
            const initialToogle = [];
            for(let i = 0; i < categorizedStats.length; i++) {
                initialToogle[i] = false;
            }
            setToggle(initialToogle);
        }

        const plnFormatter = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" });
        const mappedCategories = categorizedStats.map(categoryItem => categoryItem.category).map(category => mapCategories(category))
        for (let i = 0; i < categorizedStats.length; i++) {
            var subcategorizedStatsTBody = []
            const subcategoriesKeys = Object.keys(categorizedStats[i].subcategoryStat)
            const subcategoriesValues = Object.values(categorizedStats[i].subcategoryStat)
            for(let j = 0; j < subcategoriesKeys.length; j++) {
                subcategorizedStatsTBody.push(<tr key={i} className="fs-6">
                    <td></td>
                    <td>{subcategoriesKeys[j]}</td>
                    <td>{plnFormatter.format(subcategoriesValues[j])}</td>
                </tr>)
            }

            categorizedStatsTBody.push(
              <>
                <tr key={i}>
                    <td className="expand-subcategories" onClick={(event) => toogleSubcategorized(event)}>+</td>
                    <td className="filter-by-category">{mappedCategories[i]}</td>
                    <td className="filter-by-category">{plnFormatter.format(-1*categorizedStats[i].expense.toFixed(2))}</td>
                </tr>
                {toogle[i] && subcategorizedStatsTBody}
              </>
            )
        }
      }

      return categorizedStatsTBody;
    }

    const statsPerCategory = parseCategorizedStats(stPerCt)

    return (
        <table className="table table-striped table-sm table-hover">
            <thead className="table-primary">
                <tr>
                    <th></th>
                    <th>Category</th>
                    <th>Expenses</th>
                </tr>
            </thead>
            <tbody ref={categorisedTableRef}>{statsPerCategory}</tbody>
        </table>
    )
}

export default Categorized;