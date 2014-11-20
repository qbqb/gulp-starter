if( !DETECT_BROWSER ) {
    var DETECT_BROWSER = browserDetectNav();
}

if( !IS_MOBILE ) {
    var IS_MOBILE = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function() {
            return (IS_MOBILE.Android() || IS_MOBILE.BlackBerry() || IS_MOBILE.iOS() || IS_MOBILE.Opera() || IS_MOBILE.Windows());
        }
    };
}

/*
How to use

if( IS_MOBILE.any() ) alert('Mobile');
To check to see if the user is on a specific mobile device:

if( IS_MOBILE.iOS() ) alert('iOS');
*/

// var supportsTouch = ('ontouchstart' in document.documentElement);
// var standalone = window.navigator.standalone,
//     userAgent = window.navigator.userAgent.toLowerCase(),
//     safari = /safari/.test( userAgent ),
//     ios = /iphone|ipod|ipad/.test( userAgent );

function browserDetectNav(chrAfterPoint) {
var
    UA=window.navigator.userAgent,
    //--------------------------------------------------------------------------------
    OperaB = /Opera[ \/]+\w+\.\w+/i,
    OperaV = /Version[ \/]+\w+\.\w+/i,
    FirefoxB = /Firefox\/\w+\.\w+/i,
    ChromeB = /Chrome\/\w+\.\w+/i,
    SafariB = /Version\/\w+\.\w+/i,
    IEB = /MSIE *\d+\.\w+/i,
    SafariV = /Safari\/\w+\.\w+/i,
        //--------------------------------------------------------------------------------
    browser = new Array(),
    browserSplit = /[ \/\.]/i,
    OperaV = UA.match(OperaV),
    Firefox = UA.match(FirefoxB),
    Chrome = UA.match(ChromeB),
    Safari = UA.match(SafariB),
    SafariV = UA.match(SafariV),
    IE = UA.match(IEB),
    Opera = UA.match(OperaB);

        //----- Opera ----
        if ((!Opera=="")&(!OperaV=="")) browser[0]=OperaV[0].replace(/Version/, "Opera")
                else
                    if (!Opera=="") browser[0]=Opera[0]
                        else
                            //----- IE -----
                            if (!IE=="") browser[0] = IE[0]
                                else
                                    //----- Firefox ----
                                    if (!Firefox=="") browser[0]=Firefox[0]
                                        else
                                            //----- Chrom ----
                                            if (!Chrome=="") browser[0] = Chrome[0]
                                                else
                                                    //----- Safari ----
                                                    if ((!Safari=="")&&(!SafariV=="")) browser[0] = Safari[0].replace("Version", "Safari");


    var
            outputData;                                      // возвращаемый функцией массив значений
                                                             // [0] - имя браузера, [1] - целая часть версии
                                                             // [2] - дробная часть версии
    if (browser[0] != null) outputData = browser[0].split(browserSplit);
    if ((chrAfterPoint==null)&&(outputData != null))
        {
            chrAfterPoint=outputData[2].length;
            outputData[2] = outputData[2].substring(0, chrAfterPoint);
            return(outputData);
        }
            else return(false);
}
