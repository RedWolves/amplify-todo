$(function() {

  amplify.publish( "initTasks" );

  $( "#tasks" ).prev( "button" ).bind("click", function() {
    amplify.publish( "newTask" );
  }).end()
               .find("input[type=checkbox]").bind("click", function() {
                  amplify.publish( "closeTask", $(this) );
               });

  $( "#new" ).find( "button" ).bind( "click", function() {
    amplify.publish( "addTask");
  } );

});




