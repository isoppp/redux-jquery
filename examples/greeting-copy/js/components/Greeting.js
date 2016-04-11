import * as actions from '../actions/ActionCreator';
import BaseComponent from '../../../utils/BaseComponent';

export default class Greeting extends BaseComponent {
  constructor(selector,store){
    super(selector, store, 'result');
    this.$result = this.$selector.find('.js-greeting');
    this.$input = this.$selector.find('input[name=name]');
    this.$selector.find('.submit').on('click',(e)=>{
      e.preventDefault();
      this.dispatch(actions.updateName(this.$input.val()));
    });
  }

  //更新？
  render(){
    this.$result.text(`Hello ${this.state.result}`);
  }
}