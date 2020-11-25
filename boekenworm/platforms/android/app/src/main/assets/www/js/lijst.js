let Lijst = function () {

    let _lijst = [];

    let _setLocalStorage = function() {
        localStorage.setItem('lijst', JSON.stringify(_lijst));
        console.log('bewaar alle favorieten in "lijst"');
        console.log(_lijst);
    };

    let Fav = function(){
        let id = JSON.parse(localStorage.getItem('id'));
        if($.inArray(id, _lijst) !== -1) {
            if(confirm('Deze uit uw favorieten wissen?')) {
                $("#" + id).replaceWith('<i class="small material-icons">favorite_border</i>');
                console.log("favoriet wissen");
                _lijst.splice(id, 1);
                _setLocalStorage();
            }
            console.log("is in array");
        } else {
                M.toast({html: "Toegevoegd aan favorieten"});
                $("#" + id).replaceWith('<i class="small material-icons">favorite</i>');
                console.log('nieuw favoriet toevoegen');
                _lijst.push(id);  // / Voeg achteraan (push) of vooraan (unshift) de array de tekst "Taak x" toe
                _setLocalStorage();


            console.log("is NOT in array");
        }
    };

    let load = function(){
        let boeken_lijst = localStorage.getItem('lijst');
        if (boeken_lijst !== null) {
            _lijst = [];   // Maak array leeg
            _lijst = JSON.parse(boeken_lijst);
        }

        if(_lijst.length === 0) {
            $('#favorieten').append(`
                            <p class="grey-text"> u heeft geen favorieten </p>
                            `);
        }else{
            $.each(_lijst, function (index, val) {
                let url = 'https://www.googleapis.com/books/v1/volumes?q=' + val;
                console.log(url);
                $.getJSON(url, function (data) {
                    try {

                            $('#favorieten').append(`
                            <form>
                            <h5 class="left-align">${data.items[index].volumeInfo.title} <i class="small material-icons" 
                            id="${data.items[index].id}">favorite</i></h5>
                            <a class="image"><img src="${data.items[index].volumeInfo.imageLinks.thumbnail}" 
                            alt="${data.items[index].volumeInfo.title}" width="100px"></a>
                            <p class="left-align">Auteur: ${data.items[index].volumeInfo.authors}</p>
                            <p class="left-align">Uitgever: ${data.items[index].volumeInfo.publisher}</p>
                            <p class="left-align">Aantal blz: ${data.items[index].volumeInfo.pageCount}</p>
                            <p class="left-align">Verschijningsdatum: ${data.items[index].volumeInfo.publishedDate}</p>               
                            </form>
                            <div class="divider"></div>
                            `);
                        $("img").each(function() {
                            $(this).attr("src", $(this).attr("src").replace("http://", "https://"));
                        });
                            $("#" + data.items[index].id).click(function () {
                                localStorage.setItem('id', JSON.stringify(data.items[index].id));
                                Lijst.Fav();
                            });

                    } catch (e) {
                        console.log('error catch', e);
                    }
                });
            });
        }
    };

    return {
        Fav: Fav,
        load: load
    };
}();