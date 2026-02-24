# ManageIt - HRMS Lite

# Note 
- Hit backend first at https://manageit-kkrl.onrender.com/api/employees to wake up free Render instance

**Frontend (Vercel)**: [https://manage-it-eight.vercel.app/](https://manage-it-eight.vercel.app)  
**Backend (Render)**: [https://manageit-kkrl.onrender.com/api/employees](https://manageit-kkrl.onrender.com) (hit once before frontend use to wake up free Render instance)

---

## Project Overview

**Overview**  
ManageIt - HRMS Lite is a lightweight Human Resource Management System designed to help small organizations manage employee records and track daily attendance.  
It provides a simple web interface for an admin to:

- Add, view, and delete employee records
- Mark and view employee attendance

The project focuses on essential HR operations with a clean, functional, and user-friendly interface. It demonstrates full-stack development skills including frontend, backend API design, and database persistence.

**Problem Statement**  
Build a web-based HRMS Lite application that allows an admin to:

- Manage employee records
- Track daily attendance

The system simulates a basic internal HR tool with a professional interface.

---

## Functional Requirements

### 1. Employee Management
The application allows the admin to:

- Add a new employee with the following details:
  - Employee ID (unique)
  - Full Name
  - Email Address
  - Department
- View a list of all employees
- Delete an employee

### 2. Attendance Management
The application allows the admin to:

- Mark attendance for an employee with:
  - Date
  - Status (Present / Absent)
- View attendance records for each employee

---

## Backend & Database Requirements

- Implement RESTful APIs for all functionalities
- Persist data using a database (SQL or NoSQL)
- Perform basic server-side validation:
  - Required fields
  - Valid email format
  - Duplicate employee handling
- Handle invalid requests and errors gracefully
  - Proper HTTP status codes
  - Meaningful error messages

---

## Tech Stack Used

- **Frontend**: Vite, React, TypeScript, Tailwind CSS, react-hook-form, Zod, Axios
- **Backend**: Flask, Python, Flask-CORS, Flask-Migrate, SQLAlchemy
- **Database**: PostgreSQL (on Render)
- **Deployment**: Render (Backend), Vercel (Frontend)
- **Other**: react-hot-toast for notifications

---

## Steps to Run the Project Locally

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd <repo-directory>
```

2. **Setup Backend**
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
export DATABASE_URL=postgresql://user:password@localhost/hrms  # adjust as needed
flask db upgrade
flask run
```

3. **Setup Frontend**
```bash
cd frontend
npm install
npm run dev
```

4. Open your browser at http://localhost:5173
 (Vite default port).

 ## Assumptions / Limitations

- Session Isolation: Currently, all employee data is visible to anyone accessing the system. Due to time constraints, proper user session isolation per visitor has not been implemented.

- Free Deployment: Backend hosted on Render free plan may sleep; hitting the backend once may be required to wake it up.

- Authentication: Login/logout functionality is not implemented due to time constraints.

- Error Handling: Basic error handling implemented; could be improved for edge cases.

- Scope: The system focuses on essential HR operations; extra features like editing employees or attendance history filters are not included.

## Notes

- For best experience, first visit the backend link to wake up the free Render instance before using the frontend.

- All frontend and backend code is designed to be clean, modular, and functional within the limited project scope.