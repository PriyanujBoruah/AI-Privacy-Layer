import os
import sys

# Bootstrap sdk/python into sys.path for test discovery
sdk_python_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if sdk_python_dir not in sys.path:
    sys.path.insert(0, sdk_python_dir)
