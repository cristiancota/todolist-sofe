function guardar(hola) {
	var idElement = hola.getAttribute('id-element')
	var titleUpdated = $(hola).parent().parent().find(".titleElement")
	var elementState = $(hola).parent().parent().find('input[type="checkbox"]').is(':checked');

	$.ajax({
		url: 'http://api.mylist.io/v1/todos/'+idElement,
		type: 'PUT',
		data: {"todo":{"title": titleUpdated.text() ,"isCompleted": elementState }},
		success:function(data){
			titleUpdated.text(data.todo.title)
		}
	});
}

function borrar(hola) {
	var idElement = hola.getAttribute('id-element')

	$.ajax({
		url: 'http://api.mylist.io/v1/todos/'+idElement,
		type: 'DELETE',
		success:function(data){
			console.log(data)
			$(hola).parent().parent().remove()
		}
	});
}

$(document).ready(function() {
	
	$.ajax({
		url: 'http://api.mylist.io/v1/todos',
		success: function(data) {
			var todos = data.todos;
			todos.forEach(function(elem, index){
				$('#lista').append('<tr>'+
					'<td><input type="checkbox"'+ ( (elem.isCompleted == 'true') ? 'checked' : '')+ '></td>'+
					'<td contenteditable class="titleElement">'+ elem.title +'</td>'+
					'<td class="hide id_column">'+ elem._id +'</td>'+
					'<td><a href="#" id-element="'+elem._id+'" class="guardarBtn" onclick="guardar(this)">Guardar</a> '+
					'<a href="#" id-element="'+elem._id+'" class="borrarBtn" onclick="borrar(this)">Borrar</a></td>'+
					'</tr>')
			});
		}
	});

	$('#agregarLista').on('submit', function(event) {
		event.preventDefault();
		/* Act on the event */

		if ($('#titleNewItem').val() == '') {
			alert('escribe un titulo')
		}else{
			var newTitle = $('#titleNewItem').val();

			$.ajax({
				url: 'http://api.mylist.io/v1/todos',
				type: 'POST',
				data: {"todo":{"title": newTitle,"isCompleted":"false"}},
				success: function (data) {
					console.log(data)
					$('#titleNewItem').val('');

					$('#lista').append('<tr>'+
						'<td><input type="checkbox"></td>'+
						'<td contenteditable class="titleElement">'+ data.todo.title +'</td>'+
						'<td class="hide id_column">'+data.todo._id+'</td>'+
						'<td><a href="#" id-element="'+data.todo._id+'" class="guardarBtn" onclick="guardar(this)">Guardar</a> '+
						'<a href="#" id-element="'+data.todo._id+'" class="borrarBtn" onclick="borrar(this)">Borrar</a></td>'+
						'</tr>')
				}
			});
		}

	});

});

