import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

const supabase = createClient(
  'https://weargjpimolrgzgmzyyd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlYXJnanBpbW9scmd6Z216eXlkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTMwMDkzNywiZXhwIjoyMDkwODc2OTM3fQ.IeCQTyt9aBs3uPNt8K_ex37GY1q2rVLpBuQgcgz3rcI'
)

const files = [
  'pinnacle-render.jpg',
  'bodhivriksha-render.jpg',
  'kalpavriksha-render.jpg',
  'brookwoods-render.jpg',
]

for (const filename of files) {
  const filePath = join(process.cwd(), 'public/renders', filename)
  try {
    const fileBuffer = readFileSync(filePath)

    const { data, error } = await supabase.storage
      .from('Images')
      .upload(filename, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: true,
      })

    if (error) {
      console.error(`Error uploading ${filename}:`, error.message)
    } else {
      const { data: urlData } = supabase.storage
        .from('Images')
        .getPublicUrl(filename)
      console.log(`${filename}: ${urlData.publicUrl}`)
    }
  } catch (err) {
    console.error(`File not found: ${filePath}`)
  }
}
