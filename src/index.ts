import "dotenv/config";
import "reflect-metadata";
import Main from "./components/processes/main";

const App = new Main();
App.init();
App.start();
export { App };
