//This component is being developed without access to a smart contract.  It needs to be set up with the smart contract before it will be ready to use.
//There is no styleing.  At this point, this component is just a way to hold functionality until it can be connected to a smart contract and development can be finished.
//Do not translate this until the component is finished since there will be many bugs to work out

//This component should be its own page, and put into the router in App.js
// <Route path="/setdelegate">
//   <SetDelegate />
// </Route>

// A link to this page can be set up with:
// <div>
//   <Link to="/setdelegate">Delegate your vote</Link>
// </div>

import { useContext, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { TaroContext } from '../contexts/TaroContext';
import { EthersContext } from '../contexts/EthersContext';
import { LanguageContext } from '../contexts/LanguageContext';
import IsLoadingModal from '../modals/IsLoadingModal';

const SetDelegate = () => {
  let [currentDelegate, setCurrentDelegate] = useState();
  let [newInputDelegate, setNewInputDelegate] = useState();
  let [loadingModalShow, setLoadingModalShow] = useState();

  let {taro} = useContext(TaroContext);
  let {ethersSigner} = useContext(EthersContext);
  let {isEnglish} = useContext(LanguageContext);

  useEffect(() => {
    const main = async () => {
      if(await ethersSigner.getAddress() !== 'undefined') {
        let userAddress = await ethersSigner.getAddress();
        let _currentDelegate = await taro.delegates(userAddress);
        SetDelegate(_currentDelegate);
      } else {
        setCurrentDelegate(0);
      };
    };
    main();
  });

  const handleChangeDelegate = async e => {
    e.preventDefault();
    setLoadingModalShow(true);
    let tx = await taro.delegate(newInputDelegate);
    await tx.wait(1);

    //reload the page? What flow to use?
    window.location.reload();

    handleOnLoadingModal();
  };

  const handleInputNewDelegate = e => {
    setNewInputDelegate(e.target.value);
  };

  const handleOnLoadingModal = () => {
    setLoadingModalShow(false);
  };

  return (
    <div>
      {isEnglish

      ?

      <div>
        {currentDelegate === 0
        ?
        <div>
          You have not delegated your votes
        </div>}
        :
        <div>
          You votes are currently delgated to: {currentDelegate}
        </div>
        <div>
          In order to vote, you must delegate your votes to your own address.  If you want to let someone else vote for you, you can delegate you votes to that person's address.
        </div>
        <Form inline onSubmit={handleChangeDelegate}>
          <Form.Group>
            <Form.Label htmlFor="newDelegate">New delegate</Form.Label>
            <Form.Control
              type="text"
              className="mx-sm-3"
              id="newDelegate"
              aria-describedby="newDelegateHelp"
              onChange={handleInputNewDelegate}
            />
            <Form.Text id="newDelegateHelp" muted>
              Enter the address to which you want to delegate your voting power.
            </Form.Text>
          </Form.Group>
          <Button>
            Change your delegate
          </Button>
        </Form>

        <IsLoadingModal
          show={loadingModalShow}
          onHide={handleOnLoadingModal}
        />
      </div>

      :

      <div>
        Spanish version goes here
      </div>
      }
    </div>
  );
};

export default SetDelegate;
