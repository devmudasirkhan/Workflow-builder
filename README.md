# Workflow Builder UI

A frontend application for building visual workflows, inspired by modern workflow automation tools like **n8n**. Users can drag and drop nodes, connect them, and configure their settings to create custom workflows—all in an interactive canvas environment.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Node Types](#node-types)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [License](#license)

---

## Overview

This project focuses on the frontend implementation of a workflow builder:

- **Drag-and-drop nodes** onto a canvas
- **Connect nodes** using handles
- **Edit node settings** in a dedicated panel
- **Delete nodes** or connections easily
- **Export and import workflows** as JSON for serialization

---

## Features

- **Two-column layout**: Sidebar + Canvas
- **Custom Node Components**:
  - Input Node (editable input)
  - Process Node (editable template)
  - Output Node (read-only output)
- **Node connectivity** via source and target handles
- **Node deletion** via Delete key or trash icon
- **Workflow state management**: live updates in Settings Panel
- **Serialization**: export/import JSON workflow
- **Styled with Tailwind CSS** and responsive design
- Built with **React Flow** for canvas and connections
- Fully **TypeScript-typed** for maintainability

---

## Node Types

| Node Type | Description | Handles | Settings Panel |
|-----------|-------------|---------|----------------|
| Input Node | Receives initial workflow data | 1 source | Editable input textarea |
| Process Node | Transforms input data | 1 target, 1 source | Editable template textarea |
| Output Node | Displays workflow result | 1 target | Read-only output textarea |

---
## Project Structure

workflow-builder-ui/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   ├── nodes/
│   ├── types/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts

---


## Tech Stack

- **Frontend:** React  
- **Language:** TypeScript  
- **Canvas & Nodes:** React Flow  
- **Styling:** Tailwind CSS  
- **State Management:** React `useState` & `useReducer`  

---

## Installation


1. Clone the repository:


git clone https://github.com/yourusername/workflow-builder-ui.git


## Install dependencies:

cd workflow-builder-ui

npm install
# or
yarn install

## Start the development server:

npm run dev
# or
yarn dev
```bash


