export function parseTransactions(transactions) {
    if (transactions !== undefined) {
        const plnFormatter = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" });
        const transactionsItems = []
        console.log("Parsing " + transactions.length + " transactions")
        for (let i = 0; i < transactions.length; i++) {
            if (transactions[i].usedForCalculation === false) {
                console.log("Setting transaction " + i + " as not used")
                transactionsItems.push(<tr key={i} className="table-danger">
                    <td style={{whiteSpace: 'nowrap'}}>{transactions[i].date.substr(0, 10)}</td>
                    <td style={{textAlign: 'center'}}>{plnFormatter.format(transactions[i].amount)}</td>
                    <td style={{textAlign: 'center'}}>{mapCategories(transactions[i].category)}</td>
                    <td>{mapSubcategories(transactions[i].subcategory)}</td>
                    <td>{transactions[i].description}</td>
                    <td>{transactions[i].additional_info}</td>
                    <td>{transactions[i].additional_info_2}</td>
                    <td>{transactions[i].sender}</td>
                    <td>{transactions[i].receiver}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{transactions[i].type}</td>
                </tr>);
            }
            else {
                transactionsItems.push(<tr key={i} className="table-light">
                    <td style={{whiteSpace: 'nowrap'}}>{transactions[i].date.substr(0, 10)}</td>
                    <td style={{textAlign: 'center'}}>{plnFormatter.format(transactions[i].amount)}</td>
                    <td style={{textAlign: 'center'}}>{mapCategories(transactions[i].category)}</td>
                    <td>{mapSubcategories(transactions[i].subcategory)}</td>
                    <td>{transactions[i].description}</td>
                    <td>{transactions[i].additional_info}</td>
                    <td>{transactions[i].additional_info_2}</td>
                    <td>{transactions[i].sender}</td>
                    <td>{transactions[i].receiver}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{transactions[i].type}</td>
                </tr>);
            }
        }

        return transactionsItems;
    }
}

export function parseOverallStats(overallStats)
{
    const overallStatsTBody = [];
    if (overallStats !== undefined) {
        const plnFormatter = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" });
        for (let i = 0; i < overallStats.length; i++) {
            if(overallStats[i].from_date !== null) {
                overallStatsTBody.push(<tr>
                    <td>{overallStats[i].from_date.substr(0, 10)}</td>
                    <td>{overallStats[i].to.substr(0, 10)}</td>
                    <td>{plnFormatter.format(overallStats[i].income.toFixed(2))}</td>
                    <td>{plnFormatter.format(-1*overallStats[i].expenses.toFixed(2))}</td>
                    <td>{plnFormatter.format(overallStats[i].periodBalance.toFixed(2))}</td>
                    <td>{plnFormatter.format(overallStats[i].excluded.toFixed(2))}</td>
                    <td>{overallStats[i].viewName}</td>
                </tr>)
            }
        }
    }

    return overallStatsTBody;
}

export function mapCategories(category) {
    //console.log("Mapping category: " + category)
    switch(category) {
        case "SPOZYWCZE":
            return "Jedzenie";
        case "DZIECI":
            return "Dzieci";
        case "AUTO":
            return "Samochód";
        case "CIALO":
            return "Cialo";
        case "BANKOMAT":
            return "Wypłaty z bankomatu";
        case "OPLATY":
            return "Opłaty stałe";
        case "DOM":
            return "Dom";
        case "KARTA_KREDYTOWA":
            return "Karta kredytowa";
        case "ROWER":
            return "Rower";
        default:
            return "Inne";
    }
}

export function mapSubcategories(subCategory) {
    //console.log("Mapping subcategory: " + subCategory)
    switch(subCategory) {
        case "SPOZYWCZE_MARKETY":
            return "Markety";
        case "SPOZYWCZE_ZAMAWIANE":
            return "Zamawiane";
        case "SPOZYWCZE_SLODKOSCI":
            return "Słodkości";
        case "SPOZYWCZE_OTHER":
            return "Pozostałe";
        case "DZIECI_PLACOWKI":
            return "Placówki";
        case "DZIECI_OTHER":
            return "Pozostałe";
        case "CIALO_ZDROWIE":
            return "Zdrowie";
        case "CIALO_HIGIENA":
            return "Higiena";
        case "CIALO_BEAUTY":
            return "Beauty";
        case "CIALO_OTHER":
            return "Pozostałe";
        case "AUTO_PALIWO":
            return "Paliwo"
        case "AUTO_SERWIS":
            return "Serwis";
        case "AUTO_OTHER":
            return "Pozostałe"
        default:
            return "Pozostałe";
    }
}

export function parseAvarageStats(avarageStats) {
    const avarageStatsTBody = [];
    if (avarageStats !== undefined) {
        const plnFormatter = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" });
        for(let i = 0; i < avarageStats.length; i++) {
            avarageStatsTBody.push(<tr>
                <td>{plnFormatter.format(avarageStats[i].avarageIncome.toFixed(2))}</td>
                <td>{plnFormatter.format(-1*avarageStats[i].avarageExpenses.toFixed(2))}</td>
                <td>{plnFormatter.format(avarageStats[i].avarageBalance.toFixed(2))}</td>
            </tr>)
        }
    }

    return avarageStatsTBody;
}