const priority = {
  'space': 0,
  'space.line': 0,
  'invalid.illegal.teal': 3,
  'keyword.control.teal': 1,
  'keyword.other.teal': 1,
  'keyword.other.unit.teal': 1,
  'keyword.operator.teal': 1,
  'support.variable.teal': 1,
  'support.class.teal': 1,
  'support.function.teal': 1,
  'constant.numeric.teal': 1,
  'constant.character.escape.teal': 2,
  'variable.parameter.teal': 1,
  'comment.line.double-slash.teal': 1,
  'string.quoted.double.teal': 1,
  'string.quoted.triple.teal': 1,
  'string.unquoted.teal': 1,
};

class Token {
  static match(source, type, expression, group = null, parts = 1) {
    const tokens = [];
    let match = expression.exec(source);
    while (match !== null) {
      if (parts === 1) {
        const token = group === null ? match[0] : match[group];
        const start = match.index + match[0].indexOf(token);
        const end = start + token.length;
        tokens.push(
          new Token(type, token, start, end)
        );
      } else {
        // Works with tokenizeRange, splits up the token in start, middle, end.
        // Each part is of same type, but the end can now be correctly sorted as coming after the middle.
        let start = match.index;
        for (let part = 1; part <= parts; part += 1) {
          const token = match[part];
          const end = start + token.length;
          tokens.push(
            new Token(type, token, start, end)
          );
          start += token.length;
        }
      }

      // Continue searching for more tokens that match the expression.
      match = expression.exec(source);
    }

    return tokens;
  }
  constructor(type, value, start, end) {
    this.type = type;
    this.priority = priority[type];
    this.value = value;
    this.start = start;
    this.end = end;
  }
}

export {Token as default};