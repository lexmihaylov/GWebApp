interface Route {
    path: string;
    action: (event: any) => any;
}

export function assignProps(target, source) {
    for(const prop in source) {
        target[prop] = source[prop];
    }
}

export function routes(table: Route[] , event: GoogleAppsScript.Events.DoGet | GoogleAppsScript.Events.DoPost) {
    const path = event.pathInfo || '';
    try {
        for(let i = 0; i < table.length; i++) {
            if (table[i].path === path) {
                return table[i].action(event);
            }
        }
    } catch(ex) {
        return render('500', {trace: ex.stack});
    }
    
    return render('404');
}

export function render(view: string = null, params: Record<string, any> = {}): GoogleAppsScript.HTML.HtmlOutput {
    const template =  HtmlService.createTemplateFromFile(`views/${view}`);
    
    let layoutName: string = null,
        layoutParams: Record<string, any> = {};

    template.layout = function(name: string, params: Record<string, any> = {}) {
        layoutName = name;
        layoutParams = params;
    };

    assignProps(template, params);
    const renderedTemplate = template
        .evaluate()
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

    if(layoutName !== null) {
        return render(layoutName, { ...layoutParams, $content: renderedTemplate.getContent() });
    } else {
        return renderedTemplate;
    }
}

export function partial(name: string, params: Record<string, any>): string {
    ScriptApp.getScriptId()
    return render(name, params).getContent();
}

export function routeTo(path: string): string {
    if (path === '/') {
        path = '';
    }

    return ScriptApp.getService().getUrl() + path;
}

export function $import(path: string) {
    return HtmlService.createHtmlOutputFromFile(path).getContent();
}