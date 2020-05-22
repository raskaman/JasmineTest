const jq = require('jquery');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

resetDom();

function resetDom(windowUrl) {
  global.window = new JSDOM('', { url: windowUrl }).window;

  global.document = global.window.document;
  global.navigator = global.window.navigator;
  global.jQuery = global.$ = jq(global.window);
}
