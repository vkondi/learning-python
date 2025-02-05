import sqlite3
from flask import Flask, request, jsonify
from db import initialize_database, DATABASE_NAME, EMP_EMPLOYMENT_DETAILS_TABLE, EMP_PERSONAL_DETAILS_TABLE

app = Flask(__name__)

# Initialize the database on startup
initialize_database()

@app.route('/get-all-employees', methods=['GET'])
def getAllEmployess():
    """Retrieve all employees from the database."""
    connection = sqlite3.connect(DATABASE_NAME)
    cursor = connection.cursor()
    
    cursor.execute(f"SELECT * from {EMP_PERSONAL_DETAILS_TABLE} JOIN {EMP_EMPLOYMENT_DETAILS_TABLE} ON {EMP_PERSONAL_DETAILS_TABLE}.id == {EMP_EMPLOYMENT_DETAILS_TABLE}.id")
    employees = cursor.fetchall()
    
    connection.close()
    
    # Convert result to a list of dictionaries
    columns = [column[0] for column in cursor.description]
    result = [dict(zip(columns, employee)) for employee in employees]
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)