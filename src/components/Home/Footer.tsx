import React from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                height: "20vh",
                padding: "20px 0",
                marginTop: "100px",
                borderTop: "1px solid #919191"
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" fontWeight="700" gutterBottom>
                            About Us {String.fromCodePoint(0x1F4AC)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Cousins for Carol is a fully volunteer-based nonprofit organization providing financial 
                        support to people affected by cancer in the Greater Philadelphia region.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" fontWeight="700" gutterBottom>
                            Contact Us {String.fromCodePoint(0x1F4E9)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Email: <Link href="mailto:cousinsforcarol@gmail.com" color="inherit">cousinforcarol@gmail.com</Link>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Doylestown, PA
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" fontWeight="700" gutterBottom>
                            Stay in Touch {String.fromCodePoint(0x1F4F2)}
                        </Typography>
                        <Link href="https://facebook.com/cousinsforcarol/" color="inherit" underline="none" display="block">
                            <Typography variant="body2" color="text.secondary">
                                Facebook
                            </Typography>
                        </Link>
                        <Link href="https://instagram.com/cousinsforcarol/" color="inherit" underline="none" display="block">
                            <Typography variant="body2" color="text.secondary">
                                Instagram
                            </Typography>
                        </Link>
                        <Link href="https://cousinsforcarol.org/contact/" color="inherit" underline="none" display="block">
                            <Typography variant="body2" color="text.secondary">
                                Mailing list
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>

                <Box textAlign="center" marginTop={3}>
                    <Typography variant="body2" color="text.secondary">
                        © {new Date().getFullYear()} Cousins for Carol. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
