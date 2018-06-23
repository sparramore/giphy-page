
var apiKey = '&api_key=ZmN14zndmwxFkI4gOJSXSRYwlKEAlcgb';
var giphyArrayList = [["world cup","world+cup"],["futbol","futbol"],["messi","messi"],["ronaldo","ronaldo"],["hat trick","hat+trick"],["soccer fall","soccer+fall"],["pele","pele"],["soccer juggling","soccer+juggling"],["soccer dive","soccer+dive"]];

$(document).ready(function() 
{
    for(var i = 0;i < giphyArrayList.length;i++)
    { 
        var newButton = $("<button>");
        newButton.attr("button-" + i);
        newButton.addClass("buttons");
        newButton.attr("button-name",giphyArrayList[i][1]);
        newButton.text(giphyArrayList[i][0]);
        $("#buttonList").append(newButton);
        console.log(giphyArrayList[i]);
    }
});

function giphyButton() {

    console.log("giphybutton")
    var giphname = $(this).attr("button-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphname + apiKey + "&limit=10";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {
          console.log(JSON.stringify(response).length);
          console.log(JSON.stringify(response));
          var data = response.data;
          console.log(data.length);
          $("#giphArea").empty();
          for (var i = 0; i < data.length; i++) {
            // Creating and storing a div tag
            var gifDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + data[i].rating);
            p.css("color","white");

            // Creating and storing an image tag
            var gifImage = $("<img>");
            //gif.attr("src",data[i].fixed_width.url);

            // Setting the src attribute of the image to a property pulled off the result item
            gifImage.addClass("gif");
            gifImage.attr("src", data[i].images.fixed_height_still.url);
            gifImage.attr("data-animate",data[i].images.fixed_height.url);
            gifImage.attr("data-still",data[i].images.fixed_height_still.url);
            gifImage.attr("data-state","still");

            // Appending the paragraph and image tag to the animalDiv
            gifDiv.prepend(p);
            gifDiv.prepend(gifImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#giphArea").prepend(gifDiv);

            gifDiv.css("margin","auto");
            gifDiv.css("padding","10px");
          }
      });
  }

  function gifPress()
  {
      console.log("gif press");
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
  }

function Submission()
{
    var submissiontext = $("#submissionInput").val();
    var submissionfixedwhitespace = submissiontext.split(' ').join('+');
    var newButton = $("<button>");
    newButton.attr("button-" + giphyArrayList.length + 1);
    giphyArrayList.push(["submissiontext","submissionfixedwhitespace"]);
    newButton.addClass("buttons");
    newButton.attr("button-name",submissionfixedwhitespace);
    newButton.text(submissiontext);
    $("#buttonList").append(newButton);
}

$(document).on("click",".buttons", giphyButton);
$(document).on("click",".gif", gifPress);
$(document).on("click","#submissionBtn",Submission);

$(document).keypress(function(e) {
    if(e.which == 13) {
    }
});





