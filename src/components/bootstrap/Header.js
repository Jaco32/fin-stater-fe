import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function Header() {

    let sign_up_flag = true;
    let sign_in_flag = true;
    let log_out_flag = false;
    
    if ((window.location.pathname === "/sign_up") || 
        (window.location.pathname === "/upload_transactions") || 
        (window.location.pathname === "/stats"))
    {
        sign_up_flag = !sign_up_flag;
        sign_in_flag = !sign_in_flag;
    }

    if ((window.location.pathname === "/upload_transactions") || (window.location.pathname === "/stats")) {
        log_out_flag = !log_out_flag;
    }

    return (
        <>
            <Navbar className="navbar-dark bg-primary">
                <Container fluid className="ms-2 me-2">
                    <Navbar.Brand href="/">FinStat</Navbar.Brand>
                    <Navbar.Text>Basic Financial Statistics</Navbar.Text>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end me-2">
                        <Nav>
                            {sign_in_flag && (<Nav.Link href="/sign_in">Sign In</Nav.Link>)}
                            {sign_up_flag && (<Nav.Link href="/sign_up">Sign Up</Nav.Link>)}
                            {log_out_flag && (<Nav.Link href="/">Log Out</Nav.Link>)}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}   

export default Header;