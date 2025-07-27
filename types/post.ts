/*
export type PostDto = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// PostDto & {}; : PostDto의 타입을 유지하면서 추가적인 프로퍼티를 추가할 수 있다.

export type PostWithContentDto = PostDto & {};
*/

export interface PostDto {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostWithContentDto extends PostDto {}
