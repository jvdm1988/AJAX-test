console.log("post.js is linked!");

$("document").ready(() => {
  console.log("Page is ready!");

  $("#postWalle").click((theEvent) => {
    alert("WALL-E is Linked!");
    const walleInfo = {
      name: "WALL-E",
      occupation: "Waste Allocation Robot",
      weapon: "Head Laser"
    };
    postCharacterInfo(walleInfo);
  });

  $("#postCharacterForm").submit((theEvent) => {
    theEvent.preventDefault();

    // retrieve what the user typed in the inputs (the input values)
    const characterInfo = {
      name: $("#postCharacterName").val(),
      occupation: $("#postCharacterOccupation").val(),
      weapon: $("#postCharacterWeapon").val()
    };
    postCharacterInfo(characterInfo);
  });
  $("#updateForm").submit((theEvent) => {
    theEvent.preventDefault();

    const updatedInfo = {
      name: $("#updateName").val(),
      weapon: $("updateWeapon").val(),
      occupation: $("#updateOccupation").val()
    };

    // Retrieve the character id from the input
    const characterId = $("#updateCharacterId").val();

    // call the function that makes the AJAX request
    updateCharacter(characterId, updatedInfo);
  });
});


function postCharacterInfo (newCharacterDetails) {
  $.ajax({        // 1st argument -> giant settings object
                  // Minimum 4 settings: url, method, success & error
    url: "https://ih-api.herokuapp.com/characters/",// URL from Insomnia
    method: "POST",                         // get, post put, patch or delete

    // the "DATA" setting is only used when you need to send extra info to the Arrays
    data: newCharacterDetails,
    // newCharacterDetails is an object that contains:
    // name, occupation & weapon

    // if succesful, put some of the data on the screen (DOM manipulation)
    success: (responseFromApi) => {
      console.log("POSTED WALL-E! Yes!");
      $("#characterList").append(`
        <li>
        <h3> ${responseFromApi.name}</h3>
        <p> Id: ${responseFromApi.id} </p>
        </li>
        `);
  },

    // if error, show error feedback (DOM manipulation)
    error: (errorFromApi) => {
      alert("Sorry! Character POST error.");
      console.log(errorFromApi);
    }
  });
}
