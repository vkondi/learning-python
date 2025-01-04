from flask import Flask, render_template
import pandas as pd
import matplotlib.pyplot as plt
import os

app = Flask(__name__)

# Load and process data
def load_data():
    filepath = "data/sales_data.csv"
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"{filepath} not found.")
    df = pd.read_csv(filepath)
    return df

def generate_insights(df):
    total_sales = df["Sales"].sum()
    avg_sales = df["Sales"].mean()
    sales_by_category = df.groupby("Category")["Sales"].sum()
    sales_by_product = df.groupby("Product")["Sales"].sum()
    return total_sales, avg_sales, sales_by_category, sales_by_product

def create_bar_chart(data, filename="static/sales_by_category.png", title="Sales by Category", ylabel="Total Sales", xlabel="Category"):
    if not os.path.exists("static"):
        os.makedirs("static")
    data.plot(kind="bar", figsize=(8, 5))
    plt.title(title)
    plt.ylabel(ylabel)
    plt.xlabel(xlabel)
    plt.tight_layout()
    plt.savefig(filename)
    plt.close()
    print(f"Chart saved to: {filename}")

@app.route("/")
def dashboard():
    df = load_data()
    total_sales, avg_sales, sales_by_category, sales_by_product = generate_insights(df)
    create_bar_chart(sales_by_category)
    create_bar_chart(sales_by_product,"static/sales_by_product.png","Sales by Product","Total Sales","Product")
    
    return render_template(
        "dashboard.html",
        total_sales=total_sales,
        avg_sales=avg_sales,
        chart_url="static/sales_by_category.png",
        chart2_url="static/sales_by_product.png",
    )

if __name__ == "__main__":
    app.run(debug=True)
