module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  moduleNameMapper: {
    "\\.(scss|css|sass)$": "identity-obj-proxy"
  }, 
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "<rootDir>/setuptests.ts"
  ],
 
}