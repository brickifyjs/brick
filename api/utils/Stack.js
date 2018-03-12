'use strict';

/**
 * Create a new Stack
 * @constructor
 * @param {array} stacks - Array of methods or Stack instance.
 * @param {string} methodName - The name of the method to be bound.
 * @param {string} ctx - The located context of the method.
 */
function Stack(stacks, methodName, ctx) {
  // Direct redefine the origin if passed
  if (methodName && ctx) {
    this.ctx = ctx;
    this.methodName = methodName;

    // Save the origin
    this.origin = ctx[methodName];

    // Redefine the origin method
    ctx[methodName] = this.start.bind(this);
  }

  this.next = this.next.bind(this);

  /**
   * Break the current stack and jump to next one.
   * @returns {any} - Return stack result or new stack queue result.
   * */
  this.next.break = function breakStack() {
    var stack;
    for (var i = this.currentStack, len = this.stacks.length; i < len; i++) {
      if (this.stacks[i] instanceof Stack) {
        stack = this.stacks[i];
        break;
      }
    }
    var args = Array.prototype.slice.call(arguments);

    return stack && stack.start.apply(stack, args) || args[0];
  };

  this.next.break = this.next.break.bind(this);

  /**
   * Stop all stacks.
   * @returns {any} - Return stack result.
   * */
  this.next.stop = function stopStack() {
    var args = Array.prototype.slice.call(arguments);

    return args[0];
  };

  this.next.stop = this.next.stop.bind(this);

  this.stacks = stacks;

  return this;
}

Stack.prototype.next = function nextStack() {
  var args = Array.prototype.slice.call(arguments);

  if (this.currentStack === this.stacks.length - 1) {
    return this.parentStack && this.parentStack.next.apply(this.parentStack, args) || args[0];
  }

  this.currentStack = this.currentStack + 1;

  return this.run(args);
};

/**
 * Run the stack.
 * @param {array} args - Given arguments
 * @returns {any} - Apply the current stack.
 * */
Stack.prototype.run = function runStack(args) {
  if (this.stacks[this.currentStack] instanceof Stack) {
    this.stacks[this.currentStack].parentStack = this;
    return this.stacks[this.currentStack].start.apply(this.stacks[this.currentStack], args);
  }

  args.unshift(this.next);

  return this.stacks[this.currentStack].apply(this.ctx, args);
};

/**
 * Start the stack.
 * @returns {any} - Apply the stack.
 * */
Stack.prototype.start = function startStack() {
  this.currentStack = 0;
  var args = Array.prototype.slice.call(arguments);

  return this.run(args);
};

module.exports = Stack;

