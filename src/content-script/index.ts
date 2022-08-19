import { getHowOftenDislikeInStorage, getRunningStateInStorage } from '../lib/store'

const getName = () => {
  const nameTextSelector =
    '#t-188693591 > div > div.App__body.H\\(100\\%\\).Pos\\(r\\).Z\\(0\\) > div > main > div.H\\(100\\%\\) > div > div > div.Mt\\(a\\).Px\\(4px\\)--s.Pos\\(r\\).Expand.H\\(--recs-card-height\\)--ml.Maw\\(--recs-card-width\\)--ml > div > div > div.Toa\\(n\\).Bdbw\\(--recs-gamepad-height\\).Bdbc\\(t\\).Bdbs\\(s\\).Bgc\\(\\#000\\).Wc\\(\\$transform\\).Prs\\(1000px\\).Bfv\\(h\\).Ov\\(h\\).W\\(100\\%\\).StretchedBox.Bdrs\\(8px\\) > div.Pos\\(a\\).D\\(f\\).Jc\\(sb\\).C\\(\\#fff\\).Ta\\(start\\).W\\(100\\%\\).Ai\\(fe\\).B\\(0\\).P\\(8px\\)--xs.P\\(16px\\).P\\(20px\\)--l.Cur\\(p\\).focus-button-style > div > div.Pos\\(a\\).Fz\\(\\$l\\).B\\(0\\).Trsdu\\(\\$fast\\).Maw\\(80\\%\\).D\\(f\\).Fxd\\(c\\) > div > div > span'
  const nameTextElement = document.querySelector(nameTextSelector)
  if (nameTextElement == null) return undefined
  return nameTextElement.textContent
}

const likeClick = () => {
  const name = getName()
  console.log(`Like clicked - ${name}`)
  const likeButtonSelector =
    '#t-188693591 > div > div.App__body.H\\(100\\%\\).Pos\\(r\\).Z\\(0\\) > div > main > div.H\\(100\\%\\) > div > div > div.Mt\\(a\\).Px\\(4px\\)--s.Pos\\(r\\).Expand.H\\(--recs-card-height\\)--ml.Maw\\(--recs-card-width\\)--ml > div > div > div.Pos\\(a\\).B\\(0\\).Iso\\(i\\).W\\(100\\%\\).Start\\(0\\).End\\(0\\) > div > div.Mx\\(a\\).Fxs\\(0\\).Sq\\(70px\\).Sq\\(60px\\)--s.Bd.Bdrs\\(50\\%\\).Bdc\\(\\$c-like-green\\) > button > span > span'
  const likeButtonElement = document.querySelector(likeButtonSelector) as HTMLElement
  if (likeButtonElement != null) {
    likeButtonElement.click()
  }
}

const dislikeClick = () => {
  const name = getName()
  console.log(`Dislike clicked - ${name}`)
  const dislikeButtonSelector =
    '#t-188693591 > div > div.App__body.H\\(100\\%\\).Pos\\(r\\).Z\\(0\\) > div > main > div.H\\(100\\%\\) > div > div > div.Mt\\(a\\).Px\\(4px\\)--s.Pos\\(r\\).Expand.H\\(--recs-card-height\\)--ml.Maw\\(--recs-card-width\\)--ml > div > div > div.Pos\\(a\\).B\\(0\\).Iso\\(i\\).W\\(100\\%\\).Start\\(0\\).End\\(0\\) > div > div.Mx\\(a\\).Fxs\\(0\\).Sq\\(70px\\).Sq\\(60px\\)--s.Bd.Bdrs\\(50\\%\\).Bdc\\(\\$c-pink\\) > button > span > span'
  const dislikeButtonElement = document.querySelector(dislikeButtonSelector) as HTMLElement
  if (dislikeButtonElement != null) {
    dislikeButtonElement.click()
  }
}

let timer: NodeJS.Timer | undefined = undefined

export const startAutoSwipe = () => {
  let clickCount = 1
  timer = setInterval(async () => {
    const howOftenDislike = await getHowOftenDislikeInStorage()
    if (howOftenDislike !== 0 && clickCount % howOftenDislike === 0) {
      console.log(`Press the DISLIKE button once every ${howOftenDislike} times.`)
      clickCount = clickCount + 1
      dislikeClick()
      return
    }
    likeClick()
    clickCount = clickCount + 1
  }, 2000)
}

export const stopAutoSwipe = () => {
  if (timer) {
    clearInterval(timer)
  }
}

const autoSwipeStart = () => {
  console.log('AutoSwipe Start!')
  getRunningStateInStorage().then((runningState) => {
    if (runningState) {
      startAutoSwipe()
    } else {
      stopAutoSwipe()
    }
  })
}

autoSwipeStart()

export {}
