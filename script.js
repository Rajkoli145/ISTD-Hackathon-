// Add this helper function at the top of your script.js
function formatIndianCurrency(amount) {
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    return formatter.format(amount);
}

// Sidebar functionality
function initializeSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        menuToggle.style.opacity = '0';
        menuToggle.style.visibility = 'hidden';
    }
    
    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        setTimeout(() => {
            menuToggle.style.opacity = '1';
            menuToggle.style.visibility = 'visible';
        }, 300);
    }
    
    // Toggle menu
    menuToggle.addEventListener('click', openSidebar);
    
    // Close menu
    closeMenu.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);
    
    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });

    // Force initial state
    document.querySelector('main').style.marginLeft = '0';
    document.querySelector('.dashboard-container').style.marginLeft = '0';
}

// Initialize charts when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeSidebar();
    initializeCharts();
    initializeFormHandler();
    initializeNavigation();
    initializeReportTable();
    initializeExportButton();
    initializeDataManagement();
    initializeMetricsFilters();
    initializeTimeRangeControls();
    initializeEngagementPeriodDropdown();
    initializeButtons();
    
    // Show dashboard section by default
    document.getElementById('dashboard').classList.add('active-section');

    // Get all "Add Program" buttons
    const addProgramButtons = document.querySelectorAll('.add-program-btn');
    
    addProgramButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the data input section
            const dataInputSection = document.getElementById('data-input-section');
            
            // Scroll to the section smoothly
            dataInputSection.scrollIntoView({ behavior: 'smooth' });
            
            // Optional: Add focus to the first input field
            const firstInput = dataInputSection.querySelector('input');
            if (firstInput) {
                firstInput.focus();
            }
        });
    });
});

