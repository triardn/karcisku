import React, {useState, useEffect} from 'react';
import {View, processColor} from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';

const data = [
  {y: [100, 40, 13], marker: ['Standup Comedy', 'Music', 'Others']},
  {y: [80, 60, 21], marker: ['Standup Comedy', 'Music', 'Others']},
  {y: [40, 90, 10], marker: ['Standup Comedy', 'Music', 'Others']},
  {y: [78, 45, 7], marker: ['Standup Comedy', 'Music', 'Others']},
  {y: [67, 87, 22], marker: ['Standup Comedy', 'Music', 'Others']},
  {y: [98, 32, 30], marker: ['Standup Comedy', 'Music', 'Others']},
  {y: [150, 90, 48], marker: ['Standup Comedy', 'Music', 'Others']},
];

const Statistics = () => {
  useEffect(() => {
    let chartsData = [];
    let chartsValue = [];
    const newData = data.map((item) => {
      chartsValue = item.y;
      let marker = item.marker.map((value, index) => {
        return `${value} \n ${item.y[index]}`;
      });

      chartsData = [...chartsData, {y: chartsValue, marker: marker}];
    });
    setChart({
      data: {
        dataSets: [
          {
            values: chartsData,
            label: '',
            config: {
              colors: [
                processColor('blue'),
                processColor('red'),
                processColor('green'),
              ],
              stackLabels: ['Standup Comedy', 'Music', 'Others'],
              drawFilled: false,
              drawValues: false,
            },
          },
        ],
      },
    });
  }, []);

  const [legend, setLegend] = useState({
    enabled: true,
    textSize: 14,
    form: 'SQUARE',
    formSize: 14,
    xEntrySpace: 10,
    yEntrySpace: 5,
    formToTextSpace: 5,
    wordWrapEnabled: true,
    maxSizePercent: 0.5,
  });

  const [chart, setChart] = useState({
    data: {
      dataSets: [
        {
          values: data,
          label: '',
          config: {
            colors: [
              processColor('blue'),
              processColor('red'),
              processColor('green'),
            ],
            stackLabels: ['Standup Comedy', 'Music', 'Others'],
            drawFilled: false,
            drawValues: false,
          },
        },
      ],
    },
  });

  const [xAxis, setXAxis] = useState({
    valueFormatter: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Agu',
      'Sep',
      'Oct',
      'Nov',
      'Des',
    ],
    position: 'BOTTOM',
    drawAxisLine: true,
    drawGridLines: false,
    axisMinimum: -0.5,
    granularityEnabled: true,
    granularity: 1,
    axisMaximum: new Date().getMonth(),
    spaceBetweenLabels: 0,
    labelRotationAngle: -45.0,
    limitLines: [{limit: 115, lineColor: processColor('red'), lineWidth: 1}],
  });

  const [yAxis, setYAxis] = useState({
    left: {
      axisMinimum: 0,
      labelCountForce: true,
      granularity: 5,
      granularityEnabled: true,
      drawGridLines: false,
    },
    right: {
      axisMinimum: 0,
      labelCountForce: true,
      granularity: 5,
      granularityEnabled: true,
      enabled: false,
    },
  });

  return (
    <View style={{flex: 1}}>
      <BarChart
        style={{flex: 1}}
        data={chart.data}
        yAxis={yAxis}
        xAxis={xAxis}
        doubleTapToZoomEnabled={false}
        pinchZoom={false}
        chartDescription={{text: ''}}
        legend={legend}
        marker={{
          enabled: true,
          markerColor: 'grey',
          textColor: 'white',
          markerFontSize: 14,
          digits: 5,
        }}
      />
    </View>
  );
};

export default Statistics;
