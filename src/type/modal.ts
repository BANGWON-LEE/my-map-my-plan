// 각 이미지 아이템의 타입
export interface ImageItemType {
  title: string
  link: string
  thumbnail: string
  sizeheight: string // 혹시 number로 받고 싶다면 아래처럼 number로 바꾸세요
  sizewidth: string
}

// 전체 응답의 타입
export interface ImageSearchResultType {
  status: 'fulfilled'
  value: ImageItemType[]
}

export type placeListComponentType = {
  el: {
    title: string
    category: string
    address: string
    roadAddress: string
    mapx: number
    mapy: number
  }
}

export type placeListImgType = {
  index: number
  locImg: ImageSearchResultType[]
}

export type totalPlaceListComponentType = placeListComponentType &
  placeListImgType
