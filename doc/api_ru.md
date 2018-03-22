# API

## POST user/login или user/

``` bash
/auth/login
```

Путь для входа пользователя.
**Метод**: POST
**Требуется JWT**: нет
**Ожидаемое тело запроса**:

``` JSON
{"username": "имя пользователя",
 "password": "пароль"}
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

Пример ответа с ошибкой, при повторяющемся значении полей.

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

## PATCH user/profile

## GET profile/:username

## GET event/

## GET event/:id

## POST event/create

## POST event/sub

## POST event/unsub

## PATCH event/:id
