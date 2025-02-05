from rembg import remove
from PIL import Image
import os

def remove_background(input_path, output_path):
    # Open the input image
    input_image = Image.open(input_path)

    # Remove the background from the input image
    output_image = remove(input_image)

    # Save the output image
    output_image.save(output_path)
    output_image.show()


if __name__ == '__main__':
    # Define input and output paths
    input_path = os.path.join('data', 'image.png')
    output_path = os.path.join('data', 'image_no_bg.png')

    # Remove the background from the input image
    remove_background(input_path, output_path)
