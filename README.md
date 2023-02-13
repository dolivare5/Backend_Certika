<div style="display: flex; justify-content: space-between; align-items: center" >
    <a href="https://nestjs.com/" target="blank">
        <img src="public/img_certika.png" alt="CVCAR">
    </a>

</div>

# Rest API Prueba Certika
## Description

Este proyecto contiene la API Rest para la libreria libraystore. Esta API se conecta a la base de datos de la libreria.
## Installation

```bash
$ npm install --global yarn
$ npx yarn install
$ docker-compose -f docker-compose.yaml --env-file .env up --build -d
```


## Running the app
### Nota:
* Para ejecutar la aplicación se debe tener instalado Docker y Docker Compose.
* Antes de correr el servidor debe abrir la aplicación de docker y activar el servicio de PostgresSQL.
```bash
# development
$ npx yarn start

# watch mode
$ npx yarn start:dev

# production mode
$ npx yarn start:prod
```
