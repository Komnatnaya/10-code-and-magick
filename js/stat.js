'use strict';

window.renderStatistics = function (ctx, names, times) {
  var heightCloud = 270;
  var widthCloud = 420;
  var beginCloudX = 100;
  var beginCloudY = 10;
  var shiftShadowXY = 10;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(beginCloudX + shiftShadowXY, beginCloudY + shiftShadowXY, widthCloud + shiftShadowXY, heightCloud + shiftShadowXY);
  ctx.fillStyle = 'white';
  ctx.strokeRect(beginCloudX, beginCloudY, widthCloud, heightCloud);
  ctx.fillRect(beginCloudX, beginCloudY, widthCloud, heightCloud);

  var max = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  var histogramHeight = 150;
  var step = histogramHeight / (max - 0);

  var barWidth = 40;
  var stepWidth = 50;
  // var initialX = 155;
  var initialX = beginCloudX + (widthCloud - barWidth * names.length - stepWidth * (names.length - 1)) / 2;
  var initialY = 240;

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили', initialX, 20);
  ctx.fillText('Список результатов:', initialX, 40);

  for (i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var transparency = Math.random() + 0.1;
      // var transparency = i * 0.1 + 0.5;
      ctx.fillStyle = 'rgba(0, 0, 255,' + transparency + ')';
    }
    ctx.fillRect(initialX + (barWidth + stepWidth) * i, initialY, barWidth, -1 * times[i] * step);

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], initialX + (barWidth + stepWidth) * i, initialY + 10);
    ctx.fillText(Math.floor(times[i]), initialX + (barWidth + stepWidth) * i, initialY - times[i] * step - 20);
  }
};
