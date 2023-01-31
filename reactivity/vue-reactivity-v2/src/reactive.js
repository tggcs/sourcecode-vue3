import { mutableHandlers } from "./baseHandlers.js";

export function reactive(target) {
  return createReactiveObject(target, mutableHandlers);
}

function createReactiveObject(target, baseHandlers) {
  return new Proxy(target, baseHandlers);
}
