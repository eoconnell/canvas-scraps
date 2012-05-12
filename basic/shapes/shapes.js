var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

// RECTANGLES
context.fillStyle = '#FF0000';
context.fillRect(80,65,100, 50);

// CIRCLES
context.fillStyle = 'blue';
context.beginPath();
context.arc(40,40,20,0,Math.PI*2,true); // arc(centerX,centerY,radius,startAngle,endAngle,clockwise)
context.closePath();
context.fill();

// LINES
context.fillStyle = 'rgb(0,0,0)';
context.beginPath();
context.moveTo(225,125);
context.lineTo(270,45);
context.lineTo(225,10);
context.stroke();

// TRIANGLE
context.fillStyle = 'green';
context.beginPath();
context.moveTo(150,10);
context.lineTo(200,50);
context.lineTo(100,50);
context.closePath();
context.fill();