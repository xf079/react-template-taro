import {
  clearStorage,
  getStorageSync,
  removeStorageSync,
  setStorageSync,
  removeStorage
} from '@tarojs/taro';
import dayjs from 'dayjs';

class Storage {
  constructor(prefix: string, timer = 24) {
    this.#prefix = prefix;
    this.#timer = timer;
  }

  #prefix = '_storage';
  #timer = 24;

  getItem(key: string) {
    return new Promise((resolve) => {
      const _key = `${this.#prefix}_${key}`;
      const data = getStorageSync(_key);
      if (data) {
        if (
          data.createAt != null &&
          data.createAt + data.timer <= dayjs().unix()
        ) {
          removeStorageSync(_key);
          resolve(null);
        } else {
          resolve(data.value);
        }
      } else {
        resolve(null);
      }
    });
  }
  setItem(key, value) {
    return new Promise((resolve, reject) => {
      try {
        const data = {
          value,
          timer: this.#timer * 60 * 60 * 1000,
          createAt: dayjs().unix()
        };
        setStorageSync(`${this.#prefix}_${key}`, data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
  removeItem(key) {
    return removeStorage({ key: `${this.#prefix}_${key}` });
  }
  clear() {
    return clearStorage();
  }
}

export default Storage;
