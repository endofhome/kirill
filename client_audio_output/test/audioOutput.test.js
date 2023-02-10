const AudioOutput = require('../src/audioOutput');

test('Audio Output On Receiving Input', () => {
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
    const audioOutput = new AudioOutput(stubAudioContext);

    audioOutput.receiveInput();

    expect(spyCreateOscillator).toHaveBeenCalledTimes(1);
    expect(spyOscillatorConnect).toHaveBeenCalledTimes(1);
    expect(spyOscillatorConnect).toHaveBeenCalledWith(stubAudioContext.destination);
    expect(spyOscillatorStart).toHaveBeenCalledTimes(1);
    expect(spyOscillatorStart).toHaveBeenCalledWith();
});