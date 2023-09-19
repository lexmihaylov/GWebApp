import { render } from "../../gwebapp/server/utils";

export function index(event) {
    return render('index', {ev: event})
}