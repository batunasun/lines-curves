import os
import urllib.request

BASE_DIR = r"D:\OneDrive - Mongolian University of Science and Technology\Documents\Positron\my-r-project\books\lines-curves"
BASE_URL = "https://old.mccme.ru/free-books/prkr/"

# 1. Эх серверээс formula2.js болон ruhyphen.js файлуудыг цэврээр нь дахин татах
for js_file in ["formula2.js", "ruhyphen.js"]:
    url = BASE_URL + js_file
    dest = os.path.join(BASE_DIR, js_file)
    urllib.request.urlretrieve(url, dest)
    print(f"Эх хувь татагдлаа: {js_file}")

# 2. formula2.js доторх товчны үгсийг эвдэлгүйгээр солих
f2_path = os.path.join(BASE_DIR, "formula2.js")
with open(f2_path, "r", encoding="windows-1251") as f:
    js_text = f.read()

js_text = js_text.replace("Вернуться назад", "Буцах")

with open(f2_path, "w", encoding="utf-8") as f:
    f.write(js_text)

# 3. index.html доторх charset="utf-8" тохиргоо болон зохиогчийн нэрийг шалгах
html_path = os.path.join(BASE_DIR, "index.html")
with open(html_path, "r", encoding="utf-8") as f:
    html_text = f.read()

html_text = html_text.replace('src="formula2.js"', 'src="formula2.js" charset="utf-8"')
html_text = html_text.replace('src="ruhyphen.js"', 'src="ruhyphen.js" charset="utf-8"')

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_text)

print("Бүх скрипт амжилттай сэргээгдлээ!")