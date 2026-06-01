import type { MDXComponents } from 'mdx/types'
import { Code } from '@/components/code'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Code Hike emits <Code codeblock={...}/> for fenced code blocks.
    Code,
  }
}
