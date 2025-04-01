import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FrequentlyAsked: React.FC = () => {

    return (
        <div>
            <Typography 
                variant="h5" 
                align="center" 
                sx={{
                    fontWeight: 700, 
                    color: '#333', 
                    marginBottom: 2,
                    marginTop: 2
                }}
            >
            Frequently Asked Questions
        </Typography>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography component="span">What is Cousins For Carol?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                Cousins for Carol is a nonprofit organization providing financial support to people affected by cancer
                in the Greater Philadelphia region. We are a fully volunteer-based organization inspired by our 
                Aunt Carol, who passed away in 2013 from metastatic breast cancer. Carol had a large family and strong 
                support system during her final days, many in similar situations do not. We started Cousins for Carol 
                shortly after her passing to help provide financial relief and emotional support to those in need.
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography component="span">What type of assistance does Cousins for Carol provide?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                We provide financial assistance by paying bills of those who have been affected by a cancer diagnosis.
                Rent, Utilities, and Insurance are the most common bills. Due to limited budget, we generally cannot pay
                medical bills.
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography component="span">What location does Cousins for Carol operate?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                Cousins for Carol is based in Doylestown, PA, but provides aid everywhere in the 
                Greater Philadelphia region.
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography component="span">How can I request a grant?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                We currently only accept grant requests from social workers and verified healthcare providers.
                If you fall into this category, please send an email 
                to <a href="mailto:cousinsforcarol@gmail.com"> cousinsforcarol@gmail.com</a> to request an account
                in our request portal. 
                If you know somebody who could benefit from our assistance, please encourage them to reach out to 
                their social worker or healthcare provider to initiate the process.
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography component="span">How can I make a donation?</Typography>
            </AccordionSummary>
            <AccordionDetails>
                You can make a donation at <a href="https://cousinsforcarol.org/donate/">cousinsforcarol.org/donate</a>
            </AccordionDetails>
        </Accordion>
       </div>
    )
};

export default FrequentlyAsked;