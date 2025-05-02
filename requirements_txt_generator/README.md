# Requirements Generator

This Python script generates a `output_requirements.txt` file with the latest versions of specified Python packages. It scrapes the PyPI website to fetch the latest version of each package and writes the results to a `output_requirements.txt` file.

## Features

- Fetches the latest version of Python packages from PyPI.
- Generates a `output_requirements.txt` file with pinned versions.
- Handles errors gracefully if a package version cannot be fetched.
- Allows customization of the package list and output file.

## Prerequisites

Before running the script, ensure you have the following installed:

- Python 3.6 or higher
- The following Python libraries:
  - `requests`
  - `beautifulsoup4`

You can install the required libraries using pip:

```bash
pip install requests beautifulsoup4
```

### Customizing the Package List
To customize the list of packages, edit the packages list in the main() function of the script:

```bash
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
```
Add or remove package names as needed.

### Customizing the Output File
To change the name or location of the output file, modify the `output_file` parameter in the `generate_requirements` function call:

```bash
generate_requirements(packages, output_file="custom_requirements.txt")
```

## How It Works
1. The script defines a function `get_latest_version(package_name)` that scrapes the PyPI website to fetch the latest version of a given package.
2. The `generate_requirements(package_list, output_file)` function iterates over a list of package names, fetches their latest versions, and writes them to the specified output file.
3. The `main()` function provides a sample list of packages and calls `generate_requirements` to generate the `output_requirements.txt` file.

## Error Handling
- If the script cannot fetch the version of a package (e.g., due to network issues or the package not being found), it adds the package name without a version to the output_requirements.txt file.
- Errors are logged to the console for debugging purposes.

## Example Output
After running the script, the generated output_requirements.txt file might look like this:

```bash
beautifulsoup4==4.13.3
pandas==1.5.3
scikit-learn==1.2.2
matplotlib==3.6.2
seaborn==0.12.1
tensorflow==2.11.0
torch==1.13.1
flask==2.2.3
django==4.1.5
requests==2.28.1
```

## Limitations
- The script relies on web scraping, which may break if the PyPI website structure changes.
- It does not handle packages that are not hosted on PyPI.