function initializeCharts() {
    // ROI Chart
    const roiCtx = document.getElementById('roiChart').getContext('2d');
    new Chart(roiCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Training ROI (₹)',
                data: [120000, 150000, 180000, 190000, 210000, 250000],
                borderColor: '#2ecc71',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + (value/1000) + 'K';
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'ROI: ' + formatIndianCurrency(context.raw);
                        }
                    }
                }
            }
        }
    });

    // Completion Rate Chart
    const completionCtx = document.getElementById('completionChart').getContext('2d');
    new Chart(completionCtx, {
        type: 'bar',
        data: {
            labels: ['Course A', 'Course B', 'Course C', 'Course D'],
            datasets: [{
                label: 'Completion Rate (%)',
                data: [85, 92, 78, 95],
                backgroundColor: '#3498db'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Performance Impact Chart
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    new Chart(performanceCtx, {
        type: 'radar',
        data: {
            labels: ['Productivity', 'Quality', 'Efficiency', 'Skills', 'Knowledge'],
            datasets: [{
                label: 'Before Training',
                data: [65, 59, 70, 61, 56],
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
            }, {
                label: 'After Training',
                data: [85, 80, 88, 81, 76],
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
            }]
        }
    });

    // Engagement Chart
    const engagementCtx = document.getElementById('engagementChart').getContext('2d');
    new Chart(engagementCtx, {
        type: 'doughnut',
        data: {
            labels: ['Highly Engaged', 'Moderately Engaged', 'Minimally Engaged', 'Disengaged'],
            datasets: [{
                data: [65, 20, 10, 5],
                backgroundColor: [
                    '#2ecc71',
                    '#3498db',
                    '#f1c40f',
                    '#e74c3c'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            layout: {
                padding: 20
            },
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: {
                            size: 12
                        },
                        boxWidth: 8,
                        color: '#64748b'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
                            const percentage = Math.round((value * 100) / total);
                            return `${label}: ${percentage}% (${value} learners)`;
                        }
                    }
                }
            }
        }
    });

    // Cost Breakdown Chart
    const costBreakdownCtx = document.getElementById('costBreakdownChart').getContext('2d');
    new Chart(costBreakdownCtx, {
        type: 'doughnut',
        data: {
            labels: ['Materials', 'Instructors', 'Facilities', 'Technology'],
            datasets: [{
                data: [30, 40, 15, 15],
                backgroundColor: [
                    '#60A5FA', // Lighter blue
                    '#F87171', // Lighter red
                    '#34D399', // Lighter green
                    '#FBBF24'  // Lighter yellow
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            cutout: '60%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 13
                    },
                    bodyFont: {
                        size: 12
                    },
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10
                }
            }
        }
    });

    // Skills Gap Chart
    const skillsGapCtx = document.getElementById('skillsGapChart').getContext('2d');
    new Chart(skillsGapCtx, {
        type: 'bar',
        data: {
            labels: ['Leadership', 'Technical', 'Communication', 'Problem Solving'],
            datasets: [{
                label: 'Current Level',
                data: [65, 70, 75, 68],
                backgroundColor: '#3498db'
            }, {
                label: 'Required Level',
                data: [85, 80, 85, 80],
                backgroundColor: '#e74c3c'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Satisfaction Chart
    const satisfactionCtx = document.getElementById('satisfactionChart').getContext('2d');
    new Chart(satisfactionCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Satisfaction Score',
                data: [75, 78, 80, 82, 85, 88],
                borderColor: '#2ecc71',
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Learning Progress Chart
    const learningProgressCtx = document.getElementById('learningProgressChart').getContext('2d');
    new Chart(learningProgressCtx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
            datasets: [{
                label: 'Average Quiz Scores',
                data: [72, 78, 83, 85, 89, 92],
                borderColor: '#3498db',
                tension: 0.3,
                fill: false
            }, {
                label: 'Assignment Completion',
                data: [65, 75, 80, 88, 90, 95],
                borderColor: '#2ecc71',
                tension: 0.3,
                fill: false
            }, {
                label: 'Participation Rate',
                data: [80, 82, 85, 85, 88, 92],
                borderColor: '#e74c3c',
                tension: 0.3,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Learning Progress Over Time',
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Score (%)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Training Period'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

function initializeFormHandler() {
    const form = document.getElementById('trainingDataForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            programName: document.getElementById('programName').value,
            participants: document.getElementById('participants').value,
            completionRate: document.getElementById('completionRate').value,
            cost: document.getElementById('cost').value
        };

        // Format the success message with Indian currency
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #2ecc71;
            color: white;
            padding: 1rem;
            border-radius: 4px;
            animation: slideIn 0.5s ease-out;
        `;
        successMessage.textContent = `Data submitted successfully! Cost: ${formatIndianCurrency(formData.cost)}`;
        
        document.body.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.style.animation = 'fadeOut 0.5s ease-out';
            setTimeout(() => successMessage.remove(), 500);
        }, 3000);

        form.reset();
    });
}

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('main > section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Update active states
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show/hide sections
            sections.forEach(section => {
                section.classList.add('hidden-section');
                if (section.id === targetId) {
                    section.classList.remove('hidden-section');
                    // Initialize specific tab content if needed
                    initializeTabContent(targetId);
                }
            });
        });
    });
}

function initializeTabContent(tabId) {
    switch(tabId) {
        case 'metrics':
            updateMetricsData();
            break;
        case 'reports':
            loadReportData();
            break;
        case 'data-management':
            loadProgramsData();
            break;
    }
}

function updateMetricsData() {
    // Sample metrics data
    const metricsData = {
        totalPrograms: 24,
        activeLearners: 1247,
        completionRate: 87,
        totalRoi: 167
    };

    // Update metrics display
    document.querySelectorAll('.metrics-summary .summary-metric').forEach(metric => {
        const value = metric.querySelector('.metric-value');
        const trend = metric.querySelector('.metric-trend');
        
        if (value && trend) {
            // Update with real data
            switch(metric.dataset.type) {
                case 'programs':
                    value.textContent = metricsData.totalPrograms;
                    break;
                case 'learners':
                    value.textContent = metricsData.activeLearners;
                    break;
                case 'completion':
                    value.textContent = `${metricsData.completionRate}%`;
                    break;
                case 'roi':
                    value.textContent = `${metricsData.totalRoi}%`;
                    break;
            }
        }
    });
}

function loadReportData() {
    // Sample report data
    const reportData = [
        {
            program: "Leadership Training",
            participants: 25,
            completion: "92%",
            cost: "₹15,00,000",
            roi: "180%",
            department: "Management",
            status: "Completed"
        },

        {
            program: "Technical Skills - Python",
            participants: 48,
            completion: "85%", 
            cost: "₹8,50,000",
            roi: "145%",
            department: "IT",
            status: "Active"
        },
        {
            program: "Communication Skills",
            participants: 72,
            completion: "78%",
            cost: "₹5,20,000", 
            roi: "125%",
            department: "HR",
            status: "Active"
        },
        {
            program: "Financial Analysis",
            participants: 35,
            completion: "95%",
            cost: "₹12,00,000",
            roi: "165%", 
            department: "Finance",
            status: "Completed"
        },
        {
            program: "Digital Marketing",
            participants: 42,
            completion: "88%",
            cost: "₹7,50,000",
            roi: "155%",
            department: "Marketing", 
            status: "Active"
        },
        {
            program: "Project Management",
            participants: 38,
            completion: "82%",
            cost: "₹9,80,000",
            roi: "135%",
            department: "Management",
            status: "Active"
        },
        {
            program: "Data Analytics",
            participants: 45,
            completion: "90%",
            cost: "₹11,50,000",
            roi: "175%",
            department: "IT",
            status: "Completed"
        },
        {
            program: "Team Building Workshop",
            participants: 85,
            completion: "96%",
            cost: "₹4,50,000",
            roi: "140%",
            department: "HR",
            status: "Completed"
        },
        {
            program: "Risk Management",
            participants: 32,
            completion: "87%",
            cost: "₹8,20,000",
            roi: "150%",
            department: "Finance",
            status: "Active"
        }
        // Add more sample data as needed
    ];

    const reportTableBody = document.getElementById('reportTableBody');
    if (reportTableBody) {
        reportTableBody.innerHTML = reportData.map(report => `
            <tr>
                <td>${report.program}</td>
                <td>${report.participants}</td>
                <td>${report.completion}</td>
                <td>${report.cost}</td>
                <td>${report.roi}</td>
                <td>${report.department}</td>
                <td><span class="status-badge ${report.status.toLowerCase()}">${report.status}</span></td>
            </tr>
        `).join('');
    }

    // Initialize report filters
    initializeReportFilters();
}

function initializeReportFilters() {
    const dateRange = document.getElementById('reportDateRange');
    const programFilter = document.getElementById('programFilter');
    const departmentFilter = document.getElementById('departmentFilter');

    [dateRange, programFilter, departmentFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', () => {
                // Reload report data with selected filters
                loadReportData();
            });
        }
    });

    // Initialize export functionality
    const exportBtn = document.getElementById('exportReport');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportReportData);
    }
}

function exportReportData() {
    // Implement export functionality
    console.log('Exporting report data...');
    // You could add CSV/Excel export functionality here
}

function loadProgramsData() {
    // Sample programs data
    const programsData = [
        {
            id: 1,
            name: "Advanced JavaScript",
            type: "technical",
            department: "IT",
            startDate: "2024-03-15",
            status: "active"
        },
        // Add more sample data as needed
    ];

    const programsTableBody = document.getElementById('programsTableBody');
    if (programsTableBody) {
        programsTableBody.innerHTML = programsData.map(program => `
            <tr>
                <td>${program.name}</td>
                <td>${program.type}</td>
                <td>${program.department}</td>
                <td>${program.startDate}</td>
                <td><span class="status-badge ${program.status}">${program.status}</span></td>
                <td>
                    <button onclick="editProgram(${program.id})" class="action-btn edit">Edit</button>
                    <button onclick="deleteProgram(${program.id})" class="action-btn delete">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    // Initialize search and filters
    initializeProgramFilters();
}

function initializeProgramFilters() {
    const searchInput = document.getElementById('programSearch');
    const statusFilter = document.getElementById('statusFilter');
    const typeFilter = document.getElementById('typeFilter');
    const refreshBtn = document.querySelector('.refresh-btn');
    
    // Add event listeners
    searchInput.addEventListener('input', filterPrograms);
    statusFilter.addEventListener('change', filterPrograms);
    typeFilter.addEventListener('change', filterPrograms);
    refreshBtn.addEventListener('click', refreshPrograms);
}

function filterPrograms() {
    const searchTerm = document.getElementById('programSearch').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    
    const programs = JSON.parse(localStorage.getItem('trainingPrograms')) || [];
    
    const filteredPrograms = programs.filter(program => {
        const matchesSearch = program.name.toLowerCase().includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || program.status.toLowerCase() === statusFilter;
        const matchesType = typeFilter === 'all' || program.type === typeFilter;
        
        return matchesSearch && matchesStatus && matchesType;
    });
    
    displayPrograms(filteredPrograms);
}

function refreshPrograms() {
    const refreshBtn = document.querySelector('.refresh-btn');
    const refreshIcon = refreshBtn.querySelector('svg');
    
    // Add rotation animation
    refreshIcon.style.transform = 'rotate(360deg)';
    
    // Reset filters
    document.getElementById('programSearch').value = '';
    document.getElementById('statusFilter').value = 'all';
    document.getElementById('typeFilter').value = 'all';
    
    // Refresh programs list
    const programs = JSON.parse(localStorage.getItem('trainingPrograms')) || [];
    displayPrograms(programs);
    
    // Show notification
    showNotification('Programs list refreshed', 'success');
    
    // Reset rotation after animation
    setTimeout(() => {
        refreshIcon.style.transform = '';
    }, 300);
}

function initializeMetricsFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Here you would typically update the metrics data
            // based on the selected filter
        });
    });
    
    // Initialize date range pickers
    const startDate = document.getElementById('startDateFilter');
    const endDate = document.getElementById('endDateFilter');
    
    if (startDate && endDate) {
        // Set default dates
        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        
        startDate.valueAsDate = thirtyDaysAgo;
        endDate.valueAsDate = today;
        
        [startDate, endDate].forEach(input => {
            input.addEventListener('change', () => {
                // Here you would update the metrics based on the selected date range
                console.log('Date range changed:', startDate.value, 'to', endDate.value);
            });
        });
    }
}

function initializeTimeRangeControls() {
    const performanceTimeRange = document.getElementById('performanceTimeRange');
    const viewAllBtn = document.getElementById('viewAllPrograms');

    if (performanceTimeRange) {
        performanceTimeRange.addEventListener('change', function(e) {
            const selectedRange = e.target.value;
            updateChartData(selectedRange);
        });
    }

    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            // Navigate to full programs list
            const reportsSection = document.querySelector('#reports');
            const sections = document.querySelectorAll('main > section');
            
            // Hide all sections and show reports
            sections.forEach(section => section.classList.add('hidden-section'));
            reportsSection.classList.remove('hidden-section');
            
            // Update navigation active state
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#reports') {
                    link.classList.add('active');
                }
            });

            // Optionally scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function updateChartData(timeRange) {
    // Sample data for different time ranges
    const chartData = {
        week: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            data: [120000, 135000, 140000, 138000, 142000, 145000, 150000]
        },
        month: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            data: [150000, 180000, 200000, 250000]
        },
        quarter: {
            labels: ['Jan', 'Feb', 'Mar'],
            data: [450000, 520000, 600000]
        },
        year: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            data: [1500000, 1800000, 2100000, 2500000]
        }
    };

    const selectedData = chartData[timeRange] || chartData.month;
    
    // Update the chart
    const chart = Chart.getChart('roiChart');
    if (chart) {
        chart.data.labels = selectedData.labels;
        chart.data.datasets[0].data = selectedData.data;
        chart.update();
    }

    // Show custom date range modal if custom is selected
    if (timeRange === 'custom') {
        showCustomDateRangeModal();
    }
}

function showCustomDateRangeModal() {
    const modal = document.createElement('div');
    modal.className = 'custom-date-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Select Date Range</h3>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <div class="date-inputs">
                    <div class="form-group">
                        <label for="startDate">Start Date</label>
                        <input type="date" id="startDate" required>
                    </div>
                    <div class="form-group">
                        <label for="endDate">End Date</label>
                        <input type="date" id="endDate" required>
                    </div>
                </div>
                <button class="apply-btn">Apply Range</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add modal styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .custom-date-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }

        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            width: 90%;
            max-width: 500px;
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }

        .close-btn {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #64748b;
        }

        .date-inputs {
            display: grid;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        .apply-btn {
            width: 100%;
            padding: 0.75rem;
            background: #3b82f6;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    // Add event listeners
    modal.querySelector('.close-btn').addEventListener('click', () => modal.remove());
    modal.querySelector('.apply-btn').addEventListener('click', () => {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        // Handle custom date range
        console.log('Custom date range:', startDate, 'to', endDate);
        modal.remove();
    });
}

function initializeEngagementPeriodDropdown() {
    const engagementPeriod = document.getElementById('engagementPeriod');
    if (engagementPeriod) {
        engagementPeriod.addEventListener('change', function(e) {
            const selectedPeriod = e.target.value;
            if (selectedPeriod === 'custom') {
                showCustomDateRangeModal();
            } else {
                updateEngagementDistribution(selectedPeriod);
            }
        });
    }
}

function updateEngagementDistribution(period) {
    // Here you would typically fetch new data based on the selected period
    // For now, we'll just show a notification that the period was changed
    showNotification(`Engagement data updated for ${period}`, 'success');
}

// Data Management Functionality
function initializeDataManagement() {
    const programForm = document.getElementById('programForm');
    const clearBtn = document.querySelector('.clear-btn');
    const helpBtn = document.querySelector('.help-btn');

    if (programForm) {
        programForm.addEventListener('submit', handleProgramSubmit);
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (programForm) {
                programForm.reset();
                showNotification('Form cleared successfully', 'info');
            }
        });
    }

    if (helpBtn) {
        helpBtn.addEventListener('click', () => {
            showHelpModal();
        });
    }

    // Load existing programs
    loadExistingPrograms();
}

