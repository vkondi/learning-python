import requests
from bs4 import BeautifulSoup
import re
import time

def get_latest_version(package_name):
    """
    Scrape PyPi.org to get the latest version of a package.
    Return None if the package is not found or an error occurs.
    """
    try:
        # Construct the URL for the package
        url = f"https://pypi.org/project/{package_name}/"
        
        # Send a GET request with a user-agent header to avoid being blocked
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }
        time.sleep(0.5)  # Wait 0.5 second before each request
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()  # Raise an error for bad responses
        
        # Parse the HTML content using BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find the H1 tag which contains the version number
        h1_tag = soup.find('h1',class_='package-header__name')

        if h1_tag:
            # Extract version using regex
            text = h1_tag.text.strip()
            version_match = re.search(r'\s([\d\.]+.*)$', text)
            
            if version_match:
                return version_match.group(1)
        
        return None  # Return None if version not found
    
    except requests.RequestException as e:
        print(f"Error fetching {package_name}: {e}")
        return None
    

def generate_requirements(package_list, output_file="output_requirements.txt"):
    """
    Generate output_requirements.txt for the list of packages.
    """
    requirements = []
    
    # Process each package
    for package in package_list:
        print(f"Fetching version for {package}...")
        version = get_latest_version(package)
        if version:
            requirements.append(f"{package}=={version}")
            print(f"Added {package}=={version} to requirements.")
        else:
            # Add package without version if version fetching fails
            requirements.append(package)
            print(f"Could not fetch version for {package}. Added without version.")
            
    try:
        with open(output_file, 'w') as f:
            f.write("\n".join(requirements))
        print(f"Successfully generated {output_file}")
    except IOError as e:
        print(f"Error writing to file {output_file}: {e}")
    

def main():
    # Sample list of packages
    packages = [
        "beautifulsoup4",
        "pandas",
        "scikit-learn",
        "matplotlib",
        "seaborn",
        "tensorflow",
        "torch",
        "flask",
        "django",
        "requests"
    ]
    
    # Generate output_requirements.txt
    generate_requirements(packages)
    
if __name__ == "__main__":
    main()