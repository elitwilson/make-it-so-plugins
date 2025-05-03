export type PluginContext = {
  plugin_args: Record<string, string | boolean>;
  config: Record<string, unknown>;
  project_root: string;
  env: Record<string, string>;
  meta: {
    plugin_name: string;
    plugin_description: string;
    plugin_version: string;
    cli_version: string;
  };
  dry_run: boolean;
  log: (msg: string) => void;
};
