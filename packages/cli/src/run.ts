import {
  cli,
  SwapCommand
} from "./cli.js"
import { Builtins } from "clipanion"

cli.register(SwapCommand);
cli.register(Builtins.VersionCommand);
cli.register(Builtins.HelpCommand);
cli.runExit(process.argv.slice(2));