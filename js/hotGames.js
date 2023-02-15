$(document).ready(function () {
    
    $("#showAll").on("click", function () {
        getGames(true);
    });
});

$(document).ready(function () {

    $("#onlyPublished").on("click", function () {
        getGames(false);
    });
});

function getGames(all) {

    $.ajax({
        url: "http://bgg-json.azurewebsites.net/hot",
        dataType: "json",
        type: "GET",
        data: {  
        },

        success: function (response) {
            console.log("Förfrågan gick bra!");

            var items = [],
                i = 0,
                numberOfGames = 0,
                rank = 1;
        
            if (all) {
                $.each(response, function (index, value) {
                    var name = value.name;
                    var date = value.yearPublished;
                    var thumbnail = value.thumbnail;
                    var rank = value.rank;

                    numberOfGames++;
                    items.push("<article><img src= " + thumbnail + " alt='Thumbnail for "+name+" ' >" + "<h2>" + rank + ". " + name + "</h2><p>Publicerat: </p>" + date + "</article>");
                });
            } else {

                $.each(response, function (index, value) {
                    var name = value.name;
                    var date = value.yearPublished;
                    var thumbnail = value.thumbnail;
                    var rank = value.rank;

                    if (date <=2022) {
                        numberOfGames++;
                        items.push("<article><img src='" + thumbnail + "' alt='Thumbnail for "+name+"' >" + "<h2>" + rank + ". " + name + "</h2><p>Publicerat: </p>" + date + "</article>");

                    }
                });
            }
        
            $("#games").html(items.join(""));

            $("#noOfGames").text("Antal spel: " + numberOfGames);
        }
    });
}