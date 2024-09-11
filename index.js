import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";


// Configure environment variables
dotenv.config();

const app = express();
app.use(express.json()); // Use middleware here

// Enables CORS
app.use(cors());

// Rate Limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Middleware to add your custom API_ID to each Req.
app.use((req, res, next) => {
  const API_ID = process.env.API_ID;
  req.API_ID = API_ID;
  console.log(`Request API_ID: ${API_ID}`);
  next();
});

// Data
let users = [
  {
    id: 1,
    first_name: "Nikita",
    last_name: "Ahire",
    gender: "F",
    mail_id: "nikitaahire@gmail.com",
    job_title: "Software Engineer",
  },
  {
    id: 2,
    first_name: "Sakshi",
    last_name: "Mane",
    gender: "F",
    mail_id: "sakshimane@gmail.com",
    job_title: "Software Engineer",
  },
  {
    id: 3,
    first_name: "Prashant",
    last_name: "Jagtap",
    gender: "M",
    mail_id: "pj@gmail.com",
    job_title: "Marketing Manager",
  },
  {
    id: 4,
    first_name: "Rajesh",
    last_name: "Kulkarni",
    gender: "M",
    mail_id: "rajesh.kulkarni@example.com",
    job_title: "Project Manager",
  },
  {
    id: 5,
    first_name: "Snehal",
    last_name: "Jadhav",
    gender: "F",
    mail_id: "snehal.jadhav@example.com",
    job_title: "Graphic Designer",
  },
  {
    id: 6,
    first_name: "Vinay",
    last_name: "Rane",
    gender: "M",
    mail_id: "vinay.rane@example.com",
    job_title: "Product Analyst",
  },
  {
    id: 7,
    first_name: "Madhuri",
    last_name: "Gore",
    gender: "F",
    mail_id: "madhuri.gore@example.com",
    job_title: "Content Writer",
  },
  {
    id: 8,
    first_name: "Rohit",
    last_name: "Naik",
    gender: "M",
    mail_id: "rohit.naik@example.com",
    job_title: "Sales Executive",
  },
  {
    id: 9,
    first_name: "Prachi",
    last_name: "Mane",
    gender: "F",
    mail_id: "prachi.mane@example.com",
    job_title: "HR Specialist",
  },
  {
    id: 10,
    first_name: "Ajay",
    last_name: "Sutar",
    gender: "M",
    mail_id: "ajay.sutar@example.com",
    job_title: "Network Engineer",
  },
  {
    id: 11,
    first_name: "Neha",
    last_name: "Gadekar",
    gender: "F",
    mail_id: "neha.gadekar@example.com",
    job_title: "Customer Support",
  },
  {
    id: 12,
    first_name: "Sanket",
    last_name: "Bhat",
    gender: "M",
    mail_id: "sanket.bhat@example.com",
    job_title: "Database Administrator",
  },
  {
    id: 13,
    first_name: "Shreya",
    last_name: "Kamble",
    gender: "F",
    mail_id: "shreya.kamble@example.com",
    job_title: "Web Developer",
  },
  {
    id: 14,
    first_name: "Aditya",
    last_name: "Jadhav",
    gender: "M",
    mail_id: "aditya.jadhav@example.com",
    job_title: "Operations Manager",
  },
  {
    id: 15,
    first_name: "Pooja",
    last_name: "Kore",
    gender: "F",
    mail_id: "pooja.kore@example.com",
    job_title: "Financial Analyst",
  },
  {
    id: 16,
    first_name: "Sandeep",
    last_name: "Pawar",
    gender: "M",
    mail_id: "sandeep.pawar@example.com",
    job_title: "Software Architect",
  },
  {
    id: 17,
    first_name: "Ritika",
    last_name: "Desai",
    gender: "F",
    mail_id: "ritika.desai@example.com",
    job_title: "Business Analyst",
  },
  {
    id: 18,
    first_name: "Ankur",
    last_name: "Chavan",
    gender: "M",
    mail_id: "ankur.chavan@example.com",
    job_title: "Legal Advisor",
  },
  {
    id: 19,
    first_name: "Simran",
    last_name: "Nikale",
    gender: "F",
    mail_id: "simran.nikale@example.com",
    job_title: "Administrative Assistant",
  },
  {
    id: 20,
    first_name: "Ravi",
    last_name: "Sawant",
    gender: "M",
    mail_id: "ravi.sawant@example.com",
    job_title: "Marketing Specialist",
  },
  {
    id: 21,
    first_name: "Isha",
    last_name: "Shinde",
    gender: "F",
    mail_id: "isha.shinde@example.com",
    job_title: "Content Strategist",
  },
  {
    id: 22,
    first_name: "Siddhi",
    last_name: "Kamble",
    gender: "F",
    mail_id: "siddhi.kamble@example.com",
    job_title: "Product Manager",
  },
];

// GET - Retrieve all users with pagination
app.get("/users", (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  // Convert to number
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  // Pagination logic
  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = pageNumber * limitNumber;

  const resultUsers = users.slice(startIndex, endIndex);

  res.json({
    page: pageNumber,
    limit: limitNumber,
    totalUsers: users.length,
    users: resultUsers,
  });
});

// GET - Retrieve a single user by ID
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user)
    return res
      .status(404)
      .json({ message: "User not found", API_ID: req.API_ID });
  res.json({user});
});

// POST - Create a new user
app.post("/users", (req, res) => {
  console.log("Received new user data:", req.body); // Log the incoming user data
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json({newUser});
});

// PUT - Update an existing user
app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user)
    return res
      .status(404)
      .json({ message: "User not found", API_ID: req.API_ID });

  user.first_name = req.body.first_name;
  user.last_name = req.body.last_name;
  user.gender = req.body.gender;
  user.mail_id = req.body.mail_id;
  user.job_title = req.body.job_title;
  res.json({user});
});

// PATCH - Update specific fields of a user
app.patch("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user)
    return res
      .status(404)
      .json({ message: "User not found", API_ID: req.API_ID });

  if (req.body.first_name) user.first_name = req.body.first_name;
  if (req.body.last_name) user.last_name = req.body.last_name;
  if (req.body.gender) user.gender = req.body.gender;
  if (req.body.mail_id) user.mail_id = req.body.mail_id;
  if (req.body.job_title) user.job_title = req.body.job_title;
  res.json({user});
});

// DELETE - Remove a user by ID
app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1)
    return res
      .status(404)
      .json({ message: "User not found", API_ID: req.API_ID });

  users.splice(userIndex, 1);
  res.status(204).json({ message: "User deleted"});
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
