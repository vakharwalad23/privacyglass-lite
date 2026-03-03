# Privacy Glass Lite

A software-based implementation of Samsung's Privacy Glass feature. No special hardware needed — just your phone's accelerometer.

## What is this?

Samsung has this cool privacy screen feature built into some of their devices at the hardware level. I wanted something similar but without needing Samsung hardware. So I built this — it uses the accelerometer to detect viewing angle and blacks out sensitive content when someone tries to peek at your screen from the side.

The idea is simple: if you're looking at your phone straight on, everything is visible. Tilt it (or if someone is looking from an angle), the content fades to black. There's a configurable "cone" angle that defines the safe viewing zone.

## Tested on

I tested this on my Nothing Phone 1 and honestly it's working above my expectations. The overlay is smooth, no visible lag, and the cone detection feels pretty accurate.

## Features

- Tilt-based privacy overlay using accelerometer data
- Configurable viewing cone angle (default ±30°)
- Smooth animated transitions with exponential moving average
- HUD widget to visualize tilt angles in real-time
- Toggle privacy on/off
- Demo screen with a mock iOS lock screen notification
- Auto-detects device manufacturer and model name

## Tech

- React Native + Expo
- expo-sensors (Accelerometer)
- expo-device
- expo-router (file-based routing)
- TypeScript

## Getting started

```bash
npm install
npx expo start
```

Then open it on your phone via Expo Go or a dev build.

## Note

I took help of AI while building this — for structuring the code, breaking things into modules, writing the math logic for the cone model, etc. But the concept, testing, and tweaking was all manual.

## Play with it

Try tilting your phone around, toggle the HUD to see the tilt sensor visualizer, switch privacy on/off. The demo screen simulates an iOS notification with an OTP — good way to see the effect in action.
