import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

# Load the sales data and create features/labels for churn prediction
data = pd.read_csv('data/churn_prediction_data.csv')

# Convert 'Last Purchase Date' to datetime
data['last_purchase_date'] = pd.to_datetime(data['last_purchase_date'], errors='coerce')

# Create a churn label (1 if churned, 0 otherwise)
data['Churn'] = (data['last_purchase_date'] < pd.Timestamp.now() - pd.DateOffset(months=6)).astype(int)

# Feature selection (example features)
features = data[['total_revenue', 'quantity_sold']]
labels = data['Churn']

# Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2)

# Train logistic regression model
model = LogisticRegression()
model.fit(X_train, y_train)

# Evaluate model accuracy
accuracy = model.score(X_test, y_test)
print(f'Model Accuracy: {accuracy:.2f}')

# Make predictions using the test set
predictions = model.predict(X_test)

# Create a DataFrame to view actual vs predicted churn
results = X_test.copy()
results['Actual Churn'] = y_test
results['Predicted Churn'] = predictions

print(results)