// Handle program form submission
function handleProgramSubmit(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('newProgramName').value.trim(),
        type: document.getElementById('programType').value,
        department: document.getElementById('department').value,
        startDate: document.getElementById('startDate').value,
        duration: parseInt(document.getElementById('duration').value),
        maxParticipants: parseInt(document.getElementById('maxParticipants').value),
        programCost: parseInt(document.getElementById('programCost').value)
    };

    if (!validateProgramData(formData)) {
        return;
    }

    saveProgramData(formData);
    e.target.reset();
    showNotification('Program added successfully!', 'success');
}

// Validate program data
function validateProgramData(data) {
    if (!data.name || data.name.length < 3) {
        showNotification('Program name must be at least 3 characters long', 'error');
        return false;
    }

    if (!data.type || !data.department) {
        showNotification('Please select program type and department', 'error');
        return false;
    }

    if (!data.startDate) {
        showNotification('Please select a start date', 'error');
        return false;
    }

    if (!data.duration || data.duration < 1) {
        showNotification('Duration must be at least 1 week', 'error');
        return false;
    }

    if (!data.maxParticipants || data.maxParticipants < 1) {
        showNotification('Maximum participants must be at least 1', 'error');
        return false;
    }

    if (!data.programCost || data.programCost < 0) {
        showNotification('Program cost cannot be negative', 'error');
        return false;
    }

    return true;
}

