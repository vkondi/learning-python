import sqlite3
from flask import Flask, request, jsonify
from faker import Faker
from db import initialize_database, DATABASE_NAME, EMP_EMPLOYMENT_DETAILS_TABLE, EMP_PERSONAL_DETAILS_TABLE

app = Flask(__name__)
faker = Faker()

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

    
@app.route('/api/update-employee/<int:emp_id>', methods=['PUT'])
def updateEmployee(emp_id):
    data = request.json
    
    # Check for all required fields
    if not all(key in data for key in ('emp_name', 'emp_dob', 'phone', 'address', 'email', 'salary', 'designation')):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Connect to SQLite database
    connection = sqlite3.connect(DATABASE_NAME)
    cursor = connection.cursor()
    
    try:
        # Update Personal details
        cursor.execute(f"""
                    UPDATE {EMP_PERSONAL_DETAILS_TABLE}
                    SET
                        emp_name = ?,
                        emp_dob = ?,
                        phone = ?,
                        address = ?
                    WHERE
                        id = ?
                       """, (data['emp_name'],data['emp_dob'],data['phone'],data['address'],emp_id))
        
        # Update Employment details
        cursor.execute(f"""
                       UPDATE {EMP_EMPLOYMENT_DETAILS_TABLE}
                       SET
                          email = ?,
                          salary = ?,
                          designation = ?
                        WHERE
                            emp_id = ?  
                       """, (data['email'],data['salary'],data['designation'],emp_id))
        
        # Commit the changes
        connection.commit()
        
        # Check if any rows were updated
        if cursor.rowcount == 0:
            connection.rollback() # Rollback if no updates were made
            return jsonify({"message": "User not found or no changes were applied"}), 404
        
    except sqlite3.Error as e:
        connection.rollback() # Rollback changes in case of an error
        return jsonify({"error": str(e)}), 500 # Internal server error
    
    finally:
        # Close connection
        connection.close()
        
    return jsonify({"message": "Employee updated successfully", "id": emp_id}), 200
    
@app.route('/api/generate-random-employee',methods=['GET'])
def generateRandomEmployee():
    try: 
        emp_data = {
            'emp_name': faker.name(),
            'emp_dob': faker.date_of_birth().strftime('%Y-%m-%d'),
            'phone': faker.basic_phone_number(),
            'address': faker.address(),
            'email': faker.email(),
            'salary': faker.random_int(min=1000000,max=10000000),
            'designation': faker.job()
        }
    except Exception as e:
        return jsonify({"error": str(e)}), 500 # Handle exception error
    
    return jsonify({"message": "success", "data": emp_data}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)