# Gulp Starter

Начальный проект разарботки less/twig


##Установка

npm install -g gulp
cd gulp-stater
npm install


##Запуск

cd gulp-stater
gulp

Cервер запустится на localhost:3000

Все изменения компилирются в папку public


##Релиз

git submodule add -f ssh://{{repoName}}.git release

gulp c
очистит release

gulp r
скопирует файлы в release из public