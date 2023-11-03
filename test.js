const { assert } = require('chai');
const fs = require('node:fs');

const { html } = require('.');

describe('html``', () => {
  it('should return empty string for empty string', () => {
    // expect
    assert.equal(html``.toString(), '');
  });

  it('should convert basic HTML without args to identical string', () => {
    // expect
    assert.equal(html`<p>hi</p>`.toString(), '<p>hi</p>');
  });

  it('should process basic args', () => {
    // given
    const a = 1, b = 2;

    // expect
    assert.equal(html`<ol><li>${a}</li><li>${b}</li></ol>`.toString(),
                     '<ol><li>1</li><li>2</li></ol>');
  });

  it('should escape special chars', () => {
    // given
    const a = '<div>I am a code example</div>';
    const b = '& this is a "dodgy" \'attribute\' value';

    // expect
    assert.equal(
      html`<pre x-example="${b}">${a}</pre>`.toString(),
      '<pre x-example="&amp; this is a &quot;dodgy&quot; &apos;attribute&apos; value">&lt;div&gt;I am a code example&lt;/div&gt;</pre>',
    );
  });

  it('should not double-escape special chars in wrapped templates', () => {
    // given
    const a = '<div>I am a code example</div>';
    const b = '& this is a "dodgy" \'attribute\' value';

    // expect
    assert.equal(html`${html`<pre x-example="${b}">${a}</pre>`}`.toString(),
                     '<pre x-example="&amp; this is a &quot;dodgy&quot; &apos;attribute&apos; value">&lt;div&gt;I am a code example&lt;/div&gt;</pre>');
  });

  it('should encode README example', () => {
    // given
    const readmeJs = fs.readFileSync('./README.md', { encoding:'utf8' })
        .split('\n')
        .filter((() => {
          let inJs;
          return line => {
            if(inJs) {
              if(line === '```') return inJs = false;
              else return !line.match(/\brequire\(/);
            } else {
              if(line === '```js') inJs = true;
              return false;
            }
          };
        })())
        .map(line => line.replace('console.log', 'return '))
        .join('\n');

    // expect
    assert.equal(new Function('html', readmeJs)(html), `
  <html>
    <head>
  <title>htmltl - HTML Template Literals</title>
  <style>body { font-size:1000em }</style>
</head>
    <body>
  <div>
    <h1><code>htmltl</code></h1>
    <h2>HTML Template Literals</h2>
    <p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals">Template Strings</a> for HTML</p>
    <h3>Example</h3>
    <code><pre>
  return (html\`&lt;p&gt;hi&lt;/p&gt;\`);
</pre></code>
  </div>
</body>
  </html>
`);
  });
});