// Save program data
function saveProgramData(data) {
    let programs = [];
    try {
        programs = JSON.parse(localStorage.getItem('trainingPrograms') || '[]');
    } catch (e) {
        console.error('Error parsing programs from localStorage:', e);
        programs = [];
    }

    const newProgram = {
        id: Date.now().toString(),
        ...data,
        status: 'scheduled',
        createdAt: new Date().toISOString()
    };

    programs.push(newProgram);
    localStorage.setItem('trainingPrograms', JSON.stringify(programs));
    loadExistingPrograms();
}

// Load existing programs
function loadExistingPrograms() {
    let programs = [];
    try {
        programs = JSON.parse(localStorage.getItem('trainingPrograms') || '[]');
    } catch (e) {
        console.error('Error loading programs:', e);
        showNotification('Error loading programs', 'error');
        return;
    }

    const container = document.querySelector('.manage-programs');
    if (!container) return;

    if (programs.length === 0) {
        container.innerHTML = `
            <div class="no-programs">
                <p>No programs found. Add your first program using the form above.</p>
            </div>
        `;
        return;
    }

    const programsList = document.createElement('div');
    programsList.className = 'programs-list';

    programs.forEach(program => {
        const programCard = createProgramCard(program);
        programsList.appendChild(programCard);
    });

    container.innerHTML = '';
    container.appendChild(programsList);
}

