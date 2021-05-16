import { useState, useContext, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import IsLoadingModal from '../modals/IsLoadingModal';
import CreateProposalSuccessModal from '../modals/CreateProposalSuccessModal';
import CreateProposalErrorModal from '../modals/CreateProposalErrorModal';
import { LanguageContext } from '../contexts/LanguageContext';
import { GovernorAlphaContext } from '../contexts/GovernorAlphaContext';
import { EthersContext } from '../contexts/EthersContext';
import { TaroContext } from '../contexts/TaroContext';

import Taro from '../contracts/contracts/Taro.sol/Taro.json';
import taroAddress from '../contracts/contracts/Taro/contract-address.json';

import GovernorAlpha from '../contracts/contracts/GovernorAlpha.sol/GovernorAlpha.json';
import governorAlphaAddress from '../contracts/contracts/GovernorAlpha/contract-address.json';

const CreateProposal = () => {
  let [form, setForm] = useState();
  let [loadingModalShow, setLoadingModalShow] = useState();
  let [errorModalShow, setErrorModalShow] = useState();
  let [isConnected, setIsConnected] = useState();
  let [ethersProvider, setEthersProvider] = useState();
  let [signerAddress, setSignerAddress] = useState();
  let [successModalShow, setSuccessModalShow] = useState();

  let [isEnglish] = useContext(LanguageContext);
  let {ethersSigner, setEthersSigner, provider, setProvider} = useContext(EthersContext);
  let {taro, setTaro} = useContext(TaroContext);
  let {governorAlpha, setGovernorAlpha} = useContext(GovernorAlphaContext);

  useEffect(() => {
    const main = async () => {
      // setIsMetamaskInstalled(true);
      setIsConnected(false);
      try {
        //detect whether the browser is connected to a provider
        let ethereumProvider = await detectEthereumProvider();
        if (ethereumProvider) {
          // setProvider(ethereumProvider);
          startApp(ethereumProvider);
        } else {
          // setIsMetamaskInstalled(false);
          return;
        };
      } catch (error) {
        console.error(error);
      };

      async function startApp(_ethereumProvider) {
        try {
          //The provider detected by detectEthereumProvider() must be the same as window.ethereum
          if (_ethereumProvider !== window.ethereum) {
            // setIsMetamaskInstalled(false);
            return;
          };

          //Check if a MetaMask account has permission to connect to app
          let metamaskAccount;
          let accounts = await _ethereumProvider.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
              metamaskAccount = accounts[0];
              // setCurrentMetaMaskAccount(accounts[0]);
              // setIsMetamaskInstalled(true);
              setIsConnected(true);
            };
          console.log(`metamaskAccount ${metamaskAccount}`);

          //Force the browser to refresh whenever the network chain is changed
          // let chainId = await _ethereumProvider.request({ method: 'eth_chainId' });
          // _ethereumProvider.on('chainChanged', handleChainChanged);
          // console.log('chainId: ', chainId);

          //Create the Ethers.js provider and set it in state
          let _ethersProvider = await new ethers.providers.Web3Provider(_ethereumProvider);
          setEthersProvider(_ethersProvider);
          console.log('_ethersProvider: ', _ethersProvider)
          // make call to contract to check if current user is validated.
          // this may need to be done inside handleOnConnect as well
          // if user is validated, then set isValidated(true)

          if(accounts.length !== 0) {
            let signer = await _ethersProvider.getSigner();
            setEthersSigner(signer);

            const _taro = new ethers.Contract(
              taroAddress.Taro,
              Taro.abi,
              signer
            );
            setTaro(_taro);

            let _signerAddress = await signer.getAddress();
            // console.log("signerAddress: ", _signerAddress);
            setSignerAddress(_signerAddress);

            // let _userBalance = await _taro.balanceOf(signerAddress);
            // console.log('_userBalance in useEffect: ', _userBalance.toString());
            // if(_userBalance) {
            //   setUserBalance(_userBalance.toString());
            // };

            const _governorAlpha = new ethers.Contract(
              governorAlphaAddress.GovernorAlpha,
              GovernorAlpha.abi,
              signer
            );
            setGovernorAlpha(_governorAlpha);
          };
        } catch (error) {
          console.error(error);
        };
      };
    };
    main();
  }, []);

  //Delay function is only for development
  // const delay = () => new Promise(res => setTimeout(res, 2000));

  const handleOnSubmit = async e => {
    e.preventDefault();
    setLoadingModalShow(true);
    console.log('form: ', form);

    try {
      // console.log('gov: ', governorAlpha)
      let tx = await governorAlpha.propose(form);
      let txReceipt = await tx.wait(1);
      console.log('form tx: ', txReceipt);
      handleOnLoadingModal();
      setSuccessModalShow(true);
    } catch (e) {
      handleOnLoadingModal();
      setErrorModalShow(true);
    };
  };
  //expiration and requiredTaroToVote are hardcoded because these fields are needed for the smart contract.  The front end is not ready to use these fields.  Later, when the front end is ready, these inputs can be added back into the form inputs.
  const setField = (field, value) => {
    const date = new Date();
    const time = date.getTime();
    let timeAsBigNumber = ethers.BigNumber.from(time);

    setForm({
      ...form,
      [field]: value,
      expiration: 0,
      requiredTaroToVote: 0,
      proposalTime: timeAsBigNumber,
      proposer: signerAddress
    });
  };

  const handleOnChangeTitle = e => {
    setField('title', (e.target.value).toString());
  };

  const handleOnChangeTypeOfAction = e => {
    setField('typeOfAction', (e.target.value).toString());
  };

  const handleOnChangeNeighborhood = e => {
    setField('neighborhood', (e.target.value).toString());
  };

  const handleOnChangePersonInCharge = e => {
    setField('personInCharge', (e.target.value).toString());
  };

  const handleOnChangeDescription = e => {
    setField('description', (e.target.value).toString());
  };

  const handleOnChangeExpiration = e => {
    setField('expiration', ethers.BigNumber.from(e.target.value));
  };

  const handleOnChangeBudget = e => {
    if(e.target.value === '') {
      return;
    };
    if(isNaN(e.target.value)) {
      return;
    };
    setField('budget', ethers.BigNumber.from(e.target.value));
  };

  const handleOnChangeRequiredTaroToVote = e => {
    setField('requiredTaroToVote', ethers.BigNumber.from(e.target.value));
  };

  const handleOnLoadingModal = () => {
    setLoadingModalShow(false);
  };

  const handleOnErrorModal = () => {
    setErrorModalShow(false);
  };

  const handleOnAlreadySubmitted = () => {
    window.location.reload();
  };

  return (
    <div className ="App">
      {isEnglish === 'english'

        ?

        <div className="gray">
          <Form className="create">
          <p className="orange2">Create new urban governance proposal</p>
          <p className="purple3">⚠️All fields need to be filled out⚠️</p>
            <Form.Group as={Row} controlId="formTitle">
              <Form.Label>
                Title
              </Form.Label>
              <Form.Control type="text"
                placeholder="Give your proposal a name"
                onChange={handleOnChangeTitle}/>
            </Form.Group>

            <Form.Group as={Row} controlId="formTypeOfAction">
              <Form.Label  >
                Type of action
              </Form.Label>
              <Form.Control type="text"
                placeholder="What sort of activity will this be?"
                onChange={handleOnChangeTypeOfAction}/>
            </Form.Group>

            <Form.Group as={Row} controlId="formNeighborhood">
              <Form.Label  >
                Neighborhood
              </Form.Label>
                <Form.Control type="text"
                  placeholder="Where will it take place?"
                  onChange={handleOnChangeNeighborhood}/>
            </Form.Group>

            <Form.Group as={Row} controlId="formPersonInCharge">
              <Form.Label  >
                Person in charge
              </Form.Label>
                <Form.Control type="text"
                  placeholder="Who is responsible for it?"
                  onChange={handleOnChangePersonInCharge}/>
            </Form.Group>

            <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
              <Form.Label  >
                Description
            </Form.Label>
            <Form.Control as="textarea"
              type="text" rows={3}
              placeholder="Provide details about your proposal"
              onChange={handleOnChangeDescription}/>
            </Form.Group>
            {/*
            <Form.Group as={Row} controlId="formExpiration">
              <Form.Label  >
                Expiration
              </Form.Label>
              <Form.Control type="text" placeholder="expiration" onChange={handleOnChangeExpiration}/>
            </Form.Group>
            */}
            <Form.Group as={Row} controlId="formBudget">
              <Form.Label  >
                Budget
              </Form.Label>
              <Form.Control type="text"
                placeholder="How much will it cost? (In Pesos)"
                onChange={handleOnChangeBudget}/>
            </Form.Group>
            {/*
            <Form.Group as={Row} controlId="formRequiredTaroToVote">
              <Form.Label  >
                Required TARO to vote
            </Form.Label>
              <Form.Control type="text" placeholder="required TARO to vote" onChange={handleOnChangeRequiredTaroToVote}/>
            </Form.Group>
            */}

            <Button className="submitbutton"classntype="submit" onClick={handleOnSubmit}>Submit proposal</Button>
            </Form>
          <IsLoadingModal
            show={loadingModalShow}
            onHide={handleOnLoadingModal}
          />

          <CreateProposalErrorModal
            show={errorModalShow}
            onHide={handleOnErrorModal}
          />

          <CreateProposalSuccessModal
            show={successModalShow}
            onHide={handleOnAlreadySubmitted}
          />
        </div>

        :

        <div className="gray">
          <Form className="create" >
            <p className="orange2">Crear nueva propuesta de gobernanza urbana</p>
            <p className="purple3">⚠️Debes llenar todos los campos⚠️</p>
              <Form.Group as={Row} controlId="formTitle">
                <Form.Label>
                  Título
                </Form.Label>
                <Form.Control type="text" placeholder="Nombra tu propuesta en un enunciado" onChange={handleOnChangeTitle}/>
              </Form.Group>

              <Form.Group as={Row} controlId="formTypeOfAction">
                <Form.Label  >
                  Tipo de acción
                </Form.Label>
                <Form.Control type="text" placeholder="Obra pública, actividad, servicio" onChange={handleOnChangeTypeOfAction}/>
              </Form.Group>

              <Form.Group as={Row} controlId="formNeighborhood">
                <Form.Label  >
                  Colonia
                </Form.Label>
                  <Form.Control type="text" placeholder="En que colonia es tu propuesta" onChange={handleOnChangeNeighborhood}/>
              </Form.Group>

              <Form.Group as={Row} controlId="formPersonInCharge">
                <Form.Label  >
                  Persona o entidad a cargo
                </Form.Label>
              <Form.Control type="text" placeholder="¿Quien tiene que hacerlo?" onChange={handleOnChangePersonInCharge}/>
              </Form.Group>
              <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                <Form.Label  >
                  Descripción
              </Form.Label>
                <Form.Control as="textarea" type="field" rows={3} placeholder="Describe a detalle tu propuesta, ¡mientras más información mejor!" onChange={handleOnChangeDescription}/>
              </Form.Group>
              {/*}
              <Form.Group as={Row} controlId="formExpiration">
                <Form.Label  >
                  Expiración
                </Form.Label>
                <Form.Control type="text" placeholder="expiration" onChange={handleOnChangeExpiration}/>
              </Form.Group>
              */}
              <Form.Group as={Row} controlId="formBudget">
                <Form.Label  >
                  Presupuesto
              </Form.Label>
                <Form.Control type="text" placeholder="¿Cuanto cuesta en pesos realizar esta propuesta" onChange={handleOnChangeBudget}/>
              </Form.Group>
              {/*}
              <Form.Group as={Row} controlId="formRequiredTaroToVote">
                <Form.Label  >
                  TARO delegado minimo
              </Form.Label>
                <Form.Control type="text" placeholder="Establece el TARO minimo para votar" onChange={handleOnChangeRequiredTaroToVote}/>
              </Form.Group>
              */}
              <Button className="submitbutton"classntype="submit" onClick={handleOnSubmit}>Enviar propuesta</Button>
            </Form>

            <IsLoadingModal
              show={loadingModalShow}
              onHide={handleOnLoadingModal}
            />

            <CreateProposalErrorModal
              show={errorModalShow}
              onHide={handleOnErrorModal}
            />

            <CreateProposalSuccessModal
              show={successModalShow}
              onHide={handleOnAlreadySubmitted}
            />
        </div>
        }
      </div>
      );
    };

export default CreateProposal;
