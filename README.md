`htmltl` - HTML Template Literals
=================================

Tagged template literals for HTML in Javascript.

# Usage

```js
const { html } = require('htmltl');

const exampleCode = `
  const { html } = require('htmltl');
  console.log(html\`<p>hi</p>\`);
`;

const fontSize = 1000;

const head = html`
  <title>htmltl - HTML Template Literals</title>
  <style>body { font-size:${fontSize}em }</style>
`;

const body = html`
  <div>
    <h1><code>htmltl</code></h1>
    <h2>HTML Template Literals</h2>
    <p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals">Template Strings</a> for HTML</p>
    <h3>Example</h3>
    ${syntaxHilighted(exampleCode)}
  </div>
`;

function syntaxHilighted(code) {
  return html`<code><pre>${code}</pre></code>`;
}

console.log(html`
  <html>
    <head>${head}</head>
    <body>${body}</body>
  </html>
`.toString());
```
