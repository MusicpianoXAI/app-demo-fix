import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js'

const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#8A82E1',
    progressColor: '#444444',
    url: 'assets/audio/Beethoven_WoO80_thema_8bars_1_1.wav',
})

wavesurfer.on('interaction', () => {
    wavesurfer.play()
})