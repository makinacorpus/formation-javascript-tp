export async function sleep (t) {
  return new Promise(r => setTimeout(r, t * 1000))
}