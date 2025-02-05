import os
from app import remove_background

def test_remove_background():
    input_path = os.path.join('data','image.png')
    output_path = os.path.join('data', 'image_no_bg_test.png')
    
    # Ensure the input file exists
    assert os.path.exists(input_path), f"Input file {input_path} not found"
    
    # Invoke the function to remove background
    remove_background(input_path, output_path)
    
    # Ensure the output file was created
    assert os.path.exists(output_path), f"Output file {output_path} not found"