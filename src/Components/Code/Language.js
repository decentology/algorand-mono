import Token from './Token.js';

import TEAL from './TEAL.TextMateLanguage.json';

const languages = {
  'TEAL': TEAL
};

class Language {
  constructor(language) {
    this.language = languages[language];
  }
  tokenizePatterns(source, patterns) {
    const tokens = [];

    for (const pattern of patterns) {
      if (pattern.name && pattern.match) {
        // A simple regular expression
        const expression = new RegExp(pattern.match, 'gm');
        tokens.push(
          ...Token.match(source, pattern.name, expression)
        );
      } else if (pattern.captures && pattern.match) {
        const expression = new RegExp(pattern.match, 'gm');
        for (const group in pattern.captures) {
          tokens.push(
            ...Token.match(source, pattern.captures[group].name, expression, group)
          );
        }
        
      }
    }

    return tokens;
  }
  tokenizeRange(source, name, begin, end) {
    // A simple range with a beginning and ending.
    const expression = new RegExp(`(${begin})(.*)(${end})`, 'gm');
    
    return Token.match(source, name, expression, null, 3);
  }
  tokenizeSpaces(source, sortedTokens) {
    const tokens = [];

    let start = 0;
    for (const token of sortedTokens) {
      if (start < token.start) {
        // If there is something before this token that's not been marked, generate raw token.
        const spaces = source.slice(start, token.start).split('\n');
        if (spaces.length > 1) {
          for (const space of spaces) {
            tokens.push(
              new Token('space', space, start, token.start)
            );
            tokens.push(
              new Token('space.line', '\n', start, token.start)
            );
          }
        } else {
          tokens.push(
            new Token('space', spaces[0], start, token.start)
          );
        }
      }

      tokens.push(token);

      start = token.end;
    }
    // Add any remaining raw tokens.
    if (start < source.length) {
      tokens.push(
        new Token('space', source.slice(start), start, source.length)
      )
    }

    return tokens;
  }
  tokenize(source) {
    const tokens = [];

    // Tokenize language.
    for (const reference of this.language.patterns) {
      if (typeof reference.include === 'string') {
        const repository = this.language.repository[reference.include.slice(1)];
        if (repository.name && repository.begin && repository.end) {
          tokens.push(
            ...this.tokenizeRange(source, repository.name, repository.begin, repository.end)
          );
        }
        if (repository.name && repository.match) {
          tokens.push(
            ...this.tokenizePatterns(source, [repository])
          );
        }
        if (repository.patterns) {
          tokens.push(
            ...this.tokenizePatterns(source, repository.patterns)
          );
        }
      }
    }

    // Tokenize spaces.
    const sortedTokens = [...tokens].sort((tokenA, tokenB) => tokenA.start - tokenB.start);
    // console.log(sortedTokens);
    const spacedTokens = this.tokenizeSpaces(source, sortedTokens);
    
    return spacedTokens;
  }
  flattenTokens(tokens) {
    const source = {};

    let length = 0;
    for (const token of tokens) {
      let cursor = 0;
      for (const character of token.value) {
        const position = token.start + cursor;
        if (typeof source[position] === 'undefined') {
          source[position] = [];
        }

        source[position].push({
          character,
          token
        });
        source[position].sort((a, b) => b.token.priority - a.token.priority);
        
        cursor += 1;
        length = position;
      }
    }

    const flatTokens = [];
    let previousToken = null;
    let previousPosition = 0;
    let value = '';
    for (let position = 0; position <= length; position += 1) {
      const item = source[position][0];

      if (previousToken === null) {
        value = item.character;
      } else if (previousToken.type !== item.token.type) {
        flatTokens.push(
          new Token(
            previousToken.type,
            value,
            position - value.length,
            position
          )
        );
        value = item.character;
      } else {
        value += item.character;
      }

      previousToken = item.token;
      previousPosition = position;
    }

    if (value.length > 0) {
      flatTokens.push(
        new Token(
          previousToken.type,
          value,
          previousPosition - value.length,
          previousPosition
        )
      );
    }

    return flatTokens;
  }
  parse(source, isSanitized = true) {
    let sanitizedSource = source;

    if (!isSanitized) {
      // Remove unnecessary spaces that would otherwise be marked a syntax errors.
      let buffer = [];
      const lines = sanitizedSource.split('\n');
      for (const line of lines){
        const sanitized = line.trim();
        if (sanitized.length > 0) {
          buffer.push(sanitized);
        }
      }

      sanitizedSource = buffer.join('\n');
    }

    const rawTokens = this.tokenize(sanitizedSource);
    const flatTokens = this.flattenTokens(rawTokens);

    return flatTokens;
  }
}

export {Language as default};