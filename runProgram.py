#Python Program that determines OS and runs the correct start file based on it in the os's respective terminal
#By Ryan R.

import os
from pathlib import Path

if Path("bookbuddy/target/").exists():
    if os.name == "posix":
        print("Unix Based (mac/linux) Detected")
        os.system("bash ./bookbuddy/start.sh")
    else:
        print("Windows Based Detected")
        os.system("cd bookbuddy")
        os.system("./start.bat")
else:
    print("Come back after you have a /target build file")