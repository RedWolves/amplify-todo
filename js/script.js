$(function() {

  amplify.publish( "initTasks" );

  $( "#tasks" ).prev( "button" ).on("click", function() {
                  amplify.publish( "newTask" );
                }).end()
               .find("input[type=checkbox]").on("click", function() {
                  amplify.publish( "closeTask", $(this) );
                });

  $( "#new" ).find( "button" ).on( "click", function() {
                amplify.publish( "addTask");
              } );
});




