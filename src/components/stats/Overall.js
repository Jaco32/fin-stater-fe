function Overall({stOverall}) {

    return(
        <table className="table table-sm table-hover">
            <thead className="table-primary">
                <tr style={{ fontSize: '12px' }}>
                    <th>Widok</th>
                    <th>Od</th>
                    <th>Do</th>
                    <th>Przychód</th>
                    <th>Wydatki</th>
                    <th>Dochód</th>
                    <th>Odliczone</th>
                </tr>
            </thead>
            <tbody style={{ fontSize: '12px'}}>{stOverall}</tbody>
        </table>
    )
}

export default Overall;