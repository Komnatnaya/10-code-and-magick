'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 430, 280);
  ctx.fillStyle = 'white';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили', 155, 20);
  ctx.fillText('Список результатов:', 155, 40);

  var max = -1;
  // var maxIndex = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
      // maxIndex = i;
    }
  }

  var histogramHeight = 150;
  var step = histogramHeight / (max - 0);

  var barWidth = 40;
  var stepWidth = 50;
  var initialX = 155;
  var initialY = 240;

  for (i = 0; i < times.length; i++) {
    ctx.fillRect(initialX + (barWidth + stepWidth) * i, initialY, barWidth, -1 * times[i] * step);
    ctx.fillText(names[i], initialX + (barWidth + stepWidth) * i, initialY + 10);
    ctx.fillText(Math.floor(times[i]), initialX + (barWidth + stepWidth) * i, initialY - times[i] * step - 20);
  }
};
