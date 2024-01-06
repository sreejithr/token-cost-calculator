import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Autocomplete from '@mui/joy/Autocomplete';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';

const BASE_URL = "https://token-cost-utility.azurewebsites.net";

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
  ...theme.typography['body-sm'],
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

const models = [
  "gpt-3.5-turbo", "gpt-3.5-turbo-instruct", "gpt-3.5-turbo-0301", "gpt-3.5-turbo-0613", "gpt-3.5-turbo-1106",
  "gpt-3.5-turbo-16k", "gpt-3.5-turbo-16k-0613", "gpt-4", "gpt-4-0314", "gpt-4-0613", "gpt-4-32k", "gpt-4-32k-0314",
  "gpt-4-32k-0613", "gpt-4-1106-preview", "gpt-4-vision-preview", "text-davinci-003", "text-curie-001", "text-babbage-001",
  "text-ada-001", "babbage-002", "davinci-002", "text-embedding-ada-002", "azure/gpt-4-1106-preview", "azure/gpt-4-0613",
  "azure/gpt-4-32k-0613", "azure/gpt-4-32k", "azure/gpt-4", "azure/gpt-35-turbo-16k-0613", "azure/gpt-35-turbo-1106",
  "azure/gpt-35-turbo-16k", "azure/gpt-35-turbo", "azure/text-embedding-ada-002", "claude-instant-1", "mistral/mistral-tiny",
  "mistral/mistral-small", "mistral/mistral-medium", "claude-instant-1.2", "claude-2", "claude-2.1", "text-bison", "text-bison@001",
  "text-unicorn", "text-unicorn@001", "chat-bison", "chat-bison@001", "chat-bison@002", "chat-bison-32k", "code-bison",
  "code-bison@001", "code-gecko@001", "code-gecko@002", "code-gecko", "codechat-bison", "codechat-bison@001", "codechat-bison-32k",
  "gemini-pro", "gemini-pro-vision", "palm/chat-bison", "palm/chat-bison-001", "palm/text-bison", "palm/text-bison-001",
  "palm/text-bison-safety-off", "palm/text-bison-safety-recitation-off", "command-nightly", "command", "command-light",
  "command-medium-beta", "command-xlarge-beta", "openrouter/openai/gpt-3.5-turbo", "openrouter/openai/gpt-3.5-turbo-16k",
  "openrouter/openai/gpt-4", "openrouter/anthropic/claude-instant-v1", "openrouter/anthropic/claude-2",
  "openrouter/google/palm-2-chat-bison", "openrouter/google/palm-2-codechat-bison", "openrouter/meta-llama/llama-2-13b-chat",
  "openrouter/meta-llama/llama-2-70b-chat", "openrouter/meta-llama/codellama-34b-instruct",
  "openrouter/nousresearch/nous-hermes-llama2-13b", "openrouter/mancer/weaver", "openrouter/gryphe/mythomax-l2-13b",
  "openrouter/jondurbin/airoboros-l2-70b-2.1", "openrouter/undi95/remm-slerp-l2-13b", "openrouter/pygmalionai/mythalion-13b",
  "openrouter/mistralai/mistral-7b-instruct", "j2-ultra", "j2-mid", "j2-light", "dolphin", "chatdolphin", "luminous-base",
  "luminous-base-control", "luminous-extended", "luminous-extended-control", "luminous-supreme", "luminous-supreme-control",
  "ai21.j2-mid-v1", "ai21.j2-ultra-v1", "amazon.titan-text-lite-v1", "amazon.titan-text-express-v1", "anthropic.claude-v1",
  "bedrock/us-east-1/anthropic.claude-v1", "bedrock/us-west-2/anthropic.claude-v1", "bedrock/ap-northeast-1/anthropic.claude-v1",
  "bedrock/eu-central-1/anthropic.claude-v1", "anthropic.claude-v2", "bedrock/us-east-1/anthropic.claude-v2",
  "bedrock/us-west-2/anthropic.claude-v2", "bedrock/ap-northeast-1/anthropic.claude-v2", "bedrock/eu-central-1/anthropic.claude-v2",
  "anthropic.claude-v2:1", "bedrock/us-east-1/anthropic.claude-v2:1", "bedrock/us-west-2/anthropic.claude-v2:1",
  "bedrock/ap-northeast-1/anthropic.claude-v2:1", "bedrock/eu-central-1/anthropic.claude-v2:1", "anthropic.claude-instant-v1",
  "bedrock/us-east-1/anthropic.claude-instant-v1", "bedrock/us-west-2/anthropic.claude-instant-v1",
  "bedrock/ap-northeast-1/anthropic.claude-instant-v1", "bedrock/eu-central-1/anthropic.claude-instant-v1", "cohere.command-text-v14",
  "cohere.command-light-text-v14", "cohere.embed-english-v3", "cohere.embed-multilingual-v3", "meta.llama2-13b-chat-v1",
  "meta.llama2-70b-chat-v1", "sagemaker/meta-textgeneration-llama-2-7b", "sagemaker/meta-textgeneration-llama-2-7b-f",
  "sagemaker/meta-textgeneration-llama-2-13b", "sagemaker/meta-textgeneration-llama-2-13b-f",
  "sagemaker/meta-textgeneration-llama-2-70b", "sagemaker/meta-textgeneration-llama-2-70b-b-f","together-ai-7.1b-20b",
  "ollama/llama2", "ollama/llama2:13b", "ollama/llama2:70b", "ollama/llama2-uncensored", "ollama/mistral", "ollama/codellama",
  "ollama/orca-mini", "ollama/vicuna", "deepinfra/meta-llama/Llama-2-70b-chat-hf", "deepinfra/codellama/CodeLlama-34b-Instruct-hf",
  "deepinfra/meta-llama/Llama-2-13b-chat-hf", "deepinfra/meta-llama/Llama-2-7b-chat-hf",
  "deepinfra/mistralai/Mistral-7B-Instruct-v0.1", "deepinfra/jondurbin/airoboros-l2-70b-gpt4-1.4.1", "perplexity/pplx-7b-chat",
  "perplexity/pplx-70b-chat", "perplexity/pplx-7b-online", "perplexity/pplx-70b-online", "perplexity/llama-2-13b-chat",
  "perplexity/llama-2-70b-chat", "perplexity/mistral-7b-instruct", "perplexity/replit-code-v1.5-3b",
  "anyscale/mistralai/Mistral-7B-Instruct-v0.1", "anyscale/HuggingFaceH4/zephyr-7b-beta", "anyscale/meta-llama/Llama-2-7b-chat-hf",
  "anyscale/meta-llama/Llama-2-13b-chat-hf", "anyscale/meta-llama/Llama-2-70b-chat-hf", "anyscale/codellama/CodeLlama-34b-Instruct-hf",
  "cloudflare/@cf/meta/llama-2-7b-chat-fp16", "cloudflare/@cf/meta/llama-2-7b-chat-int8", "cloudflare/@cf/mistral/mistral-7b-instruct-v0.1",
  "cloudflare/@hf/thebloke/codellama-7b-instruct-awq", "voyage/voyage-01", "voyage/voyage-lite-01"
];

