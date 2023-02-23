import Storage from './storage';

export default new Storage(`__${process.env.NODE_ENV}__`, 24 * 30);
