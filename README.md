`htmltl` - HTML Template Literals
=================================

Tagged template literals for HTML in Javascript.

# Usage

```js
const { html } = require('htmltl');

const fontSize = 1000;
const mdnUrl = 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals';

const head = html`
  <title>htmltl - HTML Template Literals</title>
  <style>body { font-size:${fontSize}em }</style>
`;

const body = html`
  <div>
    <h1><code>htmltl</code></h1>
    <h2>HTML Template Literals</h2>
    <p><a href="${mdnUrl}">Template Strings</a> for HTML</p>
    <h3>Example</h3>
    ${syntaxHilighted(html`<p>hi</p>`)}
  </div>
`;

function syntaxHilighted(code) {
  return html`<code><pre>${code.toString()}</pre></code>`;
}

console.log(html`
  <html>
    <head>${head}</head>
    <body>${body}</body>
  </html>
`.toString());
```
