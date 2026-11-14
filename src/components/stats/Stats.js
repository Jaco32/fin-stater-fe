function Stats()
{
    const [transactionTypeFilter, setTransactionTypeFilter] = useState("")
    const [textFilters, setTextFilters] = useState(new Map())
    const [subCatFilter, setSubCatFilter] = useState(new Map())

    useEffect(() => {
      filterTableByTransactionType()
      //filterColumnByTextWithCondition()
      //filterSubcategoryColumnByText()
    })

    function filterColumnByText(event) {
      const filter = document.getElementById(event.target.id).value.toUpperCase()
      const tr = document.getElementById("transactions-table").getElementsByTagName("tr");
    
      let indexesToDrop = []
      for (let i = 0; i < visibleRows.length; i++) {
        const idx = visibleRows[i]
        const td = tr[idx].getElementsByTagName("td")[event.target.parentNode.cellIndex];
        if (td) {
          const tdValue = td.textContent || td.innerText;
          if (tdValue.toUpperCase().indexOf(filter) === -1){
            tr[idx].style.display = "none";
            indexesToDrop.push(idx)
          }
        }
      }
      visibleRows = visibleRows.filter(it => !indexesToDrop.includes(it))
    }

    function addTransactionTypeFilter(id) {
      console.log("Stats - addTransactionTypeFilter - entered, id: " + id);
      if (document.getElementById(id).checked) setTransactionTypeFilter(id);
      else setTransactionTypeFilter(""); 
    }

    function addColumnFilter() {
      const filterText = document.getElementById("search-box-ad-info").value.toUpperCase()
      const searchType = document.getElementById("drop-down-search-type-ad-info-1").options.selectedIndex;
      setTextFilters(new Map(textFilters.set(crypto.randomUUID(), [filterText, searchType])))
    }

    function filterColumnByTextWithCondition() {
      textFilters.forEach((v,k) => {
        const filterText = v[0];
        const searchType = v[1];
        const tr = document.getElementById("transactions-table").getElementsByTagName("tr");
        
        let indexesToDrop = []
        console.log("Iterating through " + visibleRows.length + " elements of visibleRows")
        for (let i = 0; i < visibleRows.length; i++) {
          const idx = visibleRows[i]
          const td_info_1 = tr[idx].getElementsByTagName("td")[5];

          if (td_info_1) {
            const tdInfo1Value = td_info_1.textContent || td_info_1.innerText;

            if ((tdInfo1Value.length > 0) && (tdInfo1Value.toUpperCase().indexOf(filterText) > -1)) {
              if (searchType !== 0) {
                tr[idx].style.display = "none";
                indexesToDrop.push(idx)
              }
            } else {
              if (searchType === 0) {
                tr[idx].style.display = "none";
                indexesToDrop.push(idx)
              }
            }
          }
        }
        console.log("indexesToDrop:" + indexesToDrop)
        visibleRows = visibleRows.filter(it => !indexesToDrop.includes(it))
        console.log("visibleRows count after filter:" + visibleRows.length)
      })
    }

    function addSubcategoryColumnFilter() {
      const filterText = "ZAMAWIANE";
      textFilters.clear();
      setSubCatFilter(new Map(subCatFilter.set(crypto.randomUUID(), [filterText])))
    }

    function filterSubcategoryColumnByText(event) {
      subCatFilter.forEach((v,k) => {
        const filterText = v[0];
        const tr = document.getElementById("transactions-table").getElementsByTagName("tr");
        
        let indexesToDrop = []
        for (let i = 0; i < visibleRows.length; i++) {
          const idx = visibleRows[i]
          const td = tr[idx].getElementsByTagName("td")[3];
          if (td) {
            const tdValue = td.textContent || td.innerText;
            if (tdValue.toUpperCase().indexOf(filterText) === -1){
              tr[idx].style.display = "none";
              indexesToDrop.push(idx)
            }
          }
        }
        visibleRows = visibleRows.filter(it => !indexesToDrop.includes(it))
      })
    }

    function filterTableByTransactionType() {
      console.log("Stats - filterTableByTransactionType - entered");

      const tr = document.getElementById("transactions-table").getElementsByTagName("tr");
      let indexesToDrop = []
      for (let i = 0; i < visibleRows.length; i++) {
        const tdAmount = parseFloat(tr[visibleRows[i]].getElementsByTagName("td")[1].textContent.split(' ')[0].replace(",", "."));
        if (transactionTypeFilter === "radio-income" && (tdAmount < 0)) {
            tr[visibleRows[i]].style.display = "none";
            indexesToDrop.push(i);
        }
        else if (transactionTypeFilter === "radio-expenses" && (tdAmount > 0)) {
            tr[visibleRows[i]].style.display = "none";
            indexesToDrop.push(i);
        }
      }

      console.log("Stats - filterTableByTransactionType - indexesToDrop: " + indexesToDrop)
      visibleRows = visibleRows.filter(it => !indexesToDrop.includes(it))
      console.log("Stats - filterTableByTransactionType - visibleRows count after filter:" + visibleRows.length)
    }

    function filterExcludedTransactions() {
      visibleRows = []
      const tr = document.getElementById("transactions-table").getElementsByTagName("tr");
      for (let i = 1; i < tr.length; i++) {
        console.log(tr[i].className)
        if (tr[i].className === 'table-danger') {
          tr[i].style.display = "";
          visibleRows.push(i);
        }
        else tr[i].style.display = "none";
      }
    }
}

export default Stats;