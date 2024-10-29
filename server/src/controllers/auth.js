import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDb } from '../database/init.js';

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const db = await getDb();

    // Check if user exists
    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({ message: '该邮箱已被注册' });
    }

    // Hash password and create user
    const hashedPassword = await hash(password, 10);
    const result = await db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    const user = {
      id: result.lastID,
      name,
      email
    };

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const db = await getDb();

    // Find user
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(401).json({ message: '邮箱或密码错误' });
    }

    // Verify password
    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: '邮箱或密码错误' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    });
  } catch (error) {
    next(error);
  }
}

export async function getProfile(req, res, next) {
  try {
    const db = await getDb();
    const user = await db.get(
      'SELECT id, name, email FROM users WHERE id = ?',
      [req.user.userId]
    );

    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
}