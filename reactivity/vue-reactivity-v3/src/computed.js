import { ReactiveEffect } from "./effect.js";

export class ComputedRefImpl {
  effect;
  constructor(getter) {
    this.effect = new ReactiveEffect(getter);
  }

  get value() {
    return this.effect.run();
  }
}

export function computed(getter) {
  const cRef = new ComputedRefImpl(getter);

  return cRef;
}
