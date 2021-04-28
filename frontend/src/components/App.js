import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Home';
import About from './About';
import ProposalList from './ProposalList';
import Quiz from './Quiz';
import Header from './Header';
import CreateProposal from './CreateProposal';

function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/proposallist">
          <ProposalList />
        </Route>
        <Route path="/createproposal">
          <CreateProposal />
        </Route>
        <Route path="/quiz">
          <Quiz />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
