import React, {useState} from 'react';

const Context = React.createContext({});

function Provider(props) {
  const [isVisible, setIsVisible] = useState(false);

  const toggle = () => {
    setIsVisible(isVisible ? false : true);
  }

  return (
    <Context.Provider
      value={{
        isVisible,
        toggle
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export {
  Context as default,
  Provider
};