// Create program card
function createProgramCard(program) {
    const card = document.createElement('div');
    card.className = 'program-card';
    card.innerHTML = `
        <div class="program-header">
            <h4>${program.name}</h4>
            <span class="program-status ${program.status}">${program.status}</span>
        </div>
        <div class="program-details">
            <p><strong>Type:</strong> ${program.type}</p>
            <p><strong>Department:</strong> ${program.department}</p>
            <p><strong>Start Date:</strong> ${formatDate(program.startDate)}</p>
            <p><strong>Duration:</strong> ${program.duration} weeks</p>
            <p><strong>Capacity:</strong> ${program.maxParticipants} participants</p>
            <p><strong>Cost:</strong> ₹${program.programCost.toLocaleString('en-IN')}</p>
        </div>
        <div class="program-actions">
            <button onclick="editProgram('${program.id}')" class="edit-btn">Edit</button>
            <button onclick="deleteProgram('${program.id}')" class="delete-btn">Delete</button>
        </div>
    `;
    return card;
}

// Edit program
function editProgram(programId) {
    const programs = JSON.parse(localStorage.getItem('trainingPrograms') || '[]');
    const program = programs.find(p => p.id === programId);
    
    if (!program) {
        showNotification('Program not found', 'error');
        return;
    }

    document.getElementById('newProgramName').value = program.name;
    document.getElementById('programType').value = program.type;
    document.getElementById('department').value = program.department;
    document.getElementById('startDate').value = program.startDate;
    document.getElementById('duration').value = program.duration;
    document.getElementById('maxParticipants').value = program.maxParticipants;
    document.getElementById('programCost').value = program.programCost;

    // Store the program ID for updating
    const form = document.getElementById('programForm');
    form.dataset.editId = programId;
    
    // Change submit button text
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.innerHTML = `
        Update Program
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
        </svg>
    `;

    // Scroll to form
    form.scrollIntoView({ behavior: 'smooth' });
    showNotification('Edit mode activated', 'info');
}

