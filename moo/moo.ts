// Import any of the types you need. This one is declared automatically for you.
import type { PluginContext } from "./types.d.ts";
        
// Import any external dependencies your plugin needs. Declare them in plugin.toml under [deno_dependencies].
// This one was declared automatically for you.
import * as cow from "https://deno.land/x/cowsay@1.1/mod.ts";

// Read plugin context from stdin (injected by Make It So CLI)
const decoder = new TextDecoder("utf-8");

// 👇 This is the entrypoint of your plugin script.
// The Make It So CLI pipes JSON into stdin when it runs your plugin.
Deno.stdin.readable
  .pipeThrough(new TextDecoderStream())
  .getReader()
  .read()
  .then(({ value }) => {
    const data = value || "";

    // 👇 This is the runtime context injected by the CLI
    const ctx = JSON.parse(data) as PluginContext;

    // Optional: inspect the context structure
    console.log(ctx);

    // Respect the dry run flag from the CLI
    if (ctx.dry_run) {
      console.log("🚫 Dry run: skipping execution.");
      return;
    }

    // Access your custom config from plugin.toml under [user_config]
    const message = String(ctx.config.message ?? "Hello from versioning 🪄");

    // Do your thing — in this case, print a talking cow 🐮
    console.log("Hello from versioning!")
    console.log(cow.say({ text: message }));
    });
