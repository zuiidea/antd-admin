import { Config, configUmiAlias, createConfig } from 'umi/test';

export default async () => {
  return (
    (await configUmiAlias({
      ...createConfig({
        target: 'browser',
        jsTransformer: 'esbuild',
        jsTransformerOpts: { jsx: 'automatic' },
      }),
      // you can override umi default jest config here
      setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    })) as Config.InitialOptions
  );
};
