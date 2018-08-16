import { EventEmitter } from 'events';

module.exports = class ResizeBrowserToBodyHeight extends EventEmitter {
    command(resizeOffset = this.client.api.globals.deviance.regression.resizeOffset) {
        const { api } = this.client;
        api.execute(() => ({
            width: document.body.scrollWidth, // eslint-disable-line
            height: document.body.scrollHeight + resizeOffset, // eslint-disable-line
        }), [resizeOffset], (result) => {
            const { width, height } = result.value;
            api.resizeWindow(width, height, () => {
                this.emit('complete');
            });
        });

        return this;
    }
};
