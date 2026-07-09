import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const configuredSecret = process.env.REVALIDATE_SECRET
  if (!configuredSecret) {
    return NextResponse.json({ error: 'REVALIDATE_SECRET not configured' }, { status: 500 })
  }

  const { secret, path } = await request.json()
  if (secret !== configuredSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  revalidatePath(path ?? '/')
  return NextResponse.json({ revalidated: true, path })
}
