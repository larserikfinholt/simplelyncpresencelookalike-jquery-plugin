/// <reference path="../Scripts/jquery-1.7.2.js" />
/// <reference path="../Scripts/jQueryUserInfoFromAd.js" />

describe("myPlugin", function () {

    beforeEach(function () {
        $('#fixture').remove();
        $('body').append('<div id="fixture"><div class="tmp" data-userid="testuser">User Display Name</div></div>');

    });

    it("should be callable", function () {
        $('.tmp').adUserInfo('init');
    });
});