$(document).ready(function () {

     'use strict';

     // ----- Global Variables -----//
     var topics = [
          'Tom And Jerry',
          'Lady And The Tramp',
          'Daffy Duck',
          'Donald Duck',
          'Betty Boop'
     ];

     // -----  Functions -----//
     function renderButtons() {

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
     }

     function displayGIF(json) {

          // delete old gifs
          $('#topic-view').empty();

          // display gifs
          for (var i = 0; i < json.data.length; i++) {

               var stillGIF = json.data[i].images.original_still.url;
               var animatedGIF = json.data[i].images.original.url;
               var alt = json.data[i].title;

               console.log('# images: ' + json.data.length);
               var image = '<img class="gif" data-state="still" src="' + stillGIF + '" data-animate="' + animatedGIF + '" data-still="' + stillGIF + '" alt="' + alt + '">';

               $('#topic-view').append(image);
          }
     }

     function addGIF(title) {

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

                    displayGIF(response);
               });
          } catch (e) {

               console.log('Something went wrong with AJAX call.');
          }
     }

     // ----- Click Events ----- //
     $('#search-btn').on('click', function (event) {

          event.preventDefault();

          var topic = $('#search-input').val().trim();

          if (topic == '') {
               alert('Oops! You forgot to enter a title.');
               return;
          }

          topics.push(topic);
          renderButtons();
     });

     $(document).on('click', '.topic-btn', function () {

          var title = $(this).attr('data-name');

          addGIF(title);

     });

     $(document).on('click', '.gif', function () {

          console.log("inside click function");

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
     });

     // -----  Render seed buttons -----//
     renderButtons();
});