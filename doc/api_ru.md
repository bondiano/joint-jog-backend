# API

## POST user/login или user/

``` bash
/user/login
```

Путь для входа пользователя.

**Метод**: POST  
**Требуется JWT**: нет  
**Ожидаемое тело запроса**:

``` JSON
{
    "username": "имя пользователя",
    "password": "пароль"
 }
```

### Успешный ответ

``` JSON
{
    "success": true,
    "payload": {
        "user": {
            "id": "ID пользователя",
            "username": "имя пользователя"
        },
        "token": "токен (строка)"
    }
}
```

### Ответы с ошибкой

Ошибка ***login_error***: неверные имя пользователя или пароль.

``` JSON
{
    "success": false,
    "error": "login_error",
    "payload": {
        "message": "Incorrect username or password.",
        "user": false
    }
}
```

## POST user/register

``` bash
/user/register
```

Путь для входа пользователя.  
**Метод**: POST  
**Требуется JWT**: нет  
**Ожидаемое тело запроса**:

``` JSON
{
    "username": "имя пользователя",
    "email": "адрес электронной почты",
    "password": "пароль"
}
```

### Успешный ответ

``` JSON
{
    "success": true,
    "payload": {
        "message": "Successful created new user"
    }
}
```

### Ответы с ошибкой

Пример ответа с ошибкой, при повторяющемся значении полей `username` и `email`.

``` JSON
{
    "success": false,
    "error": "unprocessable_entity",
    "payload": [
        {
            "errorOnField": "username",
            "message": "Error, expected `username` to be unique. Value: `b****k`"
        },
        {
            "errorOnField": "email",
            "message": "Error, expected `email` to be unique. Value: `u****7@mail.ru`"
        }
    ]
}
```

Пример ответа с ошибкой, при отсутсвии поля email в запросе:

``` JSON
{
    "success": false,
    "error": "unprocessable_entity",
    "payload": [
        {
            "errorOnField": "email",
            "message": "Please pass email"
        }
    ]
}
```

## GET user/profile

``` bash
/user/profile
```

Путь для получения информации о текущем пользователе.  
**Метод**: GET  
**Требуется JWT**: да

### Успешный ответ

``` JSON
{
    "success": true,
    "payload": {
        "id": "ID пользователя",
        "username": "имя пользователя",
        "email": "u***7@mail.ru",
        "subscribed": [
            "ID пробежки",
            "ID пробежки",
            "ID пробежки",
            "ID пробежки"
        ],
        "sex": "male"
    }
}
```

## PATCH user/profile

``` bash
/user/profile
```

Путь для изменения информации о текущего пользователя.  
**Метод**: PATCH  
**Требуется JWT**: да  
**Ожидаемое тело запроса**:  
***Указанны все доступные поля на текущий (f641d20ae0a6cc9c19c2c98fd9d9ebbef0dc219c) коммит.***

``` JSON
{
    "username": "имя пользователя",
    "email": "адрес электронной почты",
    "password": "пароль",
    "check_password": "поле требуемое при смене пароля",
    "socialNetworks": [{"type": "название соц-сети(vk/facebook/twitter)", "url": "ссылка на страницу пользователя"}],
    "firstName": "настоящее имя пользователя",
    "lastName": "фамилия пользователя",
    "age": "возраст пользователя(должен быть >11 лет)",
    "sex": "пол (male, female)"
}
```

### Успешный ответ

``` JSON
{
    "success": true,
    "payload": {
        "message": "Successful edit profile"
    }
}
```

## GET user/profile/:username

``` bash
/user/profile/:username
```

Путь для изменения информации о пользователе через имя пользователя.  
**Метод**: GET  
**Требуется JWT**: да

### Успешный ответ

``` JSON
{
    "success": true,
    "payload": {
        "socialNetworks": [],
        "subscribed": [],
        "_id": "ID пользователя",
        "username": "имя пользователя",
        "createdAt": "2018-03-21T12:43:02.505Z",
        "updatedAt": "2018-03-21T12:43:02.505Z",
        "__v": 0
    }
}
```

## GET event/

``` bash
/event/
```

Путь для получения всех активных пробежек.  
**Метод**: GET  
**Требуется JWT**: нет

## GET event/:id

``` bash
/event/:id
```

Путь для получения пробежки по `id`.  
**Метод**: GET  
**Требуется JWT**: нет

## POST event/create

``` bash
/event/create
```

Путь для получения пробежки по `id`.  
**Метод**: POST  
**Требуется JWT**: да

## POST event/sub

``` bash
/event/sub
```

Подписать текущего пользователя на пробежку.  
**Метод**: POST  
**Требуется JWT**: да

## POST event/unsub

``` bash
/event/unsub
```

Отписать текущего пользователя от пробежки.  
**Метод**: POST  
**Требуется JWT**: да

## PATCH event/:id

``` bash
/event/unsub
```

Изменить информацию о пробежке(доступно только для создателя).  
**Метод**: PATCH  
**Требуется JWT**: да


## JWT

Для путей, где требуется ***JWT(JSON Web Token)*** , в header'е запроса требуется поле: `Authorization: Bearer ` и токен пользователя, который он должен получить при входе (`/user/login`).

## Ошибка server_error

В случае не найденного пользователя, события(пробежки) и пр, возможна ошибка ***server_error 404***

### Ответ

``` JSON
{
    "success": false,
    "error": "server_error"
}
```