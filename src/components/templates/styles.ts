import { Container, styled } from '@mui/material'

export const Layout = styled(Container)`
  padding-top: 32px;
  max-width: none;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: calc(100vh - 80px);
`
