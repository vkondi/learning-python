from rembg import remove
from PIL import Image
import os

# Define input and output paths
input_path = os.path.join('data', 'image.png')
output_path = os.path.join('data', 'image_no_bg.png')

# Open the input image
input_image = Image.open(input_path)

# Remove the background from the input image
output_image = remove(input_image)

# Save and display the output image
output_image.save(output_path)
output_image.show()