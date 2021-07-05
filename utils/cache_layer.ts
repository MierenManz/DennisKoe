import { Err, Ok, Result } from "../deps.ts";

export class Cache<V> {
  #cache = new Map<string, V>();
  #limit = Infinity;

  constructor(cacheLimit: number) {
    this.#limit = cacheLimit;
  }

  public get(key: string): Result<V, string> {
    const r = this.#cache.get(key);
    return r ? Ok(r) : Err("Value was not found");
  }

  public set(key: string, value: V): Result<void, string> {
    if (this.#cache.size === this.#limit) {
      this.#cache.delete(this.#cache.keys().next().value);
    }

    if (this.#cache.has(key)) return Err("Value already exists");
    this.#cache.set(key, value);

    return Ok(undefined);
  }

  public has(key: string): boolean {
    return this.#cache.has(key);
  }
}
