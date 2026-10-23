import { useState } from 'react';
import {
  mapCategories,
  mapSubcategories
} from '../../utils/parse';
import { filterTableByTransactionCategory } from '../../utils/filter'

function Categorized({stPerCt}) {

    const [toogle, setToggle] = useState(new Map());

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

        for (let i = 0; i < categorizedStats.length; i++) {
          const subcategoriesKeys = Object.keys(categorizedStats[i].subcategoryStat).map(subCategory => mapSubcategories(subCategory));
          const subcategorizedStatsTBody = []
          if (toogle.get(mappedCategories[i]) === true) {
            const subcategoriesValues = Object.values(categorizedStats[i].subcategoryStat);
            for(let j = 0; j < subcategoriesKeys.length; j++) {
                subcategorizedStatsTBody.push(
                  <tr key={i} className="fs-6">
                    <td></td>
                    <td style={{ textIndent: '20px' }}>{subcategoriesKeys[j]}</td>
                    <td>{plnFormatter.format(subcategoriesValues[j]*-1)}</td>
                  </tr>
                )
            }
          }

          categorizedStatsTBody.push(
            <>
              <tr key={i} onclick={filterTableByTransactionCategory}>
                  <td onClick={subcategoriesKeys.length ? (event) => toogleSubcategorized(event) : () => {}}
                      style={{ textAlign: 'right', cursor: 'pointer'}}
                  >
                    {subcategoriesKeys.length ? (<>&#10133;</>) : ''}
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
                <tr style={{ fontSize: '12px'}}>
                    <th></th>
                    <th className="text-secondary">Kategoria</th>
                    <th className="text-secondary">Wydatki</th>
                </tr>
            </thead>
            <tbody style={{ fontSize: '12px'}}>{statsPerCategory}</tbody>
        </table>
    )
}

export default Categorized;