import { webcrypto } from "crypto";
import { JSDOM } from "jsdom";

Object.defineProperty(global, "window", {
  value: new JSDOM("<!doctype html><html><body></body></html>"),
});

Object.defineProperty(window, "crypto", {
  value: webcrypto,
});
