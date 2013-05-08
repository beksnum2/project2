'use strict';

(function($){
    var appId = '81d36499', // Application ID for Yummly
        appKey = '8ae4815988c1296435cb19c4abb6c747',
        searchUrl = 'http://api.yummly.com/v1/api/recipes?_app_id=' + appId + '&_app_key=' + appKey,
        getSearchTerms,
        getData,
        displayData;


    getData = function getData (searchTerm) {
        $.ajax({
            url: searchUrl + '&nutrition.NA.max=.5&q=' + encodeURIComponent(searchTerm),
            dataType: 'jsonp'
        })
        .done(function (recipes) { // the parameter recipes is all recipes from our search URL
            displayData(recipes.matches);

        });
    }

    displayData = function displayData (results) {
        var container = document.getElementById("container");
        for (var i = 0; i < results.length; i++) {
            //console.log(results[i]);

            var id = results[i].id, // create a variable id that is equal to 1 of the matches ID
            recipeUrl = 'http://api.yummly.com/v1/api/recipe/' + id + '?_app_id=' + appId + '&_app_key=' + appKey;
            // recipeURL gets the information for 1 recipe.

            $.ajax({
                url: recipeUrl,
                dataType: 'jsonp'
            }).done(function(recipe){ // parameter "recipe" is the information for that 1 recipe we got by ID.
                var sourceUrl = recipe.source.sourceRecipeUrl,
                    image = recipe.images[0].hostedLargeUrl,
                    saltContent = recipe.nutritionEstimates[4].value,
                    recipeTitle = recipe.name;
                
                var text = document.createElement("a");

                text.setAttribute( "href" , sourceUrl );
                text.setAttribute( "class" , "recipe" );
                text.innerHTML = recipeTitle + " - " + saltContent + " grams of sodium.";
                container.appendChild(text);

            });

        };

    }

    /*
    $.ajax({
        url: searchUrl + '&nutrition.NA.max=.5',
        dataType: 'jsonp'
    })
    .done(function (recipes) { // the parameter recipes is all recipes from our search URL
        var id = recipes.matches[0].id, // create a variable id that is equal to 1 of the matches ID
            recipeUrl = 'http://api.yummly.com/v1/api/recipe/' + id + '?_app_id=' + appId + '&_app_key=' + appKey;
            // recipeURL gets the information for 1 recipe.

        $.ajax({
            url: recipeUrl,
            dataType: 'jsonp'
        }).done(function(recipe){ // parameter "recipe" is the information for that 1 recipe we got by ID.
            console.log(recipe);
        });

    });
    */

    $("#search").on("submit", function(e){
        e.preventDefault(); 
        var term = $("#search").find(".search-box").val();
        getData(term);
    });

})(jQuery);
