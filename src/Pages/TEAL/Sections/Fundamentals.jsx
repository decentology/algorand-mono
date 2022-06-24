import React from 'react';

import {Markdown} from '../../../Components';
import {Breadcrumbs} from '../../../Components/Page';

const content = `
Without getting too much into the weeds, **TEAL** is the programming language for writing *Smart Contracts* (we call them **Applications**) on Algorand.

So, how does a TEAL Application look like? Here's one example

~~~TEAL:0,0,0,0
#pragma version 6
int 1
return
~~~

This is the smallest, valid TEAL application that you can deploy on Algorand. Even though this application does nothing, it provides some insight into how applications (smart contracts) work on Algorand.

## Versions

With \`#pragma version X\` you specify which version of the **AVM** (Algorand Virtual Machine) can execute your application. Currently, there are 6 versions, and I'm going to be using latest one, version \`6\`. The version declaration has to be the first thing in your code.

## Stack

TEAL is an assembly-like language and it uses a stack to keep track of data that you need while executing operations.

Let's say you want to add two numbers, in your typical, high-level, programming language you'd write something like this.

~~~JavaScript
return 2 + 3;
~~~

An equivalent program in TEAL would look like this.

~~~TEAL
int 2
int 3
+
return
~~~

Let's start with \`int\`, a *pseudo-op* code that places following value \`2\`, an *integer*, onto the *stack*. TEAL has only two types, \`int\` and \`byte\`, on that later.

So what's a **pseudo-op**? Simple, it's an **op** that abstracts many ops into a single op 🤓. But what's an **op**?

### Opcodes

In TEAL, every line is a single **op**, meaning *operation*. You specify which operation you want by using a code, also known as **Opcode**. You can find a list of all available opcodes [here](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/).

This means that each of the 4 lines aboves is an operation. \`int 2\` moves the integer \`2\` to the stack, \`int 3\` moves \`3\` to the stack, and even \`+\` is an operation that pops the top two integers off the stack, and pushes their sum back on.

### So what's a stack?

A stack is a container for data. Here's how an empty *stack* looks like.

![](/assets/illustrations/stack.empty.svg)

But it can grow to be really big, fitting as many as \`1000\` items. Here's a stack that contains 3 items: \`42\`, \`"hello"\`, \`0xFF\`.

![](/assets/illustrations/stack.full.svg)

Most *opcodes* take one or more items from the stack, do something with it, and then put zero or more items back to the stack, using the Last In First Out (LIFO) principle.

### Stepping through

OK, so going back to the \`2+3\` program, let's observe how the stack changes after every operation. We begin with an empty stack.

![](/assets/illustrations/stack.empty.svg)

~~~TEAL
int 2
~~~

We push \`2\` to the top of the stack.

![](/assets/illustrations/stack.2.svg)

~~~TEAL
int 3
~~~

Then \`3\` gets added to the top, pushing \`2\` below.

![](/assets/illustrations/stack.3.2.svg)

~~~TEAL
+
~~~

\`+\` is also an [opcode](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/#_1), it removes the top two integers from the stack, and puts their sum back in.

![](/assets/illustrations/stack.5.svg)

~~~TEAL
return
~~~

Finally, \`return\` checks to see if the top level item in stack is zero, if so - it fails the transaction, otherwise the transaction goes through.

## Summary

TEAL is the programming language used to write applications (smart contracts) for the Algorand blockchain. It uses a stack to store data and opcodes to call operations that manipulate the stack. A TEAL application transaction fails if the top of the stack contains zero, succeeds otherwise.

The full code sample is below.

~~~TEAL:0,0,0,0
#pragma version 6
int 2
int 3
+
return
~~~
`;

function Fundamentals(props) {
  return (
    <>
      <Breadcrumbs />
      <h1 className="title">Fundamentals</h1>
      <h2 className="subtitle">Getting started with TEAL</h2>
      <Markdown>
        {content}
      </Markdown>
    </>
  );
}

export {Fundamentals};