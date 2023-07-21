import Aurelia, { lifecycleHooks } from "aurelia";
import {
  Parameters,
  Navigation,
  RouterConfiguration,
  RoutingInstruction,
} from "@aurelia/router";
import { App } from "./app";
import "./styles/main.scss";

@lifecycleHooks()
class NoopAuthHandler {
  canLoad(
    viewModel,
    params: Parameters,
    instruction: RoutingInstruction,
    navigation: Navigation
  ) {
    return true;
  }
}

Aurelia.register(
  RouterConfiguration.customize({ useUrlFragmentHash: false }),
  NoopAuthHandler
)
  .app(App)
  .start();
