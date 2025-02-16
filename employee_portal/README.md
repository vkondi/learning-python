# Employee Portal

The Employee Portal is a comprehensive web application designed to streamline the management of employee data within an organization. Built with a robust Python backend using Flask and a dynamic React frontend, this application provides a user-friendly interface for HR departments and managers to efficiently handle employee records. Key features include the ability to add new employees, edit existing employee details, delete employees, and view a comprehensive list of all employees. Additionally, the application can generate random employee data for testing purposes. The Employee Portal is designed to be scalable and easily extendable, making it a perfect fit for organizations of all sizes looking to improve their HR processes.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Features

- Add new employees
- Edit existing employee details
- Delete employees
- View a list of all employees
- Generate random employee data

## Prerequisites

- Python 3.x
- Node.js and npm
- A virtual environment tool (e.g., `venv`)

## Installation

### Backend

1. Create and activate a virtual environment:
    ```sh
    python -m venv env
    source env/bin/activate  # On Windows use `env\Scripts\activate`
    ```

2. Install the required Python packages:
    ```sh
    pip install -r requirements.txt
    ```

3. Run the backend server:
    ```sh
    python main.py
    ```

### Frontend

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```

2. Install the required npm packages:
    ```sh
    yarn install
    ```

3. Start the frontend development server:
    ```sh
    yarn start
    ```

## Usage

1. Ensure both the backend and frontend servers are running.
2. Open your web browser and navigate to `http://localhost:3000`.
3. Use the application to manage employee data.

## API Endpoints

- `GET /api/get-all-employees`: Retrieve all employees.
- `POST /api/add-employee`: Add a new employee.
- `PUT /api/update-employee/:id`: Update an existing employee.
- `DELETE /api/delete-employee/:id`: Delete an employee.
- `GET /api/generate-random-employee`: Generate random employee data.

## Project Structure
```
employee_portal/
├── main.py                 # Main backend application
├── db.py                   # Database management
├── requirements.txt        # Python dependencies
├── frontend/               # Frontend application
│   ├── public/             # Public assets
│   ├── src/                # Source code
│   │   ├── components/     # React components
│   │   ├── context/        # React context
│   │   ├── App.tsx         # Main React component
│   │   ├── index.tsx       # Entry point for React
│   ├── package.json        # Frontend dependencies
│   ├── ...                 # Other frontend files
├── ...                     # Other backend files
```

## Future Enhancements
1. **Bulk Upload**: Feature to bulk upload employee data.
2. **AI/ML Analytics**: Implement AI/ML features such as Attrition Prediction, Anomaly Detection, Skill Recommendation etc.
3. **Testing**: Add unit tests for both Flask and React.

## License

This project is licensed under the MIT License. See the LICENSE file for details.