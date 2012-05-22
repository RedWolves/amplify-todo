amplify.request.define( "loadTasks", function(tasks) {
  tasks.success($.mockJSON.generateFromTemplate(tasks_template));
});



// mocks
var tasks_template = {
  "tasks|3-5":  [
      {
        task: "@LOREM"
      }
    ]
};