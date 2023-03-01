/**
 * @jest-environment jsdom
 */
const AudioOutput = require("../src/components/AudioOutput/AudioOutput");
const compileErb = require("./compileErb");
const path = require("node:path");

const spyOscillatorConnect = jest.fn();
const spyOscillatorStart = jest.fn();
const spyCreateOscillator = jest.fn(() => {
    return {
        connect: spyOscillatorConnect,
        start: spyOscillatorStart
    }
});
const stubAudioContext = {
    createOscillator: spyCreateOscillator,
    destination: {}
};

const erbTemplatePath = path.resolve(__dirname, '../src/components/AudioOutput/audio_output.erb');
const compiledErb = compileErb(erbTemplatePath, ``);

beforeEach(() => {
    document.body.innerHTML = compiledErb;
    jest.clearAllMocks();
});

test('Component HTML has the correct data-component attribute', () => {
    const componentName = document.body.firstElementChild.getAttribute('data-component');
    expect(componentName).toBe("audio-output");
});

test('AudioOutput can be powered on', () => {
    window.AudioContext = jest.fn().mockImplementation(() => stubAudioContext);
    const powerOnButton = document.querySelector(".power-on-button");

    AudioOutput(); // run the script, which sets up the event listener
    powerOnButton.click(); // click the power on button

    expect(powerOnButton.getAttribute("disabled")).toBe("true");
    expect(spyCreateOscillator).toHaveBeenCalledTimes(1);
    expect(spyOscillatorConnect).toHaveBeenCalledTimes(1);
    expect(spyOscillatorConnect).toHaveBeenCalledWith(stubAudioContext.destination);
    expect(spyOscillatorStart).toHaveBeenCalledTimes(1);
    expect(spyOscillatorStart).toHaveBeenCalledWith();
});

test('Component JavaScript runs for every instance of the component HTML', () => {
    document.body.innerHTML = compiledErb + compiledErb;
    window.AudioContext = jest.fn().mockImplementation(() => stubAudioContext);
    const [firstPowerOnButton, secondPowerOnButton] = document.querySelectorAll(".power-on-button");

    AudioOutput();
    firstPowerOnButton.click();
    secondPowerOnButton.click();

    expect(spyCreateOscillator).toHaveBeenCalledTimes(2);
});

test('Component JavaScript does not interact with elements outside of the component HTML', () => {
    document.body.innerHTML = '<button class="power-on-button">Power On</button>' + compiledErb + '<button class="power-on-button">Power On</button>';
    window.AudioContext = jest.fn().mockImplementation(() => stubAudioContext);
    const [firstPowerOnButton, _, thirdPowerOnButton] = document.querySelectorAll(".power-on-button");

    AudioOutput();
    firstPowerOnButton.click();
    thirdPowerOnButton.click();

    expect(spyCreateOscillator).toHaveBeenCalledTimes(0);
});

test('Component JavaScript tolerates absence of component HTML', () => {
    document.body.innerHTML = '<div></div>';
    window.AudioContext = jest.fn().mockImplementation(() => stubAudioContext);

    expect(AudioOutput).not.toThrowError();
});