function Avarage({stAvarage}) {

    return (
        <table className="table table-striped table-sm">
            <thead className="table-primary">
                <tr style={{ fontSize: '12px'}}>
                    <th>Avg. Income</th>
                    <th>Avg. Expense</th>
                    <th>Avg. Savings</th>
                </tr>
            </thead>
            <tbody style={{ fontSize: '12px'}}>{stAvarage}</tbody>              
        </table>
    )
}

export default Avarage;