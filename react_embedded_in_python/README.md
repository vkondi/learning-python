# React Embedded In Python App

This README provides detailed instructions and context for the Python-React app. It is designed to help you set up, run, and maintain the app even after a long time without working on it.

---

## **Project Overview**
This application integrates a React frontend with a Flask backend. The React app handles the user interface, while Flask serves API requests and handles the business logic.

---

## **Folder Structure**
```
root
├── app.py               # Flask backend application
├── frontend/            # React frontend source code
│   ├── public/          # Static public files (index.html, etc.)
│   ├── src/             # React components and logic
│   ├── vite.config.ts   # Vite configuration file
│   ├── package.json     # React dependencies and scripts
├── requirements.txt     # Python dependencies
└── README.md            # Documentation (this file)
```

---

## **Setup Instructions**

### **1. Prerequisites**
Make sure the following are installed on your system:
- **Python 3.9+**
- **Node.js 16+** (includes npm)

### **2. Install Dependencies**

#### Backend (Flask):
1. Navigate to the root folder:
   ```bash
   cd <root-folder>
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - Linux/Mac:
     ```bash
     source venv/bin/activate
     ```
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
4. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

#### Frontend (React):
1. Navigate to the React app folder:
   ```bash
   cd frontend
   ```
2. Install Node.js dependencies:
   ```bash
   yarn install
   ```

---

## **Running the App**

### **1. Development Mode**

#### **Backend (Flask):**
1. Start the Flask server:
   ```bash
   python app.py
   ```
2. The Flask app will run on `http://127.0.0.1:5000` by default.

#### **Frontend (React):**
1. Start the React development server:
   ```bash
   yarn dev
   ```
2. The React app will run on `http://localhost:5173`.

**Proxy Setup:**
- The `vite.config.ts` file proxies API requests (e.g., `/api`) to `http://127.0.0.1:5000`. This avoids CORS issues during development.

### **2. Production Mode**

1. **Build the React App:**
   ```bash
   yarn build
   ```
   This generates static files in the `frontend/dist` folder.

2. **Serve React with Flask:**
   Ensure `app.py` is set to serve React build files. Confirm the following Flask route exists:
   ```python
   from flask import send_from_directory

   @app.route('/', defaults={'path': ''})
   @app.route('/<path:path>')
   def serve_react(path):
       if path != "" and os.path.exists(os.path.join('frontend/dist', path)):
           return send_from_directory('frontend/dist', path)
       return send_from_directory('frontend/dist', 'index.html')
   ```

3. **Start Flask in Production:**
   ```bash
   python app.py
   ```
   The app will run on `http://127.0.0.1:5000` and serve both the API and the React frontend.

---

## **Configuration Details**

### **Backend Configuration**
- **Dependencies**: Flask
- **API Endpoints**:
  - `/api/data`: Example endpoint returning JSON data.

### **Frontend Configuration**
- **Development Server**: Vite (`http://localhost:5173`)
- **Proxy**:
  - Configured in `vite.config.ts`:
    ```javascript
    export default defineConfig({
      server: {
        proxy: {
          '/api': 'http://127.0.0.1:5000',
        },
      },
    });
    ```
- **Build**: Generates static files in `frontend/dist`.

---

## **Common Issues & Troubleshooting**

### **1. API Requests Returning HTML**
- Ensure `vite.config.ts` is correctly configured to proxy `/api` to the Flask backend.
- Ensure Flask routes are correctly implemented and not overridden by React's static file route.

### **2. CORS Errors**
- Verify Flask-CORS is enabled in `app.py`.
- In development, use the proxy in `vite.config.ts`.

### **3. React App Doesn't Build**
- Check for errors in `src/` and resolve them before running `yarn build`.
- Ensure all dependencies are installed (`yarn install`).

### **4. Flask Server Errors**
- Ensure the virtual environment is activated.
- Verify all dependencies in `requirements.txt` are installed.

---

## **Future Enhancements**
1. **Authentication**: Add login functionality with JWT.
2. **Dockerization**: Create a `Dockerfile` and `docker-compose.yml` for easy deployment.
3. **Database Integration**: Use SQLAlchemy with Flask to connect to a database (e.g., PostgreSQL).
4. **Testing**: Add unit tests for both Flask and React.

---

## **Contact**
For questions or issues, contact the project maintainer.

