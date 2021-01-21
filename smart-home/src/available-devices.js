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
        defaultValue: 50
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
        sliderUnits: '\u00B0C',
        sliderRange: [16, 30],
        defaultValue: 20
    },

    TV: {
        name: 'TV',
        slider: true,
        isNonToggled: false,
        icon: faTv,
        sliderDescription: 'Volume',
        sliderUnits: '%',
        sliderRange: [0, 100],
        defaultValue: 30
    }
};

export default availableDevices;