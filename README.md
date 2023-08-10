# Books

## Requierements

- node 
- npm

## Instalation

- Import database

```bash
mysql -u user -p database < db/books.sql
```
- Install project

```shell
cp .env.sample .env # add your custom environments variables
npm install
npm start
npm install --save multer 
```
## Database structure

![Database scheme](db/bddfinal.PNG)