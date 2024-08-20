# Node.js 이미지 사용
FROM node:14

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json을 복사
COPY package*.json ./

# node_modules 존재 여부 확인 및 npm install 실행
# RUN if [ ! -d "./node_modules" ]; then npm install; fi
RUN npm install

# 애플리케이션 소스 코드를 복사
COPY . .

# 서버 시작
CMD ["node", "src/server.js"]