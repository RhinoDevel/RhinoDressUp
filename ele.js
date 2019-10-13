
// (c) Marcel Timm, RhinoDevel, 2019

/** To be run during page load to augment global RhinoDressUp object with new
 *  property called ele, which is an object holding functions to create
 *  and handle HTML elements.
 */
(function() // IIFE
{
    'use strict';

    var v = {},
        f = {};

    RhinoDressUp.ele = {};

    RhinoDressUp.ele.createImg = function(t, l, w, h, src)
    {
        var retVal = new Image(w, h);

        if(typeof t === 'number')
        {
            retVal.style.position = 'absolute';
            retVal.style.top = String(t) + 'px';
        }
        if(typeof l === 'number')
        {
            retVal.style.position = 'absolute';
            retVal.style.left = String(l) + 'px';
        }

        retVal.src = src;

        return retVal;
    };

    RhinoDressUp.ele.createButton = function(t, l, w, h, onClick, id)
    {
        var retVal = document.createElement('button');

        retVal.style.border = '0px none';
        retVal.style.padding = '0px';
        retVal.style.margin = '0px';
        retVal.style['background-color'] = 'transparent';

        retVal.style.position = 'relative';
        if(typeof t === 'number')
        {
            retVal.style.position = 'absolute';
            retVal.style.top = String(t) + 'px';
        }
        if(typeof l === 'number')
        {
            retVal.style.position = 'absolute';
            retVal.style.left = String(l) + 'px';
        }

        if(typeof w === 'number')
        {
            retVal.style.width = String(w) + 'px';
        }
        if(typeof h === 'number')
        {
            retVal.style.height = String(h) + 'px';
        }

        if(typeof onClick === 'function')
        {
            retVal.addEventListener(
                'click',
                function(event)
                {
                    onClick(event, id);
                });
        }

        return retVal;
    };

    v.imgButtonLastDown = null;
    f.imgButtonOnUp = function()
    {
        if(v.imgButtonLastDown !== null)
        {
            v.imgButtonLastDown.img.style.display = ''; // Hard-coded.
            v.imgButtonLastDown.imgPressed.style.display = 'none';
            v.imgButtonLastDown = null;
        }
    };
    document.body.addEventListener('mouseup', f.imgButtonOnUp);
    document.body.addEventListener('touchend', f.imgButtonOnUp);
    //
    RhinoDressUp.ele.createImgButton = function(
        t, l, w, h, src, srcPressed, onClick, id)
    {
        var onDown = function()
            {
                img.style.display = 'none';
                imgPressed.style.display = ''; // Hard-coded.
                v.imgButtonLastDown = { img: img, imgPressed: imgPressed };
            },

            retVal = RhinoDressUp.ele.createButton(t, l, w, h, onClick, id),
            img = RhinoDressUp.ele.createImg(0, 0, w, h, src),
            imgPressed = null;

        retVal.appendChild(img);
        if(src !== srcPressed)
        {
            imgPressed = RhinoDressUp.ele.createImg(0, 0, w, h, srcPressed);

            retVal.appendChild(imgPressed);

            imgPressed.style.display = 'none';

            retVal.addEventListener('mousedown', onDown);
            retVal.addEventListener('touchstart', onDown);
        }

        return retVal;
    };

    RhinoDressUp.ele.removeChildren = function(ele)
    {
        while(ele.firstChild!==null)
        {
            ele.removeChild(ele.firstChild);
        }
    };

    RhinoDressUp.ele.createImgButtonList = function(
        t, l, w, h, imgW, imgH, onSelChange)
    {
        var onClick = function(event, id)
            {
                if(selId === id)
                {
                    retVal.deselect();
                    onSelChange(null);
                    return;
                }
                retVal.select(id);
                onSelChange(id);
            },
            idClassPrefix = 'id_',
            retVal = {},
            list = document.createElement('ul'),
            selId = null;

        retVal.hide = function()
        {
            retVal.div.style.display = 'none';
        };
        retVal.show = function()
        {
            retVal.div.style.display = ''; // Hard-coded
        };
        retVal.deselect = function()
        {
            if(selId === null)
            {
                return;
            }

            list.querySelector(
                '.' + idClassPrefix + selId).style['background-color'] =
                    'transparent';

            selId = null;
        };
        retVal.select = function(id)
        {
            var node = list.querySelector('.' + idClassPrefix + id);

            retVal.deselect();
            node.style['background-color'] = 'yellow';

            selId = id;
        };
        retVal.setAll = function(idToPaths)
        {
            var id = null,
                path = null,
                but = null,
                ele = null;

            RhinoDressUp.ele.removeChildren(list);

            for(id in idToPaths)
            {
                if(!idToPaths.hasOwnProperty(id))
                {
                    continue;
                }

                path = idToPaths[id];
                but = RhinoDressUp.ele.createImgButton(
                        null,
                        null,
                        imgW,
                        imgH,
                        path,
                        path, // Change this?
                        onClick,
                        id);
                ele = document.createElement('li');
                ele.style.width = String(imgW) + 'px';
                ele.style.height = String(imgH) + 'px';
                ele.style['border-radius'] = String(20) + 'px';

                ele.classList.add(idClassPrefix + id);

                ele.appendChild(but);
                list.appendChild(ele);
            }
        };

        list.style['list-style-type'] = 'none';
        list.style.border = '0px none';
        list.style.padding = '0px';
        list.style.margin = '0px';
        list.style['overflow-y'] = 'auto';
        list.style['overflow-x'] = 'hidden';
        list.style.width = '100%';
        list.style.height = '100%'; // (border must be zero for this)

        retVal.div = document.createElement('div');

        retVal.div.style.border = '0px none';
        retVal.div.style.padding = '0px';
        retVal.div.style.margin = '0px';
        retVal.div.style['background-color'] = 'transparent';

        retVal.div.appendChild(list);

        if(typeof t === 'number')
        {
            retVal.div.style.position = 'absolute';
            retVal.div.style.top = String(t) + 'px';
        }
        if(typeof l === 'number')
        {
            retVal.div.style.position = 'absolute';
            retVal.div.style.left = String(l) + 'px';
        }

        if(typeof w === 'number')
        {
            retVal.div.style.width = String(w) + 'px';
        }
        if(typeof h === 'number')
        {
            retVal.div.style.height = String(h) + 'px';
        }

        return retVal;
    };
}());
