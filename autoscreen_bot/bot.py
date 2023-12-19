from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
  model="gpt-4-vision-preview",
  messages=[
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "What’s in this image?"},
        {
          "type": "image_url",
          "image_url": {
            "url": "https://koi-factual-wasp.ngrok-free.app/api/screenshot",
          },
        },
      ],
    }
  ],
  max_tokens=300,
)

print(response.choices[0].message.content)