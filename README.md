# Sports League Selector

Built in React + TypeScript.

---

## 🛠️ Tech Stack

- **React** (with Vite)
- **TypeScript**
- **Tailwind CSS** (utility-first styling)
- **TanStack React Query** (data fetching & caching)

---

## 🔍 Technical Overview

**TypeScript** was used alongside React for its ability to catch errors at compile time, improve code maintainability, and support future scalability.

**Tailwind CSS** was chosen for its fast development experience, clean utility classes, and modular approach that keeps styles close to the markup and easy to understand.

**TanStack React Query** simplifies data fetching and caching with minimal boilerplate, making it easier for others to work with and ideal for efficient API handling.

---

## 💡 Design Decisions

- A **persistent sidebar** was implemented to keep the selected league badge always visible. This helps users maintain context — especially if they scroll down and interact with leagues below the fold.

- On **mobile**, the sidebar is pinned to the bottom of the viewport so users can always see their selection without cluttering the main view.

- The **search bar and category filter** are placed at the top of the page for immediate visibility. While placing them in the sidebar was an option, top placement felt more intuitive and visually balanced.

- An **empty state message** is shown when no results match the current filters, ensuring clear user feedback.

- A reusable **Button** component was created with `primary` and `secondary` variants. Primary buttons are used for main actions (e.g. "Search"), while secondary ones (e.g. "Clear") are styled with lower emphasis and are disabled when not usable.

---

## 📦 Getting Started

```bash
npm install
npm run dev
