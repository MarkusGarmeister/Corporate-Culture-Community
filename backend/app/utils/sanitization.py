import re
import html
import logging

logger = logging.getLogger(__name__)


def sanitize_text(input_text: str, field_name: str = "", max_length: int = 1000) -> str:

    input_text = input_text[:max_length]
    malecious_patterns = [
        r"<script[^>]*>.*?</script>",
        r"javascript:",
        r"onerror\s*=",
        r"onclick\s*=",
        r"onload\s*=",
        r"<iframe[^>]*>.*?</iframe>",
    ]
    patterns_found = []
    for pattern in malecious_patterns:
        matches = re.findall(pattern, input_text, flags=re.IGNORECASE | re.DOTALL)
        if matches:
            patterns_found.append(matches)
            input_text = re.sub(
                pattern, "", input_text, flags=re.IGNORECASE | re.DOTALL
            )
    if patterns_found:
        logger.warning(
            f"Malicious patterns detected and removed: {', '.join(patterns_found)}",
            extra={
                "event_type": "XSS_ATTEMPT_DETECTED",
                "field_name": field_name,
                "patterns_detected": patterns_found,
                "pattern_count": len(patterns_found),
            },
        )
    input_text = html.escape(input_text)

    return input_text.strip()
