import { $, createElement, getData } from '../utils/dom' 
import { index } from '../utils/css-vars'
import { each } from '../utils/arrays'

import { add, resolve } from './plugin-manager'; 
import { CHARS } from '../plugins/chars';
import { copy } from '../utils/objects'; 

/**
 * # Splitting
 * 
 * @param opts {import('./types').ISplittingOptions} 
 */
export function Splitting (opts) {
  opts = opts || {};
  var key = opts.key;

  return $(opts.target || '[data-splitting]').map(function(el) {
    var ctx = el['🍌']; 
    console.log('force: ' + opts.force);
    if (!opts.force && ctx) {
      return ctx;
    }

    ctx = el['🍌'] = { el: el };
    var items = resolve(opts.by || getData(el, 'splitting') || CHARS);
    var opts2 = copy({}, opts);
    each(items, function(plugin) {
      if (plugin.split) {
        var pluginBy = plugin.by;
        var key2 = (key ? '-' + key : '') + plugin.key;
        var results = plugin.split(el, opts2, ctx);
        key2 && index(el, key2, results);
        ctx[pluginBy] = results;
        el.classList.add(pluginBy);
      } 
    });

    el.classList.add('splitting');
    return ctx;
  })
}

/**
 * # Splitting.html
 * 
 * @param opts {import('./types').ISplittingOptions}
 */
function html(opts) {
  opts = opts || {}
  var parent = opts.target =  createElement();
  parent.innerHTML = opts.content;
  Splitting(opts)
  return parent.outerHTML
}

Splitting.html = html;
Splitting.add = add;
