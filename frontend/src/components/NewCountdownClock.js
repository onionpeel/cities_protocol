import { useState, useEffect } from 'react';

const NewCountdownClock = ({blocksToExpiration}) => {
  let [days, setDays] = useState();
  let [hours, setHours] = useState();
  let [minutes, setMinutes] = useState();
  let [seconds, setSeconds] = useState();

  useEffect(() => {
    //convert blocksToExpiration to seconds; blocks are mined on Ethereum about every 15 seconds
    let timeRemaining = blocksToExpiration * 15;
    let _hours = Math.floor( (timeRemaining/(60*60)) % 24 );
    _hours = ('0' + _hours).slice(-2);
    let _days = Math.floor( timeRemaining/(60*60*24) );

    setHours(_hours);
    setDays(_days);
  }, []);




  return (
    <div>
      <div>
        days {days}
      </div>
      <div>
        hours {hours}
      </div>
    </div>
  )
};

export default NewCountdownClock;
