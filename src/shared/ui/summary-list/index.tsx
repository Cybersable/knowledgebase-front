import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import {
  StyledTypography,
  StyledTitle,
} from '@/widgets/articles-list/styled';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

export default function SummaryList({
  list,
}: {
  list?: Array<{
    id: string
    title: string
    summary?: string
    href: string
  }>
}) {
  return (
    <Grid container spacing={1} columns={12} sx={{ my: 4 }}>
      {list?.map((item) => (
        <Grid key={item.id} size={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              // justifyContent: 'space-between',
              // gap: 1,
              height: '100%',
              width: '100%',
            }}
          >
            {/*<Typography gutterBottom variant="caption" component="div">*/}
            {/*  {article.tag}*/}
            {/*</Typography>*/}
            <StyledTitle
              gutterBottom
              variant="h6"
              tabIndex={0}
              href={item.href}
            >
              {item.title}
              <NavigateNextRoundedIcon
                className="arrow"
                sx={{ fontSize: '1rem' }}
              />
            </StyledTitle>
            <StyledTypography variant="body2" color="text.secondary" gutterBottom>
              {item.summary}
            </StyledTypography>
            {/*<Author authors={article.authors} />*/}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}