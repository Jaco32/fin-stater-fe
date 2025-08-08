function Monthly({stPerMonth}) {

    return (
        <table className="table table-striped table-bordered table-hover table-sm">
            <thead className="table-primary">
                <tr>
                    <th>Month</th>
                    <th>Income</th>
                    <th>Expenses</th>
                    <th>Balance</th>
                    <th>Stopa zwrotu</th>
                </tr>
            </thead>
            <tbody>{stPerMonth}</tbody>
        </table>
    )
}

export default Monthly;