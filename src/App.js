import React from 'react';
import Plot from 'react-plotly.js';
import './App.css';

let rawDataOneYear = ['20000108,23', '20000116,22', '20000124,23', '20000201,23', '20000209,23', '20000217,23', '20000225,24', '20000305,23', '20000313,22', '20000321,21', '20000329,23', '20000406,23', '20000414,25', '20000422,24', '20000430,25', '20000508,31', '20000516,34', '20000524,37', '20000601,36', '20000609,36', '20000617,37', '20000625,44', '20000703,53', '20000711,60', '20000719,68', '20000727,74', '20000804,81', '20000812,87', '20000820,89', '20000828,90', '20000905,88', '20000913,86', '20000921,83', '20000929,79', '20001007,72', '20001015,62', '20001023,51', '20001031,41', '20001108,34', '20001116,29', '20001124,26', '20001202,24', '20001210,24', '20001218,23', '20001226,23', '20010103,22' ];

// lng: -85.01358032226562
// lat:  40.36224194899873

const getDayOfYear = date => {
  var start = new Date(date.getFullYear(), 0, 0);
  var diff = date - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  return day;
}

const data = rawDataOneYear.map(d => {
  let split = d.split(',')
  let dateString = split[0];
  let val = parseFloat(split[1]);
  let date = new Date(
    parseInt(dateString.substring(0,4)), // year
    (parseInt(dateString.substring(4,6))-1), // months are 0-indexed
    parseInt(dateString.substring(6,8))); // day of month
  return { date: date, val: val };
})

const unpack = key => {
  if (key === 'val') {
    return data.map(d => d.val);
  }
  if (key === 'doy') {
    return data.map(d => getDayOfYear(d.date));
  }
  if (key === 'date') {
    return data.map(d => d.date);
  }
}

const dataPlotly = [
  {
    type: "scatterpolar",
    mode: "lines+markers",
    name: "data",
    r: unpack('val'),
    theta: unpack('doy'),
    customdata: unpack('date'),
    hovertemplate: "%{customdata|%B %d, %Y}<br>NDVI: %{r:.1f}<extra></extra>"
  }
];

const layout = {
  width: 800,
  height: 800,
  polar: {
    domain: {
      x: [0, 100],
      y: [1, 365]
    },
    radialaxis: {
      visible: true,
      type: "linear",
    },
    angularaxis: {
      visible: true,
      type: "linear",
      tickmode: "array",
      showticklabels: true,
      tickvals: [ 1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335 ],
      ticktext: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
      direction: "clockwise",
      period: 12
    }
  }
}

function App() {
  return (
    <Plot
      data={dataPlotly}
      layout={layout}
      config={{responsive: true}}
    />
  );
}

export default App;
