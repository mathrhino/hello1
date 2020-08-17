import { DisposableDelegate } from '@lumino/disposable';
import { ToolbarButton } from '@jupyterlab/apputils';
import { NotebookActions } from '@jupyterlab/notebook';
/**
 * The plugin registration information.
 */
const plugin = {
    activate,
    id: 'my-extension-name:buttonPlugin',
    autoStart: true
};
/**
 * A notebook widget extension that adds a button to the toolbar.
 */
export class ButtonExtension {
    /**
     * Create a new extension object.
     */
    createNew(panel, context) {
        let callback = () => {
            NotebookActions.runAll(panel.content, context.sessionContext);
        };
        let button = new ToolbarButton({
            className: 'myButton',
            iconClass: 'fa fa-fast-forward',
            onClick: callback,
            tooltip: 'Run All'
        });
        panel.toolbar.insertItem(0, 'runAll', button);
        return new DisposableDelegate(() => {
            button.dispose();
        });
    }
}
/**
 * Activate the extension.
 */
function activate(app) {
    app.docRegistry.addWidgetExtension('Notebook', new ButtonExtension());
}
;
/**
 * Export the plugin as default.
 */
export default plugin;
