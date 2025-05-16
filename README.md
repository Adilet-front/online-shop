# 🛍️ Online Shop

Этот проект — простой онлайн-магазин, созданный с использованием HTML, CSS (SCSS), JavaScript и `json-server` для мокового API.

## 📁 Структура проекта

html/ # HTML-страницы
style/ # SCSS / CSS стили
js/ # JavaScript файлы
photo/ # Изображения и другие ассеты
db.json # Локальная база данных для json-server


## 🚀 Технологии

- **HTML, SCSS, CSS**
- **JavaScript**
- **json-server** — для эмуляции backend API

## 🖥️ Установка и запуск

### 1. Клонируйте репозиторий

git clone https://github.com/Adilet-front/online-shop.git
cd online-shop

2. Установите зависимости
npm install

3. Запуск json-server
Файл db.json содержит данные для фейкового API. Чтобы запустить сервер:
npx json-server --watch db.json --port 3001

Сервер будет доступен по адресу: http://localhost:3001

Например:

http://localhost:3001/products

http://localhost:3001/users

👥 Контрибьюторы
Проект разрабатывался командой из 5 участников. Спасибо всем, кто принимал участие!
