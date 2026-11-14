function StatsTabs() {
    console.log('StatsTabs - entered')

    return (
        <ul className="nav nav-tabs small justify-content-center mt-2">
            <li className="nav-item">
                <a className={window.location.pathname === '/overall' ? 'nav-link active' : 'nav-link'}  href="/overall">Overall</a>
            </li>
            <li className="nav-item">
                <a className={window.location.pathname === '/monthly' ? 'nav-link active' : 'nav-link'} href="/monthly">Monthly</a>
            </li>
            <li className="nav-item">
                <a className={window.location.pathname === '/categorized' ? 'nav-link active' : 'nav-link'} href="/categorized">Categorized</a>
            </li>
        </ul>
    )
}

export default StatsTabs;
