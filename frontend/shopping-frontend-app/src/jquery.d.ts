/// <reference types="jquery" />

declare global {
    interface JQuery {
      modal(action?: string): JQuery;
    }
  }
  
  export {};
  