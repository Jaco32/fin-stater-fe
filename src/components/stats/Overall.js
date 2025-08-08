function Overall({stOverall}) {

    return(
        <table className="table table-sm">
            <thead className="table-primary">
                <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Income</th>
                    <th>Expenses</th>
                    <th>Balance</th>
                    <th>View name</th>
                </tr>
            </thead>
            <tbody>{stOverall}</tbody>
        </table>
    )
}

export default Overall;