/**
 * Weather Application based on Open Weather Map API
 * zakhttp@gmail.com
 * https://github.com/zakhttp
 */
'use strict';
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
// Require the api call script
var Api = require('./src/components/api');
// Require the color theme map
var Theme = require('./src/components/colorThemes');
// Dynamic temperature text formatting for small screens of PixelRatio<=2
var temperatureFontSize = 180; // Initial temperature font size
var temperatureLineHeight = 250; // Initial temperature line height
if (PixelRatio.get() <= 2) {
    temperatureFontSize = 120;
    temperatureLineHeight = 170;
}
class weather extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
            loaded: false,
            theme: 'warm'
        };
    }
    componentDidMount() {
        this.getData();
    }
    // Fetch the data using the gps coordinates
    getData() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                Api(position.coords.latitude, position.coords.longitude)
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
                        console.log(position.coords.latitude);
                    });
            },
            (error) => alert(error.message),
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
        );

    }
    render() {
        // Render the activity monitor while the data is loading
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
            <View style={[
              styles.container, Theme(this.state.theme).background
              ]}>
                <View style={[styles.header]}>
                    <Text style={[
                        styles.location],
                        Theme(this.state.theme).foreground}>
                        {this.state.cityName}
                    </Text>
                    <Text style={[
                        styles.date,
                        Theme(this.state.theme).foreground
                      ]}>
                        {this.state.date}
                    </Text>
                </View>
                <View style={styles.main}>
                    <View style={styles.mainLeft}>
                        <Text style={[
                            styles.temperature,
                            Theme(this.state.theme).primary
                          ]}
                              allowFontScaling={true}>
                            {this.state.actualTemperature}
                        </Text>
                    </View>
                    <View style={styles.mainRight}>
                        <Text style={[
                            styles.degree,
                            Theme(this.state.theme).secondary
                          ]}>
                            °C
                        </Text>
                        <View>
                            <Text style={[
                                styles.minMax,
                                Theme(this.state.theme).foreground
                              ]}>
                                <Text style={[
                                    styles.minMaxArrow,
                                    Theme(this.state.theme).secondary
                                  ]}>
                                    ↑
                                </Text>
                                {this.state.maxTemperature}
                                ˚C
                            </Text>
                            <Text style={[
                                styles.minMax,
                                Theme(this.state.theme).foreground
                              ]}>
                                <Text style={[
                                    styles.minMaxArrow,
                                    Theme(this.state.theme).secondary
                                  ]}>
                                    ↓
                                </Text>
                                {this.state.minTemperature}
                                ˚C
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.sectionLg}>
                    <Text style={[
                        styles.weatherIcon,
                        Theme(this.state.theme).secondary
                    ]}>
                        {this.state.weatherIcon}
                    </Text>
                    <Text style={[
                        styles.weatherDescription,
                        Theme(this.state.theme).foreground
                    ]}>
                        {this.state.weatherDescription}
                    </Text>
                </View>
                <View style={styles.sectionSm}>
                    <View style={styles.widget}>
                        <Text style={[
                            styles.widgetValue,
                            Theme(this.state.theme).foreground
                        ]}>
                            {this.state.windSpeed}
                            <Text style={[
                                styles.widgetUnit,
                                Theme(this.state.theme).secondary
                              ]}> m/s
                            </Text>
                        </Text>
                        <Text style={[
                            styles.widgetLabel,
                            Theme(this.state.theme).foreground
                        ]}>
                            wind speed
                        </Text>
                    </View>
                    <View style={styles.widget}>
                        <Text style={[
                            styles.widgetValue,
                            Theme(this.state.theme).foreground
                        ]}>
                            {this.state.humidity}
                            <Text style={[
                                styles.widgetUnit,
                                Theme(this.state.theme).secondary
                                ]}> %
                            </Text>
                        </Text>
                        <Text style={[
                            styles.widgetLabel,
                            Theme(this.state.theme).foreground
                        ]}>
                            humidity
                        </Text>
                    </View>
                    <View style={styles.widget}>
                        <Text style={[
                            styles.widgetValue,
                            Theme(this.state.theme).foreground
                        ]}>
                            {this.state.pressure}
                            <Text style={[
                                styles.widgetUnit,
                                Theme(this.state.theme).secondary
                                ]}> hpa
                            </Text>
                        </Text>
                        <Text style={[
                            styles.widgetLabel,
                            Theme(this.state.theme).foreground
                        ]}>
                            pressure
                        </Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    <TemperatureChart
                        data={this.state.temperaturesForecast}
                        xLabels={this.state.temperaturesForecastLabels}
                        graph={Theme(this.state.theme).foreground}
                        highlight={Theme(this.state.theme).primary}
                        labelFontName="Abel-Regular"
                    />
                </View>
            </View>
        );
    }
   renderLoadingView() {
       return (
           <View
               style={[
            styles.loaderContainer, Theme(this.state.theme).background
            ]}>
               <ActivityIndicatorIOS
                   animating={true}
                   style={styles.loader}
                   color={Theme(this.state.theme).secondary.color}
                   size="large"
               />
           </View>
       );
 }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    loaderContainer: {
        flex: 1,
        backgroundColor: '#F5EED7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loader: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    main: {
        flex: 5,
        flexDirection: 'row',
    },
    mainLeft: {
        flex: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainRight: {
        flex: 3,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingVertical: 0,
    },
    sectionLg: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    sectionSm: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    widget: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 30,
    },
    location: {
        fontSize: 16,
        fontFamily: 'Abel-Regular',
        color: '#736A51',
        letterSpacing: 1
    },
    date: {
        fontSize: 16,
        fontFamily: 'Abel-Regular',
        color: '#736A51',
        letterSpacing: 1
    },
    temperature: {
        fontSize: temperatureFontSize,
        fontFamily: 'BigJohn',
        color: '#BF3B3B',
        backgroundColor: 'transparent',
        textAlign: 'justify',
        lineHeight: temperatureLineHeight,
        letterSpacing: -5
    },
    degree: {
        fontSize: 36,
        fontFamily: 'Abel-Regular',
        color: '#FF9F29',
        lineHeight: 36
    },
    minMax: {
        fontSize: 15,
        fontFamily: 'Abel-Regular',
        color: '#736A51',
        paddingVertical: 10,
        letterSpacing: 1
    },
    minMaxArrow: {
        color: '#FF9F29'
    },
    weatherDescription: {
        fontSize: 22,
        fontFamily: 'Abel-Regular',
        color: '#736A51',
        paddingVertical: 10,
        paddingHorizontal: 20,
        letterSpacing: 3
    },
    weatherIcon: {
        fontSize: 50,
        fontFamily: 'WeatherIcons-Regular',
        color: '#FF9F29',
        lineHeight: 75,
        paddingHorizontal: 20
    },
    widgetValue: {
        fontSize: 22,
        fontFamily: 'Abel-Regular',
        color: '#736A51',
        paddingBottom: 5,
        letterSpacing: 1
    },
    widgetUnit: {
        color: '#FF9F29',
        letterSpacing: 1
    },
    widgetLabel: {
        fontSize: 12,
        fontFamily: 'Abel-Regular',
        color: '#736A51',
        letterSpacing: 4,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
AppRegistry.registerComponent('weather', () => weather);
