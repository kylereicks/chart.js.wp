;(function(w){
  'use strict';

  // Color Defaults
  var chartWP = chartWP || {};
  chartWP.colors = chartWP.colors || [];
  chartWP.colors[0] = chartWP.colors[0] || 'rgba(181, 137, 0, 1)';
  chartWP.colors[1] = chartWP.colors[1] || 'rgba(203, 75, 22, 1)';
  chartWP.colors[2] = chartWP.colors[2] || 'rgba(220, 50, 47, 1)';
  chartWP.colors[3] = chartWP.colors[3] || 'rgba(211, 54, 130, 1)';
  chartWP.colors[4] = chartWP.colors[4] || 'rgba(108, 113, 196, 1)';
  chartWP.colors[5] = chartWP.colors[5] || 'rgba(38, 139, 210, 1)';
  chartWP.colors[6] = chartWP.colors[6] || 'rgba(42, 161, 152, 1)';
  chartWP.colors[7] = chartWP.colors[7] || 'rgba(133, 153, 0, 1)';
  chartWP.colors[8] = chartWP.colors[8] || 'rgba(7, 54, 66, 1)';
  chartWP.colors[9] = chartWP.colors[9] || 'rgba(238, 232, 213, 1)';
  chartWP.colors[255] = chartWP.colors[255] || 'rgba(255, 255, 255, 1)';

  // Get data from table and format as JSON for Chart.js
  w.getTableData = function(table, chartType){

    if('bar' === chartType || 'line' === chartType || 'radar' === chartType){
      var chartData = {};

      chartData.labels = [];

      for(var i = 0, rl = table.rows[0].cells.length; i < rl; i++){
        chartData.labels[i] = table.rows[0].cells[i].innerHTML;
      }

      chartData.datasets = [];

      for(var r = 1, rl = table.rows.length; r < rl; r++){
        chartData.datasets[r - 1] = {};
        chartData.datasets[r - 1].fillColor = chartWP.colors[r - 1].match(/.+(?=1\)$)/) + '.5)';
        chartData.datasets[r - 1].strokeColor = chartWP.colors[r - 1];
        chartData.datasets[r - 1].pointColor = chartWP.colors[r - 1];
        chartData.datasets[r - 1].pointStrokeColor = chartWP.colors[255];
        chartData.datasets[r - 1].data = [];

        for(var c = 0, cl = table.rows[r].cells.length; c < cl; c++){
          chartData.datasets[r - 1].data[c] = table.rows[r].cells[c].innerHTML;
        }
      }
    }else{
      var chartData = [];

      for(var r = 0, rl = table.rows.length; r < rl; r++){
        chartData[r] = {};

        for(var c = 0, cl = table.rows[r].cells.length; c < cl; c++){
          if(!isNaN(table.rows[r].cells[c].innerHTML)){
            chartData[r].value = + table.rows[r].cells[c].innerHTML;
            chartData[r].color = chartWP.colors[r] || chartWP.colors[0];
          }
        }
      }
    }

    return chartData;
  };

  var tables = w.document.getElementsByTagName('table');

  // Loop through the canvas elements
  for(var i = 0, ti = tables.length; i < ti; i++){

    // If canvas element is to be a chart, initialize that chart
    if(tables[i].hasAttribute('data-chart')){
      var canvas = w.document.createElement('canvas');
      var chartType = tables[i].getAttribute('data-chart') || 'Bar';
      switch(chartType.toLowerCase()){
        case 'bar':
          new Chart(canvas.getContext('2d')).Bar(w.getTableData(tables[i], 'bar'));
          break;
        case 'line':
          new Chart(canvas.getContext('2d')).Line(w.getTableData(tables[i], 'line'));
          break;
        case 'radar':
          new Chart(canvas.getContext('2d')).Radar(w.getTableData(tables[i], 'radar'));
          break;
        case 'polararea':
        case 'polar area':
          new Chart(canvas.getContext('2d')).PolarArea(w.getTableData(tables[i], 'polararea'));
          break;
        case 'pie':
          new Chart(canvas.getContext('2d')).Pie(w.getTableData(tables[i], 'pie'));
          break;
        case 'doughnut':
          new Chart(canvas.getContext('2d')).Doughnut(w.getTableData(tables[i], 'doughnut'));
          break;
      }
      tables[i].parentNode.insertBefore(canvas, tables[i]);
    }
  }

}(this));
