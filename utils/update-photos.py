import os

def get_JS_picture_path_list():
    list = f"const images = ["
    for filename in os.listdir(r'./assets'):
        list= list+ f"\"assets\\\\{filename}\","
    list = list +"]; \n"
    return list



def update_JS_picture_path_list():
    with open(f'coffeemakesmemove.js', 'r') as file:
        lines = file.readlines()  

    with open(f'coffeemakesmemove.js', 'w') as file:
        for line in lines:
            # Check if the line starts with the target line's beginning
            if line.strip().startswith("const images"):
                file.write(get_JS_picture_path_list())  # Replace with the new line
                print("Updated lines")
            else:
                file.write(line)  # Write the original line if no match

update_JS_picture_path_list()

