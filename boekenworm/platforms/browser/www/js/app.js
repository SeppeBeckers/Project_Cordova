$(function(){
    document.addEventListener("deviceready", onDeviceReady, false);
    //sidenav
    $('.sidenav').sidenav();	/* https://materializecss.com/sidenav.html */

    $('.sidenav a').click(function () {
        $('.spa').hide();
        $('#' + $(this).data('show')).show();
        $('.sidenav').sidenav('close');
    });

    $("#renew, #reload").click(function () {
        location.reload();
    });
});

function onDeviceReady() {
    console.log('Device is ready');
    Bib.init();
    Boek.getData();
    Lijst.load();
    Info.init();
    Scanner.init();
}
