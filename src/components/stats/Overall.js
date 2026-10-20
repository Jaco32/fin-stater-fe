function Overall({stOverall}) {

    return(
        <table className="table table-sm table-hover">
            <thead className="table-primary">
                <tr style={{ fontSize: '12px' }}>
                    <th className="text-secondary">Widok</th>
                    <th className="text-secondary">Od</th>
                    <th className="text-secondary">Do</th>
                    <th className="text-secondary">Przychód</th>
                    <th className="text-secondary">Wydatki</th>
                    <th className="text-secondary">Dochód</th>
                    <th className="text-secondary">Odliczone</th>
                </tr>
            </thead>
            <tbody style={{ fontSize: '12px'}}>{stOverall}</tbody>
        </table>
    )
}

export default Overall;