export default class BasicGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedModel: null,
      prompt: null,
      promptCost: "",
      promptCostInUSD: "",
      emptyModelError: false
    };
  }

  render() {
    console.log(models.length);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%"
        }}
      >
        <Typography level="h1" style={{ paddingTop: 40 }}>
          Token Cost Calculator
        </Typography>

        <Typography level="p" style={{ padding: 40, textAlign: "center" }}>
          Calculate how many <b>TPUs (Token Price Units)</b> and <b>US dollars</b> your prompts incur.<br/>
        </Typography>

        <div style={{ width: "50%" }}>  
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControl error={this.state.emptyModelError} style={{ textAlign: "center" }}>
              <Autocomplete
                placeholder="Pick your model..."
                options={models}
                onChange={this.onModelSelect}
                sx={{ width: 300 }}
              />
              {this.state.emptyModelError && (
                <FormHelperText>Please pick a model</FormHelperText>
              )}
              <Typography color="success" fontWeight={"bold"} style={{ paddingTop: 10 }}>
                160+
                <Typography color="neutral" level="body" sx={{ ml: 1 }} fontWeight={"lg"}>
                  supported models!
                </Typography>
              </Typography>
            </FormControl>
          </div>

          <br />
          <Textarea
            color={this.state.emptyPromptError ? "danger" : "neutral"}
            minRows={8}
            maxRows={8}
            placeholder={"Paste your prompt here"}
            onChange={this.onPromptChange}
          />
          <br />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button onClick={this.onClickCalculate}>
              Calculate
            </Button>
          </div>
          <br />

          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Typography level="h4" style={{ padding: 40 }}>
                {"Token Cost (Prompt) = "}
                {this.state.promptCost}{this.state.promptCostInUSD ? ` ($${this.state.promptCostInUSD})`: ""}
              </Typography>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  onModelSelect = (_, selectedModel) => {
    this.setState({ selectedModel, emptyModelError: false });
  }

  onPromptChange = event => {
    if (event.target.value) {
      const prompt = event.target.value;
      this.setState({ prompt, emptyPromptError: false });
    }
  }

  onClickCalculate = () => {
    const { selectedModel: model, prompt } = this.state;
    const data = {
      model,
      prompt
    };

    if (!model) {
      this.setState({ emptyModelError: true });
      return;
    }
    
    if (!prompt) {
      this.setState({ emptyPromptError: true });
      return;
    }
    
    fetch(BASE_URL + "/api/token-cost-utility", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        this.setState({
          promptCost: data["prompt_cost"],
          promptCostInUSD: data["prompt_cost_in_usd"]
        })
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }
}