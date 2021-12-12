import { isEquals, isNull } from '../../common/helper.js';

class Storage {
  constructor() {
    this.state = localStorage;
    this.listeners = [];
  }

  get keys() {
    return Array.from({ length: this.state.length }).map((_, index) => this.state.key(index));
  }

  /**
   * 구독
   *
   * @param {*} listener
   * @returns
   */
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => !isEquals(l, listener));
    };
  }

  /**
   * 생성
   *
   * @param {*} key
   * @param {*} value
   */
  create(key, value, isNotify = true) {
    this.setState({ key, value }, isNotify);
  }

  /**
   * 읽기
   *
   * @param {*} key
   * @returns
   */
  read(key) {
    const item = this.state.getItem(key);
    return isNull(item) ? [] : JSON.parse(item);
  }

  /**
   * 반영
   *
   * @param {*} param0
   */
  setState({ key, value }, isNotify) {
    this.state.setItem(key, JSON.stringify(value));
    if (isNotify) this.listeners.forEach(listener => listener());
  }
}

export default new Storage();