// Delete program
function deleteProgram(programId) {
    if (!confirm('Are you sure you want to delete this program?')) {
        return;
    }

    let programs = JSON.parse(localStorage.getItem('trainingPrograms') || '[]');
    programs = programs.filter(p => p.id !== programId);
    
    localStorage.setItem('trainingPrograms', JSON.stringify(programs));
    loadExistingPrograms();
    showNotification('Program deleted successfully', 'success');
}

// Helper function to format dates
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Show help modal
function showHelpModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Program Management Guidelines</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <h4>Adding a New Program</h4>
                <ul>
                    <li>Program Name: Use a clear, descriptive name (minimum 3 characters)</li>
                    <li>Program Type: Select the most appropriate category</li>
                    <li>Department: Choose the primary department</li>
                    <li>Start Date: Select when the program begins</li>
                    <li>Duration: Specify the program length in weeks</li>
                    <li>Maximum Participants: Set the capacity limit</li>
                    <li>Program Cost: Enter the total cost in rupees</li>
                </ul>
                <h4>Managing Programs</h4>
                <ul>
                    <li>Edit: Update program details as needed</li>
                    <li>Delete: Remove programs that are no longer needed</li>
                    <li>Status: Programs are marked as 'scheduled' by default</li>
                </ul>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => modal.remove());

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Button Functionality
function initializeButtons() {
    // Add Program Button
    const addProgramBtn = document.querySelector('.add-program-btn');
    if (addProgramBtn) {
        addProgramBtn.addEventListener('click', () => {
            showSection('data-management');
            // Focus on the program name input
            setTimeout(() => {
                const programNameInput = document.getElementById('newProgramName');
                if (programNameInput) {
                    programNameInput.focus();
                }
            }, 100);
        });
    }

    // Navigation buttons
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            showSection(targetId);
            updateActiveNavLink(link);
        });
    });

    // View All Programs button
    const viewAllBtn = document.getElementById('viewAllPrograms');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            showSection('data-management');
            updateActiveNavLink(document.querySelector('a[href="#data-management"]'));
        });
    }

    // Refresh buttons
    const refreshBtns = document.querySelectorAll('.refresh-btn');
    refreshBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cardHeader = btn.closest('.card-header');
            const cardTitle = cardHeader.querySelector('h3').textContent;
            refreshCardData(cardTitle);
        });
    });

    // Time range selects
    const timeRangeSelects = document.querySelectorAll('.time-range-select, #engagementPeriod');
    timeRangeSelects.forEach(select => {
        select.addEventListener('change', (e) => {
            updateTimeRange(e.target.value, e.target.id);
        });
    });

    // Export buttons
    const exportBtns = document.querySelectorAll('.export-btn');
    exportBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            exportData(btn.dataset.type || 'csv');
        });
    });

    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleFilterButton(btn);
            applyFilters();
        });
    });

    // Pagination buttons
    const pageBtns = document.querySelectorAll('.page-btn');
    const prevBtn = document.querySelector('.pagination-btn.prev');
    const nextBtn = document.querySelector('.pagination-btn.next');
    
    pageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            updatePagination(btn);
        });
    });

    if (prevBtn) prevBtn.addEventListener('click', () => navigatePage('prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => navigatePage('next'));
}

// Helper Functions
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden-section');
    });
    
    // Show the selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden-section');
        // Update navigation if needed
        updateActiveNavLink(`a[href="#${sectionId}"]`);
    }
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function refreshCardData(cardTitle) {
    const timestamp = new Date().toLocaleTimeString();
    
    switch(cardTitle) {
        case 'Recent Activities':
            fetchRecentActivities();
            break;
        case 'Upcoming Programs':
            fetchUpcomingPrograms();
            break;
        case 'Training Performance Overview':
            updatePerformanceChart();
            break;
        default:
            console.log(`Refreshing ${cardTitle}`);
    }
    
    showNotification(`${cardTitle} refreshed at ${timestamp}`, 'success');
}

