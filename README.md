# Atomic To-Do List Application

This project is an interactive to-do list application built with React, TypeScript, and Material-UI, following the principles of **Atomic Design**. It provides a clean, responsive interface for managing your daily tasks, allowing you to add, complete, edit, and remove them.

---

## Objective

The main objective of this project was to create a robust and maintainable to-do list application by rigorously applying the Atomic Design methodology. This approach emphasizes breaking down the UI into smaller, reusable components, leading to a highly organized and scalable codebase. **TypeScript** was chosen to enhance type safety and improve code structure and maintainability.

---

## Features

- **Add New Tasks**: Easily add new tasks to your list.
- **Mark as Completed**: Checkboxes allow you to mark tasks as completed.
- **Edit Task Names**: Update task titles directly within the list.
- **Remove Completed Tasks**: Clear all completed tasks with a dedicated button.
- **Persistent Storage**: Tasks are saved in your browser's local storage, so they remain even after refreshing the page.
- **Responsive Design**: The application is designed to be visually appealing and functional across various screen sizes.
- **Animations & Transitions**: Subtle animations enhance the user experience.
- **Atomic Design Structure**: Project organized into Atoms, Molecules, Organisms, Templates, and Pages for clarity and reusability.
- **TypeScript**: Full type safety implemented for task objects, component props, and application logic.
- **Linting & Formatting**: ESLint and Prettier are configured to ensure consistent code quality and style.
- **Unit Tests**: Comprehensive unit tests using Vitest and React Testing Library ensure the reliability of key functionalities.

---

## Atomic Design Implementation

The project strictly adheres to Atomic Design principles to organize the UI components and project structure:

- **Atoms**: Basic HTML elements or React components that can't be broken down further without losing their meaning.
  - Examples: `Input` (for task title/description), `Button` (e.g., "Add task", "Clear all"), `Checkbox`.
- **Molecules**: Groups of atoms assembled together to form a relatively simple, reusable UI component.
  - Example: `TaskItem` (combining an Input, Checkbox, and Delete Button).
- **Organisms**: Composed of molecules and/or atoms, forming distinct sections of an interface. They are more complex and provide context.
  - Examples: `UncompletedTasksList` (list of `TaskItem`s), `CompletedTasksList` (collapsible list of completed `TaskItem`s), `TaskList` (the main container for both lists and controls).
- **Templates**: Page-level objects that place organisms into a layout. They focus on the content structure rather than actual content.
  - While not explicitly separated as a distinct folder in this smaller application, the `TaskList` component acts as a template for the main application view.
- **Pages**: Instances of templates with real content plugged in.
  - The main application view where `TaskList` is rendered.

This structured approach ensures modularity, reusability, and easier maintenance of the codebase.

---

## Technologies Used

The project leverages a modern web development stack:

- **React** (v18.3.1): A JavaScript library for building user interfaces.
- **TypeScript** (v5.8.3): A superset of JavaScript that adds static types.
- **Material-UI** (`@mui/material` v7.0.2): A popular React UI framework for pre-built, high-quality components.
- **Emotion** (`@emotion/react`, `@emotion/styled`): CSS-in-JS library used by Material-UI for styling.
- **Vite** (v7.0.0): A fast build tool that significantly improves the development experience.
- **Vitest** (v3.2.4): A blazing fast unit test framework powered by Vite.
- **React Testing Library** (`@testing-library/react`): Utilities for testing React components in a user-centric way.
- **ESLint** (v9.30.1): For identifying and reporting on patterns found in ECMAScript/JavaScript code.
- **Prettier** (v3.6.2): An opinionated code formatter.

---

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v18.x or higher recommended)
- npm or Yarn (yarn is used in this guide)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/your-username/mini-social-media.git](https://github.com/your-username/mini-social-media.git)
    cd mini-social-media
    ```

2.  **Install dependencies:**

    ```bash
    yarn install
    ```

### Running the Project

1.  **Start the development server:**

    ```bash
    yarn dev
    ```

    This will open the application in your browser, typically at `http://localhost:5173`. The application will automatically reload as you make changes to the source code.

### Running Tests

1.  **Run unit tests:**

    ```bash
    yarn test
    ```

    This command will execute all unit tests using Vitest.

### Building for Production

1.  **Build the project:**

    ```bash
    yarn build
    ```

    This command compiles the TypeScript code and bundles the application for production, outputting the files to the `dist/` directory.

### Linting

1.  **Run ESLint:**

    ```bash
    yarn lint
    ```

    This command will run ESLint to check for code style issues and potential errors.
