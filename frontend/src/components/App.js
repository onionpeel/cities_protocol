import Header from './Header';
import Footer from './Footer';
import HomeLocked from './HomeLocked';
import Quiz from './Quiz';
import Proposal from './Proposal';
import Signup from './Signup';
import Governance from './Governance';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">HomeLocked</Link>
              </li>
              <li>
                <Link to="/quiz">Quiz</Link>
              </li>
              <li>
                <Link to="/proposal">Proposal</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/governance">Governance</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/quiz">
              <Quiz />
            </Route>
            <Route path="/proposal">
              <Proposal />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/goverance">
              <Governance />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
      <br></br>
      <Footer />
    </div>
  );
}

export default App;
