import { useState } from 'react';

// export function useLocalState(localItem) {
//   const [loc, setState] = useState(localStorage.getItem(localItem));
//
//   function setLoc(newItem) {
//     localStorage.setItem(localItem, newItem);
//     setState(newItem);
//   };
//
//   return [loc, setLoc];
// };

export function useLocalState() {
  let [isEnglish, setLoc] = useState(localStorage.getItem('language'));

  if(isEnglish === 'english') {
    setLoc = () => {
      localStorage.setItem('language', 'spanish');
    };
  } else {
    setLoc = () => {
      localStorage.setItem('language', 'english');
    };
  };

  return [isEnglish, setLoc];
};
