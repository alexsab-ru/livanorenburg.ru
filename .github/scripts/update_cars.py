import os
import shutil
import requests
from pathlib import Path

# Parsing XML
import xml.etree.ElementTree as ET

filename = 'livan.xml'

if os.path.exists(filename):
    tree = ET.parse(filename)
    root = tree.getroot()
else:
    XML_URL = os.environ['XML_URL']

    response = requests.get(XML_URL)
    response.raise_for_status()  # Если возникла ошибка, будет выброшено исключение
    content = response.content

    # Убрать BOM, если он присутствует
    if content.startswith(b'\xef\xbb\xbf'):
        content = content[3:]

    # Декодируем содержимое из байтов в строку
    xml_content = content.decode('utf-8')

    # Parsing the provided XML data
    root = ET.fromstring(xml_content)

directory = "public/_cars"
dir_path = Path(directory)
dir_path.mkdir(parents=True, exist_ok=True)

# Clear the directory if it exists, otherwise create it
# if os.path.exists(directory):
#     shutil.rmtree(directory)

def process_vin_hidden(vin):
    return f"{vin[:5]}-{vin[-4:]}"

# Helper function to process permalink
def process_permalink(vin):
    return f"/cars/{vin[:5]}-{vin[-4:]}/"


# Helper function to process description and add it to the body
def process_description(desc_text):
    lines = desc_text.split('\n')
    processed_lines = []
    for line in lines:
        if line.strip() == '':
            processed_lines.append("<p>&nbsp;</p>")
        else:
            processed_lines.append(f"<p>{line}</p>")
    return '\n'.join(processed_lines)


existing_files = set()  # для сохранения имен созданных или обновленных файлов
# Словарь соответствия цветов
color_mapping = {
    "Белый": "white",
    "Желтый": "gold",
    "Красный": "red",
    "Синий": "blue"
    # ... добавьте другие цвета по мере необходимости
}


for car in root.find('cars'):
    vin = car.find('vin').text
    permalink = process_permalink(vin)
    vin_hidden = process_vin_hidden(vin)
    filename = f"{directory}/{vin}.html"
    # Преобразование цвета
    color = car.find('color').text.strip().capitalize()

    thumb = f"/img/x3Pro/color/{color_mapping.get(color, 'white')}.png"


    # Forming the YAML frontmatter
    content = "---\n"
    content += "layout: car-page\n"
    content += f"permalink: {permalink}\n"
    content += f"vin_hidden: {vin_hidden}\n"

    h1 = f"{car.find('folder_id').text} {car.find('modification_id').text}"
    content += f"h1: {h1}\n"

    title = f"{car.find('mark_id').text} {car.find('folder_id').text} {car.find('modification_id').text}"
    content += f"title: {title}\n"

    description = ""

    for child in car:
        # Skip nodes with child nodes (except images) and attributes
        if list(child) and child.tag != 'images':
            continue
        if child.tag == 'images':
            images = [img.text for img in child.findall('image')]
            content += f"{child.tag}: {images}\n"
        elif child.tag == 'color':
            content += f"{child.tag}: {color}\n"
            content += f"thumb: {thumb}\n"
        elif child.tag == 'extras' and child.text:
            content += f"{child.tag}: \"{child.text}\"\n"
        elif child.tag == 'description' and child.text:
            # content += f"{child.tag}: >-\n"
            # for line in child.text.split("\n"):
            #     content += f"  {line}<br>\n"
            # Flattening description for YAML without using backslashes in f-string
            flat_description = child.text.replace('\n', '<br>')
            content += "{}: \"{}\"\n".format(child.tag, flat_description)
        else:
            if child.text:  # Only add if there's content
                content += f"{child.tag}: {child.text}\n"

    content += "---\n"
    content += process_description(description)

    with open(filename, 'w') as f:
        f.write(content)

    existing_files.add(filename)

for existing_file in os.listdir(directory):
    filepath = os.path.join(directory, existing_file)
    if filepath not in existing_files:
        os.remove(filepath)
