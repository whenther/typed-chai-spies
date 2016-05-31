// Type definitions for chai-spies 0.7.1
// Project: https://github.com/chaijs/chai-spies
// Definitions by: Will Lee-Wagner <http://whentheresawill.net/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import {Assertion} from '~chai/lib/Assertion';

interface ChaiProxy extends Function {
  reset(): ChaiProxy;
}

interface ChaiSpyObject {
  [method: string]: ChaiProxy;
}

interface ChaiSpy {
  (): ChaiProxy;
  on<T>(object: any, ...args: string[]): ChaiSpyObject;
  object(name: string, spies: string[] | { [method: string]: Function }): ChaiSpyObject;
  object(spies: string[] | { [method: string]: Function }): ChaiSpyObject;
  returns(value: any): ChaiProxy;
}

interface SpyCalledWith {
  (...args: any[]): void;
  exactly(...args: any[]): void;
}

interface SpyCalledAlways {
  with: SpyCalledWith;
}

interface SpyCalledAt {
  most(n: number): void;
  least(n: number): void;
}

interface SpyCalled {
  (): void;
  once: any;
  twice: any;
  always: SpyCalledAlways;
  exactly(n: number): void;
  with: SpyCalledWith;
  min(n: number): void;
  max(n: number): void;
  at: SpyCalledAt;
  above(n: number): void;
  gt(n: number): void;
  below(n: number): void;
  lt(n: number): void;
}

declare module '~chai/lib/Chai' {
  export function spy(): ChaiSpy;
}

declare module '~chai/lib/Assertion' {
  export interface AssertionStatic {
    called: SpyCalled;
    spy: any
  }
}
