class AppBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = `<h1>Movie DataBase</h1>`;
    }
}

customElements.define('app-bar', AppBar);