function updateTimeRange(range, selectId) {
    let chartToUpdate;
    let title = '';
    
    switch(selectId) {
        case 'performanceTimeRange':
            chartToUpdate = 'roiChart';
            title = 'Performance Overview';
            break;
        case 'engagementPeriod':
            chartToUpdate = 'engagementChart';
            title = 'Engagement Distribution';
            break;
        default:
            chartToUpdate = null;
    }
    
    if (chartToUpdate) {
        updateChartData(chartToUpdate, range);
        showNotification(`${title} updated to show ${range} data`, 'success');
    }
}

function toggleFilterButton(btn) {
    btn.classList.toggle('active');
}

function applyFilters() {
    const activeFilters = Array.from(document.querySelectorAll('.filter-btn.active'))
                              .map(btn => btn.dataset.filter);
    
    // Apply filters to the relevant data
    filterData(activeFilters);
}

function updatePagination(btn) {
    const pageBtns = document.querySelectorAll('.page-btn');
    pageBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Update table data based on page number
    const pageNum = parseInt(btn.textContent);
    loadTablePage(pageNum);
}

function navigatePage(direction) {
    const currentPage = document.querySelector('.page-btn.active');
    const pageNum = parseInt(currentPage.textContent);
    const totalPages = document.querySelectorAll('.page-btn').length;
    
    let newPage;
    if (direction === 'prev') {
        newPage = Math.max(1, pageNum - 1);
    } else {
        newPage = Math.min(totalPages, pageNum + 1);
    }
    
    const targetBtn = document.querySelector(`.page-btn:nth-child(${newPage})`);
    if (targetBtn) {
        updatePagination(targetBtn);
    }
}

function exportData(format = 'csv') {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `training_report_${timestamp}.${format}`;
    
    // Simulate export process
    showNotification(`Exporting data as ${format.toUpperCase()}...`, 'info');
    
    setTimeout(() => {
        showNotification(`Data exported successfully as ${filename}`, 'success');
    }, 1500);
}

