# Data-Driven Sales Dashboard

## Overview
This project demonstrates a basic **data-driven web application** built with Python, Flask, Pandas, and Matplotlib. The application processes sales data from a CSV file, performs analytics, and visualizes insights on a simple web-based dashboard.

## Features
- **Data Processing**: Reads and processes sales data from a CSV file.
- **Analytics**:
  - Calculates total sales.
  - Calculates average sales.
  - Aggregates sales by product category.
- **Visualization**: Generates a bar chart to display sales trends by category.
- **Web Dashboard**: Displays insights and visualizations in a web-based interface using Flask.

## Project Structure
```
data_driven_app/
├── app.py          # Main application file
├── templates/
│   └── dashboard.html  # HTML template for the dashboard
├── static/
│   └── style.css   # Optional styling
├── data/
│   └── sales_data.csv  # Sample sales data file
├── requirements.txt # Dependencies
├── README.md          #  Readme file
├── .gitignore          # Gitignore file
```

## Prerequisites
- Python 3.7 or later
- Pip (Python package manager)

## Installation and Setup

### Step 1: Navigate to root folder
```bash
cd data_driven_app
```

### Step 2: Create a Virtual Environment (Optional but Recommended)
```bash
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Run the Application
```bash
python app.py
```

### Step 5: Access the Application
Open your browser and navigate to:
```
http://127.0.0.1:5000
```

## Sample Data
The sample data file (`data/sales_data.csv`) contains sales information in the following format:
```csv
Date,Product,Category,Sales
2025-01-01,Laptop,Electronics,1200
2025-01-02,Phone,Electronics,800
2025-01-03,Shoes,Fashion,150
2025-01-04,Watch,Fashion,200
2025-01-05,TV,Electronics,500
```

## Application Flow
1. **Load Data**: Reads the CSV file from the `data/` folder.
2. **Process Data**: Uses Pandas to calculate total sales, average sales, and sales by category.
3. **Generate Chart**: Uses Matplotlib to create a bar chart for sales by category.
4. **Serve Dashboard**: Displays insights and the chart on a Flask-based web interface.

## Screenshots
### Dashboard
![Dashboard Screenshot](static/sales_by_category.png)

## Common Issues and Troubleshooting
### Error: `GET /sales_by_category.png HTTP/1.1" 404`
This occurs when the bar chart image is not generated or saved in the correct location.
- Ensure that the `create_bar_chart` function saves the image in the `static/` folder.
- Check file permissions and ensure the `static/` directory exists.

### Missing Dependencies
If `pip install -r requirements.txt` fails, try installing dependencies individually:
```bash
pip install pandas matplotlib flask
```

## Extending the Application
Here are some ideas to enhance the project:
- **Add User Input**: Allow users to upload their own CSV files.
- **Interactive Charts**: Use libraries like Plotly or D3.js for dynamic visualizations.
- **Database Integration**: Store sales data in a database (e.g., SQLite, PostgreSQL).
- **Authentication**: Add user authentication for a personalized dashboard.

## Dependencies
- Flask==3.1.0
- pandas==2.2.3
- matplotlib==3.10.0

Install them using:
```bash
pip install -r requirements.txt
```

## License
This project is open-source and available under the MIT License.

## Contributing
Contributions are welcome! Feel free to fork this repository, make improvements, and submit a pull request.

## Contact
For questions or feedback, please reach out to:
- **Email**: [vishdevwork [at] gmail [dot] com](mailto:vishdevwork@gmail.com)
- **GitHub**: [[github.com/vkondi](https://github.com/vkondi)]

---

Enjoy exploring and building on this data-driven application! 🎉

