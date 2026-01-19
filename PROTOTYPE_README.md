# AI-Powered Workload Optimization Platform

A prototype application that demonstrates workload calculation, imbalance detection, and intelligent rebalancing suggestions for team resource management.

## 🎯 Project Overview

This application implements the prototype plan for an AI-powered workload optimization system, featuring:

- **Workload Calculation**: Calculates employee workload based on task complexity and urgency
- **Imbalance Detection**: Identifies overloaded and underutilized team members
- **Smart Recommendations**: Generates task reassignment suggestions to optimize team balance
- **Interactive Dashboard**: Visualizes workload distribution and key metrics
- **Siemens Element UI**: Professional styling using Siemens Element Design System

## 📁 Project Structure

```
PS4/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── data/
│   │   │   ├── employees.json      # Mock employee data
│   │   │   └── tasks.json          # Mock task data
│   │   ├── middleware/
│   │   ├── models/
│   │   │   ├── employee.model.js   # Employee model with workload logic
│   │   │   └── task.model.js       # Task model with load calculation
│   │   ├── routes/
│   │   │   └── workload.routes.js  # API routes
│   │   ├── services/
│   │   │   ├── workload.service.js        # Workload calculation service
│   │   │   └── recommendation.service.js   # Recommendation engine
│   │   └── server.js               # Express server
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── dashboard/              # Dashboard component
│   │   │   │   ├── workload-summary/       # Employee workload view
│   │   │   │   └── recommendations/        # Recommendations view
│   │   │   ├── models/
│   │   │   │   └── workload.model.ts       # TypeScript interfaces
│   │   │   ├── services/
│   │   │   │   └── workload.service.ts     # API service
│   │   │   ├── app.component.*
│   │   │   ├── app.config.ts
│   │   │   └── app.routes.ts
│   │   ├── styles.scss                     # Global styles with Element
│   │   └── main.ts
│   ├── angular.json
│   ├── tsconfig.json
│   └── package.json
│
├── ElementStyle.md                  # Siemens Element Design System guide
├── workload_optimization_prototype_plan.md
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Backend Setup

1. Navigate to the backend directory:
```powershell
cd backend
```

2. Install dependencies:
```powershell
npm install
```

3. Start the backend server:
```powershell
npm start
```

The backend API will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```powershell
cd frontend
```

2. Install dependencies:
```powershell
npm install
```

3. Start the Angular development server:
```powershell
npm start
```

The frontend application will run on `http://localhost:4200`

## 📊 Features

### 1. Dashboard
- Overview of team workload statistics
- Total employees and tasks
- Average utilization percentage
- Workload distribution visualization
- Color-coded status indicators

### 2. Workload Summary
- Individual employee workload cards
- Utilization percentage with visual bars
- Assigned tasks count
- Skills overview
- Workload state indicators (Critical, Overloaded, Optimal, Underutilized, Available)

### 3. Recommendations
- Intelligent task reassignment suggestions
- Priority-based sorting
- Expected improvement calculations
- Detailed reasoning for each recommendation
- What-if scenario analysis

## 🔍 API Endpoints

### GET `/api/workload/summary`
Returns workload summary for all employees

### GET `/api/workload/imbalances`
Returns overloaded and underutilized employees

### GET `/api/workload/recommendations`
Returns rebalancing recommendations

### GET `/api/workload/tasks`
Returns all tasks with details

### GET `/api/workload/employee/:id`
Returns employee details with assigned tasks

### POST `/api/workload/simulate`
Simulates task reassignment (body: `{ taskId, fromEmployeeId, toEmployeeId }`)

### GET `/api/workload/stats`
Returns overall workload statistics

## 📐 Workload Calculation Formula

```
Task Load = estimatedHours × (1 + complexity × 0.2) × (1 + urgency × 0.1)

Employee Utilization = (totalLoad / capacityHours) × 100
```

### Workload States

| State | Utilization Range |
|-------|------------------|
| Critical | > 95% |
| Overloaded | 85-95% |
| Optimal | 70-85% |
| Underutilized | 50-70% |
| Available | < 50% |

## 🎨 UI/UX Design

The application uses the **Siemens Element Design System** for a professional, consistent user experience:

- Element Cards for content grouping
- Element Tables for data display
- Element Buttons and navigation
- Element Status indicators
- Element Color palette
- Element Typography
- Responsive grid layouts

## 🔧 Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing

### Frontend
- **Angular 17** - Frontend framework (standalone components)
- **TypeScript** - Type-safe JavaScript
- **RxJS** - Reactive programming
- **Siemens Element** - UI component library
- **SCSS** - Styling

## 📝 Mock Data

The prototype uses JSON files for mock data:

- **8 employees** with varied skills (Angular, Node.js, Python, Docker, etc.)
- **12 tasks** with different complexities (1-5) and urgencies (1-3)
- Pre-assigned tasks to demonstrate workload imbalances

## 🎯 Validation Checklist

✅ Mock data loads correctly  
✅ Workload percentages calculated accurately  
✅ Overloaded users detected  
✅ Rebalancing suggestions generated  
✅ Output understandable without extensive UI  
✅ Clean separation of logic for future expansion  
✅ Professional Siemens Element styling applied  

## 🚧 Future Enhancements (Phase 2)

- What-if simulation interface
- Skill gap detection and alerts
- Time-series workload trends
- Burnout risk scoring with ML
- Advanced optimization algorithms
- Real-time data integration (JIRA, HR systems)
- User authentication and authorization
- Role-based access control
- Export reports (PDF, Excel)
- Email notifications for workload alerts

## 👨‍💻 Author

**Mohammad Adil Ansari**  
Siemens Innovation / Hackathon / Concept Validation

## 📄 License

MIT License

---

**Note**: This is a prototype implementation using mock data for demonstration purposes. For production use, integrate with real data sources and implement proper authentication, authorization, and data validation.
