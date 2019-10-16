customElements.define(
  'fieldset-element',
  class Fieldset extends HTMLElement {
    constructor() {
      super();
      const template = document.createElement('template');
      template.innerHTML = `
            <style>
            legend {
                text-align: center;
                padding: 0 10px;
            }
            fieldset {
                border: 2px solid lightgray;
                min-width: 0;
                width: 100%;
                padding: 4px;
            }
            </style>
            <fieldset>
            <legend><slot name="title"></slot></legend>
            <slot></slot>
            </fieldset>
        `;
      const root = this.attachShadow({ mode: 'open' });
      root.appendChild(template.content.cloneNode(true));
    }
  }
);
