// Type definitions for chai-spies 0.7.1
// Project: https://github.com/chaijs/chai-spies
// Definitions by: Will Lee-Wagner <http://whentheresawill.net/>
// Definitions: https://github.com/whenther/typed-chai-spies

import {Assertion} from '~chai/lib/Assertion';
import * as Utils from '~chai/lib/Utils';

interface InternalSpy {
  calls: any[];
  called: boolean;
  name: string;
}

interface ChaiProxy extends Function {
  (...args: any[]): any;
  /**
   * Resets __spy object parameters for instantiation and reuse
   * @returns proxy spy object
   */
  reset(): ChaiProxy;

  /**
   * The internal __spy object, that tracks calls to the spy.
   */
  __spy: InternalSpy;
}

interface ChaiSpy {
  (name: SpyName, fn: SpyFunction): ChaiProxy;
  (name: SpyName): ChaiProxy;
  (fn: SpyFunction): ChaiProxy;
  (): ChaiProxy;
  /**
   * Wraps an object method into spy. All calls will
   * pass through to the original function.
   *
   *      var spy = chai.spy.on(Array, 'isArray');
   *
   * @param {Object} object
   * @param {String} method name to spy on
   * @returns function to actually call
   * @api public
   */
  on(object: any, methodName: string): ChaiProxy;
  /**
   * Creates an object with spied methods.
   *
   *      var object = chai.spy.object('Array', [ 'push', 'pop' ]);
   *
   * @param {String} [name] object name
   * @param {String[]|Object} method names or method definitions
   * @returns object with spied methods
   * @api public
   */
  object<T>(name: string, spies: string[]): T & Object;
  object<T>(name: string, spies: T): T & Object;
  object<T>(spies: string[]): T & Object;
  object<T>(spies: T): T & Object;
  /**
   * Creates a spy which returns static value.
   *
   *      var method = chai.spy.returns(true);
   *
   * @param {*} value static value which is returned by spy
   * @returns new spy function which returns static value
   * @api public
   */
  returns(value: any): ChaiProxy;
}

interface SpyCalledWith extends Assertion {
  (...args: any[]): void;
  exactly(...args: any[]): void;
}

interface SpyCalledAlways extends Assertion {
  with: SpyCalledWith;
}

interface SpyCalledAt {
  most(n: number): void;
  least(n: number): void;
}

interface SpyCalled {
  (n?: number): void;
  /**
   * Assert that a spy has been called exactly once
   *
   * @api public
   */
  once: any;
  /**
   * Assert that a spy has been called exactly twice.
   *
   * @api public
   */
  twice: any;
  /**
   * Assert that a spy has been called exactly `n` times.
   *
   * @param {Number} n times
   * @api public
   */
  exactly(n: number): void;
  with: SpyCalledWith;
  /**
   * Assert that a spy has been called `n` or more times.
   *
   * @param {Number} n times
   * @api public
   */
  min(n: number): void;
  /**
   * Assert that a spy has been called `n` or fewer times.
   *
   * @param {Number} n times
   * @api public
   */
  max(n: number): void;
  at: SpyCalledAt;
  above(n: number): void;
  /**
   * Assert that a spy has been called more than `n` times.
   *
   * @param {Number} n times
   * @api public
   */
  gt(n: number): void;
  below(n: number): void;
  /**
   * Assert that a spy has been called less than `n` times.
   *
   * @param {Number} n times
   * @api public
   */
  lt(n: number): void;
}

type SpyName = string | number;

interface SpyFunction {
  (...args: any[]): any;
}

declare module '~chai/lib/Chai' {
  /**
   * Wraps a function in a proxy function. All calls will
   * pass through to the original function.
   *
   *      function original() {}
   *      var spy = chai.spy(original)
   *        , e_spy = chai.spy();
   *
   * @param {Function} function to spy on
   * @returns function to actually call
   * @api public
   */
  export var spy: ChaiSpy;
}

declare module '~chai/lib/Assertion' {
  export interface TypeComparison {
    /**
     * Assert the the object in question is an chai.spy
     * wrapped function by looking for internals.
     *
     *      expect(spy).to.be.spy;
     *      spy.should.be.spy;
     *
     * @api public
     */
    spy: Assertion;
  }

  export interface Assertion {
    /**
     * Assert that a spy has been called. Does not negate to allow for
     * pass through language.
     *
     * @api public
     */
    called: SpyCalled;
    always: SpyCalledAlways;
  }
}

declare function ChaiSpies(chai: any, _: Utils.Utils): void;
export = ChaiSpies;
