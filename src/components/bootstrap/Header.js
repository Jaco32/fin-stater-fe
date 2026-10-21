import { useNavigate } from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";

function Header() {
    console.log("Rendering - Header")

    const navigate = useNavigate();

    let sign_up_flag = true;
    let sign_in_flag = true;
    let log_out_flag = false;
    let add_file_flag = false;
    
    if ((window.location.pathname === "/sign_in") ||
        (window.location.pathname === "/sign_up") || 
        (window.location.pathname === "/upload_transactions") || 
        (window.location.pathname === "/stats"))
    {
        sign_up_flag = !sign_up_flag;
        sign_in_flag = !sign_in_flag;
    }

    if ((window.location.pathname === "/upload_transactions") || (window.location.pathname === "/stats")) {
        log_out_flag = !log_out_flag;
    }

    if (window.location.pathname === "/stats") add_file_flag = !add_file_flag;

    function handleFileUpload(event) {
        const file = event.target.files[0];
        let myPromise = file.arrayBuffer();
        myPromise.then(
            function(value) {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", process.env.REACT_APP_BACKEND_URL + '/transaction/add/', false);
                xhr.setRequestHeader('mode', 'no-cors');
                if (file.name.split(".")[1] === "xlsx") {
                    xhr.setRequestHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                } else {
                    xhr.setRequestHeader('Content-Type', 'text/csv');
                }
                xhr.send(value);
                navigate("/stats", {
                    state: {
                        username: 'latest0902',
                        password: 'latest0902'
                    },
                    replace: true
                })
        });
    }

    function handleStatsClear() {
        var xhr = new XMLHttpRequest();
        xhr.open("PATCH", process.env.REACT_APP_BACKEND_URL + '/stat/clear', false);
        xhr.setRequestHeader('mode', 'no-cors');
        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.send(null);
        window.location.assign("/stats")
    }

    return (
        <Navbar className="navbar-dark bg-primary">
            <Container fluid className="ms-2 me-2">
                <Navbar.Brand href="/">FinStat</Navbar.Brand>
                <Navbar.Text>Basic Financial Statistics</Navbar.Text>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                {add_file_flag && (
                    <Form inline>
                        <InputGroup>
                            <Form.Label for="add-file">Add file</Form.Label>
                            <Form.Control type="file" onChange={handleFileUpload} id="add-file" style={{ opacity: 1, zIndex: -1, position: "absolute" }}/>
                        </InputGroup>
                    </Form>
                )}
                    
                {log_out_flag && (
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link onClick={handleStatsClear}>Clear Stats</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                )}

                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end me-2">
                    <Nav>
                        {sign_in_flag && (<Nav.Link href="/sign_in">Sign In</Nav.Link>)}
                        {sign_up_flag && (<Nav.Link href="/sign_up">Sign Up</Nav.Link>)}
                        {log_out_flag && (<Nav.Link href="/">Log Out</Nav.Link>)}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}   

export default Header;