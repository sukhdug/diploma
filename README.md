# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

Это телеграм-бот рекомендации книг, разработанный в качестве выпускной квалификационной работы.

### Установка ###
Для того, чтобы запустить данного бота, Вам понадобится установить платформу [Node.JS](https://nodejs.org/en/download/package-manager/) 
и пакетный менеджер [NPM](https://www.npmjs.com/get-npm).

Если Вы уже установили Node.JS и NPM, выполните следующую команду для клонирования репозитория
в интерпретаторе командной строки (CLI)

```shell
git clone https://sukhdug@bitbucket.org/sukhdug/telegram-bot.git
```
Далее переходите в корневую директорию репозитория:

```shell
cd telegram-bot
```

После этого выполните следующую команду для установки зависимых библиотек и модулей

```shell
npm install
```

Если все прошло успешно, Вам нужно будем накатывать дамп базы данных, находящейся в папке sql/

В командной строке базы данных MySQL выполняйте следующие команды одна за другой для создания БД, пользователя и импорта БД.

```mysql
CREATE DATABASE diploms DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
CREATE USER 'diploma'@'localhost' IDENTIFIED BY 'diploma';
GRANT ALL PRIVILEGES ON diploma.* TO 'diploma'@'localhost';
FLUSH PRIVILEGES;
USE diploma;
source sql/diploma_23_04_18.sql
exit;
```
Если Вы успешно выполнили команды выше, то вы установили необходимые параметры. Далее можно запускать проект, тестировать через мессенджер Телеграм, модифицировать и т.д.

Для запуска введите следующую команду:

```shell
npm start
```

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact
