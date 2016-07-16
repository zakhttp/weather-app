// Icons array mapping with the OpenWeatherMAp
module.exports = function(iconCode) {
  let iconMap = {
    '01d': '\uf00d', // clear sky
    '02d': '\uf002', // few clouds
    '03d': '\uf041', // scattered clouds
    '04d': '\uf013', // broken clouds
    '09d': '\uf019', // shower rain
    '10d': '\uf008', // rain
    '11d': '\uf016', // thunderstorm
    '13d': '\uf064', // snow
    '50d': '\uf014', // mist
    '01n': '\uf077',
    '02n': '\uf086',
    '03n': '\uf041',
    '04n': '\uf031',
    '09n': '\uf028',
    '10n': '\uf028',
    '11n': '\uf016',
    '13n': '\uf016',
    '50n': '\uf014'
  };
  return iconMap[iconCode];
}
