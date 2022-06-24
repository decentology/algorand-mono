import {cx, css} from '@emotion/css';

import {useAlgorand} from '../../Packages/Algorand/useAlgorand.js';

import Language from './Language.js';

import * as categories from './categories.js';

import {Button} from '../Button.jsx';

import {colors, breakpoints} from '../../utilities';

const styles = {
  container: css({
    position: 'relative',
    gridColumnStart: '2',
    gridColumnEnd: '3',
    display: 'flex',
    flexDirection: 'row',
    margin: '0 0 16px 0',
    padding: '0 !important',
    backgroundColor: colors.material.grey[100],
    borderRadius: '4px',
    border: `1px solid ${colors.material.grey[300]}`,
    fontSize: '14px',
    [breakpoints.mobile]: {
      gridColumnStart: '1 !important',
      gridColumnEnd: '4 !important',
      borderRadius: '0px',
      borderWidth: '1px 0 1px 0',
    }
  }),
  lineNumbers: css({
    padding: '16px 8px 16px 16px',
    textAlign: 'right',
    color: colors.material.grey[400],
    backgroundColor: colors.material.grey[100],
    userSelect: 'none',
    [breakpoints.mobile]: {
      display: 'none',
    }
  }),
  code: css({
    flex: '1',
    padding: '16px 16px 16px 8px',
    [breakpoints.mobile]: {
      padding: '16px 32px 16px 32px',
    }
  }),
  isTight: css({
    padding: '16px 16px 16px 8px',
    [breakpoints.mobile]: {
      padding: '16px 16px 16px 16px',
    }
  }),
  deployment: css({
    position: 'absolute',
    top: '8px',
    right: '16px',
  }),
};

function Code(props) {
  const algorand = useAlgorand();
  const source = props.source.trim();
  const code = [];

  if (props.language === 'TEAL') {
    const language = new Language('TEAL');
    const tokens = language.parse(source, props.isSanitized === true);
    
    let line = [];
    let key = 0;
    for (const token of tokens) {
      // Render each token as a span.
      let value = token.value;
      if (token.type === 'space' && false) {
        value = value.replaceAll(' ', '·');
      }
      
      line.push(
        <span key={key} className={cx(categories.findStyle(token.type))}>
          {value}
          {false && `[${token.type}]`}
        </span>
      );
  
      if (token.type === 'space.line') {
        code.push(line);
        line = [];
      }
  
      // Continue iterating over tokens.
      key += 1;
    }
    if (line.length > 0) {
      code.push(line);
    }
  } else {
    // For every other language, just split into lines.
    for (const line of source.split('\n')) {
      code.push(line);
    }
  }

  const onDeploy = async () => {
    if (algorand.isConnected) {
      // Take the source code that's displayed as the ApprovalProgram.
      const approvalProgram = source;
      // TODO: Find a way to define custom ClearStatePrograms.
      const clearStateProgram = `
        #pragma version 6
        int 1
        return
      `;

      const result = await algorand.deploy(
        approvalProgram,
        clearStateProgram,
        props.stateAllocation
      );
      console.log(result);
    }
  };

  const isDeployable = (
    props.isDeployable &&
    algorand.isConnected
  );

  return (
    <pre
      className={cx(styles.container)}
      style={{
        backgroundColor: props.background
      }}
    >
      {isDeployable &&
        <div className={cx(styles.deployment)}>
          <Button
            title="Deploy"
            onClick={onDeploy}
          />
        </div>
      }
      <code
        className={cx(styles.lineNumbers)}
        style={{
          backgroundColor: props.background
        }}
      >
        {code.map((line, index) => {
          return (
            <div key={`line-number-${index}`}>
              {index + 1}
            </div>
          );
        })}
      </code>
      <code
        className={cx({
          [styles.code]: true,
          [styles.isTight]: props.isTight
        })}
      >
        {code.map((line, index) => {
          return (
            <div key={`line-${index}`}>
              {line}
            </div>
          );
        })}
      </code>
    </pre>
  );
}

export {Code};