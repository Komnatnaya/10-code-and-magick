'use strict';

window.renderStatistics = function (ctx, names, times) {
  var HEIGHT_CLOUD = 270;
  var WIDTH_CLOUD = 420;
  var BEGIN_CLOUD_X = 100;
  var BEGIN_CLOUD_Y = 10;
  var SHIFT_SHADOW_XY = 10;

  var histogramHeight = 150;
  var max = -1;
  var barWidth = 40;
  var stepWidth = 50;
  var initialX = BEGIN_CLOUD_X + (WIDTH_CLOUD - barWidth * names.length - stepWidth * (names.length - 1)) / 2;
  var initialY = 240;

  var drawCloud = function () {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(BEGIN_CLOUD_X + SHIFT_SHADOW_XY, BEGIN_CLOUD_Y + SHIFT_SHADOW_XY, WIDTH_CLOUD, HEIGHT_CLOUD);
    ctx.fillStyle = 'white';
    ctx.strokeRect(BEGIN_CLOUD_X, BEGIN_CLOUD_Y, WIDTH_CLOUD, HEIGHT_CLOUD);
    ctx.fillRect(BEGIN_CLOUD_X, BEGIN_CLOUD_Y, WIDTH_CLOUD, HEIGHT_CLOUD);
  };

  var writeTitle = function () {
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText('Ура вы победили', initialX, 20);
    ctx.fillText('Список результатов:', initialX, 40);
  };

  var drawColumn = function (namesUsers, timesUsers) {
    for (var i = 0; i < times.length; i++) {
      var time = times[i];

      if (time > max) {
        max = time;
      }

      var step = histogramHeight / max;

      if (namesUsers[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        var transparency = Math.random() * 0.8 + 0.2;
        ctx.fillStyle = 'rgba(0, 0, 255,' + transparency + ')';
      }

      ctx.fillRect(initialX + (barWidth + stepWidth) * i, initialY, barWidth, -1 * timesUsers[i] * step);

      ctx.fillStyle = '#000';
      ctx.fillText(namesUsers[i], initialX + (barWidth + stepWidth) * i, initialY + 10);
      ctx.fillText(Math.floor(timesUsers[i]), initialX + (barWidth + stepWidth) * i, initialY - timesUsers[i] * step - 20);
    }
  };

  drawCloud();
  writeTitle();
  drawColumn(names, times);
};
