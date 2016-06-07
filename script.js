var idNum = 0;
var checkId = "check" + idNum;

// add task function to list
var addTask = function(string) {
	var innerText = string;

	var task = $('<li />', {
		"class": 'task',
		"text": innerText,
		"id": idNum
	}).appendTo('#toDoList');

	$('<input />', {
		"type": 'checkbox',
		"class": 'check',
		"id": checkId
	}).prependTo(task);

	$('<button />', {
		"class": 'destroy',
		"text": "X",
		"id": idNum
	}).appendTo(task);
	
	idNum++;
};

//focuses on text box
var textBox = $('#taskText');
textBox.focus();

//deletes an item if press X box
var deleteItem = function() {
    $(this).parent().remove();
};

//if checkbox checked then stirikethrough and clears if unchecked
var strike = function () {
	$(this).parent().toggleClass('striked');
};

//only shows completed tasks
var showComplete = function() {
	var i = 0;
	while (i < idNum) {
		var currentTask = $('#'+i);
		
		if (currentTask.hasClass('striked')) {
			i++;
		}
		else if (!currentTask.hasClass('striked')){
			currentTask.fadeOut();
			i++;
		}	
	}
};

//only shows unfinished tasks
var showUnfinished = function() {
	var i = 0;
	while (i < idNum) {
		var currentTask = $('#'+i);
		
		if (!currentTask.hasClass('striked')) {
			i++;
		}
		else if (currentTask.hasClass('striked')){
			currentTask.fadeOut();
			i++;
		}	
	}
};

//shows all tasks
var showAll = function() {
	var i = 0;
	while (i < idNum) {
		var currentTask = $('#'+i);
		currentTask.fadeIn();
		i++;
	}	
};

//adds a task every time the button is clicked
var adder = $('#adder');
adder.click(function() {
	var text = $('#taskText').val();
	if (!text || text === "") {
		return false;
	}
	addTask(text); 
	textBox.focus();
	textBox.select();
});

//adds a task if enter key is pressed
textBox.keyup(function(event) {
	if (event.which === 13) {
		var text = $('#taskText').val();
		if (!text || text === "") {
			return false;
	}
		addTask(text);
		textBox.select(); 
	}	
});

// //edits a task *couldn't get this to fully work*
// var original;
// var editer = function() {
// 	original = $(this).text();
// 	$(this).text("");
// 	var input = $("<input type='text'>");
// 	input.appendTo(this).focus();
// }
// var editerComplete = function() {
// 	$(this).parent().text($(this).val() || original);
// 	$(this).parent().remove();
// }


//deletes a task if delete button is clicked
$(document).on('click', '.destroy', deleteItem);

//strikes through the task
$(document).on('click', '.check', strike);

//shows only completed tasks after pressing completed button
$(document).on('click', '#complete', showComplete);

//shows only unfinished tasks after pressing unfinished button
$(document).on('click', '#unfinished', showUnfinished);

//shows all tasks after pressing all tasks button
$(document).on('click', '#all', showAll);

// //edits a task if you doubleclick 
// $(document).on('dblclick', '.task', editer);
// $(document).on('focusout', '.task > input', editerComplete);