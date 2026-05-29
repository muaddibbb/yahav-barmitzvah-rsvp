# אישורי הגעה – בר מצווה

## קבצים
| קובץ | תפקיד |
|---|---|
| `index.html` | דף RSVP לאורחים (זה הלינק שיישלח בוואטסאפ) |
| `dashboard.html` | דשבורד לבעל השמחה |
| `style.css` | עיצוב |
| `config.js` | **ערוך כאן** – פרטי האירוע וסיסמה |
| `apps-script.js` | קוד לשרת Google (מדביקים ב-Google Apps Script) |

---

## הגדרה שלב-אחר-שלב

### שלב 1 – ערוך את פרטי האירוע
פתח את `config.js` ומלא:
- שם האירוע, תאריך עברי, תאריך לועזי, שעה, אולם, כתובת
- `dashboardPassword` – סיסמה לדשבורד

### שלב 2 – צור Google Sheet
1. כנס ל-[sheets.google.com](https://sheets.google.com) וצור גיליון חדש
2. העתק את ה-ID מה-URL:
   `https://docs.google.com/spreadsheets/d/**[זה-ה-ID]**/edit`
3. שמור את ה-ID לשלב הבא

### שלב 3 – הגדר Google Apps Script
1. כנס ל-[script.google.com](https://script.google.com) → **New project**
2. מחק את הקוד הקיים והדבק את כל תוכן `apps-script.js`
3. החלף `YOUR_GOOGLE_SHEET_ID_HERE` ב-ID מהשלב הקודם
4. לחץ **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. לחץ **Deploy** ואשר הרשאות
6. העתק את ה-**Web app URL**

### שלב 4 – עדכן config.js
הדבק את ה-URL בשדה `scriptUrl` בתוך `config.js`

### שלב 5 – פרוס ב-GitHub Pages
1. צור repository חדש ב-GitHub (ציבורי)
2. גרור את כל הקבצים לתוכו (חוץ מ-`apps-script.js` ו-`README.md` אם תרצה)
3. לך ל-**Settings → Pages → Branch: main → Save**
4. תקבל URL בפורמט: `https://username.github.io/repo-name/`

### שלב 6 – שלח בוואטסאפ
השתמש ב-URL שקיבלת מ-GitHub Pages:
```
🎉 אתם מוזמנים לבר המצווה של [שם]!
לאישור הגעה: https://username.github.io/repo-name/
```

---

## גישה לדשבורד
`https://username.github.io/repo-name/dashboard.html`

הסיסמה מוגדרת ב-`config.js` תחת `dashboardPassword`.
