import $ from 'jquery';
import is from 'predicates';

export default class BaseComponent {
  constructor(selector, store, ...stateNames) {
    this.$selector = $(selector);
    this.state = store.getState();
    this.dispatch = store.dispatch;

    store.subscribe(() => {
      // console.log('call subscrib');

      const newState = store.getState();
      if (is.empty(stateNames)) {
        this.preRender(newState);
        return;
      }
      // console.log('0');
      // console.log(newState);

      if (!is.empty(stateNames.filter((name) => this.preRender(newState, name)))) this.render();
    });
  }

  preRender(newState, name = null) {
    if (name === null && this.state !== newState) {
      this.state = newState;
      this.render();
      return false;
    }

    if (this.state[name] !== newState[name]) {
      this.state[name] = newState[name];
      return true;
    }
    // console.log(this.state[name]);
    // console.log(newState[name]);
    // console.log(this.state[name] === newState[name]);
    return false;
  }
}
