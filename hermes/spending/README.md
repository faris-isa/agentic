# Spending Tracker

Daily expense tracking via WhatsApp messages.

## How to log an expense

Send Hermes a message in this format:
- `spent 15 lunch`
- `expense: 42 groceries`
- `coffee 5.50`
- `uber 23 airport`

## How it works

1. User sends expense message on WhatsApp
2. Hermes parses amount + description
3. Appends to `spending/YYYY-MM-DD.json`
4. At 9 PM daily, cron job sends recap on WhatsApp

## File format (per day)

```json
{
  "date": "2026-05-27",
  "expenses": [
    {"amount": 15.00, "description": "lunch", "time": "12:30"},
    {"amount": 42.00, "description": "groceries", "time": "18:45"}
  ],
  "total": 57.00
}
```
