import { Link, Typography } from "@mui/material";


type AnyCompProps = React.ComponentProps<typeof Typography>

const Copyright: React.FC<AnyCompProps> = (props: AnyCompProps) => {
    const link = "https://linktr.ee/bolic_";

    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}

        <Link color="inherit" href={link}>
            Linktree
        </Link>
        {' '}

        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

export default Copyright;