# Cypress Testēšanas Ceļvedis (README)

Šis README apraksta, kā uzstādīt un palaist Cypress testus projektā. Failā ir komandas, kā palaist **e2e**test

---

 Uzstādīšana (viena komanda)

> Uzmanību: paketes nosaukums ir `cypress-axe`, **nevis** `@axe-core/cypress`.

```bash
# Uzstādīt Cypress un pieejamības (a11y) spraudni
npm install --save-dev cypress cypress-axe
```
lai atvert gui 
```bash
npx cypress open
```
lai darbojas
```bash
npx cypress run --e2e
```
