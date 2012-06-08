(function ($) {
    var methods = {
        init: function (options) {
            // Create some defaults, extending them with any options that were provided
            var settings = $.extend({
                'title': 'jalla',
                'xOffset': 10,
                'yOffset': 20,
                'delay': 400,
                'template': '/Content/jQueryUserInfoFromAd.html',
                'url': '/api/presence?userid='
            }, options);

            // template
            var htmlTemplate =
                "<div id='ad-tooltip' class='presenceitem'>" +
                    "<div class='availability'></div><img class='statusImage' style='display: none;' />" +
                        "<div class='sidePanel'><div class='name'></div>" +
                        "<div class='status'></div>" +
                        "<div class='jobtitle'></div>" +
                    "</div>" +
                    "<div class='buttons'> " +
                        "<div class='button emailbutton enabled' title='Send an e-mail (Opens your e-mail application)'><img class='emailIcon' src='images/email.png' />E-mail</div>" +
                        "<div class='button chatbutton enabled' title='Chat currently not implemented'><img class='chatIcon' src='images/chat.png' />Chat</div>" +
                        "<div class='button phonebutton enabled'><img class='phoneIcon' src='images/phone.png' />Phone</div>" +
                        "<div class='phonetooltip hidden '>" +
                            "<div class='phoneContainer'>" +
                                "<img src='images/phone.png' />" +
                                "<div><div class='phonedescription'>Work</div><div class='phone'></div></div>" +
                            "</div>" +
                            "<div class='phoneContainer'>" +
                                "<img src='images/mobile.png' />" +
                                "<div><div class='phonedescription'>Mobile</div><div class='mobile'></div></div>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                 "</div> ";


            return this.each(function () {
                var s = settings;
                var me = $(this);
                var displayName = $(this).text();
                var userid = $(this).data('userid');

                // create icon in front
                var content = $('<img class="statusimg" src="/images/unknown.png"></img><span>' + displayName + '</span>');
                me.html(content);

                me.click(function (e) {
                    // add background
                    $('body').append('<div id="ad-tooltip-background"></div>');
                    $('#ad-tooltip-background').click(function () { $(this).remove(); $("#ad-tooltip").remove(); });
                    // show tooltip
                    $("body").append(htmlTemplate);
                    $('.name').text(displayName);
                    $('.phonebutton').click(function () {
                        $('.phonetooltip').removeClass('hidden');
                    });

                    $("#ad-tooltip")
                      .animate({ opacity: 1.0 }, s.delay)
                      .css("top", (e.pageY - s.xOffset) + "px")
                      .css("left", (e.pageX + s.yOffset) + "px")
                      .fadeIn("fast");

                    $.get(s.url + userid, function (info) {

                        $('#ad-tooltip .jobtitle').text(info.Role);
                        $('#ad-tooltip .mobile').text(info.PhoneNumber);
                        $('#ad-tooltip .statusImage').attr("src", info.Image).css("display", "");
                        $('.emailbutton').click(function () {
                            window.location.href = "mailto:" + info.Email;
                        });


                    });

                });

            });
        },

        show: function () {
            // IS
        },
        hide: function () {
            // GOOD
        },
        update: function (content) {
            // !!! 
        }
    };

    $.fn.adUserInfo = function (method) {

        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tooltip');
        }


    };
})(jQuery);