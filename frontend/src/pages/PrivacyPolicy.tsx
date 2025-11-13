import { Box, Container, Typography, Link } from "@mui/material";
import { Footer } from "../components/Footer";

export const PrivacyPolicy = () => {
  return (
    <Box sx={{ bgcolor: "#FAFAFA", minHeight: "100vh" }}>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{ fontWeight: 700, mb: 2, color: "#4A1D8C" }}
        >
          Privacy Policy
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              1. Introduction
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
              Welcome to Corporate Culture Community. We are committed to
              protecting your personal information and your right to privacy.
              This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our platform.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              By using our platform, you agree to the collection and use of
              information in accordance with this policy. If you do not agree
              with our policies and practices, please do not use our platform.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              2. Information We Collect
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
              2.1 Personal Information
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
              When you register for an account, we collect the following
              information:
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 2 }}>
              <li>First and last name</li>
              <li>Email address</li>
              <li>Company name</li>
              <li>City/location</li>
              <li>Job position/title</li>
              <li>Department (e.g., People Operations, HR, Workplace)</li>
              <li>LinkedIn profile URL (optional)</li>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
              2.2 Usage Information
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              We automatically collect certain information when you use our
              platform, including your IP address, browser type, device
              information, pages visited, and interaction patterns.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              3. How We Use Your Information
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
              We use the information we collect to:
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 2 }}>
              <li>
                Create and manage your account (subject to admin approval)
              </li>
              <li>
                Connect you with other People & Culture professionals in the
                community
              </li>
              <li>Display your profile to other verified members</li>
              <li>Send you community updates, event invitations, and news</li>
              <li>Provide access to shared resources and venue information</li>
              <li>Improve our platform and user experience</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Ensure security and prevent fraud</li>
            </Box>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              4. Information Sharing and Disclosure
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
              4.1 Within the Community
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
              Your profile information (name, company, position, department) is
              visible to other verified members of Corporate Culture Community.
              This visibility enables networking and professional connections
              within the community.
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, mt: 2 }}>
              4.2 Third-Party Services
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
              We integrate with the following third-party services:
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 2 }}>
              <li>
                <strong>Slack:</strong> For community communication (if you
                choose to join)
              </li>
              <li>
                <strong>Google Drive:</strong> For shared resource access
              </li>
              <li>
                <strong>Luma:</strong> For event management and calendar
                integration
              </li>
            </Box>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              These services have their own privacy policies governing the use
              of your information.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              5. Data Retention
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              We retain your personal information for as long as your account is
              active or as needed to provide you services. You may request
              deletion of your account at any time, after which we will delete
              or anonymize your information within 30 days, except where we are
              required to retain it for legal compliance.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              6. Your Rights
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
              Under data protection laws (including GDPR for EU users), you have
              the following rights:
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 2 }}>
              <li>
                <strong>Right to Access:</strong> Request a copy of your
                personal data
              </li>
              <li>
                <strong>Right to Rectification:</strong> Correct inaccurate or
                incomplete data
              </li>
              <li>
                <strong>Right to Erasure:</strong> Request deletion of your data
              </li>
              <li>
                <strong>Right to Restrict Processing:</strong> Limit how we use
                your data
              </li>
              <li>
                <strong>Right to Data Portability:</strong> Receive your data in
                a structured format
              </li>
              <li>
                <strong>Right to Object:</strong> Object to certain processing
                activities
              </li>
              <li>
                <strong>Right to Withdraw Consent:</strong> Withdraw consent at
                any time
              </li>
            </Box>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              To exercise these rights, please contact us at{" "}
              <Link href="mailto:privacy@corporateculturecommunity.com">
                hello@joinculture.co
              </Link>
              .
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              7. Data Security
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              We implement appropriate technical and organizational security
              measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction. However, no method
              of transmission over the Internet is 100% secure, and we cannot
              guarantee absolute security.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              8. Cookies and Tracking Technologies
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              We use cookies and similar tracking technologies to enhance your
              experience, analyze usage patterns, and remember your preferences.
              You can control cookie settings through your browser preferences.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              9. Children&apos;s Privacy
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              Our platform is intended for professional use by individuals 18
              years of age or older. We do not knowingly collect information
              from children under 18.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              10. Changes to This Privacy Policy
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the &quot;Last Updated&quot; date. You are
              advised to review this Privacy Policy periodically for any
              changes.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              11. Contact Us
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>
              If you have any questions about this Privacy Policy, please
              contact us:
            </Typography>
            <Box component="ul" sx={{ pl: 4, listStyle: "none" }}>
              <li>
                <strong>Email:</strong>{" "}
                <Link href="mailto:hello@joinculture.co">
                  hello@joinculture.co
                </Link>
              </li>
              <li>
                <strong>Location:</strong> Berlin, Germany
              </li>
            </Box>
          </Box>

          <Box
            sx={{
              mt: 4,
              p: 3,
              bgcolor: "rgba(74, 29, 140, 0.05)",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "rgba(74, 29, 140, 0.2)",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              EU Data Controller Information
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
              For users in the European Economic Area (EEA), Corporate Culture
              Community acts as the data controller for your personal
              information. You have the right to lodge a complaint with your
              local data protection authority if you believe your rights have
              been violated.
            </Typography>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};
