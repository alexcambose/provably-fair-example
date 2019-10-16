customElements.define(
  'code-display',
  class extends HTMLElement {
    constructor() {
      super();

      const template = document.createElement('template');
      template.innerHTML = `
  <style>
  code {
    background-color: whitesmoke;
    max-width: 100%;
    display: block;
    overflow-y: scroll;
    padding: 10px;
  }
  </style>
  <code><slot></slot></code>
`;

      this.attachShadow({ mode: 'open' }).appendChild(
        document.importNode(template.content, true)
      );
    }
  }
);
