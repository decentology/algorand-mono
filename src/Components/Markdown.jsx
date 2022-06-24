import ReactMarkdown from 'react-markdown';
import {Link} from 'react-router-dom';
import {cx, css} from '@emotion/css';

import {Code} from './Code';

const styles = {
  content: css({
    gridColumnStart: '1 !important',
    gridColumnEnd: '4 !important',
    display: 'grid',
    gridTemplateColumns: '32px 1fr 32px',
    // Makes rows act like regular divs in a column flexbox.
    gridAutoRows: 'max-content',
    '& > *': {
      gridColumnStart: '2',
      gridColumnEnd: '2',
    },
  }),
  listItem: css({
    '&:not(:first-child)': {
      marginTop: '8px',
    },
    '& > p:not(:last-child)': {
      marginBottom: '4px',
    }
  }),
};

function Markdown(props) {
  return (
    <div
      className={cx({
        'content': true,
        [styles.content]: true
      })}
    >
      <ReactMarkdown
        children={props.children}
        components={{
          a: ({node, inline, className, children, ...props}) => {
            if (props.href.startsWith('/')) {
              // This is a local link.
              return (
                <Link to={props.href}>
                  {children}
                </Link>
              );
            } else {
              // Send people out into the Internet.
              return (
                <a
                  {...props}
                  target="_blank"
                  rel="noreferrer"
                >
                  {children}
                </a>
              );
            }
          },
          li: ({node, inline, className, children, ...props}) => {
            return (
              <li className={cx(styles.listItem)}>{children}</li>
            );
          },
          pre: ({node, inline, className, children, ...props}) => {
            return children;
          },
          code: ({node, inline, className, children, ...props}) => {
            const match = /language-(\w+)/.exec(className || '');
            
            if (inline) {
              return (
                <code>{children}</code>
              );
            } else {
              const source = String(children);
              if (match) {
                const language = match[0].replace('language-', '');

                if (language === 'TEAL') {
                  // State allocation declaration
                  // TEAL:global.bytes,global.ints,local.bytes,local.ints.
                  const settings = /TEAL:(\d+),(\d+),(\d+),(\d+)/.exec(match.input);
                  const isDeployable = settings !== null;
                  
                  return (
                    <Code
                      source={source}
                      language={language}
                      isDeployable={isDeployable}
                      stateAllocation={
                        isDeployable ?
                        {
                          global: {
                            bytes: settings[1],
                            integers: settings[2]
                          },
                          local: {
                            bytes: settings[3],
                            integers: settings[4]
                          }
                        } :
                        null
                      }
                    />
                  );
                } else {
                  return (
                    <Code source={source} language={language} />
                  );
                }
              } else {
                return (
                  <Code source={source} />
                );
              }
            }
          }
        }}
      />
    </div>
  );
}

export {Markdown};