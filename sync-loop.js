/**
 * Sync paper trading state to GitHub every 2 minutes
 */

import { execSync } from 'child_process';
import fs from 'fs';

const SOURCE = '/Users/openclaw/Desktop/polymarket-bot-v2/data/paper-state.json';
const DEST = '/Users/openclaw/Desktop/polymarket-dashboard/state.json';

async function sync() {
  try {
    // Copy state
    if (fs.existsSync(SOURCE)) {
      fs.copyFileSync(SOURCE, DEST);
      console.log(`[${new Date().toLocaleTimeString()}] Copied state`);
    } else {
      console.log(`[${new Date().toLocaleTimeString()}] No state file yet`);
      return;
    }
    
    // Git push
    process.chdir('/Users/openclaw/Desktop/polymarket-dashboard');
    execSync('git add state.json', { stdio: 'pipe' });
    
    try {
      execSync(`git commit -m "Update ${new Date().toLocaleTimeString()}"`, { stdio: 'pipe' });
      execSync('git push origin main', { stdio: 'pipe' });
      console.log(`[${new Date().toLocaleTimeString()}] Pushed to GitHub`);
    } catch (e) {
      // No changes or push failed
      console.log(`[${new Date().toLocaleTimeString()}] No changes to push`);
    }
  } catch (e) {
    console.error('Sync error:', e.message);
  }
}

// Initial sync
sync();

// Sync every 2 minutes
setInterval(sync, 120000);

console.log('📊 Dashboard sync started - updating every 2 minutes');
