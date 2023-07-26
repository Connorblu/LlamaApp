using LLama;

var model = new LLamaModel(new LLamaParams(
    model: Path.Combine("..", "..", "..", "Models", "wizardLM-7B.ggmlv3.q4_1.bin"),
    n_ctx: 512,
    interactive: true,
    repeat_penalty: 1.0f,
    verbose_prompt: false));