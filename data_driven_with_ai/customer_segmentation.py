import pandas as pd
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# Read data from CSV
data = pd.read_csv('data/customer_segmentation_data.csv')

# Group by customer and aggregate total revenue and qunatity sold
customer_data = data.groupby('customer_id').agg({'total_revenue':'sum', 'quantity': 'count'}).reset_index()

# Normalise the data
X = customer_data[['total_revenue','quantity']]

# Apply K-means clustering
kmeans = KMeans(n_clusters=3) # Example with 3 clusters
customer_data['Cluster'] = kmeans.fit_predict(X)

# Display customer data
print(customer_data) # Show records of the cluster

# Visualize the clusters
plt.scatter(customer_data['total_revenue'], customer_data['quantity'], c=customer_data['Cluster'])
plt.xlabel('Total Revenue')
plt.ylabel('Number of Purchases')
plt.title('Customer Segmentation')
plt.show()

