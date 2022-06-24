import {createContext} from 'react';
import algosdk from 'algosdk';

import {useAlgorand} from '../Algorand';

const applicationID = 82724157;

const Context = createContext();

function Provider(props) {
  const algorand = useAlgorand();

  const applicationABI = {
    "name": "Numbers",
    "desc": "You can manipulate a single int field.",
    "networks": {
      "SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=": {
        "appID": 82724157
      }
    },
    "methods": [
      {
        "name": "Add",
        "desc": "Increment field by one.",
        "args": [],
        "returns": {
          "type": "void"
        }
      },
      {
        "name": "Update",
        "desc": "Set field value to a specific integer value.",
        "args": [
          {
            "type": "uint64",
            "name": "value",
            "desc": "This will replace the current application value."
          }
        ],
        "returns": {
          "type": "void"
        }
      }
    ]
  };
  const application = new algosdk.ABIContract(applicationABI);
  // console.log(application);

  const deploy = async () => {
    const approvalCode = `
      #pragma version 6
      txn ApplicationID
      int 0
      ==
      bnz initialize
      //
      // Do nothing.
      //
      int 1
      return
      //
      // Initialize application
      //
      initialize:
        byte "Count"
        int 0
        app_global_put
        int 1
        return
    `;
    const clearCode = `
      #pragma version 6
      int 1
      return
    `;
    const result = await algorand.deploy(
      approvalCode,
      clearCode,
      {
        global: {
          ints: 1,
          bytes: 0
        },
        local: {
          ints: 0,
          bytes: 0
        }
      }
    );
    console.log(result);
  };

  const redeploy = async () => {
    const approvalCode = `
      #pragma version 6
      // Transaction to create the application.
      txn ApplicationID
      int 0
      ==
      bnz initialize
      // Transaction to update the application.
      txn OnCompletion
      int UpdateApplication
      ==
      bnz initialize
      // Transaction to increment value.
      txna ApplicationArgs 0
      byte "Add"
      ==
      bnz increment
      // Transaction to set value.
      txna ApplicationArgs 0
      byte "Update"
      ==
      bnz update
      //
      // Do nothing.
      //
      int 1
      return
      //
      // Initialize application
      //
      initialize:
        byte "Count"
        int 0
        app_global_put
        int 1
        return
      //
      // Increment value
      //
      increment:
        byte "Count"
        app_global_get
        store 0
        byte "Count"
        load 0
        int 1
        +
        app_global_put
        byte "incremented"
        log
        int 1
        return
      //
      // Set value
      //
      update:
        byte "Count"
        txna ApplicationArgs 1
        btoi
        app_global_put
        byte "updated"
        log
        int 1
        return
    `;
    const clearCode = `
      #pragma version 6
      int 1
      return
    `;
    const result = await algorand.redeploy(applicationID, approvalCode, clearCode);
    console.log(result);
  };

  const add = async () => {
    console.log('add');
    const result = await algorand.execute(applicationID, 'Add', [26]);
    console.log(result);
  };

  const addABI = async () => {
    const result = await algorand.executeABI(application, 'Update', [33]);
    console.log(result);
  };
  
  return (
    <Context.Provider
      value={{
        deploy,
        redeploy,
        add,
        addABI
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