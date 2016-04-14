import $ from 'jquery';
import * as actions from '../actions/ActionCreator';
import BaseComponent from '../../../utils/BaseComponent';
import {FILTER_STATUS, TODO_STATUS} from '../contents/contents';

export default class Todo extends BaseComponent {
  constructor(selector, store) {
    super(selector, store, 'todo', 'filterTodo');

    // init
    this.$input = this.$selector.find('.js-todoInput');
    this.$btnAdd = this.$selector.find('.js-todoAddBtn');

    this.$filterAll = this.$selector.find('.js-todoFilterAll');
    this.$filterActive = this.$selector.find('.js-todoFilterActive');
    this.$filterComplete = this.$selector.find('.js-todoFilterComplete');

    this.$todoList = this.$selector.find('.js−todoList');
    this.$todoListItem = this.$todoList.find('.todoList-item');

    this.$template = this.$selector.find('.js-template');
    this.$templateActive = this.$template.find('.js-todoItemActive');
    this.$templateComplete = this.$template.find('.js-todoItemComplete');

    // add event
    this.$btnAdd.on('click', ()=> {
      if(this.$input.val() === '') return;
      this.dispatch(actions.addTodo(this.$input.val()));
    });

    // filter event
    this.$filterAll.on('click', ()=> this.dispatch(actions.filterTodo(FILTER_STATUS.ALL)));
    this.$filterActive.on('click', ()=> this.dispatch(actions.filterTodo(FILTER_STATUS.ACTIVE)));
    this.$filterComplete.on('click', ()=> this.dispatch(actions.filterTodo(FILTER_STATUS.COMPLETE)));

    // todoo btn event
    this.$todoList.on('click', '.js-btnActive', (e) => this.dispatch(actions.activeTodo($(e.target).closest('.todoList-item').attr('data-id'))));
    this.$todoList.on('click', '.js-btnComplete', (e) => this.dispatch(actions.completeTodo($(e.target).closest('.todoList-item').attr('data-id'))));
    this.$todoList.on('click', '.js-btnDelete', (e) => this.dispatch(actions.deleteTodo($(e.target).closest('.todoList-item').attr('data-id'))));

    this.dispatch(actions.initialize(this.createInitData()));
  }

  createInitData() {
    let arr = [];
    this.$todoListItem.each((i, el) => {
      const $elem = $(el);
      arr.push({
        id: i,
        status: $elem.hasClass('is-complete') ? TODO_STATUS.COMPLETE : TODO_STATUS.ACTIVE,
        name: $elem.find('.todoList-item-elem').text()
      })
    });
    return arr;
  }

  filterAll() {
    this.$todoList.find('.todoList-item').show();
  }

  filterActive() {
    this.$todoList.find('.todoList-item').show();
    this.$todoList.find('.todoList-item.is-complete').hide();
  }

  filterComplete() {
    this.$todoList.find('.todoList-item').hide();
    this.$todoList.find('.todoList-item.is-complete').show();
  }

  changeActiveButton($btn) {
    this.$filterAll.removeClass('is-active');
    this.$filterActive.removeClass('is-active');
    this.$filterComplete.removeClass('is-active');
    $btn.addClass('is-active');
  }

  render() {
    // make todo list
    let result = '';
    this.state.todo.forEach((obj, i) => {
      let dom;
      dom = obj.status === TODO_STATUS.ACTIVE ? this.$templateActive : this.$templateComplete;
      dom.attr('data-id', obj.id);
      dom.find('.todoList-item-elem').text(obj.name);
      result += dom.prop('outerHTML');
    });
    this.$todoList.html(result);

    // switch filter
    switch (this.state.filterTodo) {
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

