import { Response, Router } from 'express';
import { pool } from '../db';
import authorization, { CustomRequest } from '../middleware/authorization';

const router = Router();

// Building the routes for todo function
// Get all todos
router.get('/', authorization, async (req: CustomRequest, res: Response) => {
  try {
    // The reason we don't use RETURNING, cos it only works with insert, update, and delete
    // when you use the SELECT, naturally it will get the data back
    const allTodos = await pool.query(
      'SELECT * FROM todos WHERE user_id = $1',
      [req.userId]
    );

    // If you also want to return user_email back to client, you can use Join query to join both users and todos tables
    // const allTodos = await pool.query(
    //   "SELECT u.email, t.todo_id, t.description FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1",
    //   [req.userId]
    // );

    // let's reverse todo to make the latest added todo on the top of the list
    const reversedAllTodos = allTodos.rows.reverse();
    res.json(reversedAllTodos);
  } catch (Error) {
    console.log(Error);
  }
});

// Get a specific todo: seemingly no use case for this route yet
router.get('/:id', authorization, async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;
    // const todo = await pool.query(`SELECT * FROM todo WHERE todo_id=${id}`);
    const todo = await pool.query(
      'SELECT * FROM todos WHERE todo_id = ($1) AND user_id = ($2)',
      [id, req.userId]
    );
    res.json(todo.rows);
  } catch (error) {
    console.log((error as Error).message);
  }
});

// Create a todo
router.post('/', authorization, async (req: CustomRequest, res: Response) => {
  try {
    const { description } = req.body;
    // $1 is a placeholder allows me to define what it equals to, which is description retrieved from frontend
    // Don't forget the 'RETURNING *' at the end, only GET method doesn't need returning
    await pool.query(
      'INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *',
      [req.userId, description]
    );
    // res.json(newTodo);
    // res.json(newTodo.rows);

    // return the whole to_do items after creating a new todo item
    // reverse the array, always keep the new added at the front
    const updateTodo = await pool.query(
      'SELECT * FROM todos WHERE user_id = $1',
      [req.userId]
    );
    const reversedUpdateTodo = updateTodo.rows.reverse();
    res.json(reversedUpdateTodo);
  } catch (error) {
    console.log((error as Error).message);
  }
});

// Update a todo, use set
router.put('/:id', authorization, async (req: CustomRequest, res: Response) => {
  try {
    // Use id for WHERE in query
    const { id } = req.params;
    // Use description for SET in query
    const { description } = req.body;
    // We need AND in the query to make sure users only can modify their own todos
    // Don't forget the 'RETURNING *' at the end, only GET method doesn't need returning
    const updateTodo = await pool.query(
      'UPDATE todos SET description = ($1) WHERE todo_id = ($2) AND user_id = ($3) RETURNING *',
      [description, id, req.userId]
    );

    if (updateTodo.rows.length === 0) {
      return res.json('This todo is not yours.');
    }

    // return the modified todo item
    res.json(updateTodo.rows);
    // res.json('Todo was updated successfully');
  } catch (error) {
    console.log((error as Error).message);
  }
});

// Delete a todo
router.delete(
  '/:id',
  authorization,
  async (req: CustomRequest, res: Response) => {
    try {
      // Use id for WHERE in query
      const { id } = req.params;
      // Don't forget the 'RETURNING *' at the end, only GET method doesn't need returning
      const deletedTodo = await pool.query(
        'DELETE FROM todos WHERE todo_id = ($1) AND user_id = ($2) RETURNING *',
        [id, req.userId]
      );

      if (deletedTodo.rows.length === 0) {
        return res.json('You cannot delete todos that do not belong to you.');
      }

      // return the whole to_do items after deletion
      // reverse the array, always keep the new added at the front
      const updateTodo = await pool.query(
        'SELECT * FROM todos WHERE user_id = $1',
        [req.userId]
      );
      const reversedUpdateTodo = updateTodo.rows.reverse();
      res.json(reversedUpdateTodo);
    } catch (error) {
      console.log((error as Error).message);
    }
  }
);
export default router;

// Let Header component to get the use_email to show on the Navbar
