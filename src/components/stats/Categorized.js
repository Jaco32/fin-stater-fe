function Categorized({stPerCt}) {

    return (
        <table>
            <tr>
                <th>Category</th>
                <th>Expenses</th>
            </tr>
            <tbody>{stPerCt}</tbody>
        </table>
    )
}

export default Categorized;