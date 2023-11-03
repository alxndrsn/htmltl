module.exports = { html };

const RGX = /[<>"'&]/g;
const ENTITIES = {
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  '"': '&quot;',
  "'": '&apos;',
};
const encoded = v => ENTITIES[v];

function html([ head, ...tail ], ...values) {
  const zipped = [ head ];
  const len = tail.length;
  for(let i=0; i<len; ++i) {
    const v = values[i];
    zipped.push(v instanceof Html ? v : v?.toString().replace(RGX, encoded));
    zipped.push(tail[i]);
  }
  return new Html(zipped);
}

class Html {
  constructor(content) {
    this.content = content;
  }

  toString() {
    let bob = '';
    for(let i=0; i<this.content.length; ++i) bob += this.content[i].toString();
    return bob;
  }
}
