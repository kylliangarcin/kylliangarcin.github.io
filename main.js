var G_MenuIsShown;
var G_LinkPopupIsShown;
var LabelMenuLogoTitle = document.getElementById("logotop");
var LabelMenuTitle = document.getElementById("LabelMenuTitle");
var LabelMenuIcon = document.getElementById("LabelMenuIcon");
var NavMenuTop = document.getElementById("navmenutop");
var LinkPopup = document.getElementById("NavLinkPopup");
var LinkPopupBackground = document.getElementById("NavLinkBackground");
var ClassMenuButtons =
{
    0:
    {
        name: " Présentation",
        url: "./pages/presentation.html"
    },
    1:
    {
        name: " Horaires",
        url: "./pages/horaires.html"
    },
    2:
    {
        name: " Examens",
        url: "./pages/examens.html"
    },
}

$(function()
{
    Refresh();

    LabelMenuTitle = document.getElementById("LabelMenuTitle");
    LabelMenuIcon = document.getElementById("LabelMenuIcon");
    NavMenuTop = document.getElementById("navmenutop");
    LabelMenuLogoTitle = document.getElementById("logotop");
    LinkPopup = document.getElementById("NavLinkPopup");
    LinkPopupBackground = document.getElementById("NavLinkBackground");

    AnimTogglePopupLink(true);
    AnimToggleMenu();

    window.setInterval(OnDraw, 1 / 60);

    if (window.location.hash == "")
    {}
    else
        SetPage(window.location.hash.replace("#", ""), true);
    // end main...

    // --------------------------
    // Functions
    function AnimToggleMenu()
    {
        $(NavMenuTop).transition(
            { 
                    x: G_MenuIsShown ? '0vh' : '-50vh',
            }, 500, 'snap');
            SetClassActive(NavMenuTop, "DivNavTop_IsShown", G_MenuIsShown, 250, 250, "easeInCubic");
    }

    function AnimTogglePopupLink(instant = false)
    {
        var timeTransition = instant ? 0 : 250;

        $(LinkPopup).transition({
            x: '30%',
            y: G_LinkPopupIsShown ? '25vh' : '250vh'
        }, timeTransition, 'snap');
        SetClassActive(LinkPopupBackground, "PopupIsShown", G_LinkPopupIsShown, timeTransition, timeTransition, "easeInCubic");
        SetClassActive(LinkPopupBackground, "noevent", !G_LinkPopupIsShown, 10, 10, "easeInCubic");
    }

    function SetPage(numberIndex, called)
    {
        if (called == null)
            return;

        var button = ClassMenuButtons[numberIndex];
        
        document.getElementById("content_iframe").src = button.url;
        window.location.hash = numberIndex;
        
        $(LabelMenuLogoTitle).text(button.name);

        var list = (document.querySelectorAll(".MenuButton"));
        list.forEach(element =>
        {
            $(element.getElementsByClassName("DivButtonEnd").item(0))
                .addClass("DivButtonEndMenuSelected", 1000);
        });

        G_MenuIsShown = false;
        AnimToggleMenu();
    }

    /*
    * Obsolète
    */
    function Refresh()
    {
    }

    function SetClassActive(elem, cl, active, onClose = 125, onOpen = 150, easing = "easeInSine")
    {
        if ($(elem).hasClass(cl) && !active)
            $(elem).removeClass(cl, onClose, easing);
        else if (!$(elem).hasClass(cl) && active)
            $(elem).addClass(cl, onOpen, easing);
    }

    function OnDraw()
    {
        SetClassActive(LabelMenuTitle, "divmenulabel_IsShown", G_MenuIsShown);
        SetClassActive(LabelMenuIcon, "fa-align-justify", !G_MenuIsShown);
        SetClassActive(LabelMenuIcon, "fa-close", G_MenuIsShown);
    }

    /*
    * Define the methods for the HTML page
    */ 
    (function($) {
        $.fn.HTMLSetPage = function(newUrl) {
            SetPage(newUrl, true);
        };
        $.fn.HTMLToggleMenu = function() {
            G_MenuIsShown = !G_MenuIsShown;

            AnimToggleMenu();
        };
        $.fn.HTMLToggleLinkPopup = function() {
            G_LinkPopupIsShown = !G_LinkPopupIsShown;

            AnimTogglePopupLink();
        }
        $.fn.HTMLOpenLink = function(url) {
            window.open(url, '_blank');
        }
    })(jQuery);
});
