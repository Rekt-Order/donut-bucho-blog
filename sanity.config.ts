import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schema} from './sanity/schema'

export default defineConfig({
  name: 'default',
  title: 'Blog App',

  projectId: 'k2tkuvlp',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schema.types,
  },

  vite: {
    define: {
      'process.env.SANITY_STUDIO_MODE': JSON.stringify('true'),
    },
  },
})