
// (c) Marcel Timm, RhinoDevel, 2019

/** To be run during page load to augment global RhinoDressUp object with new
 *  property called room, which is an object holding functions to create
 *  and handle a dressing room.
 */
(function() // IIFE
{
    'use strict';

    var f = {},
        c = {};

    f.getRand = function(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    f.initPathBackground = function()
    {
        var i = 0,
            count = 13, // Hard-coded
            prefix = 'img/bg/t',
            postfix = '.jpg';

        c.path.img.bg = [];

        for(i = 0;i < count;++i)
        {
            c.path.img.bg.push(prefix + String(i) + postfix);
        }
    };
    f.initPathList = function()
    {
        var addPaths = function(nrs)
            {
                var i = c.path.img.list.but.length;

                c.path.img.list.but.push({});
                c.path.img.list.bg.push({});

                nrs.forEach(
                    function(nr)
                    {
                        var nrStr = String(nr),
                            begin = 'img/m/' + String(i),
                            end = '/' + nrStr + '.png';

                        c.path.img.list.but[i][nrStr] = begin + end;
                        c.path.img.list.bg[i][nrStr] = begin + '/'  + 'f' + end;
                    });
            };

        c.path.img.list = {};
        c.path.img.list.but = [];
        c.path.img.list.bg = [];

        addPaths([ 1, 3, 8, 1010 ]); // Hard-coded
        addPaths([ 1, 3, 4, 5, 6, 8, 9, 10, 11, 12, 1009, 1011, 1012, 1013 ]); // Hard-coded
        addPaths([ 0, 1, 2, 3, 4, 5, 6, 7, 11, 12, 1009, 1010, 1011, 1013 ]); // Hard-coded
        addPaths(
            [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1009, 1011, 1013 ]); // Hard-coded
        addPaths([ 0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 1009 ]); // Hard-coded
    };

    c.path = {};
    c.path.img = {};
    c.path.img.blank = 'img/bg/blank.png';
    c.path.img.logo = 'img/logo.png';
    f.initPathBackground();

    c.path.img.but = {};
    c.path.img.but.themePrevious = 'img/but/theme_previous.png';
    c.path.img.but.themePreviousPressed = 'img/but/theme_previous_pressed.png';
    c.path.img.but.themeNext = 'img/but/theme_next.png';
    c.path.img.but.themeNextPressed = 'img/but/theme_next_pressed.png';
    c.path.img.but.undress = 'img/but/undress.png';
    c.path.img.but.undressPressed = 'img/but/undress_pressed.png';
    c.path.img.but.dress = 'img/but/dress.png';
    c.path.img.but.dressPressed = 'img/but/dress_pressed.png';
    c.path.img.but.manni = [
        'img/but/m0.png',
        'img/but/m1.png',
        'img/but/m2.png',
        'img/but/m3.png',
        'img/but/m4.png'
    ];
    c.path.img.but.manniPressed = [
        'img/but/m0p.png',
        'img/but/m1p.png',
        'img/but/m2p.png',
        'img/but/m3p.png',
        'img/but/m4p.png'
    ];

    f.initPathList();

    c.pos = {};
    c.pos.logo = { t: 12, l: 12 };
    c.pos.but = {};
    c.pos.but.themePrevious = { t: 722, l: 2 };
    c.pos.but.themeNext = { t: 722, l: 80 };
    c.pos.but.undress = { t: 722, l: 324 };
    c.pos.but.dress = { t: 722, l: 402 };
    c.pos.but.manni = [
        { t: 102, l: 2 },
        { t: 102, l: 82 },
        { t: 102, l: 162 },
        { t: 102, l: 242 },
        { t: 102, l: 322 }
    ];
    c.pos.list = { t: 102, l: 400 };

    c.dim = {};
    c.dim.logo = { w: 126, h: 72 };
    c.dim.bg = { w: 480, h: 800 };
    c.dim.but = { w: 76, h: 76 };
    c.dim.list = { w: 80, h: 560 };

    c.id = {};
    c.id.but = {};
    c.id.but.themePrevious = 'but_theme_previous';
    c.id.but.themeNext = 'but_theme_next';
    c.id.but.undress = 'but_undress';
    c.id.but.dress = 'but_dress';
    c.id.but.manni = [
        'but_manni_0',
        'but_manni_1',
        'but_manni_2',
        'but_manni_3',
        'but_manni_4',
    ]

    RhinoDressUp.room = {};

    /**
     * - Alters given element's dimensions.
     */
    RhinoDressUp.room.init = function(ele)
    {
        var v = {},
            g = {}; // (g, because f is already in use..)

        g.addButManni = function()
        {
            v.but.manni = [];

            c.path.img.but.manni.forEach(
                function(path, i)
                {
                    v.but.manni[i] = RhinoDressUp.ele.createImgButton(
                        c.pos.but.manni[i].t,
                        c.pos.but.manni[i].l,
                        c.dim.but.w,
                        c.dim.but.h,
                        c.path.img.but.manni[i],
                        c.path.img.but.manniPressed[i],
                        g.onClick,
                        c.id.but.manni[i]);

                    ele.appendChild(v.but.manni[i]);
                });
        },

        /** Dress or undress part.
         */
        g.dressPart = function(index, id)
        {
            if(id === null)
            {
                v.img.lay[index].src = c.path.img.blank;
                return;
            }
            v.img.lay[index].src = c.path.img.list.bg[index][id];
        };

        g.undress = function()
        {
            v.list.forEach(
                function(list, index)
                {
                    g.dressPart(index, null);

                    v.list[index].deselect();
                });
        };

        /** Let Manni don the full dress associated with the current theme.
         */
        g.dress = function()
        {
            var id = String(v.cur.bgIndex);

            v.list.forEach(
                function(list, index)
                {
                    if(id in c.path.img.list.bg[index])
                    {
                        g.dressPart(index, id);

                        v.list[index].select(id);

                        return;
                    }
                    g.dressPart(index, null);
                    v.list[index].deselect();
                });
        };

        g.dressRandom = function()
        {
            v.list.forEach(
                function(list, index)
                {
                    var keys = Object.keys(c.path.img.list.bg[index]),
                        keyIndex = f.getRand(0, keys.length),
                        id = keyIndex < keys.length ? keys[keyIndex] : null;

                    g.dressPart(index, id);
                    if(id === null)
                    {
                        v.list[index].deselect();
                        return;
                    }
                    v.list[index].select(id);
                });
        };

        g.onSelChange = function(id)
        {
            g.dressPart(v.cur.listIndex, id);
        };

        g.onClick = function(event, id)
        {
            switch(id)
            {
                case c.id.but.manni[0]:
                {
                    v.list[v.cur.listIndex].hide();
                    v.cur.listIndex = 0;
                    v.list[v.cur.listIndex].show();
                    break;
                }
                case c.id.but.manni[1]:
                {
                    v.list[v.cur.listIndex].hide();
                    v.cur.listIndex = 1;
                    v.list[v.cur.listIndex].show();
                    break;
                }
                case c.id.but.manni[2]:
                {
                    v.list[v.cur.listIndex].hide();
                    v.cur.listIndex = 2;
                    v.list[v.cur.listIndex].show();
                    break;
                }
                case c.id.but.manni[3]:
                {
                    v.list[v.cur.listIndex].hide();
                    v.cur.listIndex = 3;
                    v.list[v.cur.listIndex].show();
                    break;
                }
                case c.id.but.manni[4]:
                {
                    v.list[v.cur.listIndex].hide();
                    v.cur.listIndex = 4;
                    v.list[v.cur.listIndex].show();
                    break;
                }

                case c.id.but.themePrevious:
                {
                    v.cur.bgIndex = (v.cur.bgIndex + c.path.img.bg.length - 1)
                        % c.path.img.bg.length;

                    v.img.bg.src = c.path.img.bg[v.cur.bgIndex];
                    break;
                }
                case c.id.but.themeNext:
                {
                    v.cur.bgIndex = (v.cur.bgIndex + 1) % c.path.img.bg.length;

                    v.img.bg.src = c.path.img.bg[v.cur.bgIndex];
                    break;
                }

                case c.id.but.undress:
                {
                    g.undress();
                    break;
                }

                case c.id.but.dress:
                {
                    g.dress();
                    break;
                }

                default:
                {
                    return;
                }
            }
        };

        v.img = {};
        v.but = {};
        v.cur = {};
        v.cur.bgIndex = 0;
        v.cur.listIndex = 0;

        v.img.bg = RhinoDressUp.ele.createImg(
            0, 0, c.dim.bg.w, c.dim.bg.h, c.path.img.bg[v.cur.bgIndex]);
        v.img.bg.style['z-index'] = String(-6);
        ele.appendChild(v.img.bg);

        v.img.lay = [];
        v.list = [];
        c.path.img.list.but.forEach(
            function(but)
            {
                var list = RhinoDressUp.ele.createImgButtonList(
                        c.pos.list.t, c.pos.list.l,
                        c.dim.list.w, c.dim.list.h,
                        c.dim.but.w, c.dim.but.h,
                        g.onSelChange);

                v.list.push(list);

                list.setAll(but);

                ele.appendChild(list.div);

                list.hide();

                v.img.lay.push(RhinoDressUp.ele.createImg(
                    0, 0, c.dim.bg.w, c.dim.bg.h, c.path.img.blank));
                ele.appendChild(v.img.lay[v.img.lay.length - 1]);
                v.img.lay[v.img.lay.length - 1].style['z-index'] = String(
                    -v.img.lay.length);
            });

        v.img.logo = RhinoDressUp.ele.createImg(
            c.pos.logo.t, c.pos.logo.l, c.dim.logo.w, c.dim.logo.h, c.path.img.logo);
        ele.appendChild(v.img.logo)

        v.but.themePrevious = RhinoDressUp.ele.createImgButton(
            c.pos.but.themePrevious.t,
            c.pos.but.themePrevious.l,
            c.dim.but.w,
            c.dim.but.h,
            c.path.img.but.themePrevious,
            c.path.img.but.themePreviousPressed,
            g.onClick,
            c.id.but.themePrevious);
        v.but.themeNext = RhinoDressUp.ele.createImgButton(
            c.pos.but.themeNext.t,
            c.pos.but.themeNext.l,
            c.dim.but.w,
            c.dim.but.h,
            c.path.img.but.themeNext,
            c.path.img.but.themeNextPressed,
            g.onClick,
            c.id.but.themeNext);

        v.but.undress = RhinoDressUp.ele.createImgButton(
            c.pos.but.undress.t,
            c.pos.but.undress.l,
            c.dim.but.w,
            c.dim.but.h,
            c.path.img.but.undress,
            c.path.img.but.undressPressed,
            g.onClick,
            c.id.but.undress);
        v.but.dress = RhinoDressUp.ele.createImgButton(
            c.pos.but.dress.t,
            c.pos.but.dress.l,
            c.dim.but.w,
            c.dim.but.h,
            c.path.img.but.dress,
            c.path.img.but.dressPressed,
            g.onClick,
            c.id.but.dress);

        g.addButManni();
        ele.appendChild(v.but.themePrevious);
        ele.appendChild(v.but.themeNext);
        ele.appendChild(v.but.undress);
        ele.appendChild(v.but.dress);

        ele.style.width = String(c.dim.bg.w) + 'px';
        ele.style.height = String(c.dim.bg.h) + 'px';

        v.list[v.cur.listIndex].show();

        g.dressRandom();
        v.cur.bgIndex = f.getRand(0, c.path.img.bg.length - 1);
        v.img.bg.src = c.path.img.bg[v.cur.bgIndex];
    };
}());
