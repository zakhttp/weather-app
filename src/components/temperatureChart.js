import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import RNChart from 'react-native-chart';
class TemperatureChart extends Component {
  render(){
    return (
      <RNChart style={styles.chart}
                chartData = {
                  [
                    {
                      name: 'LineChart',
                      color: this.props.graph.color,
                      highlightIndices: [0, 1, 2 , 3, 4, 5, 6, 7, 8 ],
                      highlightColor: this.props.highlight.color,
                      showDataPoint: true,
                      data: this.props.data,
                      lineWidth: 3,
                      highlightRadius: 6,
                    }
                  ]
                }
                horizontalGridStep={3}
                xLabels={this.props.xLabels}
                tightBounds={false}
                axisLineWidth={2}
                showAxis={false}
                labelFontSize={11}
                labelFontName="Abel-Regular"
                />
    );
  }
}
const styles = StyleSheet.create({
  chart: {
    alignSelf: 'stretch',
    flex: 1
  }
});
module.exports = TemperatureChart;
