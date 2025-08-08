function Avarage({stAvarage}) {

    return (
        <table className="table table-striped table-bordered table-sm">
            <thead className="table-primary">
                <tr>
                    <th>Avg. Income</th>
                    <th>Avg. Expense</th>
                    <th>Avg. Savings</th>
                </tr>
            </thead>
            <tbody>{stAvarage}</tbody>              
        </table>
    )
}

export default Avarage;