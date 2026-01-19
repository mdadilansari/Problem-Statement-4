# AI-Powered Workload Optimization Platform

A prototype application that demonstrates workload calculation, imbalance detection, and intelligent rebalancing suggestions for team resource management.

## 🎯 Project Overview

This application implements the prototype plan for an AI-powered workload optimization system, featuring:

- **Workload Calculation**: Calculates employee workload based on task complexity and urgency
- **Imbalance Detection**: Identifies overloaded and underutilized team members
- **Smart Recommendations**: Generates task reassignment suggestions to optimize team balance
- **Interactive Dashboard**: Visualizes workload distribution and key metrics
- **Bootstrap UI**: Clean, responsive design using Bootstrap 5

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation & Running

**Option 1: Using the startup script (Windows)**
```powershell
.\start-app.ps1
```

**Option 2: Manual startup**

1. **Start Backend Server**
```powershell
cd backend
npm install
npm start
```
Backend runs on `http://localhost:3000`

2. **Start Frontend (in a new terminal)**
```powershell
cd frontend
npm install
npm start
```
Frontend runs on `http://localhost:4200`

3. **Open the application**
Navigate to `http://localhost:4200` in your browser

## 📊 Features

### 1. Dashboard
- Overview of team workload statistics with visual cards
- Total employees, tasks, and average utilization
- Color-coded workload distribution with progress bars
- Summary of imbalances

### 2. Workload Summary
- Individual employee cards with detailed metrics
- Utilization percentage with visual progress bars
- Workload status indicators (Critical, Overloaded, Optimal, Underutilized, Available)
- Skills tags for each employee
- Assigned tasks count

### 3. Recommendations
- Intelligent task reassignment suggestions
- Priority-based sorting (High, Medium, Low)
- Visual before/after comparisons
- Expected improvement calculations
- Detailed reasoning for each recommendation
- Task complexity and urgency indicators

## 📐 Workload Calculation Formula

```
Task Load = estimatedHours × (1 + complexity × 0.2) × (1 + urgency × 0.1)
Employee Utilization = (totalLoad / capacityHours) × 100
```

### Workload States

| State | Utilization Range | Color |
|-------|------------------|-------|
| Critical | > 95% | Red |
| Overloaded | 85-95% | Orange |
| Optimal | 70-85% | Green |
| Underutilized | 50-70% | Cyan |
| Available | < 50% | Gray |

## 🔧 Technology Stack

**Backend:** Node.js, Express.js  
**Frontend:** Angular 17, TypeScript, Bootstrap 5, RxJS

## 👨‍💻 Author

**Mohammad Adil Ansari** - Siemens Innovation
