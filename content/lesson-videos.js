// Curated YouTube video IDs for lessons
// Format: "lesson-id": "youtube-video-id"
// Lessons without entries will show a YouTube search link based on title
// Add videos over time — the AI tutor fills the gap for lessons without video

export const LESSON_VIDEOS = {
  // Module 1: Foundations
  "1-4": "Fi3_BjVzpqk",  // Software Development Life Cycle
  "1-5": "8hly31xKli0",  // Algorithms and Logical Thinking - CS50
  "1-6": "SWRDqTx8d4k",  // Flowcharts explained
  "1-10": "sWbUDq4S6Y8", // Linux in 100 Seconds - Fireship
  "1-12": "ZtqBQ68cfJc", // Terminal commands - Traversy
  "1-14": "WPqXP_kLzpo", // VS Code setup - Fireship
  "1-15": "HkdAHXoRtos", // Git Explained in 100 Seconds
  "1-16": "e9lnsKot_SQ", // How Git Works
  "1-17": "USjZcfj8yxE", // Git commands - Programming with Mosh
  "1-18": "iv8rSLsi1xo", // GitHub Tutorial for Beginners

  // Module 2: Web Fundamentals
  "2-1": "UB1O30fR-EE",  // HTML Crash Course - Traversy
  "2-5": "1PnVor36_40",  // CSS Crash Course - Traversy
  "2-10": "W6NZfCO5SIk", // JavaScript Tutorial - Programming with Mosh
  "2-13": "hdI2bqOjy3c", // JavaScript DOM - Traversy

  // Module 3: Modern JavaScript
  "3-1": "NCwa_xi0Uuc",  // ES6 JavaScript - Net Ninja
  "3-6": "PkZNo7MFNFg",  // Async JavaScript - Traversy
  "3-10": "cuEtnrL9-H0", // Fetch API - Traversy

  // Module 4: Server-Side Development
  "4-1": "TlB_eWDSMt4",  // Node.js Tutorial - Programming with Mosh
  "4-5": "L72fhGm1tfE",  // Express.js Crash Course - Traversy
  "4-10": "fgTGADljAMg", // REST API with Node.js - Programming with Mosh

  // Module 6: Data & Databases
  "6-1": "qw--VYLpxG4",  // PostgreSQL Tutorial - freeCodeCamp
  "6-5": "7S_tz1z_5bA",  // SQL Tutorial - Programming with Mosh

  // Module 8: React Development
  "8-1": "SqcY0GlETPk",  // React Tutorial - Programming with Mosh
  "8-5": "TNhaISOUy6Q",  // React Hooks - Fireship
  "8-10": "Law7wfdg_ls", // React Router - Web Dev Simplified

  // Module 9: Authentication & Security
  "9-1": "7Q17ubqLfaM",  // JWT Authentication - Web Dev Simplified
  "9-5": "2PPSXonhIck",  // OAuth 2.0 - Java Brains

  // Module 11: Deployment
  "11-1": "3c-iBn73dDE", // Docker in 100 Seconds - Fireship
  "11-5": "gieEQFIfgYc", // Deploying Node.js apps

  // Solidity Track - Module 1: Ethereum & Cryptography
  "s1-1": "gjwr-7PgpN8", // Ethereum Explained - Finematics
  "s1-3": "M576WGiDBdQ", // Cryptography - Computerphile
  "s1-5": "kCswGz9naZg", // EVM Explained

  // Solidity Track - Module 2: Solidity Deep Dive
  "s2-1": "gyMwXuJrbJQ", // Solidity Tutorial - freeCodeCamp
  "s2-5": "M576WGiDBdQ", // Solidity by Example

  // Solidity Track - Module 3: Smart Contract Security
  "s3-1": "QSsfkmqhp1w", // Smart Contract Security - Patrick Collins
  "s3-3": "4Mm3BCyHtDY", // Reentrancy Attacks Explained

  // Solidity Track - Module 9: DeFi
  "s9-1": "cizLhxSKrAc", // DeFi Explained - Finematics
  "s9-3": "dVJzcFQvnOA", // Uniswap V3 Explained
};
