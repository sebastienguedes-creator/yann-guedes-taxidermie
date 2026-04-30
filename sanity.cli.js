import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '0abl700c', // <--- Prends celui du fichier .env.local
    dataset: 'production'
  }
})