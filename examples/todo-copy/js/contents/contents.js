const active = Symbol('active');
const complete = Symbol('complete');

export const TODO_STATUS = {
  ACTIVE: active,
  COMPLETE: complete
};

export const FILTER_STATUS = {
  ALL: Symbol('all'),
  ACTIVE: active,
  COMPLETE: complete
};