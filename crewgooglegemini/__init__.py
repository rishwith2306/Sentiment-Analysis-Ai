# CrewGoogleGemini package initialization
import sys
from pathlib import Path
from dotenv import load_dotenv

# Add parent directory to path to ensure imports work
parent_dir = Path(__file__).parent.parent
if str(parent_dir) not in sys.path:
    sys.path.insert(0, str(parent_dir))

# Load .env file when package is imported
env_path = parent_dir / '.env'
load_dotenv(dotenv_path=env_path)
