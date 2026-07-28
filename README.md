# Date Invite App

### A playful Persian web app for asking someone out — beautifully.

<p align="center">
  <img src="docs/screenshots/01-ask.png" alt="Ask step — Will you go on a date with me?" width="280" />
</p>

<p align="center">
  <strong>Mobile-first · RTL · Jalali calendar · Framer Motion</strong>
</p>

<p align="center">
  <a href="#-preview"><img src="https://img.shields.io/badge/Preview-Screenshots-e85a71?style=for-the-badge" alt="Preview" /></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs" alt="Next.js" /></a>
  <a href="#-getting-started"><img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" /></a>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</p>

---

A soft, romantic multi-step experience designed for phones. Ask the big question, pick a Persian calendar day, choose a time and a meal, then celebrate with a personal summary — all wrapped in blush tones, floating hearts, and delightful micro-interactions.

> Built as a creative “will you go on a date with me?” moment. Simple idea. Thoughtful craft.

---

## ✨ Preview

<table>
  <tr>
    <td align="center" width="20%">
      <img src="docs/screenshots/01-ask.png" alt="Step 1 — Ask" width="180" /><br />
      <sub><b>1. The question</b></sub>
    </td>
    <td align="center" width="20%">
      <img src="docs/screenshots/02-date.png" alt="Step 2 — Date" width="180" /><br />
      <sub><b>2. Pick a day</b></sub>
    </td>
    <td align="center" width="20%">
      <img src="docs/screenshots/03-time.png" alt="Step 3 — Time" width="180" /><br />
      <sub><b>3. Choose a time</b></sub>
    </td>
    <td align="center" width="20%">
      <img src="docs/screenshots/04-food.png" alt="Step 4 — Food" width="180" /><br />
      <sub><b>4. Pick the food</b></sub>
    </td>
    <td align="center" width="20%">
      <img src="docs/screenshots/05-celebrate.png" alt="Step 5 — Celebrate" width="180" /><br />
      <sub><b>5. Celebrate</b></sub>
    </td>
  </tr>
</table>

<details>
  <summary><b>Open larger screenshots</b></summary>
  <br />
  <p align="center">
    <img src="docs/screenshots/01-ask.png" width="320" alt="Ask" />
    &nbsp;
    <img src="docs/screenshots/02-date.png" width="320" alt="Date" />
  </p>
  <p align="center">
    <img src="docs/screenshots/03-time.png" width="320" alt="Time" />
    &nbsp;
    <img src="docs/screenshots/04-food.png" width="320" alt="Food" />
  </p>
  <p align="center">
    <img src="docs/screenshots/05-celebrate.png" width="320" alt="Celebrate" />
  </p>
</details>

---

## 💖 Features

- **Playful “Yes / No” opener** — every “No” shrinks; “Yes” grows until the answer is obvious
- **Jalali (Persian) calendar** — current-month picker with past days locked
- **Hour & minute wheels** — fast, tactile time selection
- **Emoji food choices** — pizza, coffee, chocolate, kebab, pasta
- **Celebration finale** — animated confetti + a personal summary of the plan
- **Subtle step indicator** — delicate progress line at the top of the card
- **RTL-first UI** — YekanBakhFaNum typography, Persian copy throughout
- **Romantic atmosphere** — blush gradients and floating background hearts behind the card

---

## 🛠 Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI | React 19 · TypeScript |
| Styling | Tailwind CSS v4 · custom CSS |
| Motion | Framer Motion |
| Icons | Lucide React |
| Calendar | Custom Jalali helpers (`lib/jalali.ts`) |
| Font | YekanBakhFaNum (local) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn / pnpm / bun)

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) on your phone or a narrow browser viewport for the best feel.

### Production

```bash
npm run build
npm start
```

---

## 🗂 Project Structure

```text
app/                     # Next.js app entry, layout, theme
components/invite/
  steps/                 # Ask · Date · Time · Food · Celebrate
  calendar/              # Persian month calendar
  time/                  # Hour / minute wheels
  food/                  # Food option grid
  celebrate/             # Confetti + summary
  ui/                    # Shared primitives & step indicator
hooks/                   # Invite flow & calendar state
lib/
  jalali.ts              # Jalali conversion & calendar math
  invite/                # Types, constants, formatters
docs/screenshots/        # README preview images
public/fonts/            # YekanBakhFaNum
```

---

## 🧭 Flow

```text
Ask  →  Date  →  Time  →  Food  →  Celebrate
 💘      📅       ⏰      🍽         🥳
```

1. **Ask** — “با من میای سر قرار؟”
2. **Date** — choose a day in the current Jalali month
3. **Time** — set hour and minute
4. **Food** — pick what you’ll eat
5. **Celebrate** — summary, pickup line, and a little love note

---

## 🎨 Design Notes

- Soft rose / blush palette — romantic without being heavy
- Compact card layout tuned for modern phone screens
- Background emoji motion stays **behind** the card
- Progress UI stays quiet so the content can lead

---

## 📄 License

Private / personal project unless otherwise noted. Feel free to fork for your own creative invite.

---

<p align="center">
  <sub>Made with care · چیز مهمی نبود ولی خلاقانه بود 🫶</sub>
</p>
