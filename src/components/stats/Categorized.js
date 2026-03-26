import { useState, useRef, useEffect } from 'react';
import {
  mapCategories,
  mapSubcategories
} from '../../utils/parse';

function Categorized({stPerCt}) {

    const categorisedTableRef = useRef(null)
    const [firstRender, setFirstRender] = useState(true)
    const [toogle, setToggle] = useState(new Map());

    useEffect(() => {
      console.log("Categorized component - calling useEffect");

      if(firstRender) {
        if (toogle.length > 0) {
          const categorisedRowsFilterByCategory = categorisedTableRef.current.getElementsByClassName("filter-by-category");
          for(const categorisedRow of categorisedRowsFilterByCategory) {
            categorisedRow.addEventListener("click", (event) => filterTableByTransactionCategory(event))
          }
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
      const categoryKey = event.target.parentNode.getElementsByTagName("td")[1].textContent
      let categoryValue = toogle.get(categoryKey)
      setToggle(new Map(toogle.set(categoryKey, !categoryValue)))
    }

    function parseCategorizedStats(categorizedStats)
    {
      const categorizedStatsTBody = []
      if ((categorizedStats !== undefined) && (categorizedStats.length > 0))
      {
        const plnFormatter = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" });
        const mappedCategories = categorizedStats.map(categoryItem => categoryItem.category).map(category => mapCategories(category))

        if (toogle.size === 0) {
            const initialToogle = new Map();
            for(let i = 0; i < mappedCategories.length; i++) {
                initialToogle.set(mappedCategories[i], false);
            }
            setToggle(initialToogle);
        }
        console.log(toogle)

        for (let i = 0; i < categorizedStats.length; i++) {
          const subcategoriesKeys = Object.keys(categorizedStats[i].subcategoryStat).map(subCategory => mapSubcategories(subCategory));
          const subcategorizedStatsTBody = []
          if (toogle.get(mappedCategories[i]) === true) {
            const subcategoriesValues = Object.values(categorizedStats[i].subcategoryStat);
            for(let j = 0; j < subcategoriesKeys.length; j++) {
                subcategorizedStatsTBody.push(<tr key={i} className="fs-6">
                    <td></td>
                    <td>{subcategoriesKeys[j]}</td>
                    <td>{plnFormatter.format(subcategoriesValues[j]*-1)}</td>
                </tr>)
            }
          }

          categorizedStatsTBody.push(
            <>
              <tr key={i}>
                  <td className="expand-subcategories"
                      onClick={subcategoriesKeys.length ? (event) => toogleSubcategorized(event) : () => {}}
                      style={{ textAlign: 'right'}}
                  >
                    {subcategoriesKeys.length ? (<>&#129055;</>) : ''}
                  </td>
                  <td className="filter-by-category">{mappedCategories[i]}</td>
                  <td className="filter-by-category">{plnFormatter.format(-1*categorizedStats[i].expense.toFixed(2))}</td>
              </tr>
              {toogle.get(mappedCategories[i]) && subcategorizedStatsTBody}
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