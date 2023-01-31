const targetMap = new WeakMap();
export let activeEffect;

export class ReactiveEffect {
  fn;
  constructor(fn) {
    this.fn = fn;
  }
  run() {
    console.log("run", this);
    activeEffect = this;
    return this.fn();
  }
}

export function effect(fn) {
  const _effect = new ReactiveEffect(fn);
  _effect.run();
}

export function track(target, type, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }

  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }

  trackEffects(dep);

  console.log("track", targetMap);
}

export function trackEffects(dep) {
  dep.add(activeEffect);
}

export function trigger(target, type, key, newValue) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    // never been tracked
    return;
  }

  let deps = [];
  deps.push(depsMap.get(key));

  console.log("\n trigger", deps, target, type, key, newValue);
  triggerEffects(deps[0]);
}

export function triggerEffects(dep) {
  const effects = Array.isArray(dep) ? dep : [...dep];

  for (const effect of effects) {
    triggerEffect(effect);
  }
}

function triggerEffect(effect) {
  effect.run();
}
