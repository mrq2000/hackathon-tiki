import { getCurrentTaskDate } from './../../helpers/date';
import { getRepository } from 'typeorm';

import UserQuestion from '../../entities/UserQuestion';
import User from '../../entities/User';

export const getProfile = async (user) => {
  const userQuestionRepository = getRepository(UserQuestion);
  const tasks = await userQuestionRepository.createQueryBuilder('user_question').where('user_id', user.id).getMany();

  const formatTasks = {};
  const currentTaskDate = getCurrentTaskDate();
  let heart = 4;

  tasks.forEach((task) => {
    const data = JSON.parse(task.data);
    formatTasks[`${task.date}`] = data.taskFinish;
    if (task.date == currentTaskDate) {
      heart = data.heart;
    }
  });

  return {
    user,
    tasks: formatTasks,
    heart,
  };
};

export const getAllProfileByRank = async () => {
  const users = getRepository(User).createQueryBuilder('user').orderBy('exp', 'DESC').getMany();
  return users;
};
