const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/userModel"); // Adjust the path to your User model

// MongoDB connection string
const MONGO_URI = "mongodb://localhost:27017/cms"; // Replace with your database name

// Sample users
const users = [
  {
    firstName: "Test",
    lastName: "Test",
    email: "test@example.com",
    role: "admin",
    password: "test",
    active: true,
  },
  {
    firstName: "Test",
    lastName: "Test",
    email: "test2@example.com",
    role: "admin",
    password: "test", 
    active: true,
  }
];

// Seed function
const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing users
    await User.deleteMany({});
    console.log("Existing users removed");

    // Hash passwords and save users
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({
        ...user,
        password: hashedPassword,
      });
    }

    console.log("Users seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding users:", err);
    process.exit(1);
  }
};

// Run the seed function
seedUsers();
