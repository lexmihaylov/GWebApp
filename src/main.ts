import { index } from "./controllers/Home";
import { routes } from "gwebapp/server/utils";

function doGet(e: GoogleAppsScript.Events.DoGet): GoogleAppsScript.HTML.HtmlOutput {
    return routes([
        {
            path: '',
            action: index
        }
    ], e);
}