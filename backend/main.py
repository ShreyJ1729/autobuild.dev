import os
import modal
import openai
import dotenv
from pydantic import BaseModel

DOT_ENV_PATH = "/root/.env"

dotenv.load_dotenv(DOT_ENV_PATH)
openai.api_key = os.environ.get("OPENAI_API_KEY")

image = modal.Image.debian_slim().pip_install_from_requirements("requirements.txt")

mounts = [
    modal.Mount.from_local_file(".env", remote_path=DOT_ENV_PATH),
]

stub = modal.Stub(name="autobuild", mounts=mounts, image=image)

class Query(BaseModel):
    message: str
    html: str

def get_message(message: str, html: str):
    return f"""
    message: {message}
    existing html: {html}
    """

@stub.function(keep_warm=1)
@modal.web_endpoint(method="POST")
def run_query(query: Query):
    print(query)
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful programming bot that writes HTML code using tailwind css. The user gives a description of a website to build and you write the HTML code for them. If the user gives html code, you will use that as a starting point and edit it to fit the description. You always output the COMPLETE code for the website. MAKE SURE TO ONLY OUTPUT CODE AND NOTHING ELSE!"
            },
            {
                "role": "user",
                "content": get_message(query.message, query.html)
            },
        ],
        temperature=0.5,
    ).choices[0].message.content

    print(response)

    # only take everything between <body> and </body>
    if "<body>" in response and "</body>" in response:
        response = response.split("<body>")[1]
        response = response.split("</body>")[0]

    print(response)
    return response