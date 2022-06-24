import React from 'react';
import {cx, css} from '@emotion/css';
import {useLocation} from 'react-router-dom';

import {useAlgorand} from '../../../Packages/Algorand';

import {Button} from '../../../Components';
import {Breadcrumbs} from '../../../Components/Page';
import {Editor, Field} from './components';

import {reducer} from './reducer.js';

import {colors} from '../../../utilities';

const initialCode = (
`#pragma version 6
int 1
return`
);

const styles = {
  title: css({
    margin: '0px 0 16px 0',
    fontSize: '1.5em',
  }),
  actions: css({
    '& > *': {
      marginRight: '16px',
    },
    '& > *:last-child': {
      marginRight: '0',
    }
  }),
  table: css({
    display: 'flex',
    flexDirection: 'row',
  }),
  fields: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: '8px',
    backgroundColor: colors.material.grey[100],
    borderRadius: '8px',
  }),
};

function Application(props) {
  const algorand = useAlgorand();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const applicationID = search.get('application');
  const [state, dispatch] = React.useReducer(reducer, {
    globalIntegers: 0,
    globalBytes: 0,
    localIntegers: 0,
    localBytes: 0,
    code: initialCode,
    title: 'HelloAlgorand',
    isDeployable: false,
    applicationID: applicationID
  });

  const editCode = (nextCode) => {
    dispatch({type: 'setCode', payload: nextCode});
  };
  const changeTitle = (nextTitle) => {
    dispatch({type: 'setTitle', payload: nextTitle});
  };
  const toggleDeployable = () => {
    dispatch({type: 'toggleDeployable'});
  };
  const deploy = async () => {
    // TODO: Find a way to define custom ClearStatePrograms.
    const clearStateProgram = `
      #pragma version 6
      int 1
      return
    `;
    await algorand.deploy(
      state.code,
      clearStateProgram,
      {
        global: {
          integers: state.globalIntegers,
          bytes: state.globalBytes
        },
        local: {
          integers: state.localIntegers,
          bytes: state.localBytes
        }
      },
      `App|${state.title}`
    );
  };

  const fetchApplication = React.useCallback(
    async () => {
      const application = await algorand.fetchApplication(state.applicationID);
      console.log(application.approvalCode);
    },
    [algorand, state.applicationID]
  );

  React.useEffect(() => {
    if (state.applicationID) {
      fetchApplication();
    }
  }, [state.applicationID, fetchApplication]);

  return (
    <>
      <Breadcrumbs />
      <h1 className="title">Application Author</h1>
      <h2 className="subtitle">Online TEAL editor</h2>
      <div className={cx(styles.title)}>
        <div className="field has-addons">
          <div className="control">
            <button className="button is-static">
              Name
            </button>
          </div>
          <div className="control">
            <input
              className="input"
              type="text"
              value={state.title}
              onChange={(event) => changeTitle(event.target.value)}
            />
          </div>
        </div>
      </div>
      <Editor
        source={state.code}
        isDeployable={state.isDeployable}
        onChange={editCode}
      />
      {state.isDeployable && !algorand.isConnected &&
        <div className="notification is-info">
          Please <strong>connect</strong> your Pera Algo Wallet in order to deploy this application.
        </div>
      }
      <div className={cx(styles.actions)}>
        <Button
          title={state.isDeployable ? 'Edit' : 'Parse'}
          onClick={toggleDeployable}
        />
        {state.isDeployable && algorand.isConnected &&
          <Button
            title="Deploy"
            onClick={deploy}
          />
        }
      </div>
      <div>
        <p className="title is-4" style={{marginTop: '32px'}}>
          Application Storage
        </p>
        <p className="subtitle is-6">
          TEAL requires that you specify how much Global and Local storage, in terms of integers and byte slices, your application requires.
        </p>
        <div className={cx(styles.table)}>
          <div>
            <div className="field" style={{marginRight: '16px'}}>
              <label className="label">Global</label>
              <div className={cx(styles.fields)}>
                <Field
                  title="Integers"
                  value={state.globalIntegers}
                  onChange={(nextValue) => dispatch({type: 'setGlobalIntegers', payload: nextValue})}
                />
                <Field
                  title="Bytes"
                  value={state.globalBytes}
                  onChange={(nextValue) => dispatch({type: 'setGlobalBytes', payload: nextValue})}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="field">
              <label className="label">Local</label>
              <div className={cx(styles.fields)}>
                <Field
                  title="Integers"
                  value={state.localIntegers}
                  onChange={(nextValue) => dispatch({type: 'setLocalIntegers', payload: nextValue})}
                />
                <Field
                  title="Bytes"
                  value={state.localBytes}
                  onChange={(nextValue) => dispatch({type: 'setLocalBytes', payload: nextValue})}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export {Application};