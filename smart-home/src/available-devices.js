import { faLightbulb, faSnowflake, faWind, faTv } from '@fortawesome/free-solid-svg-icons';

const availableDevices = {
    Lamp: {
        name: 'Lamp',
        slider: true,
        isNonToggled: false,
        icon: faLightbulb,
        sliderDescription: 'Brightness',
        sliderUnits: '%',
        sliderRange: [0, 100],
    },

    Fridge: {
        name: 'Fridge',
        slider: false,
        isNonToggled: true,
        icon: faSnowflake
    },

    'Air conditioner': {
        name: 'Air conditioner',
        slider: true,
        isNonToggled: false,
        icon: faWind,
        sliderDescription: 'Temperature',
        sliderUnits: '&deg;',
        sliderRange: [16, 30],
    },

    TV: {
        name: 'TV',
        slider: true,
        isNonToggled: false,
        icon: faTv,
        sliderDescription: 'Volume',
        sliderUnits: '%',
        sliderRange: [0, 100],
    }
};

export default availableDevices;