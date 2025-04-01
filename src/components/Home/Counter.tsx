import { Typography } from "@mui/material";
import CountUp from "react-countup";

const Counter = () => {
  return (
    <CountUp
        start={100000}
        end={250000}
        duration={4}
        separator=","
        prefix="Over $ "
        suffix=" given since 2013"
    >
        {({ countUpRef, start }) => (
            <Typography 
              variant="h4"
              color="#333"
              align="center"
              component="div"
              gutterBottom
            >
                <span ref={countUpRef} />
            </Typography>
        )}
    </CountUp>
  );
};

export default Counter;
