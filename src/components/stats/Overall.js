function Overall({stOverall}) {

    return(
        <table className="table table-sm table-hover">
            <thead className="table-primary">
                <tr style={{ fontSize: '12px' }}>
                    <th className="text-secondary border border-secondary border-start-0 border-top-0">Widok</th>
                    <th className="text-secondary border border-secondary border-start-0 border-top-0">Od</th>
                    <th className="text-secondary border border-secondary border-start-0 border-top-0">Do</th>
                    <th className="text-secondary border border-secondary border-start-0 border-top-0">Przychód</th>
                    <th className="text-secondary border border-secondary border-start-0 border-top-0">Wydatki</th>
                    <th className="text-secondary border border-secondary border-start-0 border-top-0">Dochód</th>
                    <th className="text-secondary border border-secondary border-start-0 border-top-0">Odliczone</th>
                    <th className="text-secondary border border-secondary border-start-0 border-top-0">Przychód / m-c</th>
                    <th className="text-secondary border border-secondary border-start-0 border-top-0">Wydatki / m-c</th>
                    <th className="text-secondary border border-secondary border-start-0 border-top-0 border-end-0">Dochód / m-c</th>
                </tr>
            </thead>
            <tbody style={{ fontSize: '12px'}}>{stOverall}</tbody>
        </table>
    )
}

export default Overall;