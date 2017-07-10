console.log("get.js linked!");

$(document).ready(() => {
  console.log("Page is ready");
    // When #pokeButton is clicked...
  $("#pokeButton").click(() => {
      getPokemonInfo(3);
  });

  // When the form is submitted...
  $("#pokeSearchForm").submit((theEvent) => {
    // The 1st argumnent of any event callback (click, submit, scroll, etc),
    // is an "Event" object.

    // Use the "Event" object to prevent
    // prevent the normal form submission page refresh
    theEvent.preventDefault();

    // Retrieve what the user typed in the input (the input value)
    const pokeNumber = $("#pokemonId").val();

    // call "getPokemonInfo()" with the user's inputted number
    getPokemonInfo(pokeNumber);
  });
});


function getPokemonInfo (myId) {
    // feth the data from the pokeapi
    $.ajax({        // 1st argument -> giant settings object
                    // Minimum 4 settings: url, method, success & error
      url: "http://pokeapi.co/api/v2/pokemon/" + myId + '/',// URL from Insomnia
      method: "GET",                         // get, post put, patch or delete
      // if succesful, put some of the data on the screen (DOM manipulation)
      success: (responseFromApi) => {
        // The 1st parameter of the "success" callback will always
        // be the data we get from the API (name of param doesnt matter)
        console.log("Response for Pokemon" + myId);
        console.log(responseFromApi);

        // Add he information to the <p> tag
        $("#pokeInfo").html(`
          ${responseFromApi.name}
          <img src="${responseFromApi.sprites.front_default}">
      `);
    },

      // if error, show error feedback (DOM manipulation)
      error: (errorFromApi) => {
        alert("Sorry! Pokemon data error.");
        console.log(errorFromApi);
      }
    });
}
