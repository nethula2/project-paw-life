# 🐾 PawLife: Pet Care & Veterinary Clinic Management System

[![Java](https://img.shields.io/badge/Java-17-orange.svg?style=flat&logo=openjdk)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.4-brightgreen.svg?style=flat&logo=springboot)](https://spring.io/projects/spring-boot)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg?style=flat&logo=mysql)](https://www.mysql.com/)
[![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7.svg?style=flat&logo=netlify)](https://www.netlify.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📌 Executive Project Overview

**PawLife** is a full-stack, enterprise-grade Pet Care & Veterinary Practice Management Web Application designed and engineered by **Sanvidu Nethula**. 

The system provides an all-in-one digital operating platform for modern veterinary hospitals, clinics, and pet wellness salons. It integrates Electronic Health Records (EHR), multi-station grooming salon queue workflows, collision-free appointment scheduling, intelligent inventory tracking with automated safety stock alerts, role-based access control (RBAC), and statistical business intelligence forecasting powered by R.

---

## 🚀 Key Functional Modules & Architecture

### 1. 👑 System Administration & Role-Based Access Control (RBAC)
- **Granular Permission Matrix:** Configure role-specific permissions (View, Edit, Delete, Export) across 6 clinic modules.
- **Master Admin Security Lock:** Enforces role integrity by preventing unauthorized privilege escalations.
- **Immutable Security Audit Trail:** Cryptographically-tracked action logs recording user logins, permission updates, stock adjustments, and clinical modifications.

### 2. 📊 Business Intelligence & Statistical Analytics Engine
- **R Subprocess Integration:** Integrates external R statistical computing (`analytics/bi_analytics.R`) via Java `ProcessBuilder`.
- **Predictive Revenue Modeling:** Uses linear regression analysis on historical revenue streams to project next-month clinic earnings (+12.5% projected growth).
- **Automated Visualization:** Dynamically generates publication-ready revenue distribution graphs and service metrics.

### 3. 🐾 Digital Pet Health Records (EHR) & Clinical Care
- **Comprehensive Patient Dossiers:** Track pet medical histories, allergies, breed profiles, microchip IDs, and owner details.
- **Clinical Consultation Logger:** Record real-time diagnostic notes, clinical vitals, symptoms, and medical observations.
- **Automated Vaccine Booster Scheduler:** Automatically calculates and schedules next-due booster dates (+1 year) upon vaccine administration.
- **Digital Verified Prescriptions:** Generate and print digitally signed prescription cards linked directly to consultation records.

### 4. 📅 Smart Appointment Scheduling & Conflict Engine
- **Interactive Booking Portal:** Online self-service appointment reservation for pet owners across veterinary, grooming, vaccination, and surgical care.
- **Double-Booking Collision Engine:** Atomic server-side validation rejecting conflicting reservations with HTTP 409 Conflict responses.
- **Dynamic Slot Availability:** Real-time visual slot indicators automatically crossing out reserved hours.

### 5. 📦 Smart Veterinary Inventory & Supply Chain
- **Batch & Expiry Tracker:** Monitor medicines, vaccines, and surgical supplies with batch identification and strict future expiry date validation.
- **Automated Safety Stock Alarms:** Threshold detection algorithms that immediately broadcast low-stock warning banners when quantities breach minimum reorder levels.
- **Real-Time Stock Depletion:** Automatic inventory deduction linked directly to clinical treatment sessions and customer pet store orders.

### 6. 🏥 Operational Command Centre & Staff Rostering
- **Live Clinic Throughput KPIs:** Real-time counters for Today's Appointments, In-Progress Grooming Sessions, Overdue Vaccinations, Low-Stock items, and Daily Revenue.
- **Automated Multi-Stream Alert Center:** Proactively aggregates overdue patient vaccination alerts and depleted medication alerts.
- **Staff Duty Shift Rostering:** Weekly staff shift allocation engine equipped with scheduling collision detection to prevent overlapping shifts.

### 7. ✂️ Pet Grooming Station Queue Workflow
- **4-Station Salon Queue:** Models the physical grooming workflow:
  $$\text{Checked-in} \longrightarrow \text{Bathing Station} \longrightarrow \text{Scissor \& Styling} \longrightarrow \text{Ready for Pick-up} \longrightarrow \text{Completed}$$
- **State Transition Management:** Step-by-step progress tracking with coat condition and behavioral notes.
- **Automated Owner SMS/Push Alerts:** Automatically triggers owner notification alerts when a pet transitions to the "Ready for Pick-up" station.
- **Live Customer Progress Tracker:** Real-time visual progress bar accessible by pet owners via the customer portal.

### 8. 🛒 Customer Pet Store & Community Reviews
- **Pet Pharmacy & Retail Store:** Integrated online catalog allowing pet owners to order food, supplements, and accessories with live inventory synchronization.
- **Verified Customer Reviews:** Moderated customer testimonial and rating engine showcasing client feedback.

---

## 🏛️ Gang of Four (GoF) Design Patterns Implementation

PawLife natively incorporates industry-standard GoF design patterns directly into its production Spring Boot and JavaScript codebase:

| Design Pattern | Category | Implementation File | Architectural Role in PawLife |
|---|---|---|---|
| **Singleton Pattern** | Creational | `Database.java` | Manages a single, thread-safe `JdbcTemplate` connection pool across all controllers, eliminating connection leaks and socket exhaustion. |
| **State Pattern** | Behavioral | `GroomingController.java` | Enforces linear transitions across the 4 physical grooming stations and triggers station-specific side effects (SMS alerts on Pick-up). |
| **Observer Pattern** | Behavioral | `NotificationController.java` | Decouples domain event publishers (`createNotification`) from frontend notification bell polling subscribers. |
| **Facade Pattern** | Structural | `RAnalyticsService.java` | Hides low-level OS `ProcessBuilder` execution, R script running, and CSV I/O behind a simple, unified `runAnalytics()` method. |
| **Data Access Object (DAO)** | Structural | `Database.java` | Centralizes all database queries, parameter bindings, and `ResultSet` mapping, preventing SQL injection and connection leaks. |
| **Front Controller / Router** | Architectural | `dashboard.js` & `app.js` | Centralized route dispatcher evaluating logged-in role credentials and dispatching staff to their authorized workspace. |

---

## 🛠️ Technology Stack

- **Backend:** Java 17, Spring Boot 3.2.4 (Spring MVC, Spring JDBC, HikariCP)
- **Frontend:** Modern JavaScript (ES6+), HTML5, Tailwind CSS (v3.4), FontAwesome 6
- **Database:** MySQL Workbench 8.0 / SQLite 3
- **Statistical Computing:** R (v4.x) Statistical Programming Language & Graphics
- **Build & Dependency Management:** Apache Maven 3.9+
- **Hosting & Deployment:** Netlify (Frontend) | Spring Boot (Backend)

---

## 🌐 Netlify Deployment

This repository includes native **Netlify** support configured via [`netlify.toml`](file:///c:/Users/sanvi/Desktop/Paw_Life/netlify.toml).

### Deploying to Netlify in 3 Steps:
1. Push this repository to your GitHub account (`https://github.com/nethula2/project-paw-life`).
2. Log in to [Netlify](https://www.netlify.com/) and click **"Add new site" &rarr; "Import an existing project"**.
3. Select this GitHub repository. Netlify will automatically detect [`netlify.toml`](file:///c:/Users/sanvi/Desktop/Paw_Life/netlify.toml) with:
   - **Publish directory:** `public`
   - **Build command:** *(Leave empty)*
4. Click **"Deploy Site"** — your live pet care management portal will be deployed instantly!

> **Note on Interactive Demo:** When deployed statically on Netlify, the built-in demo engine (`public/js/netlify_mock.js`) automatically serves interactive clinic datasets, allowing visitors to test all staff portals, booking engines, and dashboards live in the browser!

---

## 💻 Local Development & Setup

### Prerequisites
- **Java Development Kit (JDK 17+)**
- **Apache Maven 3.8+** (or use bundled Maven in `run_springboot.ps1`)
- **MySQL 8.0+** (optional; SQLite fallback available)

### Quick Start
```bash
# 1. Clone the repository
git clone https://github.com/nethula2/project-paw-life.git
cd project-paw-life

# 2. Start the Spring Boot Application
.\run_springboot.ps1
# Or using Maven directly:
mvn spring-boot:run

# 3. Access the Application in your browser:
# Customer Portal:   http://localhost:3000
# Staff Operations:  http://localhost:3000/dashboard.html
```

---

## 👤 Author & Lead Engineer

**Sanvidu Nethula**
- **GitHub:** [@nethula2](https://github.com/nethula2)
- **Email:** [sanvidunethula2@gmail.com](mailto:sanvidunethula2@gmail.com)
- **Project Repository:** [https://github.com/nethula2/project-paw-life](https://github.com/nethula2/project-paw-life)
