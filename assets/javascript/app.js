$(document).ready(function () {

     'use strict';

     // ----- VARIABLES -----//
     var topics = [
          'Tom And Jerry',
          'Lady And The Tramp',
          'Daffy Duck',
          'Donald Duck',
          'Betty Boop'
     ];

     // create seed buttons
     createButtons();

     // ----- EVENTS -----//

     // submit button click adds the new topic to the topics array
     $('#submit-btn').on('click', function (event) {

          event.preventDefault();

          var topic = $('#search-input').val().trim();

          if (topic == '') {
               alert('Oops! You forgot to enter a title.');
               return;
          }

          topics.push(topic);
          createButtons();
     }); // submit button click

     // topic button click displays images
     $(document).on('click', '.topic-btn', function () {

          var title = $(this).attr('data-name');

          displayImages(title);

     }); // topic button click

     // image click toggles between still and animated states
     $(document).on('click', '.gif', function () {

          event.preventDefault();

          var state = $(this).attr("data-state");

          if (state === 'still') {

               // set src to animated gif & update data-state 
               $(this).attr('src', $(this).attr('data-animate'));
               $(this).attr('data-state', 'animate');

          } else {

               // set src to still gif & update data-state
               $(this).attr('src', $(this).attr('data-still'));
               $(this).attr('data-state', 'still');
          }
     }); // image click

     // -----  FUNCTIONS -----//

     // create topic buttons
     function createButtons() {

          // delete to avoid duplicates
          $('#topic-buttons').empty();

          // create topic buttons
          for (var i = 0; i < topics.length; i++) {

               var btn = $('<button>');
               btn.addClass('topic-btn bold');
               btn.attr('data-name', topics[i]);
               btn.text(topics[i]);
               $('#topic-buttons').append(btn);
          }
     } // createButtons()

     // extract and display GIF images
     function displayImages(title) {

          var searchString = title.split(' ').join('-');
          var baseURL = 'https://api.giphy.com/v1/gifs/search?q=';
          var apiKey = '&api_key=9EzP8xJDoAwo0A6yOFyhFlCAlOJ59zNw';
          var limit = '&limit=10';
          var rating = '&rating=g';
          var queryURL = baseURL + searchString + apiKey + rating + limit;

          try {
               $.ajax({

                    url: queryURL,
                    method: 'GET'
               }).then(function (response) {

                    var data = response.data;

                    // delete old gifs
                    // $('#topic-view').empty();

                    // display images
                    for (var i = 0; i < data.length; i++) {

                         var stillGIF = data[i].images.original_still.url;
                         var animatedGIF = data[i].images.original.url;
                         var alt = data[i].title;

                         var image = `<img class="gif" data-state="still" src="${stillGIF}" data-animate="${animatedGIF}" data-still="${stillGIF} alt="${alt}">`;

                         $('#topic-view').prepend(image);
                    }
               });
          } catch (e) {

               console.log('Something went wrong with AJAX call.');
          }
     }
}); // displayImages()