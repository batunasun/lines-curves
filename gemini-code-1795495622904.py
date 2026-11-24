import os
import re

BASE_DIR = r"D:\OneDrive - Mongolian University of Science and Technology\Documents\Positron\my-r-project\books\lines-curves"
html_path = os.path.join(BASE_DIR, "index.html")

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# "Скрыть § 4" -> "§ 4-ийг нуух" болгох (бүх бүлэг дээр)
html = re.sub(r'Скрыть\s*§\s*(\d+)', r'§ \1-ийг нуух', html)
html = html.replace("Скрыть", "Нуух")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Бүх 'Скрыть § ...' холбоос монгол боллоо!")