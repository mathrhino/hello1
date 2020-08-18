const KEY = 'run_all_buttons';
const PLUGIN_NAME = `@wallneradam/${KEY}`;

import { IDisposable, DisposableDelegate } from '@lumino/disposable';
import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application';
import { NotebookPanel, INotebookModel, NotebookActions } from '@jupyterlab/notebook';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import { ToolbarButton, sessionContextDialogs } from '@jupyterlab/apputils';


/**
 * Notebook panel extension
 */
class RunAllButtons implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
    createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
        // Callback of btnRunAll
        let cbRunAll = () => {
            NotebookActions.runAll(panel.content, context.sessionContext);
        }

        // Callback of btnRestartRunAll
        let cbRestartRunAll = () => {
            sessionContextDialogs.restart(panel.sessionContext).then((restarted) => {
                if (restarted) NotebookActions.runAll(panel.content, context.sessionContext);
            });
        }
	let cbInsertBelow =() =>{
	    NotebookActions.insertBelow(panel.content); 	
	}

        // Create a toolbar button
        let btnRunAll = new ToolbarButton({
            className: 'btnRunAll',
            iconClass: 'wll-RunAllIcon',
            onClick: cbRunAll,
            tooltip: 'Run All Cells'
        });

        // Create a toolbar button
        let btnRestartRunAll = new ToolbarButton({
            className: 'btnRunAll',
            iconClass: 'wll-RestartRunAllIcon',
            onClick: cbRestartRunAll,
            tooltip: 'Restart Kernel and Run All Cells'
        });
	
	let btnInsertBelow = new ToolbarButton({
	    className: 'btnRunAll',
	    iconClass: 'wll-InsertBelow',
	    onClick: cbInsertBelow,
	    tooltip: 'Insert cell below'
	});
        // Insert after run
        panel.toolbar.insertAfter('run', 'btnRunAll', btnRunAll);

        // Insert after restart
        panel.toolbar.insertAfter('restart', 'btnRestartRunAll', btnRestartRunAll);
	
	// Insert after restart
	panel.toolbar.insertAfter('restart','btnInsertBelow', btnInsertBelow);

        // Return a delegate which can dispose our created button
        return new DisposableDelegate(() => {
            btnRunAll.dispose();
            btnRestartRunAll.dispose();
	    btnInsertBelow.dispose();
        });
    }
}


/**
 * Initialization data for the @wallneradam/run_all_buttons extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
    id: PLUGIN_NAME,
    autoStart: true,
    activate: (app: JupyterFrontEnd) => {
        console.log(`JupyterLab extension ${PLUGIN_NAME} is activated!`);
        // Register our extension
        app.docRegistry.addWidgetExtension('notebook', new RunAllButtons);
    }
};


export default extension;
