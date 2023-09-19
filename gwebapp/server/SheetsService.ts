export const Sheets = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SheetID'));

export interface ModelFields {
    [name: string]: {
        column: string;
        value: any;
    }
}

export abstract class SheetModel {
    abstract get sheet(): string;
    abstract rowId: number;
    abstract fields: ModelFields;

    set(field: string, value: any) {
        this.fields[field].value = value;
    }

    init(fields: Record<string, any>) {
        for(const field in fields) {
            this.fields[field].value = fields[field];
        }
    }

    save() {
        const sheet = Sheets.getSheetByName(this.sheet);
        const rowId = this.rowId || sheet.getLastRow() + 1
        
        for(const prop in this.fields) {
            sheet.getRange(this.fields[prop].column + rowId)
                .setValue(this.fields[prop].value);
        }
    }
    
}