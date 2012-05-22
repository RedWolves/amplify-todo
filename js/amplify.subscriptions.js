var $_new = $( "#new" );

amplify.subscribe( "initTasks", function() {
  var store = amplify.store( "tasks" );
  if ( !store || store.tasks.length === 0 ) {
    amplify.store( "tasks", null );
    amplify.store( "tasks", { tasks: [] } );
    amplify.request( "loadTasks", function( data ) {
      for (var i=0; i < data.tasks.length; i++) {
        amplify.publish( "createTask", data.tasks[i].task );
      }
    } );
  } else {
    for (var i = 0; i < store.tasks.length; i++) {
      amplify.publish( "createTask", store.tasks[i].task, false);
    }
  }
} );

amplify.subscribe( "newTask", function(){
  $_new.show().find("input[type=text]").focus();
} );

amplify.subscribe( "addTask", function() {
  var _taskValue = $_new.find("input[type=text]").val();
  amplify.publish( "createTask", _taskValue );
} );

amplify.subscribe( "createTask", function(_task, saveTask) {
  saveTask = (saveTask !== undefined) ? saveTask : true;
  if (_task !== ""){
    var source    = $( "#createTemplate" ).html();
    var template  = Handlebars.compile(source);
    $( "#tasks" ).append(template({ task: _task }));
    if (saveTask) {
      var savedTasks = amplify.store( "tasks" );
      savedTasks.tasks.push( { task: _task } );
      amplify.store( "tasks", savedTasks );
    }
    amplify.publish( "closeNewTask" );
  }
} );

amplify.subscribe( "closeTask", function( checkbox ) {
  var index = checkbox.closest("div").index();
  var store = amplify.store( "tasks" );
  store.tasks.splice(index, 1);
  amplify.store("tasks", store);
  checkbox.closest("div").fadeOut(700).delay(700).remove();
});

amplify.subscribe( "closeNewTask", function() {
  $_new.find("input[type='text']").val("").end()
       .hide();
} );