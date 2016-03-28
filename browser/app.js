
var socket = io(window.location.origin);
socket.on('connect', function(){
	console.log('I have made a persistent two-way connection to the server!');
});



window.whiteboard.on('draw', function(start, end, color){
	socket.emit('drawing', start, end, color);
	//console.log('payLoad', payload);
});

socket.on('drawing', function(start, end, color){
	window.whiteboard.draw(start, end, color);
});

socket.on('broadcasting', function(start, end, color){
	//console.dir(payload);
	window.whiteboard.draw(start, end, color);
});

socket.on('refreshdraw', function(cordArray){
	cordArray.forEach(function(ele){
		window.whiteboard.draw(ele.start, ele.end, ele.color);
	});
});

// cordArray.forEach(function(ele){
// 	console.log('im inside the forEach!');
// 	socket.emit('drawing', ele.start, ele.end, ele.color);
// });
