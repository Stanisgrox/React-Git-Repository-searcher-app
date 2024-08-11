# Поисковик репозиториев GitHub

Написан на ReactJS с применением SASS как CSS Modules.

Для выполнения запросов используется ReduxToolkit Query (В комментариях кода сокращен как RTKQuery).
Для взаимодействием с API GitHub использует GraphQL.

Каждый блок кода имеет свой комментарий.

### Примечание

Файл "src/services/generated.ts" сгенерирован с помощью **@graphql-codegen/cli** на основе "src/graphql/schema.graphql".
Схема содержит все поля, которые используются в GitHub. Перед production билдом следует почистить его от не нужных деклараций.

В корне приложения в файле .env указать REACT_APP_GITHUB_TOKEN = 'ТОКЕН'
