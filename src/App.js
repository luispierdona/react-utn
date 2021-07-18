import './App.css';
import PersonasView from './personas/personas-view';
// import { Navbar, Nav, Container, NavItem } from 'react-bootstrap';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Switch, Link } from 'react-router-dom';

// bg="dark" variant="dark"
function App() {
  return (
    <div className="App">
      <>
      {/* <div>
        <div>
          <Navbar>
            <Navbar.Brand as={Link} to="/" >React-Bootstrap</Navbar.Brand>
            <Navbar.Collapse>
              <Nav className="mr-auto">
                <NavItem eventkey={1} href="/">
                  <Nav.Link as={Link} to="/" >Home</Nav.Link>
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div>
          <Switch>
            <Route exact path='/' component={PersonasView} />
            <Route render={function () {
              return <p>Not found</p>
            }} />
          </Switch>
        </div>
      </div> */}
      <PersonasView />
      </>
    </div>
  );
}

export default App;
