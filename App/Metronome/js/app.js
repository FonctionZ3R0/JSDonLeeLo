class MetronomeApp {
    /**
     * Creates a MetronomeApp.
     * @param soundsPath the path used to fetch the sound files
     * @param sounds an array of sound file names
     * @param visSettings settings for the visualizer
     * @param soundSelectId the ID of the HTML select control for the sounds
     * @param visTypeSelectId the ID of the HTML select control for the visualization types
     * @param startStopId the ID of the HTML button to start and stop the metronome
     */
    constructor(soundsPath, sounds, visSettings, soundSelectId, visTypeSelectId, startStopId) {
        this.visSettings = visSettings;
        this.soundSelectId = soundSelectId || 'metroSound';
        this.visTypeSelectId = visTypeSelectId || 'visType';
        this.startStopId = startStopId || 'metronome';

        const metroSoundListener = {
            setTempo: (t) => visSettings.tempoBpm = t,
            setStartTime: (t) => visSettings.startTime = t
        };
        this.metroSound = new MetronomeSound(soundsPath, sounds, metroSoundListener);

        visSettings.getTime = () => this.metroSound.audioContext.currentTime;

        const soundSelect = $('#' + this.soundSelectId);
        for (const name of sounds) {
            const fileExtension = /\..*/;
            const optionText = name.replace('_', ' ').replace(fileExtension, '');
            soundSelect.append(`<option>${optionText}</option>`);
        }

        const visTypeSelect = $('#' + this.visTypeSelectId);
        visTypeSelect.append('<option>None</option>');
    }

    /**
     * Sets the tempo.
     * @param bpm tempo in beats per minute
     */
    setTempo(bpm) {
        this.metroSound.setTempo(parseInt(bpm));
        document.querySelector("#tempo").innerHTML = metronomeApp.getTempo();
    }

    /***
     * Get the tempo
     */
    getTempo() {
        return this.metroSound.getTempo();
    }

    /**
     * Sets the metronome sound.
     * @param number the one-based sound index
     */
    setSound(number) {
        this.metroSound.setSound(number);
    }

    /**
     * Sets the visualization type.
     * @param index a 0-based number specifying the visualization to use
     */
    setVisualization(index) {
        this.visSettings.visualizationType = index;
    }

    /** Starts the metronome if it is stopped, and vice versa. */
    toggle() {
        this.metroSound.toggle();
        console.log("PLAYPAUSE");
        $('#' + this.startStopId).val(this.metroSound.running ? playPauseIcon.className = 'pause' : playPauseIcon.className = 'play')
    }
}

const metronomeApp = new MetronomeApp('assets/audio/', 
['Baguettes.wav', 'Chronometre.wav', 'Cloture_Electrique.wav', 
'Electrique.wav', 'Mecanique.wav'], VisSettings);

let playPauseIcon = document.getElementById('play-pause-icon');

document.querySelector("#tempo").innerHTML = metronomeApp.getTempo();