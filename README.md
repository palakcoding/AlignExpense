# AlignExpense - Smart Expense Reimbursement System

A modern, professional SaaS UI for expense management built with Node.js, Express, and EJS.

## Features

- **Role-based Dashboards**: Separate interfaces for Employees, Managers, and Admins
- **Modern UI Design**: Clean, layered backgrounds with subtle gradients and depth
- **Responsive Layout**: Works on desktop and mobile devices
- **Approval Flow Visualization**: Visual stepper showing expense approval process
- **Modular Architecture**: Reusable EJS partials and components

## Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: EJS templates (no React)
- **Styling**: Custom CSS with modern design system
- **Icons**: Font Awesome
- **Fonts**: Inter (Google Fonts)

## Project Structure

```
AlignExpense/
├── views/
│   ├── layouts/
│   │   └── main.ejs          # Main layout with navbar/sidebar
│   ├── partials/
│   │   ├── navbar.ejs        # Top navigation bar
│   │   ├── sidebar.ejs       # Side navigation menu
│   │   ├── statsCard.ejs     # Reusable stats card component
│   │   ├── expenseCard.ejs   # Reusable expense card component
│   │   └── footer.ejs        # Footer component
│   └── pages/
│       ├── login.ejs         # Login page with role selection
│       ├── employee/
│       │   ├── dashboard.ejs # Employee dashboard
│       │   ├── submitExpense.ejs # Submit new expense form
│       │   └── history.ejs   # Expense history table
│       ├── manager/
│       │   ├── dashboard.ejs # Manager dashboard
│       │   └── approvals.ejs # Pending approvals list
│       └── admin/
│           ├── dashboard.ejs # Admin dashboard
│           ├── users.ejs     # User management
│           └── rules.ejs     # Approval rules configuration
├── public/
│   ├── css/
│   │   └── styles.css        # Main stylesheet
│   └── js/
│       └── main.js           # Client-side JavaScript
├── index.js                  # Express server
└── package.json              # Dependencies and scripts
```

## Design System

### Color Palette
- **Primary**: #4F46E5 (Indigo)
- **Secondary**: #0EA5E9 (Blue)
- **Accent**: #9333EA (Purple)
- **Success**: #22C55E (Green)
- **Danger**: #EF4444 (Red)
- **Background**: Layered light gray with subtle gradients

### Typography
- **Font Family**: Inter (sans-serif)
- **Hierarchy**: Bold headings, clean body text

### Components
- **Cards**: Rounded corners (12px), soft shadows, hover animations
- **Buttons**: Consistent styling with hover effects
- **Tables**: Clean rows with hover highlights
- **Forms**: Modern input styling with focus states

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/palakcoding/AlignExpense.git
   cd AlignExpense
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## Usage

### Navigation Flow

1. **Login Page** (`/login`)
   - Enter credentials or select role directly
   - Redirects based on selected role

2. **Employee Flow**
   - Dashboard: View personal expenses and stats
   - Submit Expense: Create new expense requests
   - History: Track approval status

3. **Manager Flow**
   - Dashboard: Team overview and recent activity
   - Approvals: Review and approve/reject expenses

4. **Admin Flow**
   - Dashboard: Company-wide statistics and approval flow
   - Users: Manage user accounts
   - Rules: Configure approval workflows

### Key Features

- **Visual Approval Flow**: Step-by-step indicator showing Employee → Manager → Admin process
- **Responsive Design**: Adapts to different screen sizes
- **Smooth Animations**: Subtle transitions and hover effects
- **Professional UI**: Enterprise-grade design with depth and polish

## API Endpoints

- `GET /login` - Login page
- `POST /login` - Process login
- `GET /employee/dashboard` - Employee dashboard
- `GET /employee/submit` - Submit expense form
- `GET /employee/history` - Expense history
- `POST /expenses/add` - Create new expense
- `GET /manager/dashboard` - Manager dashboard
- `GET /manager/approvals` - Pending approvals
- `POST /expenses/approve/:id` - Approve expense
- `POST /expenses/reject/:id` - Reject expense
- `GET /admin/dashboard` - Admin dashboard
- `GET /admin/users` - User management
- `GET /admin/rules` - Approval rules

## Development

### Adding New Features

1. **Create EJS templates** in appropriate `views/pages/` subdirectories
2. **Add routes** in `index.js` with proper data injection
3. **Style components** in `public/css/styles.css`
4. **Add interactions** in `public/js/main.js`

### Customization

- **Colors**: Modify CSS custom properties in `styles.css`
- **Layout**: Adjust grid systems and spacing
- **Components**: Extend existing partials or create new ones

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC License - see LICENSE file for details

## Demo

The application includes mock data for demonstration purposes. All functionality is client-side rendered with sample data to showcase the UI design and user experience.