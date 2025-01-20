# Import necessary libraries
# pandas is used for data manipulation and analysis
# sklearn.ensemble provides the Isolation Forest algorithm for anomaly detection
import pandas as pd
from sklearn.ensemble import IsolationForest

# Load sales data from CSV file into a pandas DataFrame
data = pd.read_csv('data/anomaly_detection_data.csv')

# Group the data by date column and calculate the total sales revenue for each day
daily_sales = data.groupby('date')['total_revenue'].sum().reset_index()

# Create an Isonlation Forest model to detect anomalies in the daily daily_sales revenue
# The parameter 'contamination=0.05' indicates that we expect about 5% of the data to be anomalies
model = IsolationForest(contamination=0.05)

# Use the IsolationForest model to predict whether each day's sales are normal or anomalous
# The model assigns a prediction to each row:
# '1' means normal data & '-1' means anomalous data
# We store these predictions in a new column called 'anomaly' in the 'daily_sales' DataFrame.
daily_sales['anomaly'] = model.fit_predict(daily_sales[['total_revenue']])

# Extract and display only the rows where the 'anomaly' column is equal to -1
# These rows represent the days with anomalous sales revenue
anomalies = daily_sales[daily_sales['anomaly'] == -1]
print('Detected anomalies')
print(anomalies)
print('---------------------------------')
print('Daily Sales')
print(daily_sales)