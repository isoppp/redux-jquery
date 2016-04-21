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

    this.$filterWrapper = this.$selector.find('.js-todoFilter');
    this.$filterAll = this.$filterWrapper.find('.js-todoFilterAll');
    this.$filterActive = this.$filterWrapper.find('.js-todoFilterActive');
    this.$filterComplete = this.$filterWrapper.find('.js-todoFilterComplete');

    this.$todoList = this.$selector.find('.js−todoList');
    this.$todoListItem = this.$todoList.find('.todoList-item');

    this.$template = this.$selector.find('.js-template');
    this.$templateActive = this.$template.find('.js-todoItemActive');
    this.$templateComplete = this.$template.find('.js-todoItemComplete');

    // add event
    this.$btnAdd.on('click', () => {
      if (this.$input.val() === '') return;
      this.dispatch(actions.addTodo(this.$input.val()));
    });

    // filter event
    this.$filterAll.on('click', () => this.dispatch(actions.filterTodo(FILTER_STATUS.ALL)));
    this.$filterActive.on('click', () => this.dispatch(actions.filterTodo(FILTER_STATUS.ACTIVE)));
    this.$filterComplete.on('click', () => this.dispatch(actions.filterTodo(FILTER_STATUS.COMPLETE)));

    // todoo btn event
    this.$todoList.on('click', '.js-btnActive', (e) => this.dispatch(actions.activeTodo($(e.target).closest('.todoList-item').attr('data-id'))));
    this.$todoList.on('click', '.js-btnComplete', (e) => this.dispatch(actions.completeTodo($(e.target).closest('.todoList-item').attr('data-id'))));
    this.$todoList.on('click', '.js-btnDelete', (e) => this.dispatch(actions.deleteTodo($(e.target).closest('.todoList-item').attr('data-id'))));

    this.dispatch(actions.initialize(this.$todoListItem));
  }

  changeActiveButton($btn) {
    this.$filterWrapper.find('.is-active').removeClass('is-active');
    $btn.addClass('is-active');
  }

  render() {
    this.$todoList.html(this.state.todo.map((todo) => {
      if (this.state.filterTodo !== FILTER_STATUS.ALL && todo.status !== this.state.filterTodo) return;
      const dom = todo.status === TODO_STATUS.ACTIVE ? this.$templateActive.clone() : this.$templateComplete.clone();
      dom.attr('data-id', todo.id);
      dom.find('.todoList-item-elem').text(todo.name);
      return dom;
    }));

    // switch filter
    switch (this.state.filterTodo) {
      case FILTER_STATUS.ALL:
        this.changeActiveButton(this.$filterAll);
        break;
      case FILTER_STATUS.ACTIVE:
        this.changeActiveButton(this.$filterActive);
        break;
      case FILTER_STATUS.COMPLETE:
        this.changeActiveButton(this.$filterComplete);
        break;
      default:
        break;
    }
  }
}

