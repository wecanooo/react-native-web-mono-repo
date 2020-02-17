# Mono Repository for React Native and React Native Web

[Expo](https://expo.io/) 33.0 이상의 버전을 이용하면 React Native Web 이 built-in 되어 있어서 편하게 모바일과 웹 개발을 동시에 할 수 있지만, Expo 를 이용하게 되면 발생되는 [Limitation](https://docs.expo.io/versions/latest/introduction/why-not-expo/) 때문에 [Yarn Workspace](https://classic.yarnpkg.com/en/docs/workspaces/) 를 이용하여 Mono Repo 를 구성하고자 합니다.

### 사용되는 기술들

이 프로젝트에서는 다음과 같은 기술들이 사용됩니다.

- [Typescript](https://www.typescriptlang.org/)
- [React](https://ko.reactjs.org/)
- [React Native](https://facebook.github.io/react-native/)
- [React Native Web](https://github.com/necolas/react-native-web)
- [Mobx Lite](https://github.com/mobxjs/mobx-react-lite)
- [React Navigation](https://reactnavigation.org/)

### TODO

- [x] Mono Repo 프로젝트 생성

  - [x] package.json 생성: `$ yarn init -y`
  - [x] tsconfig.json 생성: `$ tsc --init`
  - [x] tsconfig.base.json 생성
  - [x] react-native 및 typescript 의존성 설정
  - [x] package.json 에 workspaces, scripts 설정

- [x] Package 구성

  - [x] `$ rm yarn.lock && rm -rf node_modules`
  - [x] `$ mkdir -p packages/common/src packages/mobile packages/web`

- [x] [Mobile 프로젝트 생성](https://facebook.github.io/react-native/docs/getting-started)

  - [x] `$ gem install cocoapods`
  - [x] `$ npx react-native init mobile`
  - [x] `$ rm yarn.lock && rm -rf node_modules`
  - [x] Project Root 에서 `$ yarn` 을 실행
  - [x] Packages 내의 프로젝트 내부에 있는 node_modules 에 패키지가 설치되는 것이 아니라 Project Root 의 node_modules 에 설치가 되는 것을 확인해야 합니다.
  - [x] `$ yarn add -D typescript @types/jest @types/react @types/react-native @types/react-test-renderer`

- [x] Mono Repo 구성을 위한 React Native 프로젝트 튜닝 (for iOS)

  - [x] 찾기 & 변경 기능을 통해 `../../node_modules/react-native/` 라고 되어 있는 값들을 모두 `../../../../node_modules/react-native/` 로 변경
  - [x] `metro.config.js` 파일을 다음과 같이 변경

  ```javascript
  const path = require("path");

  module.exports = {
    projectRoot: path.resolve(__dirname, "../../"),
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false
        }
      })
    }
  };
  ```

  - [x] `$ open packages/mobile/ios/myprojectname.xcodeproj/` 수행 후 `AppDelegate.m` 파일의 `jsBundleURLForBundleRoot:@"index"` 파일의 `index` 부분을 `packages/mobile/index` 로 변경
  - [x] XCode 의 `Build Phases > Bundle React Native code and Images` 설정에 다음의 값으로 변경

  ```shell
  export NODE_BINARY=node
  export EXTRA_PACKAGER_ARGS="--entry-file packages/mobile/index.js"
  ../../../node_modules/react-native/scripts/react-native-xcode.sh
  ```

  - [x] Podfile 에서 `require_relative` 항목의 경로를 수정한 뒤 `pod install` 수행
  - [x] `$ yarn workspace mobile start` 와 `$ yarn ios` 를 통해 모바일에서 실행이 되는지 확인

  ![Success](https://st-kr-tutor.s3-ap-northeast-2.amazonaws.com/got/c50d21db5ea80e61165796175e894d59/rn.png)

- [x] Mono Repo 구성을 위한 React Native 프로젝트 튜닝 (for Android)

  - [x] `packages/mobile/android/app/src/main/java/com/myprojectname/MainApplication.java` 파일의 `getJSMainModuleName` 함수의 내용을 `return "index";` 에서 `return "packages/mobile/index";` 로 변경
  - [x] `packages/mobile/android/app/build.gradle` 파일 내의 `project.ext.react =` 부분을 다음의 코드로 변경하고 `apply from:` 부분의 경로를 Project Root 로 설정

  ```
  project.ext.react = [
    entryFile: "packages/mobile/index.js",
    root: "../../../../"
  ]
  ```

  - [x] `settings.gradle` 파일의 `apply from:` 항목의 경로를 `../../../node_modules/~` 로 변경
  - [x] `$ yarn android` 로 실행이 되는지 확인 (Android Studio 다운로드 및 AVD Manager 설정에 대한 설명은 다루지 않습니다.)

  ![Success](https://st-kr-tutor.s3-ap-northeast-2.amazonaws.com/got/c50d21db5ea80e61165796175e894d59/rn_2.png)

- [x] Common Packages 와 코드 공유

  - [x] 필요한 패키지 설치 `$ yarn add react react-native`, `$ yarn add -D typescript @types/react @types/react-native rimraf`
  - [x] package.json 생성: `$ yarn init -y`

  ```json
  {
    "name": "@cosmos/common",
    "version": "0.0.1",
    "main": "dist/index.js",
    "license": "MIT",
    "scripts": {
      "postinstall": "npm run build",
      "build": "rimraf dist && tsc",
      "watch": "tsc --watch"
    },
    "dependencies": {
      "react": "^16.12.0",
      "react-native": "^0.61.5"
    },
    "devDependencies": {
      "@types/react": "^16.9.19",
      "@types/react-native": "^0.61.15",
      "rimraf": "^3.0.2",
      "typescript": "^3.7.5"
    }
  }
  ```

  - [x] tsconfig.json 생성: `$ tsc --init`

  ```json
  {
    "extends": "../../tsconfig.base.json",
    "compilerOptions": {
      "composite": true,
      "declaration": true,
      // "emitDeclarationOnly": true,
      "isolatedModules": false,
      "module": "commonjs",
      "outDir": "dist",
      "rootDir": "src",
      "experimentalDecorators": true,
      "jsx": "react",
      "typeRoots": ["@types", "../../node_modules/@types"]
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules"]
  }
  ```

- [x] React Native Web 프로젝트 생성

  - [x] CRA 로 React Project 생성 `$ cd packages && npx create-react-app web`
  - [x] React Native Web 관련 패키지 설치 `$ yarn add react-native-web react-art`
  - [x] Typescript 패키지 설치 `$ yarn add -D typescript @types/react-native @types/react @types/react-dom`
  - [x] tsconfig.json 설정 `$ tsc --init`

  ```json
  {
    "extends": "../../tsconfig.base.json",
    "compilerOptions": {
      "forceConsistentCasingInFileNames": true,
      "noEmit": true,
      "typeRoots": ["@types", "../../node_modules/@types"]
    },
    "include": ["src"],
    "references": [
      {
        "path": "../components"
      }
    ]
  }
  ```

  - [x] package.json 에 common 패키지 추가

  ```json
  {
    "dependencies": {
      ...
      "@cosmos/common": "0.0.1",
      ...
    }
  }
  ```

  - [x] src 폴더 재설치 `$ rm -rf src`, `packages/web/src/index.tsx` 파일 생성

  ```tsx
  import { AppRegistry } from "react-native";

  import { App } from "@cosmos/common";

  AppRegistry.registerComponent("cosmos", () => App);
  AppRegistry.runApplication("cosmos", {
    rootTag: document.getElementById("root")
  });
  ```

  - [x] `$ yarn start` 실행하면 웹화면을 확인할 수 있음

- [ ] Mobx 로 state 관리

  - [ ] useContext 와 mobx-react-lite 를 연동하여 store 관리
  - [ ] experimentalDecorators 적용을 위한 설정
  - [ ] observable, observer, action 연동

- [ ] React Navigation 추가

  - [ ] Bottom Tab Navigation 연동
  - [ ] Stack Navigation 연동

- [ ] API 연동

- [ ] UI Template 제작
