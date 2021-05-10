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
  const [isEnglish, setLoc] = useState(localStorage.getItem('language'));

  if(isEnglish === 'english') {
    function setLoc() {
      localStorage.setItem('language', 'spanish');
    };
  } else {
    function setLoc() {
      localStorage.setItem('language', 'english');
    };
  };

  return [isEnglish, setLoc];
};

// let [isEnglish, setIsEnglish] = useState();
//
// useEffect(() => {
//   const main = () => {
//     let language = localStorage.getItem('language');
//     if(language === 'english') {
//       setIsEnglish(true);
//     };
//   };
// }, []);
