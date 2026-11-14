import { useNavigate, useLocation } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";

function Header() {
    console.log("Header - entering/rendering")

    const navigate = useNavigate();
    const location = useLocation();

    let sign_up_flag = true;
    let sign_in_flag = true;
    let log_out_flag = false;
    let add_file_flag = false;
    
    if ((window.location.pathname === "/sign_in") ||
        (window.location.pathname === "/sign_up") || 
        (window.location.pathname === "/upload_transactions") || 
        (window.location.pathname === "/overall") ||
        (window.location.pathname === "/monthly") ||
        (window.location.pathname === "/categorized"))
    {
        sign_up_flag = !sign_up_flag;
        sign_in_flag = !sign_in_flag;
    }

    if ((window.location.pathname === "/upload_transactions") ||
        (window.location.pathname === "/overall") ||
        (window.location.pathname === "/monthly") ||
        (window.location.pathname === "/categorized"))
    {
        log_out_flag = !log_out_flag;
    }

    if ((window.location.pathname === "/overall") ||
        (window.location.pathname === "/monthly") ||
        (window.location.pathname === "/categorized"))
    {
        add_file_flag = !add_file_flag;
    }

    function handleFileUpload(event) {
        window.event.preventDefault();
        
        const file = event.target.files[0];
        let myPromise = file.arrayBuffer();
        myPromise.then(
            function(value) {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", process.env.REACT_APP_BACKEND_URL + '/transaction/add/', false);
                const creds = btoa(location.state.username + ":" + location.state.password);
                xhr.setRequestHeader('Authorization', 'Basic ' + creds)
                if (file.name.split(".")[1] === "xlsx") {
                    xhr.setRequestHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                } else {
                    xhr.setRequestHeader('Content-Type', 'text/csv');
                }
                xhr.send(value);
                navigate("/overall", {
                    state: {
                        username: location.state.username,
                        password: location.state.password
                    },
                    replace: true
                })
        });
    }

    function handleStatsClear() {
        var xhr = new XMLHttpRequest();
        xhr.open("PATCH", process.env.REACT_APP_BACKEND_URL + '/stat/clear', false);
        const creds = btoa(location.state.username + ":" + location.state.password);
        xhr.setRequestHeader('Authorization', 'Basic ' + creds)
        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.send(null);
        
        navigate("/overall", {
            state: {
                username: location.state.username,
                password: location.state.password
            },
            replace: true
        })
    }

    return (
        <Navbar className="navbar-dark bg-primary">
            <Container fluid className="ms-2 me-2">
                <Navbar.Brand href="/">FinStat</Navbar.Brand>
                <Navbar.Text>Statystyki Finansowe</Navbar.Text>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                {add_file_flag && (
                    <Form>
                        <InputGroup>
                            <Form.Label htmlFor="add-file">Dodaj plik z tranzakcjami</Form.Label>
                            <Form.Control type="file" onChange={handleFileUpload} id="add-file" style={{ opacity: 1, zIndex: -1, position: "absolute" }}/>
                        </InputGroup>
                    </Form>
                )}
                    
                {log_out_flag && (
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link onClick={handleStatsClear}>Wyczyść statystyki</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                )}

                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end me-2">
                    <Nav>
                        {sign_in_flag && (<Nav.Link href="/sign_in">Zaloguj</Nav.Link>)}
                        {sign_up_flag && (<Nav.Link href="/sign_up">Stwórz Konto</Nav.Link>)}
                        {log_out_flag && (<Nav.Link href="/">Wyloguj</Nav.Link>)}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}   

export default Header;