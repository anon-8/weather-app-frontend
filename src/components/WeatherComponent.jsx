import React, {useState} from 'react';
import axios from 'axios';

const WeatherComponent = () => {



    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [forecast_days] = useState(7);
    const [hourly] = useState("temperature_2m,weather_code,snow_depth");
    const [daily] = useState("weather_code,temperature_2m_max,temperature_2m_min,sunshine_duration");

    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setLatitude(latitude);
                    setLongitude(longitude);
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };
    const weatherCodeData = {

        "0":{
        "day":{
            "description":"Sunny",
                "image":"http://openweathermap.org/img/wn/01d@2x.png"
        },
        "night":{
            "description":"Clear",
                "image":"http://openweathermap.org/img/wn/01n@2x.png"
        }
    },
        "1":{
        "day":{
            "description":"Mainly Sunny",
                "image":"http://openweathermap.org/img/wn/01d@2x.png"
        },
        "night":{
            "description":"Mainly Clear",
                "image":"http://openweathermap.org/img/wn/01n@2x.png"
        }
    },
        "2":{
        "day":{
            "description":"Partly Cloudy",
                "image":"http://openweathermap.org/img/wn/02d@2x.png"
        },
        "night":{
            "description":"Partly Cloudy",
                "image":"http://openweathermap.org/img/wn/02n@2x.png"
        }
    },
        "3":{
        "day":{
            "description":"Cloudy",
                "image":"http://openweathermap.org/img/wn/03d@2x.png"
        },
        "night":{
            "description":"Cloudy",
                "image":"http://openweathermap.org/img/wn/03n@2x.png"
        }
    },
        "45":{
        "day":{
            "description":"Foggy",
                "image":"http://openweathermap.org/img/wn/50d@2x.png"
        },
        "night":{
            "description":"Foggy",
                "image":"http://openweathermap.org/img/wn/50n@2x.png"
        }
    },
        "48":{
        "day":{
            "description":"Rime Fog",
                "image":"http://openweathermap.org/img/wn/50d@2x.png"
        },
        "night":{
            "description":"Rime Fog",
                "image":"http://openweathermap.org/img/wn/50n@2x.png"
        }
    },
        "51":{
        "day":{
            "description":"Light Drizzle",
                "image":"http://openweathermap.org/img/wn/09d@2x.png"
        },
        "night":{
            "description":"Light Drizzle",
                "image":"http://openweathermap.org/img/wn/09n@2x.png"
        }
    },
        "53":{
        "day":{
            "description":"Drizzle",
                "image":"http://openweathermap.org/img/wn/09d@2x.png"
        },
        "night":{
            "description":"Drizzle",
                "image":"http://openweathermap.org/img/wn/09n@2x.png"
        }
    },
        "55":{
        "day":{
            "description":"Heavy Drizzle",
                "image":"http://openweathermap.org/img/wn/09d@2x.png"
        },
        "night":{
            "description":"Heavy Drizzle",
                "image":"http://openweathermap.org/img/wn/09n@2x.png"
        }
    },
        "56":{
        "day":{
            "description":"Light Freezing Drizzle",
                "image":"http://openweathermap.org/img/wn/09d@2x.png"
        },
        "night":{
            "description":"Light Freezing Drizzle",
                "image":"http://openweathermap.org/img/wn/09n@2x.png"
        }
    },
        "57":{
        "day":{
            "description":"Freezing Drizzle",
                "image":"http://openweathermap.org/img/wn/09d@2x.png"
        },
        "night":{
            "description":"Freezing Drizzle",
                "image":"http://openweathermap.org/img/wn/09n@2x.png"
        }
    },
        "61":{
        "day":{
            "description":"Light Rain",
                "image":"http://openweathermap.org/img/wn/10d@2x.png"
        },
        "night":{
            "description":"Light Rain",
                "image":"http://openweathermap.org/img/wn/10n@2x.png"
        }
    },
        "63":{
        "day":{
            "description":"Rain",
                "image":"http://openweathermap.org/img/wn/10d@2x.png"
        },
        "night":{
            "description":"Rain",
                "image":"http://openweathermap.org/img/wn/10n@2x.png"
        }
    },
        "65":{
        "day":{
            "description":"Heavy Rain",
                "image":"http://openweathermap.org/img/wn/10d@2x.png"
        },
        "night":{
            "description":"Heavy Rain",
                "image":"http://openweathermap.org/img/wn/10n@2x.png"
        }
    },
        "66":{
        "day":{
            "description":"Light Freezing Rain",
                "image":"http://openweathermap.org/img/wn/10d@2x.png"
        },
        "night":{
            "description":"Light Freezing Rain",
                "image":"http://openweathermap.org/img/wn/10n@2x.png"
        }
    },
        "67":{
        "day":{
            "description":"Freezing Rain",
                "image":"http://openweathermap.org/img/wn/10d@2x.png"
        },
        "night":{
            "description":"Freezing Rain",
                "image":"http://openweathermap.org/img/wn/10n@2x.png"
        }
    },
        "71":{
        "day":{
            "description":"Light Snow",
                "image":"http://openweathermap.org/img/wn/13d@2x.png"
        },
        "night":{
            "description":"Light Snow",
                "image":"http://openweathermap.org/img/wn/13n@2x.png"
        }
    },
        "73":{
        "day":{
            "description":"Snow",
                "image":"http://openweathermap.org/img/wn/13d@2x.png"
        },
        "night":{
            "description":"Snow",
                "image":"http://openweathermap.org/img/wn/13n@2x.png"
        }
    },
        "75":{
        "day":{
            "description":"Heavy Snow",
                "image":"http://openweathermap.org/img/wn/13d@2x.png"
        },
        "night":{
            "description":"Heavy Snow",
                "image":"http://openweathermap.org/img/wn/13n@2x.png"
        }
    },
        "77":{
        "day":{
            "description":"Snow Grains",
                "image":"http://openweathermap.org/img/wn/13d@2x.png"
        },
        "night":{
            "description":"Snow Grains",
                "image":"http://openweathermap.org/img/wn/13n@2x.png"
        }
    },
        "80":{
        "day":{
            "description":"Light Showers",
                "image":"http://openweathermap.org/img/wn/09d@2x.png"
        },
        "night":{
            "description":"Light Showers",
                "image":"http://openweathermap.org/img/wn/09n@2x.png"
        }
    },
        "81":{
        "day":{
            "description":"Showers",
                "image":"http://openweathermap.org/img/wn/09d@2x.png"
        },
        "night":{
            "description":"Showers",
                "image":"http://openweathermap.org/img/wn/09n@2x.png"
        }
    },
        "82":{
        "day":{
            "description":"Heavy Showers",
                "image":"http://openweathermap.org/img/wn/09d@2x.png"
        },
        "night":{
            "description":"Heavy Showers",
                "image":"http://openweathermap.org/img/wn/09n@2x.png"
        }
    },
        "85":{
        "day":{
            "description":"Light Snow Showers",
                "image":"http://openweathermap.org/img/wn/13d@2x.png"
        },
        "night":{
            "description":"Light Snow Showers",
                "image":"http://openweathermap.org/img/wn/13n@2x.png"
        }
    },
        "86":{
        "day":{
            "description":"Snow Showers",
                "image":"http://openweathermap.org/img/wn/13d@2x.png"
        },
        "night":{
            "description":"Snow Showers",
                "image":"http://openweathermap.org/img/wn/13n@2x.png"
        }
    },
        "95":{
        "day":{
            "description":"Thunderstorm",
                "image":"http://openweathermap.org/img/wn/11d@2x.png"
        },
        "night":{
            "description":"Thunderstorm",
                "image":"http://openweathermap.org/img/wn/11n@2x.png"
        }
    },
        "96":{
        "day":{
            "description":"Light Thunderstorms With Hail",
                "image":"http://openweathermap.org/img/wn/11d@2x.png"
        },
        "night":{
            "description":"Light Thunderstorms With Hail",
                "image":"http://openweathermap.org/img/wn/11n@2x.png"
        }
    },
        "99":{
        "day":{
            "description":"Thunderstorm With Hail",
                "image":"http://openweathermap.org/img/wn/11d@2x.png"
        },
        "night":{
            "description":"Thunderstorm With Hail",
                "image":"http://openweathermap.org/img/wn/11n@2x.png"
        }
    }
    }

    const getImageUrl = (weatherCode) => {
        return weatherCodeData[weatherCode].day.image;
    };

    const fetchData = () => {
        setLoading(true);
        axios.get('http://localhost:8080/api/v1/getWeatherData', {
            params: {
                latitude,
                longitude,
                hourly,
                daily,
                forecast_days
            }
        })
            .then(response => {

                setWeatherData(response.data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                setError('Error fetching weather data');
            })
            .finally(() => {
                setLoading(false);
            });
    }
    getLocation()

    return (
        <div className="container mx-auto min-w-96 px-4 py-8">

            <div className="flex justify-center">
            <button onClick={fetchData} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Fetch Weather Data
            </button>
            </div>

            {loading && <p className="mt-4 text-gray-600">Loading...</p>}
            {error && <p className="mt-4 text-red-600">Error: {error}</p>}

            {weatherData && (
                <div className="flex justify-center">
                <div className="mt-8 grid grid-cols-1 sd:grid-cols-2 md:grid-cols-3 hd:grid-cols-4 fhd:grid-cols-5 wqhd:grid-cols-7  gap-8 ">
                    {Object.keys(weatherData.dailyWeatherData).map(date => {
                        const dayWeather = weatherData.dailyWeatherData[date];
                        const weatherCode = dayWeather.weather_code;
                        const imageUrl = getImageUrl(weatherCode);
                        return (
                            <div key={date} className="p-4 bg-gray-500 rounded min-w-72 max-w-72">
                                <div className="flex justify-center align-middle">
                                    <img src={imageUrl} alt="Weather icon" className="w-40 h-40"/>
                                </div>
                                <h2 className="text-lg font-bold mb-4">{date}</h2>
                                <p className="left-1">Min Temp: {dayWeather.temperature_2m_min} °C</p>
                                <p>Max Temp: {dayWeather.temperature_2m_max} °C</p>
                                <p>Energy Generated: {dayWeather.estimatedPowerGenerated} kWh</p>
                            </div>
                        );
                    })}
                </div>
                </div>
            )}
        </div>
    );
};

export default WeatherComponent;