import React from 'react';
import {useLocation} from 'react-router-dom';

const Context = React.createContext({});

function Provider(props) {
  const location = useLocation();
  const [isVisible, setVisible] = React.useState(false);

  const toggle = () => {
    setVisible(wasVisible => !wasVisible);
  };

  React.useEffect(() => {
    setVisible(false);
  }, [location.pathname]);

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
  Context,
  Provider
};