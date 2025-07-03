import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Link from 'next/link'

import HighlightedCard from '@/shared/ui/cards/HighlightedCard'

const cards = [
  {
    id: 'articles',
    title: 'Articles',
    summary: 'Add new article',
    btnText: 'Create article',
  },
  {
    id: 'categories',
    title: 'Categories',
    summary: 'Add new category',
    btnText: 'Create category',
  },
  {
    id: 'workspaces',
    title: 'Workspaces',
    summary: 'Add new workspace',
    btnText: 'Create workspace',
  }
]

export default function ManagingDocsCards() {
  return (
    <Grid
      container
      spacing={2}
      id="managing-docs-cards">
      {cards.map((card, index) => (
        <Grid
          size={12}
          key={index}>
          <HighlightedCard
            title={card.title}
            summary={card.summary}
          >
            <Button
              variant="contained"
              size="small"
              color="primary"
              endIcon={<ChevronRightRoundedIcon />}
              LinkComponent={Link}
              href={'/docs'}
            >
              {card.btnText}
            </Button>
          </HighlightedCard>
        </Grid>
      ))}
    </Grid>
  )
}