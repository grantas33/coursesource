# CourseSource

### Running project
Create database named 'course_source' as user root with password 'root'
```
cd <project path>
composer install
php bin/console doctrine:migrations:migrate
yarn install
./bin/console server:start
yarn run encore dev --watch
```

### Built With

* PHP 7.2.0
* Symphony 4.0
* React v16.0

### Authors
* **Grantas Gadliauskas**
* **Matas Grišius**
