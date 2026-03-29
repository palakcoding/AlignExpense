const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Helper function to render page content
async function renderPage(templatePath, data = {}) {
  const template = path.join(__dirname, 'views', templatePath);
  return await ejs.renderFile(template, data);
}
const mockData = {
  user: { name: 'John Doe', role: 'employee' },
  stats: {
    totalExpenses: 1250,
    pendingCount: 3,
    approvedCount: 8,
    rejectedCount: 1
  },
  expenses: [
    { id: 1, amount: 150, currency: 'USD', description: 'Business lunch', user: 'John Doe', date: '2024-03-15', status: 'pending', category: 'Meals' },
    { id: 2, amount: 75, currency: 'EUR', description: 'Taxi fare', user: 'John Doe', date: '2024-03-14', status: 'approved', category: 'Travel' },
    { id: 3, amount: 200, currency: 'GBP', description: 'Hotel stay', user: 'John Doe', date: '2024-03-13', status: 'approved', category: 'Accommodation' }
  ],
  pendingExpenses: [
    { id: 1, amount: 150, currency: 'USD', description: 'Business lunch', user: 'John Doe', date: '2024-03-15', status: 'pending', category: 'Meals' },
    { id: 4, amount: 300, currency: 'EUR', description: 'Conference registration', user: 'Jane Smith', date: '2024-03-16', status: 'pending', category: 'Training' },
    { id: 5, amount: 5000, currency: 'INR', description: 'Software license', user: 'Bob Wilson', date: '2024-03-17', status: 'pending', category: 'Software' }
  ],
  activities: [
    { icon: 'check-circle', message: 'Expense #123 approved', time: '2 hours ago' },
    { icon: 'plus-circle', message: 'New expense submitted by John Doe', time: '4 hours ago' },
    { icon: 'times-circle', message: 'Expense #121 rejected', time: '1 day ago' }
  ],
  flowSteps: {
    employee: { count: 15, active: true },
    manager: { count: 8, active: false },
    admin: { count: 2, active: false }
  },
  users: [
    { name: 'John Doe', email: 'john@example.com', role: 'employee', status: 'active' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'manager', status: 'active' },
    { name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'active' }
  ]
};

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'landing.ejs'));
});

app.get('/landing', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'landing.ejs'));
});

app.get('/login', (req, res) => {
  res.render('pages/login');
});

app.post('/login', (req, res) => {
  // Mock login - redirect to employee dashboard
  res.redirect('/employee/dashboard');
});

