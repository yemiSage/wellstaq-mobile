# WellStaq Mobile App

A modern, mobile-first React Native application built with Expo, designed to deliver a dynamic and premium experience for WellStaq employees and users. 

## 🚀 Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) (Expo Router for navigation)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: Zustand (Session and UI state)
- **Styling**: React Native StyleSheet with a custom Design System & Theme Tokens

## 📁 Directory Structure

Our project follows a feature-driven architecture to keep code modular and scalable:

```text
wellstaq-mobile/
├── app/                      # Expo Router file-based routing configuration
├── src/
│   ├── assets/               # Static assets (images, fonts, svgs)
│   ├── components/           # Reusable React components
│   │   ├── domain/           # Business-logic heavy components
│   │   └── ui/               # Pure UI/presentation components (buttons, inputs)
│   ├── features/             # Feature-based modules (screens and feature-specific logic)
│   │   ├── onboarding/       # Authentication, questionnaires, profile completion
│   │   ├── community/        # Feed, posts, social features
│   │   ├── home/             # Main dashboard
│   │   └── ...
│   ├── hooks/                # Global custom React hooks
│   ├── models/               # TypeScript interfaces and data models
│   ├── providers/            # React context providers (AppProvider)
│   ├── services/             # API services, mock data, and repositories
│   ├── state/                # Zustand stores
│   ├── theme/                # Design system tokens (colors, typography, spacing)
│   └── utils/                # Helper functions and formatters
```

## 🧩 UI Components library (`src/components/ui`)

We maintain a strict design system. All screens should use these base UI components rather than defining ad-hoc styles:

- **`AppScreen`** (`app-screen.tsx`): The base wrapper for all screens. Handles safe areas, scrolling behaviors, and background styling.
- **`AppText`** (`text.tsx`): The universal typography component. Use this for all text to ensure consistent font weights (Inter font) and sizes.
- **`Buttons`** (`button.tsx`): Includes `PrimaryButton`, `SecondaryButton`, and `IconButton`. Styled to match the WellStaq brand identity.
- **`Fields`** (`fields.tsx`): Input components including `TextInput`, `ChipGroup`, and selection modules.
- **`Layout`** (`layout.tsx`): Layout wrappers like `Row`, `Column`, `Card`, and `Divider` to maintain consistent spacing.
- **`SelectionSheet`** (`selection-sheet.tsx`): A standardized bottom sheet for complex selections or context menus.
- **`Icons`** (`icons.tsx`): Wrapper for SVGs and vector icons used across the app.

## 🎨 Theming & Design System

The app utilizes a central design token system located in `src/theme/`. 
Always use `theme.colors` and `theme.spacing` instead of hardcoding hex codes or pixel values. 

```typescript
import { theme } from "@/theme";

// Example Usage:
const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.primary,
  }
});
```

## 🏃 Setup & Running Locally

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run the Development Server:**
   ```bash
   npx expo start
   ```

3. **Run on Web:**
   ```bash
   npx expo start --web
   ```
   *(Or press `w` in the Expo terminal)*

## 🔒 Version Control & Deployment

This project uses Git for version control. 

**Note on Repository Visibility**: If this repository is set to **Private** on GitHub, your ability to push/pull will *not* be affected, provided you are logged in with the correct GitHub credentials.

```bash
# To check git status
git status

# To stage and commit new changes
git add .
git commit -m "Your descriptive commit message"

# To push to GitHub
git push origin main
```
