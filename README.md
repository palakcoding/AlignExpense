# AlignExpense

**AlignExpense** is a streamlined solution designed to eliminate the manual overhead, errors, and lack of transparency often found in corporate expense processes[cite: 3]. [cite_start]By utilizing automated approval sequences and OCR technology, it ensures that every claim follows a clear, logical path from submission to reimbursement[cite: 4, 37, 53].

---

## 🚀 Core Features

### 🔐 Automated Onboarding & Multi-Tenancy
* [cite_start]**Instant Environment Setup**: Upon the first login or signup, a new Company and Admin User are automatically generated[cite: 10, 11].
* [cite_start]**Localized Finance**: The system automatically sets the environment's default currency based on the selected country[cite: 11].
* [cite_start]**Role-Based Access Control (RBAC)**: Admins can seamlessly create Employees and Managers, assigning specific roles and defining reporting hierarchies[cite: 13, 14, 16].

### 💸 Smart Expense Submission
* [cite_start]**Multi-Currency Support**: Employees can submit claims in any currency, which the system handles alongside the company’s base currency[cite: 19].
* [cite_start]**OCR-Powered Entry**: Users can scan receipts; an OCR algorithm automatically extracts the amount, date, description, and vendor name to autogenerate the expense[cite: 53, 54].
* [cite_start]**History Tracking**: Employees have a dedicated view to monitor the status of their past approved or rejected claims[cite: 21].

### ⚖️ Advanced Approval Engine
* [cite_start]**Sequential Workflows**: Define multi-step approval paths (e.g., Manager → Finance → Director) where a request moves forward only after the current level approves[cite: 24, 31, 33].
* **Conditional Logic**:
    * [cite_start]**Percentage Rule**: Approve expenses if a specific majority (e.g., 60%) of approvers agree[cite: 40].
    * [cite_start]**Specific Approver Rule**: Grant auto-approval if a designated role, such as the CFO, signs off[cite: 41].
    * [cite_start]**Hybrid Rules**: Combine both logic types for complex organizational needs[cite: 42, 43].
* [cite_start]**Admin Overrides**: Administrators maintain the power to view all expenses and override approvals to prevent bottlenecks[cite: 48].

---

## 🛠️ Technical Stack & APIs

* [cite_start]**Platform**: Odoo [cite: 1]
* [cite_start]**Localization**: [RestCountries API](https://restcountries.com/v3.1/all?fields=name,currencies) for country and currency mapping[cite: 55].
* [cite_start]**Financial Accuracy**: [ExchangeRate-API](https://api.exchangerate-api.com/v4/latest/{BASE_CURRENCY}) for real-time currency conversions[cite: 55].
* [cite_start]**OCR**: Automated field extraction for amounts, dates, and descriptions[cite: 54].

---

## 👥 Roles & Permissions

| Role | Key Responsibilities |
| :--- | :--- |
| **Admin** | [cite_start]Configure approval rules, manage users, and override workflows[cite: 47, 48]. |
| **Manager** | [cite_start]Review team expenses and approve/reject with mandatory comments[cite: 49, 50]. |
| **Employee** | [cite_start]Scan receipts, submit expenses, and track reimbursement status[cite: 51, 54]. |

---
