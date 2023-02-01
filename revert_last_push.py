import subprocess

# Capture the hash value of the last push
result = subprocess.run(
    ["git", "log", "-n", "1", "--pretty=format:'%H'"], stdout=subprocess.PIPE)
last_push_hash = result.stdout.decode().strip("'")

# Revert the last push
subprocess.run(["git", "revert", last_push_hash])

# Push the new revert commit to the remote repository
subprocess.run(["git", "push", "origin", "<branch-name>"])
