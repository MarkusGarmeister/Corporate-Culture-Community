import secrets
import string
import hashlib


def generate_random_string(length: int = 8) -> str:
    alphabet = string.ascii_letters + string.digits
    return "".join(secrets.choice(alphabet) for _ in range(length))


def hash_value(value: str) -> str:
    # Use SHA-256 hashing algorithm
    sha256_hash = hashlib.sha256()
    sha256_hash.update(value.encode("utf-8"))
    return sha256_hash.hexdigest()
