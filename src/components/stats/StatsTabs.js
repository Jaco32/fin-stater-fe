import { useNavigate, useLocation } from 'react-router-dom';

function StatsTabs() {
    console.log('StatsTabs - entered')

    const navigate = useNavigate();
    const location = useLocation();

    function navigateToStat(path) {
        navigate(path, {
            state: {
                username: location.state.username,
                password: location.state.password
            },
            replace: true
        })
    }

    return (
        <ul className="nav nav-tabs small justify-content-center mt-2">
            <li className="nav-item">
                <a className={window.location.pathname === '/overall' ? 'nav-link active' : 'nav-link'}  onClick={() => navigateToStat("/overall")}>Overall</a>
            </li>
            <li className="nav-item">
                <a className={window.location.pathname === '/monthly' ? 'nav-link active' : 'nav-link'} onClick={() => navigateToStat("/monthly")}>Monthly</a>
            </li>
            <li className="nav-item">
                <a className={window.location.pathname === '/categorized' ? 'nav-link active' : 'nav-link'} onClick={() => navigateToStat("/categorized")}>Categorized</a>
            </li>
        </ul>
    )
}

export default StatsTabs;
