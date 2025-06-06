'use client';

import {
  useMemo,
} from 'react';
import {
  useRouter,
  useSearchParams
} from 'next/navigation';

import { useArticlesGetManyQuery } from '@/entities/articles/queries';

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import Pagination from "@mui/material/Pagination";
import { StyledTypography, TitleTypography } from "@/widgets/articles-list/styled";
import * as React from "react";

export default function ArticlesList() {
  const { replace } = useRouter();

  const searchParams = useSearchParams();

  const {
    workspaceId,
    categoryId,
    limit,
    page,
  } = useMemo(() => {
    return {
      workspaceId: searchParams.get('workspaceId') ?? '',
      categoryId: searchParams.get('categoryId') ?? '',
      limit: searchParams.get('limit') ?? '10',
      page: searchParams.get('page') ?? '1',
    }
  }, [searchParams]);

  const { articlesList } = useArticlesGetManyQuery({
    workspaceId,
    categoryId,
    limit,
    page,
  });

  const [focusedCardIndex, setFocusedCardIndex] = React.useState<string | null>(
    null,
  );

  const handleFocus = (articleId: string) => {
    setFocusedCardIndex(articleId);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleClick = () => {
    console.info('You clicked the filter chip.');
  };

  return (
    <Box id="articles">
      <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
        {articlesList?.map((article) => (
          <Grid key={article.id} size={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 1,
                height: '100%',
              }}
            >
              {/*<Typography gutterBottom variant="caption" component="div">*/}
              {/*  {article.tag}*/}
              {/*</Typography>*/}
              <TitleTypography
                gutterBottom
                variant="h6"
                onFocus={() => handleFocus(article.id)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === article.id ? 'Mui-focused' : ''}
              >
                {article.title}
                <NavigateNextRoundedIcon
                  className="arrow"
                  sx={{ fontSize: '1rem' }}
                />
              </TitleTypography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {article.summary}
              </StyledTypography>
              {/*<Author authors={article.authors} />*/}
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4, justifyContent: 'end' }}>
        <Pagination hidePrevButton hideNextButton count={10} boundaryCount={10} />
      </Box>
    </Box>
  )
}