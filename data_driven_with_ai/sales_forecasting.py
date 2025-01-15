import pandas as pd
from prophet import Prophet

# Load sales data
data = pd.read_csv('data/sales_forecasting_data.csv')

# Prepare data for Prophet
data['date'] = pd.to_datetime(data['date'])
sales_data = data.groupby('date')['total_revenue'].sum().reset_index()
sales_data.columns = ['ds','y'] # Rename columns for Prophet

# Create and fit the model
model = Prophet()
model.fit(sales_data)

# Create a data frame for future dates
future_dates = model.make_future_dataframe(periods=30) # Forecasting for 30 days
forecast = model.predict(future_dates)

# Plot the forecast
# model.plot(forecast)

# Display the forecast in data format
forecast_data = forecast[['ds','yhat','yhat_lower','yhat_upper']]
print(forecast_data.tail(30)) # Show last 30 records of the forecast
print("-----------------") 
print(forecast) # Show last 30 records of the forecast