// Data fetching functions
function fetchRecentActivities() {
    // Simulate API call
    setTimeout(() => {
        const activities = [
            {
                type: 'completed',
                title: 'Python Basics Workshop',
                description: 'completed with 88% success rate',
                time: 'Just now'
            },
            {
                type: 'started',
                title: 'Agile Methodology',
                description: 'started with 30 participants',
                time: '1 hour ago'
            },
            {
                type: 'updated',
                title: 'Data Science Fundamentals',
                description: 'curriculum updated',
                time: '3 hours ago'
            }
        ];
        
        updateActivityFeed(activities);
    }, 1000);
}

function fetchUpcomingPrograms() {
    // Simulate API call
    setTimeout(() => {
        const programs = [
            {
                name: 'Machine Learning Basics',
                startDate: 'Apr 5, 2024',
                status: 'scheduled'
            },
            {
                name: 'Team Building Workshop',
                startDate: 'Apr 12, 2024',
                status: 'scheduled'
            },
            {
                name: 'Cloud Computing',
                startDate: 'Apr 15, 2024',
                status: 'scheduled'
            }
        ];
        
        updateUpcomingPrograms(programs);
    }, 1000);
}

function updateActivityFeed(activities) {
    const feed = document.querySelector('.activity-feed');
    if (!feed) return;
    
    feed.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon ${activity.type}">${getActivityIcon(activity.type)}</div>
            <div class="activity-content">
                <p><strong>${activity.title}</strong> ${activity.description}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        </div>
    `).join('');
}

function updateUpcomingPrograms(programs) {
    const container = document.querySelector('.upcoming-programs');
    if (!container) return;
    
    container.innerHTML = programs.map(program => `
        <div class="program-item">
            <div class="program-info">
                <h4>${program.name}</h4>
                <p>Starts: ${program.startDate}</p>
            </div>
            <span class="program-status ${program.status}">${capitalize(program.status)}</span>
        </div>
    `).join('');
}

function getActivityIcon(type) {
    const icons = {
        completed: '✓',
        started: '▶',
        updated: '↑'
    };
    return icons[type] || '•';
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

document.querySelector('.clear-form-btn').addEventListener('click', () => {
    document.getElementById('trainingDataForm').reset();
});

// View All Programs functionality
function createViewAllModal() {
    const modal = document.createElement('div');
    modal.className = 'programs-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>All Upcoming Programs</h2>
                <button class="close-modal">×</button>
            </div>
            <div class="modal-body">
                <div class="programs-grid"></div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = () => modal.classList.remove('active');
    
    return modal;
}

function showAllPrograms() {
    let modal = document.querySelector('.programs-modal');
    if (!modal) {
        modal = createViewAllModal();
    }
    
    const programsGrid = modal.querySelector('.programs-grid');
    programsGrid.innerHTML = ''; // Clear existing content
    
    const programs = JSON.parse(localStorage.getItem('programs') || '[]');
    const currentDate = new Date();
    
    // Sort programs by start date
    const upcomingPrograms = programs
        .filter(program => new Date(program.startDate) >= currentDate)
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    
    if (upcomingPrograms.length === 0) {
        programsGrid.innerHTML = '<p class="no-programs">No upcoming programs found</p>';
        return;
    }
    
    upcomingPrograms.forEach(program => {
        const programCard = document.createElement('div');
        programCard.className = 'program-card';
        
        const startDate = new Date(program.startDate);
        const formattedDate = startDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const status = new Date(program.startDate) > new Date() ? 'Scheduled' : 'In Progress';
        const statusClass = status.toLowerCase().replace(' ', '-');
        
        programCard.innerHTML = `
            <h3>${program.name}</h3>
            <p class="program-type">${program.type}</p>
            <p class="program-date">Starts: ${formattedDate}</p>
            <p class="program-department">Department: ${program.department}</p>
            <p class="program-participants">Max Participants: ${program.maxParticipants}</p>
            <p class="program-cost">Cost: $${program.cost}</p>
            <span class="status-badge ${statusClass}">${status}</span>
        `;
        
        programsGrid.appendChild(programCard);
    });
    
    modal.classList.add('active');
}

// Add event listener to View All button
document.addEventListener('DOMContentLoaded', () => {
    const viewAllBtn = document.querySelector('.view-all-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', showAllPrograms);
    }
});