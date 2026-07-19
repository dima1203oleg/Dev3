const fs = require('fs');

let content = fs.readFileSync('src/components/LiveChatBot.tsx', 'utf8');

// We want to add some filters for the masked voice effect
content = content.replace(
  /sourceNode\.playbackRate\.value = 0\.75;/g,
  `sourceNode.playbackRate.value = 0.82; // Lower pitch slightly for depth

        // Anonymous/Masked voice effect: Bandpass filter
        const bandpass = outputAudioCtx.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.value = 1000;
        bandpass.Q.value = 0.8;

        // Add a bit of distortion
        const distortion = outputAudioCtx.createWaveShaper();
        function makeDistortionCurve(amount) {
          const k = typeof amount === 'number' ? amount : 50,
            n_samples = 44100,
            curve = new Float32Array(n_samples),
            deg = Math.PI / 180;
          for (let i = 0; i < n_samples; ++i) {
            const x = (i * 2) / n_samples - 1;
            curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
          }
          return curve;
        }
        distortion.curve = makeDistortionCurve(10);
        distortion.oversample = '4x';
`
);

content = content.replace(
  /sourceNode\.connect\(analyserRef\.current\);/g,
  `sourceNode.connect(distortion);
          distortion.connect(bandpass);
          bandpass.connect(analyserRef.current);`
);

fs.writeFileSync('src/components/LiveChatBot.tsx', content);

// Now for Web Speech API in App.tsx
let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(/utterance\.pitch = 0\.2;/g, 'utterance.pitch = 0.1;');
appContent = appContent.replace(/utterance\.rate = 0\.85;/g, 'utterance.rate = 0.8;');
fs.writeFileSync('src/App.tsx', appContent);

