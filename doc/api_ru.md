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

## PATCH user/profile

``` bash
/user/profile
```

Путь для изменения информации о текущего пользователя.  
**Метод**: PATCH  
**Требуется JWT**: да

## GET user/profile/:username

``` bash
/user/profile/:username
```

Путь для изменения информации о пользователе через имя пользователя.  
**Метод**: GET  
**Требуется JWT**: да

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
