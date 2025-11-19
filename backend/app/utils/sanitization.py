import re
import html
import logging

loggger = logging.getLogger(__name__)


def sanitize_text(input_text: str, max_length: int = 1000) -> str:

    input_text = input_text[:max_length]
    malecious_patterns = [
        r"<script[^>]*>.*?</script>",
        r"javascript:",
        r"onerror\s*=",
        r"onclick\s*=",
        r"onload\s*=",
        r"<iframe[^>]*>.*?</iframe>",
    ]
    for pattern in malecious_patterns:
        input_text = re.sub(pattern, "", input_text, flags=re.IGNORECASE | re.DOTALL)

    input_text = html.escape(input_text)

    return input_text.strip()
