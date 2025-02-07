# minecraft-rcon-dashboard
A RCON dashboard for a home minecraft server

Designed in Node.js, open on port 3000

Run the Application

Install dependencies: npm install 

Start the server: npm start

Then, open http://localhost:3000 in your browser.



minecraft-rcon-dashboard/
│
├── public/                  # Static files (CSS, JS, images)
│   └── styles.css           # Custom CSS for the dashboard
│
├── views/                   # EJS templates
│   ├── index.ejs            # Main dashboard page
│   └── login.ejs            # Login page
│
├── .env                     # Environment variables (e.g., RCON credentials)
├── .gitignore               # Files to ignore in Git
├── package.json             # Node.js dependencies and scripts
├── README.md                # Project documentation
└── server.js                # Main server file

