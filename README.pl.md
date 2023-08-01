###### <div align=center>[PL](README.pl.md)</div>

# <div align=center> "Your Pet - Backend" 🐾</div>

### <div align=center>O backendzie</div>

#### "Your Pet - Backend" to backend dla serwisu internetowego [Your Pet](https://nmarkhotsky.github.io/your-pet-project-front/), stworzonego w celu pomocy zwierzętom w znalezieniu nowych domów. Backend ten obsługuje żądania, uwierzytelnianie użytkowników oraz interakcję z bazą danych w celu zapisu i pobierania informacji o zwierzętach.

---

### <div align=center>Zastosowane technologie i biblioteki:</div>
* `Node.js`: Platforma do wykonywania kodu JavaScript po stronie serwera.
* `Express.js`: Framework internetowy do budowy aplikacji webowych.
* `MongoDB`: Baza danych dokumentowa do przechowywania informacji o zwierzętach i użytkownikach.
* `Mongoose`: Pakiet obiektowo-dokumentowy (ODM) do ułatwienia interakcji z MongoDB.
* `Passport.js`: Biblioteka do uwierzytelniania użytkowników za pomocą różnych strategii.
* `passport-google-oauth2`: Uwierzytelnianie za pomocą Google OAuth 2.0.
* `JSON Web Token (JWT)`: Standard do tworzenia tokenów dostępu użytkowników.
* `swagger-ui-express`: UI dla dokumentacji API w celu wygodnego przeglądania i testowania API.
* `bcrypt`: Haszowanie haseł w celu zapewnienia bezpieczeństwa użytkowników.
* `cloudinary`: Zarządzanie zasobami multimedialnymi w chmurze.
* `cors`: Konfiguracja polityki Same-Origin w celu bezpiecznego dostępu do zasobów serwera z przeglądarki.
* `cross-env`: Wygodne ustawianie zmiennych środowiskowych niezależnie od platformy.
* `crypto`: Funkcje kryptograficzne do zapewnienia bezpieczeństwa danych.
* `date-fns`: Narzędzia do pracy z datami i czasem w języku JavaScript.
* `dotenv`: Wczytywanie zmiennych środowiskowych z pliku .env w celu przechowywania poufnych informacji.
* `fs-extra`: Dodatkowe funkcje do pracy z systemem plików.
* `jimp`: Edycja obrazów w Node.js.
* `joi`: Walidacja danych w celu zapewnienia poprawności wprowadzanych danych.
* `morgan`: Rejestrowanie żądań HTTP jako dziennika w celu analizy aktywności serwera.
* `multer`: Obsługa formularzy i przesyłania plików na serwer.
* `multer-storage-cloudinary`: Zapisywanie plików w chmurze za pomocą Cloudinary.
* `uuid`: Generowanie unikalnych identyfikatorów w celu nadania unikalnych wartości danym.

---

### <div align=center>Struktura projektu:</div>
* `server.js`: Główny plik serwera.
* `routes/`: Katalog zawierający moduły tras dla różnych API.
* `controllers/`: Katalog zawierający kontrolery do obsługi żądań.
* `models/`: Katalog zawierający schematy i modele Mongoose.
* `middlewares/`: Katalog zawierający własne middleware.

---

### <div align=center>Dokumentacja API (Swagger)</div>
###### <div align=center>Zapoznaj się z dokumentacją API za pomocą interfejsu Swagger UI: [Swagger UI](https://mypets-backend.onrender.com/api/api-docs/).</div>

---

### <div align=center>"Your Pet" - miejsce, gdzie miłość i przyjaźń zapewniają najlepsze warunki dla wszystkich. 🐶🐱💕</div>