import * as actions from '../actions/ActionCreator';
import BaseComponent from '../../../utils/BaseComponent';
import {FILTER_STATUS} from '../contents/contents';

export default class Todo extends BaseComponent {
  constructor(selector, store) {
    super(selector, store, 'addTodo', 'filterTodo');
    this.$input = this.$selector.find('.js-todoInput');
    this.$btnAdd = this.$selector.find('.js-todoAddBtn');
    this.$filterAll = this.$selector.find('.js-todoFilterAll');
    this.$filterActive = this.$selector.find('.js-todoFilterActive');
    this.$filterComplete = this.$selector.find('.js-todoFilterComplete');
    this.$todoList = this.$selector.find('.js−todoList');

    this.$filterAll.on('click', ()=> this.dispatch(actions.filterTodo(FILTER_STATUS.ALL)));
    this.$filterActive.on('click', ()=> this.dispatch(actions.filterTodo(FILTER_STATUS.ACTIVE)));
    this.$filterComplete.on('click', ()=> this.dispatch(actions.filterTodo(FILTER_STATUS.COMPLETE)));
    this.$btnAdd.on('click', ()=> this.dispatch(actions.addTodo(this.$input.val())));
  }

  filterAll(){
    this.$todoList.find('.todoList-item').show();
  }

  filterActive(){
    this.$todoList.find('.todoList-item').show();
    this.$todoList.find('.todoList-item.is-complete').hide();
  }

  filterComplete(){
    this.$todoList.find('.todoList-item').hide();
    this.$todoList.find('.todoList-item.is-complete').show();
  }

  changeActiveButton($btn){
    this.$filterAll.removeClass('is-active');
    this.$filterActive.removeClass('is-active');
    this.$filterComplete.removeClass('is-active');
    $btn.addClass('is-active');
  }

  makeTodoItem(title) {
    return `<li class="todoList-item cf"><span class="todoList-item-elem">${title}</span><span class="todoList-item-btn mod-btn mod-btn_delete js-btnDelete">delete</span><span class="todoList-item-btn mod-btn mod-btn_complete js-btnComplete">complete</span></li>`
  }

  render() {
    console.log(this.action);
    // add td
    if(this.state.addTodo !== ''){
      this.$todoList.prepend(this.makeTodoItem(this.state.addTodo));
    }

    // switch filter
    switch(this.state.filterTodo) {
      case FILTER_STATUS.ALL:
        this.filterAll();
        this.changeActiveButton(this.$filterAll);
        break;
      case FILTER_STATUS.ACTIVE:
        this.filterActive();
        this.changeActiveButton(this.$filterActive);
        break;
      case FILTER_STATUS.COMPLETE:
        this.filterComplete();
        this.changeActiveButton(this.$filterComplete);
        break;
      default:
        break;
    }
  }
}

