import subprocess
subprocess.run(["git", "add", "."])
subprocess.run(["git", "commit", "-m", "auto commit by py script"])
subprocess.run(["git", "push"])
