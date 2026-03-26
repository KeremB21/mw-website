import { LazyHomeDynamicBackground3D } from '../components/visuals/LazyHomeDynamicBackground3D'
import { HomeHero } from '../components/home/HomeHero'
import { HomeNavTiles } from '../components/home/HomeNavTiles'
import { HomeTeachingStyle } from '../components/home/HomeTeachingStyle'
import { HomeAboutMini } from '../components/home/HomeAboutMini'

export function HomePage() {
  return (
    <>
      <LazyHomeDynamicBackground3D />
      <HomeHero />
      <HomeNavTiles />
      <HomeTeachingStyle />
      <HomeAboutMini />
    </>
  )
}

