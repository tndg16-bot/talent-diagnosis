const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Next.jsアプリのパスを指定して、next.config.jsと.envファイルをテスト環境で読み込む
  dir: './',
});

// Jestにカスタム設定を追加する場合は、ここに記述します
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfigを渡し、Next.jsがJestの設定を処理できるようにします
module.exports = createJestConfig(customJestConfig);
