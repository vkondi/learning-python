import sqlite3
from flask import Flask, request, jsonify
from db import initialize_database, DATABASE_NAME, EMP_EMPLOYMENT_DETAILS_TABLE, EMP_PERSONAL_DETAILS_TABLE

app = Flask(__name__)

# Initialize the database on startup
initialize_database()

@app.route('/api/get-all-employees', methods=['GET'])
def getAllEmployess():
    """Retrieve all employees from the database."""
    connection = sqlite3.connect(DATABASE_NAME)
    cursor = connection.cursor()
    
    cursor.execute(f"SELECT * from {EMP_PERSONAL_DETAILS_TABLE} JOIN {EMP_EMPLOYMENT_DETAILS_TABLE} ON {EMP_PERSONAL_DETAILS_TABLE}.id == {EMP_EMPLOYMENT_DETAILS_TABLE}.emp_id")
    employees = cursor.fetchall()
    
    connection.close()
    
    # Convert result to a list of dictionaries
    columns = [column[0] for column in cursor.description]
    result = [dict(zip(columns, employee)) for employee in employees]
    
    return jsonify(result)

@app.route('/api/add-employee', methods=['POST'])
def addEmployee():
    """Add a new user to the database"""
    data = request.json
    
    # Check for all required fields
    if not all(key in data for key in ('emp_name', 'emp_dob', 'phone', 'address', 'email', 'salary', 'designation')):
        return jsonify({'error': 'Missing required fields'}), 400
    
    try:
        # Connect to SQLite database
        connection = sqlite3.connect(DATABASE_NAME)
        cursor = connection.cursor()
        
        # Insert personal details
        cursor.execute(f"INSERT INTO {EMP_PERSONAL_DETAILS_TABLE} (emp_name, emp_dob, phone, address) VALUES (?,?,?,?)", (data['emp_name'],data['emp_dob'],data['phone'],data['address']))
        
        # Get ID of newly inserted record
        emp_id = cursor.lastrowid
        
        # Insert employment details
        cursor.execute(f"INSERT INTO {EMP_EMPLOYMENT_DETAILS_TABLE} (emp_id, email, salary, designation) VALUES (?,?,?,?)",(emp_id, data['email'], data['salary'], data['designation']))
        
        # Commit changes
        connection.commit()
    
    except sqlite3.Error as e:
        return jsonify({'error': str(e)}, 500 ) # Handle database gracefully
    
    finally:
        # Close the connection
        connection.close()
        
    return jsonify({"message": 'Employee added successfully', "id": emp_id}), 201


@app.route('/api/delete-employee/<int:emp_id>',methods=['DELETE'])
def deleteEmployee(emp_id):
    # Connect to SQLite database
    connection = sqlite3.connect(DATABASE_NAME)
    cursor = connection.cursor()
    
    try:
        # Check if the employee exists
        cursor.execute(f"SELECT 1 FROM {EMP_PERSONAL_DETAILS_TABLE} WHERE id=?", (emp_id,))
        if cursor.fetchone() is None:
            return jsonify({"error": "Employee not found"}), 404
            
        # Delete record from emp_employment_details first due to FK constraint
        cursor.execute(f"DELETE FROM {EMP_EMPLOYMENT_DETAILS_TABLE} WHERE emp_id=?", (emp_id,))
        
        # Delete from emp_personal_details
        cursor.execute(f"DELETE FROM {EMP_PERSONAL_DETAILS_TABLE} WHERE id=?", (emp_id,))
        
        # Commit changes
        connection.commit()
        
    except sqlite3.Error as e:
        connection.rollback() # Rollback in case of an error
        return jsonify({'error': str(e)}), 500 # Return error message
    
    finally:
        # Close connection
        connection.close()
        
    return jsonify({"message": "Employee deleted successfully", "id": emp_id}), 200
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)