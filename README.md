# parallaxtest + smoothscroll
parallax 스크롤 이벤트 기본구성.  
mac과 IE11이하에서는 Native스크롤, 
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
new ScrollEvent(start,gap,el,isSticky,callback);
```
|argument|type|설명|
|:---|:---:|:---|
|start|Number|시작위치|
|gap|Number|시작위치에서 끝위치까지의 수치|
|el|element|대상 엘리먼트|
|isSticky|boolean|고정되어있는 효과 사용할지 여부|
|callback|function||

