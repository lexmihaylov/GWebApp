import './styles/style.scss';
import { ServerScriptAsync } from "gwebapp/browser/utils";

interface ServerFunctions {
    saveRecord: (firstName: string, lastName: string, UCN: string) => any;
}

(function() {
    var form = document.getElementById('addGuestDetails') as HTMLFormElement;
    form.addEventListener('submit', async (ev) => {
        ev.preventDefault();

        var firstName = form.querySelector<HTMLInputElement>('[name=firstName]').value;
        var lastName = form.querySelector<HTMLInputElement>('[name=lastName]').value;
        var UCN = form.querySelector<HTMLInputElement>('[name=UCN]').value;
        const data = await ServerScriptAsync<ServerFunctions>('saveRecord', firstName, lastName, UCN);

        console.log(data);
    })
})();