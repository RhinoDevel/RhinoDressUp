
// (c) Marcel Timm, RhinoDevel, 2019

/** To be executed as last JavaScript file on page load.
 */
(function() // IIFE
{
    'use strict';

    var v = {};

    v.ele = {};
    v.ele.roomOne = document.createElement('div');
    // v.ele.roomTwo = document.createElement('div');

    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.border = '0px none';
    document.body.style.padding = '0px';
    document.body.style.margin = '0px';

    document.body.style.display = 'flex';
    document.body.style['justify-content'] = 'center';
    document.body.style['align-items'] = 'center';

    document.body.appendChild(v.ele.roomOne);
    v.ele.roomOne.style.order = String(1);
    v.ele.roomOne.style.position = 'relative';
    // document.body.appendChild(v.ele.roomTwo);
    // v.ele.roomTwo.style.order = String(2);
    // v.ele.roomTwo.style.position = 'relative';

    RhinoDressUp.room.init(v.ele.roomOne);
    // RhinoDressUp.room.init(v.ele.roomTwo);
}());
