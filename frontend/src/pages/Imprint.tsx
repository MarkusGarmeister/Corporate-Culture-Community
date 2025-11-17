import { Box, Container, Typography, Link } from "@mui/material";
import { Footer } from "../components/Footer";

export const Imprint = () => {
  return (
    <Box sx={{ bgcolor: "#FAFAFA", minHeight: "100vh" }}>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{ fontWeight: 700, mb: 2, color: "#4A1D8C" }}
        >
          Imprint
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Information in accordance with Section 5 TMG (German Telemedia Act)
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Service Provider
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1 }}>
              <strong>Corporate Culture Community</strong>
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              Deniz Sebik / Corporate Culture Community
              <br />
              Stresemannstraße 23
              <br />
              10963 Berlin
              <br />
              Germany
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Contact
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              <strong>Email:</strong>{" "}
              <Link href="mailto:hello@joinculture.co">
                hello@joinculture.co
              </Link>
              <br />
              <strong>Website:</strong>{" "}
              <Link href="https://joinculture.co" target="_blank">
                joinculture.co
              </Link>
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Represented By
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              Deniz Sebik
              <br />
              CEO / Founder
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Register Entry
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}></Typography>
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Responsible for Content
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
              According to Section 55, Para. 2 RStV (German Interstate
              Broadcasting Treaty):
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Dispute Resolution
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
              The European Commission provides a platform for online dispute
              resolution (ODR):{" "}
              <Link
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener"
              >
                https://ec.europa.eu/consumers/odr/
              </Link>
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              We are not willing or obliged to participate in dispute resolution
              proceedings before a consumer arbitration board.
            </Typography>
          </Box>

          {/* Liability for Content */}
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Liability for Content
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
              As service providers, we are liable for own contents of these
              websites according to Sec. 7, paragraph 1 German Telemedia Act
              (TMG). However, according to Sec. 8 to 10 German Telemedia Act
              (TMG), service providers are not obligated to permanently monitor
              submitted or stored information or to search for evidences that
              indicate illegal activities.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              Legal obligations to removing information or to blocking the use
              of information remain unchallenged. In this case, liability is
              only possible at the time of knowledge about a specific violation
              of law. Illegal contents will be removed immediately at the time
              we get knowledge of them.
            </Typography>
          </Box>

          {/* Liability for Links */}
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Liability for Links
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              Our offer includes links to external third party websites. We have
              no influence on the contents of those websites, therefore we
              cannot guarantee for those contents. Providers or administrators
              of linked websites are always responsible for their own contents.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Copyright
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              The content and works published on this website are governed by
              the copyright laws of Germany. Any duplication, processing,
              distribution or any form of utilisation beyond the scope of
              copyright law shall require the prior written consent of the
              author or authors in question.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Data Protection
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              For information about how we handle your personal data, please see
              our{" "}
              <Link href="/#/privacy-policy" sx={{ color: "primary.main" }}>
                Privacy Policy
              </Link>
              .
            </Typography>
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};