// Employee routes
app.get('/employee/dashboard', async (req, res) => {
  try {
    const body = await renderPage('pages/employee/dashboard.ejs', {
      user: { name: 'John Doe', role: 'employee' },
      currentPage: 'dashboard',
      stats: mockData.stats,
      expenses: mockData.expenses.slice(0, 3)
    });
    
    res.render('layouts/main', {
      title: 'Employee Dashboard',
      bodyClass: 'employee-dashboard',
      user: { name: 'John Doe', role: 'employee' },
      currentPage: 'dashboard',
      body
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error rendering page');
  }
});

app.get('/employee/submit', async (req, res) => {
  try {
    const body = await renderPage('pages/employee/submitExpense.ejs', {
      user: { name: 'John Doe', role: 'employee' },
      currentPage: 'submit'
    });
    
    res.render('layouts/main', {
      title: 'Submit Expense',
      bodyClass: 'submit-expense',
      user: { name: 'John Doe', role: 'employee' },
      currentPage: 'submit',
      body
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error rendering page');
  }
});

app.get('/employee/history', async (req, res) => {
  try {
    const body = await renderPage('pages/employee/history.ejs', {
      user: { name: 'John Doe', role: 'employee' },
      currentPage: 'history',
      expenses: mockData.expenses
    });
    
    res.render('layouts/main', {
      title: 'Expense History',
      bodyClass: 'expense-history',
      user: { name: 'John Doe', role: 'employee' },
      currentPage: 'history',
      body
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error rendering page');
  }
});

app.post('/expenses/add', (req, res) => {
  try {
    const { currency, amount, description, category, expense_date } = req.body;
    
    // Validate required fields
    if (!currency || !amount || !description || !category || !expense_date) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Parse amount as float
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Amount must be a valid positive number' 
      });
    }

    // Generate unique ID
    const newId = mockData.expenses.length > 0 
      ? Math.max(...mockData.expenses.map(e => e.id)) + 1 
      : 1;

    // Create new expense object
    const newExpense = {
      id: newId,
      amount: parsedAmount,
      currency: currency,
      description: description,
      user: 'John Doe', // In real app, get from session
      date: new Date(expense_date).toISOString().split('T')[0],
      status: 'pending',
      category: category,
      createdAt: new Date().toISOString(),
      receipt: req.file ? req.file.filename : null
    };

    // Add to expenses array
    mockData.expenses.push(newExpense);
    mockData.pendingExpenses.push(newExpense);

    // Update stats
    mockData.stats.totalExpenses = (mockData.stats.totalExpenses || 0) + parsedAmount;
    mockData.stats.pendingCount += 1;

    // Log for verification
    console.log('✓ Expense saved successfully:', newExpense);

    // Return success response
    res.json({ 
      success: true, 
      message: 'Expense submitted successfully!',
      expense: newExpense
    });

  } catch (error) {
    console.error('Error saving expense:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error submitting expense. Please try again.' 
    });
  }
});

// Manager routes
app.get('/manager/dashboard', async (req, res) => {
  try {
    const managerStats = {
      teamMembers: 5,
      totalTeamExpenses: 2500,
      pendingApprovals: 3,
      approvedThisMonth: 12
    };
    
    const body = await renderPage('pages/manager/dashboard.ejs', {
      user: { name: 'Jane Smith', role: 'manager' },
      currentPage: 'dashboard',
      stats: managerStats,
      activities: mockData.activities
    });
    
    res.render('layouts/main', {
      title: 'Manager Dashboard',
      bodyClass: 'manager-dashboard',
      user: { name: 'Jane Smith', role: 'manager' },
      currentPage: 'dashboard',
      body
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error rendering page');
  }
});

app.get('/manager/approvals', async (req, res) => {
  try {
    const body = await renderPage('pages/manager/approvals.ejs', {
      user: { name: 'Jane Smith', role: 'manager' },
      currentPage: 'approvals',
      pendingExpenses: mockData.pendingExpenses
    });
    
    res.render('layouts/main', {
      title: 'Pending Approvals',
      bodyClass: 'pending-approvals',
      user: { name: 'Jane Smith', role: 'manager' },
      currentPage: 'approvals',
      body
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error rendering page');
  }
});

app.post('/expenses/approve/:id', (req, res) => {
  console.log('Approved expense:', req.params.id);
  res.redirect('/manager/approvals');
});

app.post('/expenses/reject/:id', (req, res) => {
  console.log('Rejected expense:', req.params.id);
  res.redirect('/manager/approvals');
});

// Admin routes
app.get('/admin/dashboard', async (req, res) => {
  try {
    const adminStats = {
      totalUsers: 25,
      totalCompanyExpenses: 15000,
      pendingApprovals: 5,
      avgApprovalTime: '2.3 days'
    };
    
    const body = await renderPage('pages/admin/dashboard.ejs', {
      user: { name: 'Admin User', role: 'admin' },
      currentPage: 'dashboard',
      stats: adminStats,
      flowSteps: mockData.flowSteps
    });
    
    res.render('layouts/main', {
      title: 'Admin Dashboard',
      bodyClass: 'admin-dashboard',
      user: { name: 'Admin User', role: 'admin' },
      currentPage: 'dashboard',
      body
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error rendering page');
  }
});

app.get('/admin/users', async (req, res) => {
  try {
    const body = await renderPage('pages/admin/users.ejs', {
      user: { name: 'Admin User', role: 'admin' },
      currentPage: 'users',
      users: mockData.users
    });
    
    res.render('layouts/main', {
      title: 'Manage Users',
      bodyClass: 'manage-users',
      user: { name: 'Admin User', role: 'admin' },
      currentPage: 'users',
      body
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error rendering page');
  }
});

app.get('/admin/rules', async (req, res) => {
  try {
    const body = await renderPage('pages/admin/rules.ejs', {
      user: { name: 'Admin User', role: 'admin' },
      currentPage: 'rules'
    });
    
    res.render('layouts/main', {
      title: 'Approval Rules',
      bodyClass: 'approval-rules',
      user: { name: 'Admin User', role: 'admin' },
      currentPage: 'rules',
      body
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error rendering page');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`AlignExpense server running on port ${PORT}`);
});