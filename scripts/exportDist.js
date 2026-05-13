const { execSync } = require('child_process');
const fs = require('fs');

function run(cmd) {
  console.log('> ' + cmd);
  execSync(cmd, { stdio: 'inherit' });
}

try {
  // Build the Next app
  run('npx next build');

  const outDir = 'out';
  const distDir = 'dist';

  // Remove existing dist if present
  if (fs.existsSync(distDir)) {
    console.log('Removing existing dist/');
    fs.rmSync(distDir, { recursive: true, force: true });
  }

  // Rename/move `out` to `dist`
  if (fs.existsSync(outDir)) {
    fs.renameSync(outDir, distDir);
    console.log('Export complete — dist/ created.');
  } else {
    console.error('Export failed: out/ not found.');
    process.exit(1);
  }
} catch (err) {
  console.error('Build/export failed:', err);
  process.exit(1);
}
