# M223 Punchclock

Folgende Schritte sind notwendig um die Applikation zu erstellen und zu starten: 
1. Stellen Sie sicher, dass OpenJDK 11 oder höher installiert und JAVA_HOME korrekt gesetzt ist.  
2. Installieren Sie (falls noch nicht vorhanden) Apache Maven 3.8.1 oder höher
3. Wechseln Sie auf der Kommandozeile in den Ordner dieser Applikation. 
`cd m223-punchclock-quarkus/`
4. Starten Sie die Applikation mit 
```shell script
./mvnw compile quarkus:dev
```

Folgende Dienste stehen während der Ausführung im Profil dev zur Verfügung:

Swagger API: http://localhost:8080/q/swagger-ui/

H2 Console: http://localhost:8080/h2/ 
Datenquelle: jdbc:h2:mem:punchclock
Benutzername: zli
Passwort: zli

Informationen von Leon Lopetrone:
Die Applikation führt zu einem Login bei dem man sich anmelden kann nachdem der quarkus gestartet wurde.
Falls man noch keinen Account hat kann man einen unter SignUp erstellen.
Nach dem erfolgreichen Anmelden kommt man auf die main.html seite auf der man seine PunchClock Daten eingeben kann
inklusive Location und Category. 
Diese Daten werden gespeichert und angezeigt.
Bei einem doppelclick auf DELETE wird der gewählte Eintrag gelöscht.
Das Editieren ist aus Zeitgründen für nur die Zeiteingaben verfügbar weshalb die Funktion noch nicht ganz funtioniert.
Beim Klicken auf Update muss der quarkus neu gestartet werden.