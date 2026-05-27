# Spending Tracker

Daily expense tracking via WhatsApp messages.

## How to log an expense

**Text message:**
- `spent 15 lunch`
- `expense: 42 groceries`

**Receipt image or PDF:**
- Send a receipt/screenshot with words like "spent", "expense", "belanja", "bayar"
- Hermes reads the image/PDF, extracts the amount and description automatically

## How it works

1. User sends expense message or receipt on WhatsApp
2. If image/PDF → OCR extracts amount + description
3. Appends to `spending/YYYY-MM-DD.json`
4. At 9 PM daily, cron job sends recap on WhatsApp

## File format (per day)

```json
{
  "date": "2026-05-27",
  "expenses": [
    {"amount": 15.00, "description": "lunch", "time": "12:30"},
    {"amount": 42.00, "description": "groceries from receipt", "time": "18:45"}
  ],
  "total": 57.00
}
```
