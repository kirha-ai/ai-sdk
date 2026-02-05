export type SummarizationModel = "kirha" | "kirha-flash";

export type SummarizationConfig =
  | SummarizationModel
  | {
      model: SummarizationModel;
      instruction?: string;
    };

export interface SearchToolOptions {
  apiKey?: string;
  vertical?: string;
  summarization?: SummarizationConfig;
  includeRawData?: boolean;
  includePlanning?: boolean;
  description?: string;
}

export interface SearchToolInput {
  query: string;
}

export interface ClientConfig {
  apiKey: string;
  vertical?: string;
  summarization?: SummarizationConfig;
}
