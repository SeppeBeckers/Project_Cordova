let Boek = function () {
    let getData = function () {

        let input = $("#search");
        input.on("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                $("#zoeken").click();
            }
        });
        $("#zoeken").click(function(){
            let search = input.val();
            let url = 'https://www.googleapis.com/books/v1/volumes?q=' + search;
            $.getJSON(url, function (data) {
                console.log('data from api', data);
                $('#boeken').empty();
                try {
                    $.each(data.items, function(index){
                        $("img").each(function() {
                            $(this).attr("src", $(this).attr("src").replace("http://", "https://"));
                        });
                            $('#boeken').append(`
                            <form>
                            <h5 class="left-align">${data.items[index].volumeInfo.title} <i class="small material-icons" 
                            id="${data.items[index].id}">favorite_border</i></h5>
                            <a class="image"><img src="${data.items[index].volumeInfo.imageLinks.smallThumbnail}" 
                            alt="${data.items[index].volumeInfo.title}" width="100px"></a>
                            <p class="left-align">Auteur: ${data.items[index].volumeInfo.authors}</p>
                            <p class="left-align">Uitgever: ${data.items[index].volumeInfo.publisher}</p>
                            <p class="left-align">Aantal blz: ${data.items[index].volumeInfo.pageCount}</p>
                            <p class="left-align">Verschijningsdatum: ${data.items[index].volumeInfo.publishedDate}</p>               
                            </form>
                            <div class="divider"></div>
                `   );
                            $("#" + data.items[index].id).click(function () {
                                localStorage.setItem('id', JSON.stringify(data.items[index].id));
                                Lijst.Fav();
                            });
                    });
                } catch (e) {
                    console.log('error catch', e);
                }
            });
        });

    };

    return {
        getData: getData,
    };
}();