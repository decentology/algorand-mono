import React from 'react';

import {Markdown} from '../../../Components';
import {Breadcrumbs} from '../../../Components/Page';

const content = `
Below you can see a sample TEAL application. It only has two \`methods\`: \`Add\` and \`Update\`, and a single *global* variable \`Count\`.


~~~TEAL
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
~~~


The TEAL language has [VS Code syntax highlighting](https://github.com/algorand/go-algorand/blob/21b4bc5394c5e193b47b8da4fa69b7f55e148b03/data/transactions/logic/teal.tmLanguage.json)
which uses [TextMate grammars](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide).


TEAL Opcodes are defined using the \`OpSpec\` struct.


~~~
type OpSpec struct {
  Opcode  byte
  Name    string
  op      evalFunc   // evaluate the op
  asm     asmFunc    // assemble the op
  dis     disFunc    // disassemble the op
  Args    StackTypes // what gets popped from the stack
  Returns StackTypes // what gets pushed to the stack
  Version uint64     // TEAL version opcode introduced
  Modes   runMode    // if non-zero, then (mode & Modes) != 0 to allow
  Details opDetails  // Special cost or bytecode layout considerations
}
~~~


An example instance of \`OpSpec\` - the \`log\` opcode.


~~~
{
  0xb0,
  "log",
  opLog,
  asmDefault,
  disDefault,
  oneBytes,
  nil,
  5,
  runModeApplication,
  opDefault
}
~~~
`;

function Draft(props) {
  return (
    <>
      <Breadcrumbs />
      <h1 className="title">TEAL</h1>
      <h2 className="subtitle">A place to learn more about how TEAL works</h2>
      <Markdown>
        {content}
      </Markdown>
    </>
  );
}

export {Draft};