
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ValidationRequiredContext } from '../contexts/ValidationRequiredContext';
import { TaroContext } from '../contexts/TaroContext';
import { GovernorAlphaContext } from '../contexts/GovernorAlphaContext';
import { LanguageContext } from '../contexts/LanguageContext';
import { EthersContext } from '../contexts/EthersContext';

import Home from './Home';
import About from './About';
import ProposalList from './ProposalList';
import Quiz from './Quiz';
import Header from './Header';
import CreateProposal from './CreateProposal';

function App() {
  let [isValidated, setIsValidated] = useState();
  let [taro, setTaro] = useState();
  let [isEnglish, setIsEnglish] = useState();
  let [governorAlpha, setGovernorAlpha] = useState();
  let [ethersSigner, setEthersSigner] = useState();

  return (
    <div>
      <LanguageContext.Provider value={{isEnglish, setIsEnglish}}>
        <GovernorAlphaContext.Provider value={{governorAlpha, setGovernorAlpha}}>
          <TaroContext.Provider value={{taro, setTaro}}>
            <EthersContext.Provider value={{ethersSigner, setEthersSigner}}>
              <ValidationRequiredContext.Provider value={{isValidated, setIsValidated}}>
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
              </ValidationRequiredContext.Provider>
            </EthersContext.Provider>
          </TaroContext.Provider>
        </GovernorAlphaContext.Provider>
      </LanguageContext.Provider>
    </div>
  );
}

export default App;
