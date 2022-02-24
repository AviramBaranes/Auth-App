import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user';

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      res.status(409).json({ message: 'User already exist' });
      return;
    }

    if (!email) {
      res.status(400).json({ message: 'email not provided' });
      return;
    }

    if (!password) {
      res.status(400).json({ message: 'password not provided' });
      return;
    }

    bcrypt.hash(password, 12, async (err, passwordHash) => {
      if (err) {
        res.status(500).json({ message: "couldn't hash the password" });
        return;
      } else if (passwordHash) {
        try {
          await User.create({
            email,
            password: passwordHash,
            name,
          });
          res.status(200).json({ message: 'user created' });
        } catch (err) {
          res.status(502).json({ message: 'error while creating the user' });
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
    return;
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = (await User.findOne({ where: { email } })) as any;

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    bcrypt.compare(password, user.password, (err, equal) => {
      if (err) {
        res.status(502).json({ message: 'error while checking user password' });
      } else if (equal) {
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1d' });
        res.status(200).json({ message: 'user logged in', token });
      } else {
        res.status(401).json({ message: 'invalid password' });
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
    return;
  }
};

export const isAuth: RequestHandler = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    res.status(401).json({ message: 'not authenticated' });
    return;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken: string | jwt.JwtPayload;
  try {
    decodedToken = jwt.verify(token, 'secret');
  } catch (err: any) {
    res
      .status(500)
      .json({ message: err.message || 'could not decode the token' });
    return;
  }

  if (!decodedToken) {
    res.status(401).json({ message: 'unauthorized' });
  } else {
    res.status(200).json({ message: 'here is your resource' });
  }
};
