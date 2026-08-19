# Call a function to Interaction

## Response Codes (For Development Purposes)

200 -> Success
400 -> Invalid data or Path
401 -> Not logged in
500 -> Error occurred

## Paths

| path            |      return       |
| :-------------- | :---------------: |
| /me             |    User Object    |
| /user/get       |    User Object    |
| /friend/get     | User Object Array |
| /friend/add     |      Success      |
| /friend/remove  |      Success      |
| /connection/add |      Success      |
