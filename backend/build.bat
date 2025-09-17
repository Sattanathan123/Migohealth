@echo off
echo Building Spring Boot application...
javac -cp "target\classes;C:\Users\%USERNAME%\.m2\repository\org\springframework\boot\spring-boot-starter-web\3.2.0\*;C:\Users\%USERNAME%\.m2\repository\org\springframework\boot\spring-boot-starter-data-jpa\3.2.0\*;C:\Users\%USERNAME%\.m2\repository\mysql\mysql-connector-java\8.0.33\*" src\main\java\com\migohealth\*.java -d target\classes
if %errorlevel% neq 0 (
    echo Compilation failed
    exit /b 1
)
echo Copying resources...
copy src\main\resources\application.properties target\classes\
echo Creating JAR...
cd target\classes
jar -cf ..\health-record-backend-1.0.0-new.jar *
cd ..\..
echo Build complete!