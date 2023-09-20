interface GServerScripts<T> {
    withFailureHandler: (handler: Function) => T;
    withSuccessHandler: (handler: Function) => T;
    withUserObject: (object: any) => T;
}

declare type GoogleServerScripting = {
    script: {
        run: any
    }
};

declare const google: GoogleServerScripting;

export function ServerScript<T>(): GServerScripts<GServerScripts<T> & T> & T {
    return google.script.run as GServerScripts<GServerScripts<T> & T> & T;
}

export async function ServerScriptAsync<T, U>(serverFunction: keyof T, ...args) {
    return new Promise<U>((resolve, reject) => {
        google.script.run.withFailureHandler((data) => {
            reject(data);
        }).withSuccessHandler((data) => {
            resolve(data);
        })[serverFunction](...args);
    })
}