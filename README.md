# 💸 Smart Expense Splitter

A full-stack web application to manage and split shared expenses among friends, roommates, or teams.
It simplifies tracking who paid, who owes, and minimizes transactions for easy settlements.

---

## 🚀 Features

* 👥 Create groups and add members
* 💰 Add shared expenses
* ⚖️ Automatic equal expense splitting
* 📊 Real-time balance calculation
* 🔄 Debt simplification (who pays whom)
* 🎨 Clean UI with custom theme (#c7522a)
* 🌐 Fully deployable (Vercel / Render / Netlify)

---

## 🧠 How It Works

1. Users create a group and add members
2. Expenses are added with a payer and amount
3. The system splits the expense equally among all members
4. Net balances are calculated for each user
5. A greedy algorithm simplifies debts into minimal transactions

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js

### Database

* Supabase (PostgreSQL)

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/expense-splitter.git
cd expense-splitter
```

---

### 2️⃣ Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

### 3️⃣ Setup Backend

```bash
cd backend
npm install
node index.js
```

---

### 4️⃣ Setup Environment Variables

Create a `.env` file in backend:

```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
```

---

## 🗄️ Database Schema (Supabase)

### Groups

* id (uuid)
* name (text)

### Members

* id (uuid)
* name (text)
* group_id (uuid)

### Expenses

* id (uuid)
* group_id (uuid)
* amount (numeric)
* paid_by (text)
* balances (jsonb)

---

## 🧪 Example

**Input:**

* Swapna paid ₹2000
* Rahul paid ₹3000
* Members: 4

**Output:**

```
Kiran pays Rahul ₹1250
Santhi pays Rahul ₹500
Santhi pays Swapna ₹750
```

---

## 📈 Future Enhancements

* 🔐 Authentication (Supabase Auth)
* 📊 Spending analytics dashboard
* 🤖 AI-based expense categorization
* 🔔 Notifications & reminders
* 📱 Mobile responsiveness improvements

---

## 🌐 Deployment

* Frontend → Vercel 
* Backend → Render 
* Database → Supabase

---

## 🙌 Acknowledgements

Inspired by real-world expense sharing problems and applications like Splitwise.

---

## 👩‍💻 Author

**Vidya Jalluri**

---
