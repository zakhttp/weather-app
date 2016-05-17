/**
 * Weather Application based on Open Weather Map API
 * zakhttp@gmail.com
 * https://github.com/zakhttp
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    PixelRatio,
    ActivityIndicatorIOS
} from 'react-native';

// Require thr chart component
var TemperatureChart = require('./src/components/temperatureChart');

//Require the api call script
var Api = require('./src/components/api');


// Dynamic temperature text formatting for small screens of PixelRatio<=2

// Initial temperature font size
var temperatureFontSize = 210;
var temperatureLineHeight = 300;


if (PixelRatio.get() <= 2) {
    temperatureFontSize = 170;
    temperatureLineHeight = 240;
}

class weather extends Component {

    constructor(props) {
        super(props);
        this.getLocationCoordinates = this.getLocationCoordinates.bind(this);
        this.fetchData = this.fetchData.bind(this);

        this.state = {
            latitude: null,
            longitude: null,
            actualTemperature: '',
            maxTemperature: '--',
            minTemperature: '--',
            date: '',
            cityName: '',
            windSpeed: '---',
            humidity: '--',
            pressure: '----',
            weatherDescription: '',
            weatherIcon: '',
            temperaturesForecast: [],
            temperaturesForecastLabels: [],
            loaded: false

        };
    }

    componentDidMount(){
      this.getLocationCoordinates();
      this.fetchData();

    }

    //Get the actual gps coordinates
    getLocationCoordinates() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,

                });
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }

    fetchData(){

      Api(this.state.latitude, this.state.longitude)
              .then((data) => {
                  this.setState({
                      actualTemperature: data.actualTemperature,
                      maxTemperature: data.maxTemperature,
                      minTemperature: data.minTemperature,
                      date: data.date,
                      cityName: data.cityName,
                      windSpeed: data.windSpeed,
                      humidity: data.humidity,
                      pressure: data.pressure,
                      weatherDescription: data.weatherDescription,
                      weatherIcon: data.weatherIcon,
                      temperaturesForecast: data.temperaturesForecast,
                      temperaturesForecastLabels: data.temperaturesForecastLabels,
                      loaded: true
                  });
      });


    }


    render() {

      if (!this.state.loaded) {
      return (
        <View style={styles.loaderContainer}>
        <ActivityIndicatorIOS
      animating={true}
      style={styles.loader}
      color="#1FA69D"

      size="large"
    />
          </View>
        );
      }
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.location}>
                        {this.state.cityName}
                    </Text>
                    <Text style={styles.date}>
                        {this.state.date}
                    </Text>
                </View>
                <View style={styles.main}>
                    <View style={styles.mainLeft}>
                        <Text style={styles.temperature}
                              allowFontScaling={true}>
                            {this.state.actualTemperature}
                        </Text>
                    </View>
                    <View style={styles.mainRight}>
                        <Text style={styles.degree}>
                            °C
                        </Text>
                        <View style={styles.minMaxContainer}>
                            <Text style={styles.minMax}>
                                <Text style={styles.minMaxArrow}>↑</Text> {this.state.maxTemperature}˚C
                            </Text>
                            <Text style={styles.minMax}>
                                <Text style={styles.minMaxArrow}>↓</Text> {this.state.minTemperature}˚C
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.sectionLg}>
                    <Text style={styles.weatherIcon}>
                        {this.state.weatherIcon}
                    </Text>
                    <Text style={styles.weatherDescription}>
                        {this.state.weatherDescription}
                    </Text>
                </View>
                <View style={styles.sectionSm}>
                    <View style={styles.widget}>
                        <Text style={styles.widgetValue}>
                            {this.state.windSpeed}
                            <Text style={styles.widgetUnit}> m/s</Text>
                        </Text>
                        <Text style={styles.widgetLabel}>
                            wind speed
                        </Text>
                    </View>
                    <View style={styles.widget}>
                        <View style={styles.widget}>
                            <Text style={styles.widgetValue}>
                                {this.state.humidity}
                                <Text style={styles.widgetUnit}> %</Text>
                            </Text>
                            <Text style={styles.widgetLabel}>
                                humidity
                            </Text>
                        </View>
                    </View>
                    <View style={styles.widget}>
                        <View style={styles.widget}>
                            <Text style={styles.widgetValue}>
                                {this.state.pressure}
                                <Text style={styles.widgetUnit}> hpa</Text>
                            </Text>
                            <Text style={styles.widgetLabel}>
                                pressure
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.footer}>
                    <TemperatureChart
                        //TODO: Factoring the temperatures forecast array
                        data={this.state.temperaturesForecast}
                        xLabels={this.state.temperaturesForecastLabels}
                    />
                </View>
            </View>
        );
    }

  //   renderLoadingView() {
  //   return (
  //     <View style={styles.container}>
  //       <Text>
  //         Loading movies...
  //       </Text>
  //     </View>
  //   );
  // }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'stretch'
    },
    loaderContainer:{
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loader: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
        flex: 3,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    main: {
        flex: 5,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
    },
    mainLeft: {
        flex: 9,
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    mainRight: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
        paddingVertical: 0
    },
    sectionLg: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 20
    },
    sectionSm: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingHorizontal: 20
    },
    widget: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'stretch',
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    location: {
        fontSize: 16,
        fontFamily: 'Abel-Regular',
        color: '#353E3E',
        letterSpacing: 1
    },
    date: {
        fontSize: 16,
        fontFamily: 'Abel-Regular',
        color: '#353E3E',
        letterSpacing: 1
    },
    temperature: {
        fontSize: temperatureFontSize,
        fontFamily: 'BigJohn',
        color: '#4A5758',
        backgroundColor: 'transparent',
        lineHeight: temperatureLineHeight,
        letterSpacing: -5
    },
    degree: {
        fontSize: 46,
        fontFamily: 'Abel-Regular',
        color: '#1FA69D',
        lineHeight: 46
    },
    minMax: {
        fontSize: 15,
        fontFamily: 'Abel-Regular',
        color: '#353E3E',
        paddingVertical: 10,
        letterSpacing: 1
    },
    minMaxArrow: {
        color: '#1FA69D'
    },
    weatherDescription: {
        fontSize: 26,
        fontFamily: 'Abel-Regular',
        color: '#353E3E',
        paddingVertical: 10,
        paddingHorizontal: 20,
        letterSpacing: 3
    },
    weatherIcon: {
        fontSize: 50,
        fontFamily: 'WeatherIcons-Regular',
        color: '#1FA69D',
        lineHeight: 75,
        paddingHorizontal: 20
    },
    widgetValue: {
        fontSize: 22,
        fontFamily: 'Abel-Regular',
        color: '#353E3E',
        paddingBottom: 5,
        letterSpacing: 1
    },
    widgetUnit: {
        color: '#1FA69D',
        letterSpacing: 1
    },
    widgetLabel: {
        fontSize: 12,
        fontFamily: 'Abel-Regular',
        color: '#353E3E',
        letterSpacing: 4,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

AppRegistry.registerComponent('weather', () => weather);
