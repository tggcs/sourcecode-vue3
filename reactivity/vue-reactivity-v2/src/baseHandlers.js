import { TrackOpTypes, TriggerOpTypes } from './operations.js'
import { track, trigger } from "./effect.js";

const get = createGetter();
const set = createSetter();

function createGetter() {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver)
    track(target, TrackOpTypes.GET, key);
    return res
  };
}

function createSetter() {
  return function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver)
    trigger(target, TriggerOpTypes.SET, key, value);
    return result
  };
}

export const mutableHandlers = {
  get,
  set,
};
