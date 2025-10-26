import Issue from "../models/Issue.js";

// Add issue
export const addIssue = async (req, res) => {
  try {
    const issue = new Issue(req.body);
    await issue.save();
    res.status(201).json(issue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all issues
export const getIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.status(200).json(issues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update issue
export const updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(issue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
