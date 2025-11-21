# Threat Model – Corporate Culture Community

## 1. Short overview

- **What is this project?**
  A web application for a corporate culture community where approved members can share and rate locations for events (venues, catering services). Users need admin approval before they can access the platform.

- **Tech stack:**
  - Frontend: React 18 with React Admin framework
  - Backend: FastAPI (Python)
  - Database: PostgreSQL
  - Hosting: Fly.io (Docker containers)

---

## 2. What do I want to protect?

Main "important things" (assets):

- User accounts and passwords, if someone gets access to an account they can post fake ratings or access private data
- Personal information that shouldn't be public
- Admin functionality like approving users, changing roles, deleting accounts
- Location and rating data, the main content of the platform, needs to stay accurate
- JWT secret key, if this leaks, anyone can create fake login tokens

- **Confidentiality:** Only approved members should see user data. Not everyone should be able to read everything.
- **Integrity:** Users shouldn't be able to change other people's ratings or locations. Admins shouldn't be able to deny their actions.
- **Availability:** The app should work normally and not crash from too many requests or slow email sending.

---

## 3. Architecture

- **User's browser** → sends requests over HTTPS to the backend
- **React Frontend** → talks to backend through REST API endpoints like `/users`, `/locations`, `/ratings`
- **FastAPI Backend** → handles authentication with JWT, checks permissions, validates data
- **PostgreSQL Database** → stores everything (users, locations, ratings, etc.)
- **SMTP Email Server** → sends emails when users register or get approved

The flow is basically: Browser → React → FastAPI → Database, and sometimes FastAPI → Email Server.

---

## 4. Trust boundaries

Places where "trust level" changes:

1. **Internet ↔ Backend API**

   - Anyone on the internet can send requests to the API.
   - We use JWT tokens to check if someone is logged in and what role they have.
   - CORS is currently set to allow all origins (needs fixing for production).

2. **Backend ↔ Database**

   - Only the backend connects to the database with credentials stored in environment variables.
   - The database is on Fly.io's internal network, not exposed to internet directly.

3. **Backend ↔ Email Server**
   - We connect to an external SMTP server to send emails.
   - We send user email addresses through this, so we're trusting the email provider.

---

## 5. STRIDE threats

**Spoofing (pretending to be someone):**

- Threats:

  - Attackers can try brute force passwords. Password's need to be secure
  - The JWT token needs to be strong and well protected, if attackers gets access they can create fake tokens for any user
  - JWT tokens stored in localStorage, this approach is weak againt Cross-Site-Scripting (XSS) Attackers can try insert malicious javascript in our codebase (frontend) and read the token form localStorage This approach however is not vulneable against Cross-Site-Request-Forgery, because token is not accessed over the http header

- Current protections:

  - Our login route has a rate limit of 5 attempts per minute, in order to prevent brute force attacks
  - Passwords are hashed with pwdlib (can't reverse them)
  - The JWT get's checked when application starts, has validation rule of minimum 32 characters
  - Simple sanitization to detected and prevent malicioius input (utils/sanitizationpy)
  - HTTPS for all connections

- Future protections:
  - store JWT token in a http Cookies, is safe against XSS but needs right settings to protect against CSRF
  - currentlly no validation on password/inputs on server side, frontend does has some validations rules for password but needs also on the backend for better security Currently the minmun lenght is 8 maybe 12 is better (higher entropy more secure)
  - check passords against data breaches ( https://haveibeenpwned.com/)

**Tampering (changing data):**

- Threats:

  - Attacker can try to modify there role to admin on our PUT route
  - Also Attacker can try to modify the payload of the JWT token and add admin as role
  - SQL Injections: Attacker triies altering data in db or query sensible data

- Protections:

  - Our routes have authorizations check, only admins can change the role. Users can only update their own profile (same with delete)
  - The JWT token is signed, so tampering the payload will not work because signature wont match.
  - We use an ORM SQLModle (built on top of SQLAlchemy), which parametrize the query input and prevents SQL Injections

- Future Protections:
  - stronger CORS settings should only allow "https://joinculture.co", to prevent tampering data from malicious sites requests
  - more and better Pydantic Validations
  - more constraints on DB

**Repudiation (denying actions):**

- Threats:

  - Attacker trying to attack you, or placed malicious scripts inside our codebase and we don't see it or don't get notified.
  - Admin approves/deletes users and later says "that wasn't me"
  - Someone changes a role and there's no record of who did it
  - In general the threat is that you don't have evidence

- Protections:

  - We added INFO, WARNING and ERROR level loggins to our system
    - INFO: Sucessful Events like logged in or user approved or email sent
    - WARNING: Secerutiy Events like faled login or unauthorized actions or XSS malicious pattern
    - ERROR: Sytem Failures like creating in DB failed or email didn't sent
  - Logs include user IDs, timestamps, and what changed

- Future Proections:
  - add IP adress to logging
  - store logs on DB (this needs legal check if that is allowed and how long)
  - setting up a customized Logging UI (Grafana)

**Information Disclosure (leaking info):**

- Threats:

  - Unprotected routes can be accessed by anyone and data could be exposed
  - The Email with the set password link can be intercepted and be used
  - Error messages might reveal too much.
  - Logging can also leak sensitive information

- Protections:

  - Our route are protected, only logged in users can use the route or admins only
  - We had the JWT token in the set password email, because from the token we got the email data. We changed this to a random token which can be used one time
  - Some endpoints have generic error messages, on or POST route "/users" we show if an email already exists. This can be exploited by attackers but we decided to leave it for better UX

- Future Protections:
  - Add a expiry on the one time token
  - check DB logging in production setup

**Denial of Service (blocking the service):**

- Threats:

  - Too many requests could overload the server
  - Our Email Client is a threat, because if the serve is slow it blocks the request
  - Requests with huge payloads can also block the endpoint

- Protections:
  - We added rate limits on our login and register routes.

Future Protections:

- Add email sent logic to the background
- Some kind of limitation on request size

**Elevation of Privilege (getting more rights):**

- Threats:

  - Regular user becomes admin through the user update endpoint
  - User deletes admin accounts to remove oversight
  - User modifies locations or ratings they don't own

- Protections:
  - Our endpoints are protected with authorization, so only admins can change the role or user can only change their own locations or ratings.
  - Users can only delete themselves, or admin can delete anyone.
  - All unauthorized attempts are logged.
