# airbridge-web-sdk-assignment

에어브릿지 SDK는 고객사 제품의 마케팅 성과 분석을 위한 데이터를 수집하여 다양한 환경에서도 최대한 유실없이 데이터를 서버로 전달하는 역할을 담당하고 있습니다. 해당 과제는 에어브릿지 SDK 의 핵심 기능인 `데이터를 서버에 전달하는 기능` 및 `마케팅 성과 분석을 하는 기능` 을 구현해야 합니다.

## 제공사항

- 빌드환경: esbuild (`npm run build`)
- 테스트환경
    - 유닛테스트: jest (`npm run test-unit`)
    - 로컬테스트: http + serve-handler (`npm run test-web`)
- 타입체크: typescript (`npm run check-type`)

## 요구사항

`source/assignment_sdk/assignment_sdk.ts` 파일을 수정하여 아래 요구사항을 구현해주세요.

> 파일은 자유롭게 여러개로 분리해주세요. (선택)

### 데이터를 서버에 전달하는 기능

SDK 의 trackEvent 함수는 호출되었을 때 서버에 이벤트 데이터를 전달해야 합니다.

```typescript
const trackEvent: (
    category: string,
    attribute?: Record<string, string>,
) => Promise<void>
```

- Endpoint: https://ab180-sdk-coding-assignment.vercel.app/api/track-event
- Method: POST
- Headers
    - Content-Type: application/json
- Body
    - category: string / required
        - 함수의 category 파라미터를 사용합니다.
    - action: string / optional
        - 함수의 attribute 파라미터를 JSON stringify 해서 사용합니다.
- Example
    ```
    curl --request POST \
        --url https://ab180-sdk-coding-assignment.vercel.app/api/track-event \
        --header 'content-type: application/json' \
        --data '{"category": "main_view", "action": "{}"}'
    ```

### 마케팅 성과 분석을 하는 기능

SDK 의 init 함수는 웹피이지 로딩마다 호출됩니다. 이때 URL 의 Query parameter 에서 광고 데이터를 수집하고 각 이벤트에 어떤 광고의 성과인지 기록해야 합니다.

```typescript
const init: () => Promise<void>
```

- 광고 데이터 수집
    - URL 에 `utm_source=aaa&utm_campaign=bbb` Query parameter 가 존재하면 광고 데이터가 `{"channel":"aaa","campaign":"bbb"}` 라고 판단합니다.
    - URL 에 `short_id=aaa` Query parameter 가 존재하면 광고 데이터가 `{"shortID": "aaa"}` 라고 판단합니다.
    - short_id 광고 데이터가 utm_source & utm_campaign 광고 데이터보다 우선순위가 높습니다.
    - 광고 데이터는 쿠키에 저장되어야 하고 서브도메인간 공유가 되어야 하며 최대 1일간 저장합니다.
- 각 이벤트에 어떤 광고의 성과인지 기록
    - 수집된 광고 데이터는 모든 trackEvent 함수 호출마다 attribute 에 추가되어야 합니다.
    - key 는 `attribution`, value 는 `광고 데이터 object` 로 추가합니다.

### SDK 사용 편의성

SDK 의 함수 init 과 trackEvent 는 아래 조건들을 만족해야 합니다.

- init 함수가 호출되지 이전에 trackEvent 함수가 호출되면 error 가 throw 합니다.
- init 함수가 호출되고 trackEvent 가 호출되면 실제 trackEvent 의 실행은 init 함수의 Promise 가 resolve 된 이후에 실행됩니다.

## 기타 조건

- 외부 라이브러리를 사용하지 않고 개발해주세요. (devDependencies 는 괜찮습니다.)
