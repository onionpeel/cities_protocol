import { useState, useEffect } from 'react';

const CountdownClock = ({proposalTime}) => {
  let [days, setDays] = useState();
  let [hours, setHours] = useState();
  let [minutes, setMinutes] = useState();
  let [seconds, setSeconds] = useState();

  useEffect(() => {
    let _total, _seconds, _minutes, _hours, _days;

    function setEndInThreeDays(proposalTime_){
      _total = proposalTime_ + 259200000 - Date.parse(new Date());
      _seconds = Math.floor( (_total/1000) % 60 );
      _minutes = Math.floor( (_total/1000/60) % 60 );
      _hours = Math.floor( (_total/(1000*60*60)) % 24 );
      _days = Math.floor( _total/(1000*60*60*24) );
    };


    function initializeClock(_proposalTime) {

      function updateClock() {
        setEndInThreeDays(_proposalTime);
        _seconds = ('0' + _seconds).slice(-2);
        _minutes = ('0' + _minutes).slice(-2);
        _hours = ('0' + _hours).slice(-2);

        setSeconds(_seconds);
        setMinutes(_minutes);
        setHours(_hours);
        setDays(_days);

        if (_total <= 0) {
          clearInterval(timeinterval);
        };
      };

      updateClock();
      const timeinterval = setInterval(updateClock, 1000);
    };

    initializeClock(proposalTime);

  }, []);




  return (
    <div>
      <div>
        days {days}
      </div>
      <div>
        hours {hours}
      </div>
      <div>
        minutes {minutes}
      </div>
      <div>
        seconds {seconds}
      </div>
    </div>
  )
};

export default CountdownClock;
