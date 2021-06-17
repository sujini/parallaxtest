# parallaxtest + smoothscroll
parallax 스크롤 이벤트 기본구성.  
IE11이하에서는 Native스크롤, Mac에서는 css sticky,
그외 브라우저는 smoothscroll사용


### 설치
``
npm install
``
### build
``
npm run build
``

### 개발모드 실행
``
npm run start:dev
``

### 운영모드 실행
``
npm run start:run
``
### 사용법
```
new ScrollEvent(el,stickyEl,isSticky,callback);
```
|argument|type|설명|
|:---|:---:|:---|
|el|element|대상 엘리먼트|
|stickyEl|element|el 안에 고정효과를 나타낼 엘리먼트|
|isSticky|boolean|고정되어있는 효과 사용할지 여부|
|callback|function|콜백 argument:per(0~1)|

