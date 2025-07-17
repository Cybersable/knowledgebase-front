import styled from "@emotion/styled";
import List from '@mui/material/List'
import Box from '@mui/material/Box'

export const NestedListContainer = styled(Box)(({ theme }) => `
  padding: 4px;
  padding-left: 16px;
`)

export const NestedList = styled(List)`
  border-left: 1px solid #ccc;
  padding: 4px;
`