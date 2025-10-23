/// <reference types="vite/client" />

// Declare WASM file imports with ?url suffix
declare module '*.wasm?url' {
  const content: string;
  export default content;
}