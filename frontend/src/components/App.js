import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Quiz from './Quiz';
import Proposal from './Proposal';
import Education from './Education';
import Metamask from './Metamask';
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
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/quiz">Quiz</Link>
              </li>
              <li>
                <Link to="/proposal">Proposal</Link>
              </li>
              <li>
                <Link to="/education">Education</Link>
              </li>
              <li>
                <Link to="/metamask">Metamask</Link>
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
            <Route path="/education">
              <Education />
            </Route>
            <Route path="/metamask">
              <Metamask />
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
