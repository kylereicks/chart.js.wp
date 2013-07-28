;(function(w){
	'use strict';

  // Get data from table and format as JSON for Chart.js
  w.getTableData = function(tableID, chartType){
    var table = w.document.getElementById(tableID);

    if('bar' === chartType || 'line' === chartType || 'radar' === chartType){
      var chartData = {};

      chartData.labels = [];

      for(var i = 0, rl = table.rows[0].cells.length; i < rl; i++){
        chartData.labels[i] = table.rows[0].cells[i].innerHTML;
      }

      chartData.datasets = [];

      for(var r = 1, rl = table.rows.length; r < rl; r++){
        chartData.datasets[r - 1] = {};
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
            chartData[r].value = table.rows[r].cells[c].innerHTML;
          }
        }
      }
    }

    return chartData;
  };

  // Roundup the canvas elements in the document
  var canvases = w.document.getElementsByTagName('canvas');

  // Loop through the canvas elements
  for(var i = 0, ci = canvases.length; i < ci; i++){

    // If canvas element is to be a chart, initialize that chart
    if(canvases[i].hasAttribute('data-chart')){
      var chartType = canvases[i].getAttribute('data-chart') || 'Bar';
      switch(chartType.toLowerCase()){
        case 'bar':
          new Chart(canvases[i].getContext('2d')).Bar(w.getTableData(canvases[i].getAttribute('data-source'), 'bar'));
          break;
        case 'line':
          new Chart(canvases[i].getContext('2d')).Line(w.getTableData(canvases[i].getAttribute('data-source'), 'line'));
          break;
        case 'radar':
          new Chart(canvases[i].getContext('2d')).Radar(w.getTableData(canvases[i].getAttribute('data-source'), 'radar'));
          break;
        case 'polararea':
        case 'polar area':
          new Chart(canvases[i].getContext('2d')).PolarArea(w.getTableData(canvases[i].getAttribute('data-source'), 'polararea'));
          break;
        case 'pie':
          new Chart(canvases[i].getContext('2d')).Pie(w.getTableData(canvases[i].getAttribute('data-source'), 'pie'));
          break;
        case 'doughnut':
          new Chart(canvases[i].getContext('2d')).Doughnut(w.getTableData(canvases[i].getAttribute('data-source'), 'doughnut'));
          break;
      }
    }
  }

}(this));
