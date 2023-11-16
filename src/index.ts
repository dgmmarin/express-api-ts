import "dotenv/config";
import "reflect-metadata";
import Main from "./components/processes/main";

let App: Main;
function start() {
  App = new Main();
  App.init();
  App.start();
}

start();
export { App, start };
