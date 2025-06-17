const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Sample In-Memory Post Data
let posts = [
  {
    id: uuidv4(),
    username: "tech_guru99",
    content: "Just finished building my first AI chatbot! Super excited to share it with you all. #AI #CodingLife"
  },
  {
    id: uuidv4(),
    username: "code_master",
    content: "Never stop learning. Every bug fixed is a step toward mastery. 💻🔥"
  },
  {
    id: uuidv4(),
    username: "creative_minds",
    content: "Art and technology together can create magic. Keep innovating! 🎨🤖"
  },
  {
    id: uuidv4(),
    username: "dev_dreamer",
    content: "Started my internship today! Looking forward to learning and growing. 🌱 #internlife"
  },
  {
    id: uuidv4(),
    username: "daily_motivate",
    content: "Success doesn't come overnight. Stay consistent, work hard, and believe in yourself. ✨"
  }
];

// Routes

// Home Route
app.get("/", (req, res) => {
  res.redirect("/posts");
});

// Show all posts
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

// Render form to create new post
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// Create a new post
app.post("/posts", (req, res) => {
  const { username, content } = req.body;
  const newPost = { id: uuidv4(), username, content };
  posts.push(newPost);
  res.redirect("/posts");
});

// Show single post
app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find(p => p.id === id);
  if (post) {
    res.render("show.ejs", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

// Render edit form
app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params;
  const post = posts.find(p => p.id === id);
  if (post) {
    res.render("edit.ejs", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

// Update post
app.patch("/posts/:id", (req, res) => {
  const { id } = req.params;
  const newContent = req.body.content;
  const post = posts.find(p => p.id === id);
  if (post) {
    post.content = newContent;
    res.redirect("/posts");
  } else {
    res.status(404).send("Post not found");
  }
});

// Delete post
app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter(p => p.id !== id);
  res.redirect("/posts");
});

// Server Start
const port = 8080;
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
