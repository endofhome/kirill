/**
 * @jest-environment jsdom
 */
const listen = require('../src/listen');
const fs = require("node:fs");
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

const listenTemplatePath = path.resolve(__dirname, '../../views/listen.erb');
const listenTemplateContent = fs.readFileSync(listenTemplatePath, 'utf8');

beforeEach(() => {
    jest.clearAllMocks();
});

describe("listen page", () => {
    test('Can receive input after clicking button', () => {
        document.body.innerHTML = listenTemplateContent;
        window.AudioContext = jest.fn().mockImplementation(() => stubAudioContext);
        const powerOnButton = document.querySelector("#power-on-button");

        listen(); // run the script, which sets up the event listener
        powerOnButton.click(); // click the power on button

        expect(spyCreateOscillator).toHaveBeenCalledTimes(1);
        expect(spyOscillatorConnect).toHaveBeenCalledTimes(1);
        expect(spyOscillatorConnect).toHaveBeenCalledWith(stubAudioContext.destination);
        expect(spyOscillatorStart).toHaveBeenCalledTimes(1);
        expect(spyOscillatorStart).toHaveBeenCalledWith();
    });

    test('Power on button is disabled after clicking once', () => {
        document.body.innerHTML = listenTemplateContent;
        window.AudioContext = jest.fn().mockImplementation(() => stubAudioContext);
        const powerOnButton = document.querySelector("#power-on-button");

        listen();
        powerOnButton.click();

        expect(powerOnButton.getAttribute("disabled")).toBe("true");
    });

    test('Throws exception if power on button is not found', () => {
        document.body.innerHTML = '<div></div>';

        expect(listen).toThrowError(Error("Power on button not found."));
    });
});