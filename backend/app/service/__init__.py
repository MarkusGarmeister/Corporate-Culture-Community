import aiosmtplib
from email.message import EmailMessage
from typing import Optional, Dict, Any


class AsyncSMTPClient:
    """
    Async SMTP client wrapper.

    Usage:
        async with AsyncSMTPClient("smtp.example.com", 587, "user", "pass") as client:
            await client.send_message("subject", "body", "to@gmail.com")
    """

    def __init__(
        self,
        host: str,
        port: int = 587,
        username: Optional[str] = None,
        password: Optional[str] = None,
        timeout: int = 10,
    ) -> None:
        self.host = host
        self.port = port
        self.username = username
        self.password = password
        self.timeout = timeout
        self._smtp: Optional[aiosmtplib.SMTP] = None

    async def connect(self) -> None:
        if self._smtp:
            return

        smtp = aiosmtplib.SMTP(
            hostname=self.host,
            port=self.port,
            timeout=self.timeout,
        )
        await smtp.connect()
        await smtp.login(self.username, self.password or "")
        self._smtp = smtp

    async def close(self) -> None:
        if self._smtp:
            try:
                await self._smtp.quit()
            except Exception:
                try:
                    await self._smtp.close()
                except Exception:
                    pass
            finally:
                self._smtp = None

    async def __aenter__(self) -> "AsyncSMTPClient":
        await self.connect()
        return self

    async def __aexit__(self, exc_type, exc, tb) -> None:
        await self.close()

    def _build_message(
        self,
        subject: str,
        body: str,
        to_addrs: str,
        html: bool = False,
    ) -> EmailMessage:
        msg = EmailMessage()
        msg["Subject"] = subject
        msg["From"] = self.username
        msg["To"] = to_addrs

        if html:
            msg.add_alternative(body, subtype="html")
        else:
            msg.set_content(body)
        return msg

    async def send_message(
        self,
        subject: str,
        body: str,
        to_addrs: str,
        html: bool = False,
    ) -> Dict[str, Any]:
        msg = self._build_message(subject, body, to_addrs, html)

        try:
            await self.connect()
            assert self._smtp is not None
            await self._smtp.send_message(msg)
            return {"success": True, "error": None}
        except Exception as e:
            return {"success": False, "error": str(e)}
