import express from 'express';
import authRoutes from './routes/auth';
import sequelize from './config/database';

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});