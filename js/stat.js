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

  // Отрисовка облака
  var drawCloud = function () {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(BEGIN_CLOUD_X + SHIFT_SHADOW_XY, BEGIN_CLOUD_Y + SHIFT_SHADOW_XY, WIDTH_CLOUD, HEIGHT_CLOUD);
    ctx.fillStyle = 'white';
    ctx.strokeRect(BEGIN_CLOUD_X, BEGIN_CLOUD_Y, WIDTH_CLOUD, HEIGHT_CLOUD);
    ctx.fillRect(BEGIN_CLOUD_X, BEGIN_CLOUD_Y, WIDTH_CLOUD, HEIGHT_CLOUD);
  };

  // Титульная подпись
  var writeTitle = function () {
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText('Ура вы победили', initialX, 20);
    ctx.fillText('Список результатов:', initialX, 40);
  };

  // Выбор максимального времени
  for (var i = 0; i < times.length; i++) {
    var time = times[i];

    if (time > max) {
      max = time;
    }
  }
  // Задача шага для равномерного заполнения гистограммы
  var step = histogramHeight / max;

  var drawColumn = function (namesUsers, timesUsers) {
    for (i = 0; i < times.length; i++) {
      // Задача цвета колонкам
      if (namesUsers[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        var transparency = Math.random() * 0.7 + 0.3;
        ctx.fillStyle = 'rgba(0, 0, 255,' + transparency + ')';
      }
      // Рисуем колонки
      ctx.fillRect(initialX + (barWidth + stepWidth) * i, initialY, barWidth, -1 * timesUsers[i] * step);
      // Подписываем имена
      ctx.fillStyle = '#000';
      ctx.fillText(namesUsers[i], initialX + (barWidth + stepWidth) * i, initialY + 10);
      // Подписываем округленные результаты времени
      ctx.fillText(Math.floor(timesUsers[i]), initialX + (barWidth + stepWidth) * i, initialY - timesUsers[i] * step - 20);
    }
  };

  drawCloud();
  writeTitle();
  drawColumn(names, times);
};
