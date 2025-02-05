import csv
import sqlite3
import os

DATABASE_NAME = 'employee_portal.db'
CSV_FILEPATH = 'data/employee_details.csv'
EMP_PERSONAL_DETAILS_TABLE = 'emp_personal_details'
EMP_EMPLOYMENT_DETAILS_TABLE = 'emp_employment_details'

def initialize_database():
    """Initialize the SQLite database with the required tables."""
    connection = sqlite3.connect(DATABASE_NAME)
    cursor = connection.cursor()
    
    # Create the tables if they don't exist
    cursor.execute(f"""CREATE TABLE IF NOT EXISTS {EMP_PERSONAL_DETAILS_TABLE} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        emp_name TEXT NOT NULL,
        emp_dob DATE NOT NULL,
        phone TEXT NOT NULL,
        address TEXT NOT NULL)""")
    cursor.execute(f"""CREATE TABLE IF NOT EXISTS {EMP_EMPLOYMENT_DETAILS_TABLE} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        salary INTEGER NOT NULL,
        designation TEXT NOT NULL
        )""")
    
    connection.commit()
    connection.close()
    
    # Load the CSV data into the database
    if os.path.exists(CSV_FILEPATH):
        load_csv_to_db()
        
def load_csv_to_db():
    connection = sqlite3.connect(DATABASE_NAME)
    cursor = connection.cursor()
    
    with open(CSV_FILEPATH, newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            cursor.execute(f"INSERT OR IGNORE INTO {EMP_PERSONAL_DETAILS_TABLE} (id,emp_name, emp_dob, phone, address) VALUES(?, ?, ?, ?, ?)",(row["id"], row['emp_name'], row['emp_dob'], row['phone'], row['address']))
            cursor.execute(f"INSERT OR IGNORE INTO {EMP_EMPLOYMENT_DETAILS_TABLE} (id,email, salary, designation) VALUES(?, ?, ?, ?)",(row["id"], row['email'], row['salary'], row['designation']))
            
    connection.commit()
    connection.close()