import Task from 'data.task';

const isTask = val => val.constructor === Task;

export default isTask;
