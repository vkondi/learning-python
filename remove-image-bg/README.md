# Remove Image Background

## Overview
This project demonstrates how to remove the background from an image using the `rembg` library in Python. The script reads an input image, removes its background, and saves the output image.

## Prerequisites
- Python 3.8 or later
- Pip (Python package manager)

## Installation

1. Navigate to root folder:
    ```sh
    cd remove-image-bg
    ```

2. Create a virtual environment:
    ```sh
    python -m venv env
    ```

3. Activate the virtual environment:
    - On Windows:
        ```sh
        .\env\Scripts\activate
        ```
    - On macOS/Linux:
        ```sh
        source env/bin/activate
        ```

4. Install the required libraries:
    ```sh
    pip install -r requirements.txt
    ```

## Usage

1. Place the input image in the `data` directory and name it `image.png`.

2. Run the script:
    ```sh
    python app.py
    ```

3. The output image with the background removed will be saved as `image_no_bg.png` in the `data` directory.

## Dependencies
- pil2ansi==1.0.0
- rembg==2.0.62
- onnxruntime==1.20.1

## Example

### Input image with background
![With Background](static/image.png)

### Output image without background
![Without Background](static/image_no_bg.png)

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