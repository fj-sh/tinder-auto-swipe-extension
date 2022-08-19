const TINDER_AUTO_SWIPE_RUNNING_STATE_KEY = 'tinderAutoSwipeRunningState'
const HOW_OFTEN_DISLIKE = 'howOftenDislike'

export const getRunningStateInStorage = async () => {
  const result = await chrome.storage.local.get(['tinderAutoSwipeRunningState'])
  const runningState = result.tinderAutoSwipeRunningState
  if (runningState === undefined) {
    await setRunningStateInStorage(true)
    return true
  }
  return runningState as boolean
}

export const setRunningStateInStorage = async (runningState: boolean) => {
  await chrome.storage.local.set({ tinderAutoSwipeRunningState: runningState })
}

export const getHowOftenDislikeInStorage = async () => {
  const result = await chrome.storage.local.get(['howOftenDislike'])
  const howOftenDislike = result.howOftenDislike
  const defaultHowOftenDislike = 0

  if (howOftenDislike === undefined) {
    await setHowOftenDislikeInStorage(defaultHowOftenDislike)
    return defaultHowOftenDislike
  }
  return result[HOW_OFTEN_DISLIKE] as number
}

export const setHowOftenDislikeInStorage = async (howOftenDislike: number) => {
  await chrome.storage.local.set({ howOftenDislike: howOftenDislike })
}
