const express = require("express");
const router = express.Router();

// GET user todos
router.get("/", async (req, res, next) => {
	const user_id =
		req.body.userId ||
		req.query.userId ||
		req.headers["user-id"];
	const knex = req.db;

	if (!user_id) {
		return res
			.status(400)
			.json({ message: "User ID is required" });
	}

	try {
		const todos = await knex("Todo").where({ user_id });
		if (!todos) {
			return res
				.status(404)
				.json({ message: "Todo not found" });
		}
		return res.status(200).json(todos);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

// Get a specific todo by id
// for postman testing
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const knex = req.db;

	try {
		const todo = await knex("Todo").where({ id }).first();
		if (!todo) {
			return res
				.status(404)
				.json({ message: "Todo not found" });
		}
		return res.status(200).json(todo);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

// Post: create a new todo
router.post("/", async (req, res) => {
	const { description, due_date, user_id } = req.body;
	const knex = req.db;

	if (!description || !user_id) {
		return res.status(400).json({
			message: "Description and user_id are required",
		});
	}

	try {
		const [id] = await knex("Todo").insert({
			description,
			due_date,
			user_id,
		});
		if (!id) {
			return res
				.status(400)
				.json({ message: "Cannot create todo" });
		}
		return res
			.status(201)
			.json({ message: "Todo created" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

// Put: update an existing todo by id
router.put("/", async (req, res) => {
	const { id, description, due_date, completed } = req.body;
	const knex = req.db;

	try {
		const updatedTodo = await knex("Todo")
			.where({ id })
			.update({
				description,
				due_date,
				completed,
			});
		if (!updated) {
			return res
				.status(404)
				.json({ message: "Cannot update todo" });
		}
		return res.status(200).json(updatedTodo);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

// Delete: delete an existing todo by id
router.delete("/", async (req, res) => {
	const { id } = req.body;
	const knex = req.db;

	try {
		const deleted = await knex("Todo").where({ id }).del();
		if (deleted) {
			return res
				.status(404)
				.json({ message: "Cannot delete todo" });
		}
		return res
			.status(200)
			.json({ message: "Todo deleted" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

module.exports = router;