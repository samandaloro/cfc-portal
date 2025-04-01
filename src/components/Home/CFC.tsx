import { Typography } from "@mui/material";
import Counter from './Counter';

const CFC = () => {
  return (
    <div>
    <Typography 
            variant="h2" 
            align="left" 
            sx={{
                fontWeight: 700, 
                color: '#333', 
                marginBottom: 2,
                marginTop: 2
            }}
        >
            Helping Families
    </Typography>
    <Typography 
            variant="h2" 
            align="left" 
            sx={{
                fontWeight: 700, 
                color: '#333', 
                marginBottom: 2,
                marginTop: 2
            }}
        >
            Cope with
    </Typography>
    <Typography 
            variant="h2" 
            align="left" 
            sx={{
                fontWeight: 700, 
                color: '#333', 
                marginBottom: 2,
                marginTop: 2
            }}
        >
            Cancer
    </Typography>
    <Counter />
</div>
    
  );
};

export default CFC;