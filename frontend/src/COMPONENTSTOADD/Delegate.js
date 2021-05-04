//This component is being developed without access to a smart contract.  It needs to be set up with the smart contract before it will be ready to use.
import { useContext, useEffect, useState } from 'react';
import { TaroContext } from '../contexts/TaroContext';
import { EthersContext } from '../contexts/EthersContext';

const Delegate = () => {
  let {taro} = useContext(TaroContext);
  let {ethersSigner} = useContext(EthersContext);

  useEffect(() => {
    const main = async () => {
      if(await ethersSigner.getAddress() !== 'undefined') {
        
      };
    };
    main();
  });

  return (

  );
};

export default Delegate;
