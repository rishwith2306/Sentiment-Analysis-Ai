import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env file from project root
env_path = Path(__file__).parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

# Set SERPER_API_KEY for the tool
serper_key = os.getenv("SERPER_API_KEY")
if serper_key:
    os.environ["SERPER_API_KEY"] = serper_key


from crewai_tools import SerperDevTool

# Initialize the tool for internet searching capabilities
tool = SerperDevTool(n_results=3)
