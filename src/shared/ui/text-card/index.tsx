import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export default function TextCard({
  title,
  href,
  description,
}: {
  title: string
  href: string
  description?: string
}) {
  return (
    <Box
      component={Button}
      href={href}
      LinkComponent={Link}
      sx={[
        (theme) => ({
          display: 'flex',
          p: 2,
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 1,
          height: '100%',
          backgroundColor: (theme.vars || theme).palette.background.paper,
          '&:hover': {
            boxShadow: (theme.vars || theme).palette.baseShadow,
            backgroundColor: (theme.vars || theme).palette.action.selected,
          },
        }),
      ]}
    >
      <Box
        sx={[
          {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            gap: 1,
            textAlign: 'left',
            textTransform: 'none',
          },
        ]}
      >
        <Typography variant="h6" color="text.primary">{title}</Typography>
        <StyledTypography variant="body2" color="text.secondary">{description}</StyledTypography>
      </Box>
    </Box>
  );
}