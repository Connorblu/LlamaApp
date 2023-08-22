using LLama;

var model = new LLamaModel(new LLamaParams(
    model: Path.Combine("..", "..", "..", "Models", "wizardLM-7B.ggmlv3.q4_1.bin"),
    n_ctx: 512,
    interactive: true,
    repeat_penalty: 1.0f,
    verbose_prompt: false));

var session = new ChatSession<LLamaModel>(model)
    .WithPrompt("")
    .WithAntiprompt(new[] { "User: " });

Console.WriteLine();
Console.Write("User: ");
while (true)
{
    Console.ForegroundColor = ConsoleColor.Green;
    var prompt = Console.ReadLine() + "\n";

    Console.ForegroundColor = ConsoleColor.White;
    foreach (var output in session.Chat(prompt, encoding: "UTF-8"))
    {
        Console.Write(output);
    }
}