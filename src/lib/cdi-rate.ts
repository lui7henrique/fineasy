import { getCdiRate as fetchCdiRate } from 'selic'

const FALLBACK_CDI_RATE = Number(
  process.env.FALLBACK_CDI_RATE ??
    process.env.NEXT_PUBLIC_FALLBACK_CDI_RATE ??
    11.65,
)

export async function getSafeCdiRate() {
  try {
    const cdiRate = await fetchCdiRate()

    if (typeof cdiRate !== 'number' || Number.isNaN(cdiRate)) {
      throw new Error('Invalid CDI rate response')
    }

    return cdiRate
  } catch (error) {
    console.error('Failed to fetch CDI rate. Using fallback value.', error)
    return FALLBACK_CDI_RATE
  }
}
