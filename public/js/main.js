// Main JavaScript for AlignExpense

document.addEventListener('DOMContentLoaded', function() {
    // Page load animation
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    setTimeout(() => {
        document.body.style.transition = 'all 0.5s ease-out';
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);

    // Card hover animations
    const cards = document.querySelectorAll('.stats-card, .expense-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        });
    });

    // Button animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Sidebar item animations
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.background = '#f8fafc';
                this.style.borderLeftColor = '#4F46E5';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.background = '';
                this.style.borderLeftColor = 'transparent';
            }
        });
    });

    // Table row hover
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.background = '#f8fafc';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#EF4444';
                    isValid = false;
                } else {
                    field.style.borderColor = '#d1d5db';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Role button animations on login page
    const roleButtons = document.querySelectorAll('.role-btn');
    roleButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        });
    });

    // Initialize currency conversion if on approvals page
    if (document.getElementById('base-currency')) {
        updateCurrencyRates();
    }

// Utility functions
function showAddUserModal() {
    // Placeholder for modal functionality
    alert('Add User modal would open here');
}

function confirmDelete(id) {
    return confirm('Are you sure you want to delete this item?');
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Currency conversion functionality
let exchangeRates = {};
let baseCurrency = 'USD';
let lastUpdateTime = null;

// Currency conversion functions
async function updateCurrencyRates() {
    const baseCurrencySelect = document.getElementById('base-currency');
    if (!baseCurrencySelect) return;

    baseCurrency = baseCurrencySelect.value;
    
    try {
        // Using a free API for demo purposes (in production, use a paid service)
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        const data = await response.json();
        
        exchangeRates = data.rates;
        lastUpdateTime = new Date(data.time_last_updated * 1000);
        
        // Update timestamp
        const updateTimeElement = document.getElementById('update-time');
        if (updateTimeElement) {
            updateTimeElement.textContent = lastUpdateTime.toLocaleString();
        }
        
        // Convert all expense amounts
        updateAllConversions();
        
    } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
        // Fallback to mock rates
        exchangeRates = {
            'USD': 1,
            'EUR': 0.85,
            'GBP': 0.73,
            'INR': 74.5,
            'JPY': 110.0,
            'CAD': 1.25,
            'AUD': 1.35,
            'CHF': 0.92,
            'CNY': 6.45
        };
        updateAllConversions();
    }
}

function updateAllConversions() {
    const expenseCards = document.querySelectorAll('.expense-card');
    expenseCards.forEach(card => {
        const expenseId = card.querySelector('.expense-actions form').action.split('/').pop();
        const originalAmount = parseFloat(card.dataset.originalAmount);
        const expenseCurrency = card.dataset.currency || 'USD';
        
        convertAndDisplayAmount(expenseId, originalAmount, expenseCurrency);
    });
}

function convertAndDisplayAmount(expenseId, amount, fromCurrency) {
    const convertedElement = document.getElementById(`converted-${expenseId}`);
    if (!convertedElement) return;
    
    // If currencies are the same, no conversion needed
    if (fromCurrency === baseCurrency) {
        convertedElement.innerHTML = `
            <span class="converted-value">${formatCurrency(amount, baseCurrency)}</span>
            <small class="conversion-rate">same currency</small>
        `;
        return;
    }
    
    // Convert to base currency
    const rate = exchangeRates[fromCurrency];
    if (!rate) {
        convertedElement.innerHTML = `
            <span class="converted-value">N/A</span>
            <small class="conversion-rate">rate unavailable</small>
        `;
        return;
    }
    
    const convertedAmount = amount / rate;
    const conversionText = `${formatCurrency(convertedAmount, baseCurrency)} in ${baseCurrency}`;
    
    convertedElement.innerHTML = `
        <span class="converted-value">${conversionText}</span>
        <small class="conversion-rate">1 ${fromCurrency} = ${formatCurrency(rate, baseCurrency)}</small>
    `;
}

function formatCurrency(amount, currency) {
    const symbols = {
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'INR': '₹',
        'JPY': '¥',
        'CAD': 'C$',
        'AUD': 'A$',
        'CHF': 'Fr',
        'CNY': '¥'
    };
    
    const symbol = symbols[currency] || currency;
    return `${symbol}${amount.toFixed(2)}`;
}

// Additional utility functions
function clearForm() {
    const form = document.querySelector('.expense-form');
    if (form) {
        form.reset();
    }
}

function saveRules() {
    // Placeholder for saving rules
    alert('Rules saved successfully!');
}

function resetToDefaults() {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
        // Reset form values
        document.getElementById('manager_limit').value = '500';
        document.getElementById('admin_limit').value = '2000';
        document.getElementById('min_approval_rate').value = '85';
        
        // Reset checkboxes
        document.querySelectorAll('.processing-rules input[type="checkbox"]').forEach(cb => {
            cb.checked = true;
        });
    }
}

function viewReceipt(expenseId) {
    // Placeholder for viewing receipt
    alert(`Viewing receipt for expense #${expenseId}`);
}