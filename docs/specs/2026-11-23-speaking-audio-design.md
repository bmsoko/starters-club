# Starters Club: Speaking, recorded audio, more mocks (design)

Date: 2026-11-23 · Status: approved by Bruno (chat)

## Why

Estani finished all six mock exams. He also needs Speaking practice, which is
part of the real exam. Listening audio sounds different on every device and
uses one voice for every speaker, which makes it unlike the real test.

## Decisions (Bruno's)

- **Speaking is parent-led.** The site reads the examiner's questions and
  shows the pictures. Estani answers out loud and the parent marks each
  answer ✅ Good / 🔁 Try again / ⏭ Not yet. There's no speech recognition.
- **Listening audio is pre-recorded.** It's generated on the Mac with its
  British voices, with one voice per speaker. The browser voice stays as a
  fallback.
- **More mocks.** Listening Tests 4–6 and Reading & Writing Tests 4–6.

## Approaches considered

- **Speaking:**
  - parent-led (picked)
  - self-recording with playback
  - speech-recognition marking: rejected, because it's unreliable for a
    7-year-old Spanish L1 speaker, only works in some browsers, and sends
    audio off the device
- **Audio:**
  - Mac `say` MP3s (picked: free, the same everywhere, works offline)
  - neural cloud TTS (needs an account and a key)
  - smarter browser voice picking (still device-dependent)

## Speaking format (Starters, 3–5 min, 4 parts)

| Part | What happens | Our version | Marking |
|---|---|---|---|
| S1 | Examiner: "Where's the duck?" / "Put the ball under the table" | Scene of emoji spots. He taps the one named, or places the object | Auto |
| S2 | Questions about the picture ("What colour is the car?", "How many…?") | The scene stays on screen and the question is spoken | Parent |
| S3 | Object cards ("What's this?", "What colour is it?", "Do you like…?") | One big emoji card | Parent |
| S4 | Personal questions ("How old are you?") | Spoken question | Parent |

- **Counts per test:** S1 5 (3 point + 2 place), S2 4, S3 4, S4 5, so
  18 points.
- **Examples:** each part has one example, which isn't scored.
- **Help for the parent:** example answers sit behind a "👀 Example answers"
  toggle.
- **Where it appears:** Speaking Tests 1–3 are on the new **Speaking 🗣️**
  tab, in Mock exams, and in Practice by task.

## Audio

- **Speaker markup in the data:** `"W: What's his name? | B: It's Ben. B, E, N."`.
  Segments are separated by ` | `, and the optional prefix is one of
  - `N` narrator (the default)
  - `M` man
  - `W` woman
  - `B` boy
  - `G` girl
- **Generator:** `tools/make-audio.mjs` collects every spoken string:
  - `audio`, `intro` and `say` in listening, unit4 and speaking
  - spelling words

  It renders each segment with `say`, raising the pitch for child voices
  with ffmpeg. It joins the segments with short pauses into
  `audio/<hash>.mp3` (mono), deletes stale files, and writes
  `data/audio-index.js`.
- **Playback:** `SC.speakAll` plays the MP3 when its hash is in the index.
  Otherwise it falls back to browser TTS, segment by segment, with the
  prefixes removed and a voice or pitch per speaker.
- **Coverage test:** a test fails if any spoken string has no file, so a
  forgotten regeneration can't ship.

## Non-goals

- Speech recognition.
- Recording his voice.
- Timers.
- Official scores.

## Left to the builder

- Exact voices and rates, chosen by listening to samples.
- The new content, at Starters wordlist level and original.
