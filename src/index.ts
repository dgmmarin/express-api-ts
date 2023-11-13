import 'dotenv/config'
import "reflect-metadata"
import Main from './components/processes/main';

var App = new Main();
App.init();
App.start();
export {App}