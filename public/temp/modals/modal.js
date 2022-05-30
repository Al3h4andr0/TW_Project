class Modal {
    constructor () {
        this.modalContentRoot = undefined;
    }

    load(content) {
        this.modalContentRoot.insertAdjacentHTML('beforeend',content);
    }
    showModal() {}
    hideModal() {}
    render(root, content) {
        if (!content) {
            content = {
                title: '',
                contentHtml: '',
                footer: {
                    clearAction: {
                        text: '',
                        fn: () => {}
                    },
                    submitAction: {
                        text: '',
                        fn: () => {}
                    }
                }
            };
        }

        let content = `
        <div id="modal">
            <div id="modal_shadow"></div>
            <div id="modal_content">
                <header>
                    <div>
                        <button type="button" onclick="closeModal()">
                            <i class="bi bi-x"></i>
                        </button>
                    </div>
                    <div>
                        <p>${content.title}</p>

                    </div>
                </header>
                ${content.contentHtml}
                <footer>
                    <button type="button"></button>
                </footer>
            </div>
        </div>`
        root.insertAdjacentHTML('beforeend',content);
        this.modalContentRoot = root.querySelector('#modal_content');
    }
}

const map = (new Modal());
export default map;