export const MODEL_CATALOG = {
  OPENAI: {
    GPT_4O_MINI: "gpt-4o-mini",
    GPT_41_NANO: "gpt-4.1-nano",
  },
} as const;

type ModelCatalog = typeof MODEL_CATALOG;
export type Provider = keyof ModelCatalog;
export type ProviderModels<P extends Provider> = keyof ModelCatalog[P];
export type ModelId<
  P extends Provider,
  M extends ProviderModels<P>
> = ModelCatalog[P][M];

type DotPaths = {
  [P in Provider]: `${Extract<P, string>}.${Extract<
    ProviderModels<P>,
    string
  >}`;
}[Provider];

// Overloads for nicer DX
export function getModel(path: DotPaths): string;
export function getModel<P extends Provider, M extends ProviderModels<P>>(
  provider: P,
  model: M
): ModelId<P, M>;
export function getModel<
  P extends Provider,
  M extends ProviderModels<P>
>(input: { provider: P; model: M }): ModelId<P, M>;
export function getModel(...args: unknown[]): string {
  if (args.length === 1) {
    const arg = args[0] as unknown;
    if (typeof arg === "string") {
      const [provider, model] = arg.split(".") as [Provider, string];
      const value = (MODEL_CATALOG as Record<string, Record<string, string>>)[
        provider
      ]?.[model];
      if (!value)
        throw new Error(`Model not found for path: ${provider}.${model}`);
      return value;
    }
    if (
      typeof arg === "object" &&
      arg !== null &&
      "provider" in arg &&
      "model" in arg
    ) {
      const { provider, model } = arg as { provider: Provider; model: string };
      const value = (MODEL_CATALOG as Record<string, Record<string, string>>)[
        provider
      ]?.[model];
      if (!value)
        throw new Error(
          `Model not found for provider/model: ${provider}/${model}`
        );
      return value;
    }
  }

  if (args.length === 2) {
    const [provider, model] = args as [Provider, string];
    const value = (MODEL_CATALOG as Record<string, Record<string, string>>)[
      provider
    ]?.[model];
    if (!value)
      throw new Error(
        `Model not found for provider/model: ${provider}/${model}`
      );
    return value;
  }

  throw new Error(
    "Invalid getModel usage. Use 'provider', 'provider, model', or 'provider.model'"
  );
}

export function listProviders(): Provider[] {
  return Object.keys(MODEL_CATALOG) as Provider[];
}

export function listModels<P extends Provider>(
  provider: P
): ProviderModels<P>[] {
  return Object.keys(MODEL_CATALOG[provider]) as ProviderModels<P>[];
}

export function getDefaultModel<P extends Provider>(
  provider: P
): ModelCatalog[P][ProviderModels<P>] {
  const firstKey = Object.keys(MODEL_CATALOG[provider])[0] as ProviderModels<P>;
  return MODEL_CATALOG[provider][firstKey];
}

// Backwards compatibility default export
const models = MODEL_CATALOG;
export default models;
