import { AxiosError } from 'axios'

export const getRequestErrorMessage = (error?: AxiosError) => {
  if (error?.response) {
    const { data } = error.response
    if (data && typeof data === 'object' && 'message' in data && typeof data.message === 'string') {
      return `KnowledgeBase: ${data.message}`
    }
  }

  const errorMessage: string = error?.message || 'Something went wrong'
  return `KnowledgeBase: ${errorMessage}`
}