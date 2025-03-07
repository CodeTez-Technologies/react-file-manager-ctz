import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	splitting: false,
	sourcemap: 'external',
	clean: true,
	format: ['cjs', 'esm'],
	dts: true,
	minify: true,
	name: 'react-file-manager',
});
