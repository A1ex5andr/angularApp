build
│   index.html
│
├───css
├───fonts
├───img
├───js
└───layout

- - - - - - - - - - - - - - - - - -

source
│   gulpfile.js
│   package.json
│   readme.md
│
├───directives              // директивы для всего проекта
│   │
│   ├───jade
│   │
│   ├───js
│   │
│   └───scss
│
├───main                    // файлы глваного приложения
│   │
│   ├───jade                // индексовая страница
│   │
│   ├───js                  // основной angular + js не связанный с angular'ом
│   │
│   └───scss                // основной css
│
├───modules                 // индивидуальный и независимый модуль (пример: catalog)
│   │
│   ├───cart
│   │
│   ├───catalog             // модуль для каталога
│   │   ├───jade            // основа разметки каталога
│   │   ├───scss            // стили основы каталога
│   │   ├───img             // сервисные изображения для каталога
│   │   ├───js              // js основы каталога
│   │   │     app.js
│   │   │     controllers.js
│   │   │     directives.js
│   │   │     filters.js
│   │   │     services.js
│   │   │
│   │   └───partials
│   │      │
│   │      ├───productGallery
│   │      │    ├───jade            // основа разметки productGallery
│   │      │    ├───scss            // стили основы productGallery
│   │      │    ├───img             // сервисные изображения для productGallery
│   │      │    └───js              // js основы productGallery
│   │      │
│   │      ├───productPanel
│   │      │    ├───jade            // основа разметки productPanel
│   │      │    ├───scss            // стили основы productPanel
│   │      │    ├───img             // сервисные изображения для productPanel
│   │      │    └───js              // js основы productPanel
│   │      ...
│   │
│   │
│   ├───contact              // статические фыйлы для основной страницы и всего проекта
│   │
│   ├───header             // файлы которые не изменяються
│   │
│   ...
│
│
├───static              // статические фыйлы для основной страницы и всего проекта
│
└───vendor              // файлы которые не изменяються