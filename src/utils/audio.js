import * as Tone from "tone";

let audioReady = false;

/**
 * Ensure Tone.js audio context is started (requires user interaction).
 */
export async function ensureAudio() {
  if (!audioReady) {
    await Tone.start();
    audioReady = true;
  }
}

/**
 * Play a short beep sound.
 * @param {"high" | "low" | "mid"} type - The beep type
 */
export function playBeep(type = "high") {
  try {
    const synth = new Tone.Synth({
      oscillator: { type: "square" },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.05, release: 0.1 },
    }).toDestination();

    switch (type) {
      case "high":
        synth.triggerAttackRelease("C6", "0.15");
        break;
      case "low":
        synth.triggerAttackRelease("C4", "0.3");
        break;
      default:
        synth.triggerAttackRelease("G5", "0.1");
    }
  } catch (e) {
    // Audio not available — fail silently
  }
}
