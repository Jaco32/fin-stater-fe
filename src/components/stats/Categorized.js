function Categorized({stPerCt}) {

    return (
        <table className="table table-striped table-sm">
            <thead className="table-primary">
                <tr>
                    <th>Category</th>
                    <th>Expenses</th>
                </tr>
            </thead>
            <tbody>{stPerCt}</tbody>
        </table>
    )
}

export default Categorized;