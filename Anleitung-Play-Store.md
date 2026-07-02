# „Wann war was?" in den Google Play Store bringen

Anleitung in vier Etappen. Kein Programmieren nötig, keine Installation auf Deinem PC.
Gesamtkosten: 25 $ einmalig (Google-Entwicklerkonto).

---

## Etappe 1: Spiel online stellen (GitHub Pages, kostenlos)

Der Play-Store-Baukasten (PWABuilder) braucht eine öffentliche Internetadresse Deines Spiels.

1. Konto auf **github.com** anlegen (kostenlos).
2. Oben rechts auf **+** klicken, dann **New repository**.
   Name: `wannwarwas` eingeben, **Public** wählen, **Create repository**.
3. Auf **uploading an existing file** klicken und alle Dateien und Ordner aus diesem
   Projektordner per Drag & Drop hochladen (index.html, manifest.json, sw.js,
   beide Icons, Ordner `categories` und `fonts`).
   Hinweis: Ordner müssen einzeln gezogen werden, GitHub übernimmt die Struktur.
   Unten auf **Commit changes** klicken.
4. Im Repository: **Settings → Pages**. Bei „Branch" den Eintrag `main` wählen,
   Ordner `/ (root)`, dann **Save**.
5. Nach 1 bis 2 Minuten ist das Spiel erreichbar unter:
   `https://DEINNAME.github.io/wannwarwas/`

**Test:** Adresse auf dem Handy in Chrome öffnen. Das Spiel muss laufen und Chrome
sollte „App installieren" anbieten.

---

## Etappe 2: Android-Paket bauen (PWABuilder, kostenlos)

1. **pwabuilder.com** öffnen, Deine Adresse aus Etappe 1 eingeben, **Start** klicken.
2. PWABuilder prüft Manifest und Service Worker (beides ist bereits vorbereitet).
3. **Package for Stores → Android → Generate Package**.
4. Im Dialog:
   - **Package ID**: z. B. `de.henrich.wannwarwas` (einmal gewählt, nie wieder änderbar!)
   - **App name**: Wann war was?
   - Signing key: **Create new** (PWABuilder erzeugt den Signaturschlüssel für Dich)
5. ZIP-Datei herunterladen. Sie enthält:
   - `*.aab` → diese Datei kommt später in den Play Store
   - `assetlinks.json` → siehe nächster Schritt
   - `signing.keystore` + Passwörter-Datei → **UNBEDINGT SICHERN!**
     Ohne diesen Schlüssel kannst Du nie wieder Updates veröffentlichen.
     Am besten an zwei Orten speichern (z. B. OneDrive und USB-Stick).

**Wichtig, sonst zeigt die App eine Browserleiste:**
Lade die Datei `assetlinks.json` in Dein GitHub-Repository hoch, und zwar in einen
neuen Ordner namens `.well-known` (im Repository: **Add file → Create new file**,
als Dateiname `.well-known/assetlinks.json` eintippen, Inhalt hineinkopieren).

---

## Etappe 3: Google-Play-Entwicklerkonto anlegen

1. **play.google.com/console** öffnen, mit Google-Konto anmelden.
2. Kontotyp „Ich selbst" (Privatperson) wählen, 25 $ einmalig zahlen.
3. Identitätsprüfung durchlaufen (Ausweis, dauert ggf. 1 bis 2 Tage).

**Hürde für neue Privatkonten:** Google verlangt vor der Veröffentlichung einen
geschlossenen Test mit mindestens 12 Testern über 14 Tage. Das heißt: Du brauchst
12 Personen mit Android-Handy (Familie, Freunde, Kollegen), die die App zwei Wochen
installiert haben. Wichtig: Die 12 Tester müssen die vollen 14 Tage durchgehend
angemeldet bleiben. Springt einer ab, beginnt die Frist von vorn. Also lieber
15 bis 20 Personen einladen. Erst danach kannst Du die Produktion beantragen.
(Stand Mitte 2026, geprüft. Gilt nur für Privatkonten, die nach dem 13.11.2023
erstellt wurden.)

---

## Etappe 4: App einreichen

1. In der Play Console: **App erstellen**. Name „Wann war was?", Sprache Deutsch,
   Typ „App", kostenlos.
2. Die Pflichtangaben im Dashboard abarbeiten:
   - **Datenschutzerklärung**: Pflicht. Da das Spiel keine Daten erhebt, reicht eine
     einfache Seite (kann als `datenschutz.html` mit ins GitHub-Repository).
   - **Datensicherheit**: angeben, dass keine Daten erhoben oder geteilt werden.
   - **Altersfreigabe**: Fragebogen ausfüllen (Quizspiel, unbedenklich → USK 0).
   - **Store-Eintrag**: Kurzbeschreibung, Beschreibung, App-Icon (512x512, liegt
     bereits im Projektordner), Feature-Grafik (1024x500) und mindestens
     2 Screenshots vom Handy.
3. **Testen → Geschlossener Test**: neue Version anlegen, die `.aab`-Datei
   hochladen, Tester per E-Mail-Liste einladen.
4. Nach 14 Tagen mit 12 Testern: **Produktionszugriff beantragen**, dann die App
   in **Produktion** veröffentlichen. Google prüft, meist 1 bis 3 Tage.

---

## Später: Updates

Spiel ändern → Dateien im GitHub-Repository aktualisieren → fertig.
Da die App Deine Webseite lädt, bekommen Nutzer Inhalts-Updates automatisch,
ohne dass Du eine neue Version in den Play Store hochladen musst.
Nur bei Änderungen an Icon oder App-Name ist ein neues `.aab` nötig.

## Später: iPhone

PWABuilder kann auch ein iOS-Paket erzeugen. Dafür nötig: Apple-Entwicklerkonto
(99 $/Jahr) und ein Mac oder Cloud-Build-Dienst. Empfehlung: erst Android
abschließen, Erfahrung sammeln, dann entscheiden.
