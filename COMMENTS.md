# Dokumentace k projektu

## 1. Knihovny
Pro demonstraci aplikace, jsem implementoval routing pomocí knihovny react-router-dom.

Statemanagment je v tomto projektu řešený pomocí knihovny jotai.

API - tanstackquery, použítí v `src/api/hooks`.

Formuláře - react hook form + zod na validace, použítí v `src/components/form`.

Emaily - react-email, pro preview command - `npm run email:dev`.

## 2. Stránky

### 2.1. Homepage
- Titulek, popis a video s tématikou eventu
- CTA na stránku s eventy

### 2.2. Event
- Karty s eventy, které se načítají z API (pouze 1 karta)
- Loading komponenta karet
- Po kliknutí na kartu se zobrazí detail eventu

### 2.3. Event Detail
- Detail eventu s obrázkem, popisem, datem a mapou sedadel z API
- Lístky po kliknutí na sedadlo můžeme přidat do košíku, pokud je již v košíku, můžeme odebrat.
- Po kliknutí na checkout se zobrazí modal, kde můžeme mazat položky z košíku
- Po kliknutí na tlačítko POKRAČOVAT uvnitř modalu se zobrazí stránka CHECKOUT

### 2.4. Checkout
- Pokud je uživatel přihlášený, zobrazí se jeho jméno a email.
- Pokud není přihlášený, zobrazí se formulář pro vyplnění údajů.
- Po kliknutí na tlačítko checkout se provede objednávka a zobrazí se výsledek.
- Po úspěšné objednávce se zobrazí Děkujeme..., s tlačítky návrat na homepage a další tlačítko složí k preview emailu.
- Emaily se bohužel nepodařily udělat, kvůli potřebné serverside implementaci. Tak jsem aspoň udělal preview. Pro emaily jsem použil knihovnu `React Email`.

### 2.5 404
- Stránka 404, se zobrazí pokud je zadána chybná URL.