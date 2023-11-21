import QueueWorker from "../components/services/queue";
import { Process } from "../interfaces/process";

export default class BaseController {
  name: string;
  app: Process;
  queue: QueueWorker;
  constructor() {
  }
}