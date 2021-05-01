
import { useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { TaroSimpleContext } from '../contexts/TaroSimpleContext';
import { ValidationRequiredContext } from '../contexts/ValidationRequiredContext';

import Home from './Home';
import About from './About';
import ProposalList from './ProposalList';
import Quiz from './Quiz';
import Header from './Header';
import CreateProposal from './CreateProposal';

function App() {
  let [taroSimple, setTaroSimple] = useState();
  let [isValidated, setIsValidated] = useState();

  return (
    <div>
      <ValidationRequiredContext.Provider value={{isValidated, setIsValidated}}>
        <TaroSimpleContext.Provider value={{taroSimple, setTaroSimple}}>
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
        </TaroSimpleContext.Provider>
      </ValidationRequiredContext.Provider>
    </div>
  );
}

export default App;
