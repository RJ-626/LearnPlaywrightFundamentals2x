import {
  Reporter,
  TestCase,
  TestResult,
  TestStep,
  FullConfig,
  Suite,
} from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

interface StepInfo {
  title: string;
  duration: number;
  status: string;
  error?: string;
  steps: StepInfo[];
}

interface TestInfo {
  title: string;
  file: string;
  suite: string;
  status: string;
  duration: number;
  error?: string;
  steps: StepInfo[];
  retry: number;
  tags: string[];
  priority: string;
  author: string;
  startTime?: string;
  endTime?: string;
  screenshotPath?: string;
  videoPath?: string;
  tracePath?: string;
}

interface ReportData {
  startTime: string;
  endTime?: string;
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  interrupted: number;
  timedOut: number;
  tests: TestInfo[];
  runId: string;
  browser: string;
  platform: string;
  workers: number;
  environment: string;
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

function getStatusIcon(status: string): string {
  switch (status) {
    case 'passed':
      return '\u2714'; // ✔
    case 'failed':
      return '\u2718'; // ✘
    case 'skipped':
      return '\u25B6'; // ▶
    case 'timedOut':
      return '\u23F1'; // ⏱
    case 'interrupted':
      return '\u26A0'; // ⚠
    default:
      return '\u25A0'; // ■
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'passed':
      return '\x1b[32m'; // green
    case 'failed':
      return '\x1b[31m'; // red
    case 'skipped':
      return '\x1b[33m'; // yellow
    case 'timedOut':
      return '\x1b[35m'; // magenta
    case 'interrupted':
      return '\x1b[33m'; // yellow
    default:
      return '\x1b[36m'; // cyan
  }
}

function extractTags(title: string): string[] {
  const matches = title.match(/@(\w+)/g);
  return matches ? matches.map((t) => t.slice(1)) : [];
}

function extractPriority(title: string): string {
  const match = title.match(/@(P\d)/);
  return match ? match[1] : 'P2';
}

class CustomReporter implements Reporter {
  private config!: FullConfig;
  private suite!: Suite;
  private results: TestInfo[] = [];
  private startTime!: Date;
  private outputDir: string;
  private runId: string;
  private browser: string = 'chromium';
  private platform: string = process.platform;

  constructor(options: { outputDir?: string } = {}) {
    this.outputDir = options.outputDir || 'custom-report';
    this.runId = `RUN${Date.now()}`;
  }

  onBegin(config: FullConfig, suite: Suite): void {
    this.config = config;
    this.suite = suite;
    this.startTime = new Date();
    this.results = [];

    // Detect browser from first project
    if (config.projects && config.projects.length > 0) {
      this.browser = config.projects[0].name || 'chromium';
    }

    // Ensure output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    console.log('\n========================================');
    console.log('      Custom Playwright Reporter');
    console.log('========================================\n');
    console.log(`Start Time: ${this.startTime.toISOString()}`);
    console.log(`Total Tests: ${suite.allTests().length}`);
    console.log(`Workers: ${config.workers}`);
    console.log('');
  }

  onTestBegin(test: TestCase): void {
    console.log(`\u25B6 ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    const steps = this.extractSteps(result.steps);

    // Build suite path from test.parent chain
    let suitePath = '';
    let parent = test.parent;
    while (parent && parent.title) {
      suitePath = parent.title + (suitePath ? ' > ' + suitePath : '');
      parent = parent.parent;
    }

    const tags = extractTags(test.title);
    const priority = extractPriority(test.title);

    // Ensure attachments subdir exists
    const attachDir = path.join(this.outputDir, 'attachments');
    if (!fs.existsSync(attachDir)) {
      fs.mkdirSync(attachDir, { recursive: true });
    }

    // Process attachments: save inline body attachments and map all to report-relative paths
    let screenshotPath: string | undefined;
    let videoPath: string | undefined;
    let tracePath: string | undefined;
    const safeName = (name: string) => name.replace(/[^a-z0-9_.-]/gi, '_');

    for (const attachment of result.attachments) {
      let relPath: string | undefined;

      if (attachment.path) {
        // File-based attachment (Playwright built-in screenshot/video/trace)
        const ext = path.extname(attachment.path) || '.bin';
        const filename = `${safeName(attachment.name)}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}${ext}`;
        const dest = path.join(attachDir, filename);
        try {
          fs.copyFileSync(attachment.path, dest);
          relPath = `attachments/${filename}`;
        } catch {
          relPath = undefined;
        }
      } else if (attachment.body) {
        // Inline body attachment (e.g. testInfo.attach with body buffer)
        const ext = attachment.contentType?.includes('png')
          ? '.png'
          : attachment.contentType?.includes('jpg') || attachment.contentType?.includes('jpeg')
          ? '.jpg'
          : attachment.contentType?.includes('zip')
          ? '.zip'
          : attachment.contentType?.includes('webm')
          ? '.webm'
          : '.bin';
        const filename = `${safeName(attachment.name)}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}${ext}`;
        const dest = path.join(attachDir, filename);
        try {
          fs.writeFileSync(dest, attachment.body);
          relPath = `attachments/${filename}`;
        } catch {
          relPath = undefined;
        }
      }

      if (!relPath) continue;

      // Classify attachment (ignore tiny metadata files)
      const nameLower = attachment.name.toLowerCase();
      const ct = (attachment.contentType || '').toLowerCase();
      const isImage = ct.includes('image/png') || ct.includes('image/jpeg') || ct.includes('image/jpg') || ct.includes('image/gif');
      const isVideo = ct.includes('video/webm') || ct.includes('video/mp4');
      const isTrace = ct.includes('application/zip') && nameLower.includes('trace');
      const isScreenshot = nameLower === 'screenshot' || nameLower.includes('screenshot');

      if (!screenshotPath && (isScreenshot || isImage)) {
        screenshotPath = relPath;
      } else if (!videoPath && isVideo) {
        videoPath = relPath;
      } else if (!tracePath && isTrace) {
        tracePath = relPath;
      }
    }

    const testInfo: TestInfo = {
      title: test.title,
      file: test.location.file,
      suite: suitePath,
      status: result.status,
      duration: result.duration,
      error: result.error?.message || result.error?.stack,
      steps,
      retry: result.retry,
      tags,
      priority,
      author: 'QA Team',
      startTime: new Date(Date.now() - result.duration).toISOString(),
      endTime: new Date().toISOString(),
      screenshotPath,
      videoPath,
      tracePath,
    };

    this.results.push(testInfo);

    // Print to console with colors
    const color = getStatusColor(result.status);
    const reset = '\x1b[0m';
    const icon = getStatusIcon(result.status);

    console.log(
      `${color}${icon} ${test.title} ${formatDuration(result.duration)}${reset}`
    );

    // Print steps
    if (steps.length > 0) {
      this.printSteps(steps, 1);
    }

    // Print error if any
    if (result.error) {
      console.log(`  ${color}Error:${reset}`);
      console.log(`    ${result.error.message || result.error.stack}`);
    }
  }

  private extractSteps(steps: TestStep[]): StepInfo[] {
    return steps.map((step) => ({
      title: step.title,
      duration: step.duration,
      status: step.error ? 'failed' : 'passed',
      error: step.error?.message || step.error?.stack,
      steps: this.extractSteps(step.steps),
    }));
  }

  private printSteps(steps: StepInfo[], level: number): void {
    const indent = '  '.repeat(level);
    for (const step of steps) {
      const color = getStatusColor(step.status);
      const reset = '\x1b[0m';
      const icon = getStatusIcon(step.status);
      console.log(`${indent}${color}${icon} ${step.title} ${formatDuration(step.duration)}${reset}`);
      if (step.error) {
        console.log(`${indent}  Error: ${step.error}`);
      }
      if (step.steps.length > 0) {
        this.printSteps(step.steps, level + 1);
      }
    }
  }

  onEnd(): void {
    const endTime = new Date();
    const passed = this.results.filter((r) => r.status === 'passed').length;
    const failed = this.results.filter((r) => r.status === 'failed').length;
    const skipped = this.results.filter((r) => r.status === 'skipped').length;
    const interrupted = this.results.filter(
      (r) => r.status === 'interrupted'
    ).length;
    const timedOut = this.results.filter(
      (r) => r.status === 'timedOut'
    ).length;

    const reportData: ReportData = {
      startTime: this.startTime.toISOString(),
      endTime: endTime.toISOString(),
      totalTests: this.results.length,
      passed,
      failed,
      skipped,
      interrupted,
      timedOut,
      tests: this.results,
      runId: this.runId,
      browser: this.browser,
      platform: this.platform,
      workers: this.config.workers || 1,
      environment: process.env.CI ? 'CI' : 'Local',
    };

    // Write JSON report
    const jsonPath = path.join(this.outputDir, 'custom-report.json');
    fs.writeFileSync(jsonPath, JSON.stringify(reportData, null, 2));

    // Write HTML report
    const htmlPath = path.join(this.outputDir, 'custom-report.html');
    fs.writeFileSync(htmlPath, this.generateHtmlReport(reportData));

    // Console summary
    console.log('\n========================================');
    console.log('           Test Run Summary');
    console.log('========================================');
    console.log(`Total:   ${this.results.length}`);
    console.log(`\x1b[32mPassed:  ${passed}\x1b[0m`);
    console.log(`\x1b[31mFailed:  ${failed}\x1b[0m`);
    console.log(`\x1b[33mSkipped: ${skipped}\x1b[0m`);
    if (interrupted > 0) console.log(`\x1b[33mInterrupted: ${interrupted}\x1b[0m`);
    if (timedOut > 0) console.log(`\x1b[35mTimed Out: ${timedOut}\x1b[0m`);
    console.log(`Duration: ${formatDuration(endTime.getTime() - this.startTime.getTime())}`);
    console.log('');
    console.log(`Reports generated:`);
    console.log(`  JSON: ${jsonPath}`);
    console.log(`  HTML: ${htmlPath}`);
    console.log('========================================\n');
  }

  private generateHtmlReport(data: ReportData): string {
    const totalDuration = new Date(data.endTime!).getTime() - new Date(data.startTime).getTime();
    const passRate = data.totalTests > 0 ? ((data.passed / data.totalTests) * 100).toFixed(1) : '0.0';
    const formattedStart = new Date(data.startTime).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Collect unique tags and priorities for filters
    const allTags = new Set<string>();
    const allPriorities = new Set<string>();
    data.tests.forEach((t) => {
      t.tags.forEach((tag) => allTags.add(tag));
      allPriorities.add(t.priority);
    });

    const getStatusBadgeClass = (status: string) => {
      switch (status) {
        case 'passed': return 'badge-passed';
        case 'failed': return 'badge-failed';
        case 'skipped': return 'badge-skipped';
        case 'timedOut': return 'badge-timedout';
        case 'interrupted': return 'badge-interrupted';
        default: return 'badge-default';
      }
    };

    const getStatusIconHtml = (status: string) => {
      switch (status) {
        case 'passed': return '<span class="status-dot green"></span>';
        case 'failed': return '<span class="status-dot red"></span>';
        case 'skipped': return '<span class="status-dot yellow"></span>';
        default: return '<span class="status-dot gray"></span>';
      }
    };

    const generateStepsHtml = (steps: StepInfo[], level: number): string => {
      if (steps.length === 0) return '';
      let html = '<ul class="steps-list">';
      for (const step of steps) {
        const isFailed = step.status === 'failed';
        const indent = level * 16;
        html += `
          <li class="step-item ${isFailed ? 'step-failed' : ''}" style="padding-left: ${indent}px;">
            <span class="step-icon">${getStatusIcon(step.status)}</span>
            <span class="step-title">${this.escapeHtml(step.title)}</span>
            <span class="step-duration">${formatDuration(step.duration)}</span>
            ${step.error ? `<div class="step-error">${this.escapeHtml(step.error)}</div>` : ''}
            ${generateStepsHtml(step.steps, level + 1)}
          </li>`;
      }
      html += '</ul>';
      return html;
    };

    // Build rows for each test
    let rowsHtml = '';
    data.tests.forEach((test, index) => {
      const rowId = `test-${index}`;
      const tagsHtml = test.tags.map((t) => `<span class="tag">${this.escapeHtml(t)}</span>`).join(' ');
      const priorityBadge = `<span class="priority-badge ${test.priority.toLowerCase()}">${this.escapeHtml(test.priority)}</span>`;
      const statusBadge = `<span class="status-badge ${getStatusBadgeClass(test.status)}">${this.escapeHtml(test.status.toUpperCase())}</span>`;
      
      // Small icon-only action buttons (relative paths since HTML is in outputDir)
      const screenshotLink = test.screenshotPath
        ? `<a href="${this.escapeHtml(test.screenshotPath)}" target="_blank" class="action-icon" title="Screenshot">📷</a>`
        : '<span class="action-icon disabled">📷</span>';
      const videoLink = test.videoPath
        ? `<a href="${this.escapeHtml(test.videoPath)}" target="_blank" class="action-icon" title="Video">🎥</a>`
        : '<span class="action-icon disabled">🎥</span>';
      const traceLink = test.tracePath
        ? `<a href="${this.escapeHtml(test.tracePath)}" target="_blank" class="action-icon" title="Trace">🔍</a>`
        : '<span class="action-icon disabled">🔍</span>';

      const stepsHtml = generateStepsHtml(test.steps, 0);
      const errorHtml = test.error
        ? `<div class="error-box"><pre>${this.escapeHtml(test.error)}</pre></div>`
        : '';

      rowsHtml += `
        <tr class="test-row ${getStatusBadgeClass(test.status)}" data-tags="${test.tags.join(',')}" data-priority="${test.priority}" data-status="${test.status}">
          <td class="cell-center cell-sr">${index + 1}</td>
          <td class="cell-suite">${this.escapeHtml(test.suite)}</td>
          <td class="cell-name">
            <div class="test-name-text">${this.escapeHtml(test.title)}</div>
            <a href="javascript:void(0)" class="log-toggle" onclick="toggleDetails('${rowId}', this)">
              <span class="toggle-arrow">▼</span> Test Logs (${this.countSteps(test.steps)})
            </a>
            <div id="${rowId}" class="details-panel" style="display:none;">
              <div class="detail-section">${stepsHtml}</div>
              ${errorHtml}
            </div>
          </td>
          <td class="cell-author">${this.escapeHtml(test.author)}</td>
          <td class="cell-center">${priorityBadge}</td>
          <td class="cell-tags">${tagsHtml}</td>
          <td class="cell-file">${this.escapeHtml(test.file)}</td>
          <td class="cell-center cell-time">${test.startTime ? new Date(test.startTime).toLocaleTimeString() : '-'}</td>
          <td class="cell-center cell-time">${test.endTime ? new Date(test.endTime).toLocaleTimeString() : '-'}</td>
          <td class="cell-center">${formatDuration(test.duration)}</td>
          <td class="cell-center">${statusBadge}</td>
          <td class="cell-center cell-action">${screenshotLink}</td>
          <td class="cell-center cell-action">${videoLink}</td>
          <td class="cell-center cell-action">${traceLink}</td>
        </tr>`;
    });

    // Build priority filter badges
    const priorityFilters = Array.from(allPriorities).sort();
    let priorityFilterHtml = '<span class="filter-badge active" onclick="filterPriority(\'all\', this)">All</span>';
    priorityFilters.forEach((p) => {
      priorityFilterHtml += `<span class="filter-badge" onclick="filterPriority('${p}', this)">${p}</span>`;
    });

    // Build tag filter badges (common tags)
    const tagFilters = Array.from(allTags).filter((t) => !t.startsWith('P')).sort();
    tagFilters.forEach((t) => {
      priorityFilterHtml += `<span class="filter-badge tag-filter" onclick="filterTag('${t}', this)">${t}</span>`;
    });

    // Build status filter badges
    const statusFilterHtml = `
      <span class="filter-badge active" onclick="filterStatus('all', this)">All</span>
      <span class="filter-badge" onclick="filterStatus('passed', this)">✔ Passed</span>
      <span class="filter-badge" onclick="filterStatus('failed', this)">✘ Failed</span>
      <span class="filter-badge" onclick="filterStatus('skipped', this)">▶ Skipped</span>
    `;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Custom Playwright Report</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: #f0f4f8;
      color: #333;
    }
    .header {
      background: linear-gradient(135deg, #0d9488 0%, #059669 100%);
      color: white;
      padding: 28px 40px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .header h1 {
      font-size: 26px;
      font-weight: 600;
      margin-bottom: 4px;
      letter-spacing: 0.5px;
    }
    .header .subtitle {
      font-size: 13px;
      opacity: 0.85;
      font-weight: 300;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
    }
    .summary-cards {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 14px;
      margin-bottom: 18px;
    }
    @media (max-width: 1100px) {
      .summary-cards { grid-template-columns: repeat(3, 1fr); }
    }
    @media (max-width: 600px) {
      .summary-cards { grid-template-columns: repeat(2, 1fr); }
    }
    .summary-card {
      background: white;
      border-radius: 10px;
      padding: 18px 12px;
      text-align: center;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
      border-top: 3px solid #e5e7eb;
      transition: transform 0.2s;
    }
    .summary-card:hover { transform: translateY(-2px); }
    .summary-card .value {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .summary-card .label {
      font-size: 10px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      font-weight: 600;
    }
    .card-total { border-top-color: #374151; }
    .card-total .value { color: #374151; }
    .card-passed { border-top-color: #10b981; }
    .card-passed .value { color: #10b981; }
    .card-failed { border-top-color: #ef4444; }
    .card-failed .value { color: #ef4444; }
    .card-skipped { border-top-color: #f59e0b; }
    .card-skipped .value { color: #f59e0b; }
    .card-rate { border-top-color: #3b82f6; }
    .card-rate .value { color: #3b82f6; }
    .card-duration { border-top-color: #8b5cf6; }
    .card-duration .value { color: #8b5cf6; }

    .meta-bar {
      background: white;
      border-radius: 8px;
      padding: 10px 16px;
      margin-bottom: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
      font-size: 12px;
    }
    .meta-label {
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      font-size: 9px;
      letter-spacing: 0.6px;
    }
    .meta-badge {
      background: #f3f4f6;
      border-radius: 20px;
      padding: 3px 10px;
      font-size: 11px;
      color: #374151;
      font-weight: 500;
      border: 1px solid #e5e7eb;
    }
    .meta-badge.green { background: #d1fae5; color: #065f46; border-color: #a7f3d0; }
    .meta-badge.blue { background: #dbeafe; color: #1e40af; border-color: #bfdbfe; }
    .meta-badge.purple { background: #ede9fe; color: #5b21b6; border-color: #ddd6fe; }

    .filter-bar {
      background: white;
      border-radius: 8px;
      padding: 10px 16px;
      margin-bottom: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }
    .filter-section {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }
    .filter-badge {
      background: #f3f4f6;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 4px 12px;
      font-size: 11px;
      color: #4b5563;
      cursor: pointer;
      transition: all 0.2s;
      user-select: none;
    }
    .filter-badge:hover {
      background: #e5e7eb;
      border-color: #d1d5db;
    }
    .filter-badge.active {
      background: #10b981;
      color: white;
      border-color: #10b981;
      font-weight: 600;
    }
    .filter-badge.tag-filter {
      background: #eff6ff;
      border-color: #bfdbfe;
      color: #1d4ed8;
    }
    .filter-badge.tag-filter:hover { background: #dbeafe; }

    .table-wrap {
      background: white;
      border-radius: 10px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }
    thead th {
      background: #1f2937;
      padding: 10px 8px;
      text-align: left;
      font-weight: 600;
      color: #f9fafb;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      border-bottom: 2px solid #374151;
      white-space: nowrap;
    }
    thead th.cell-center { text-align: center; }
    tbody tr {
      border-bottom: 1px solid #f3f4f6;
      transition: background 0.15s;
    }
    tbody tr:hover { background: #f9fafb; }
    tbody td {
      padding: 10px 8px;
      vertical-align: middle;
      color: #374151;
    }
    tbody td.cell-center { text-align: center; }
    .cell-sr {
      font-weight: 600;
      color: #6b7280;
      font-size: 11px;
    }
    .cell-suite {
      max-width: 160px;
      font-size: 11px;
      color: #6b7280;
    }
    .cell-name { 
      min-width: 240px; 
      max-width: 400px;
    }
    .test-name-text {
      font-weight: 500;
      font-size: 12px;
      margin-bottom: 4px;
      word-break: break-word;
      line-height: 1.4;
    }
    .cell-author {
      font-size: 11px;
      color: #6b7280;
      white-space: nowrap;
    }
    .cell-tags {
      max-width: 140px;
    }
    .cell-file {
      max-width: 180px;
      font-size: 10px;
      color: #9ca3af;
      word-break: break-all;
    }
    .cell-time {
      font-size: 10px;
      color: #6b7280;
      white-space: nowrap;
    }
    .cell-action {
      padding: 6px 4px !important;
    }

    .priority-badge {
      display: inline-block;
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
    }
    .priority-badge.p0 { background: #fee2e2; color: #991b1b; }
    .priority-badge.p1 { background: #fef3c7; color: #92400e; }
    .priority-badge.p2 { background: #e0e7ff; color: #3730a3; }
    .priority-badge.p3 { background: #d1fae5; color: #065f46; }

    .status-badge {
      display: inline-block;
      border-radius: 20px;
      padding: 3px 10px;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .badge-passed { background: #d1fae5; color: #065f46; }
    .badge-failed { background: #fee2e2; color: #991b1b; }
    .badge-skipped { background: #fef3c7; color: #92400e; }
    .badge-timedout { background: #ede9fe; color: #5b21b6; }
    .badge-interrupted { background: #ffedd5; color: #9a3412; }
    .badge-default { background: #f3f4f6; color: #4b5563; }

    .status-dot {
      display: inline-block;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      margin-right: 4px;
    }
    .status-dot.green { background: #10b981; }
    .status-dot.red { background: #ef4444; }
    .status-dot.yellow { background: #f59e0b; }
    .status-dot.gray { background: #9ca3af; }

    .tag {
      display: inline-block;
      background: #eff6ff;
      color: #1d4ed8;
      border-radius: 12px;
      padding: 1px 7px;
      font-size: 10px;
      margin: 1px;
      font-weight: 500;
    }

    .action-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 6px;
      background: #f3f4f6;
      text-decoration: none;
      font-size: 12px;
      transition: all 0.2s;
      cursor: pointer;
      border: none;
    }
    .action-icon:hover { background: #e5e7eb; }
    .action-icon.disabled {
      opacity: 0.3;
      cursor: not-allowed;
      pointer-events: none;
    }

    .log-toggle {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      color: #059669;
      text-decoration: none;
      cursor: pointer;
      margin-top: 2px;
      font-weight: 500;
    }
    .log-toggle:hover { color: #047857; }
    .toggle-arrow {
      font-size: 9px;
      transition: transform 0.2s;
    }

    .details-panel {
      margin-top: 8px;
      padding: 10px 12px;
      background: #f8fafc;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
      font-size: 11px;
    }
    .detail-section {
      margin-bottom: 6px;
    }
    .detail-section:last-child { margin-bottom: 0; }

    .steps-list {
      list-style: none;
      padding: 0;
      margin: 4px 0 0 0;
    }
    .step-item {
      padding: 3px 0;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 5px;
      border-bottom: 1px solid #f1f5f9;
      font-size: 11px;
    }
    .step-item:last-child { border-bottom: none; }
    .step-item.step-failed { color: #dc2626; }
    .step-icon { font-size: 10px; width: 16px; text-align: center; }
    .step-title { flex: 1; color: #475569; }
    .step-duration {
      font-size: 10px;
      color: #94a3b8;
      white-space: nowrap;
    }
    .step-error {
      width: 100%;
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 4px;
      padding: 5px 8px;
      margin-top: 3px;
      color: #dc2626;
      font-size: 10px;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .error-box {
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 6px;
      padding: 8px;
      margin-top: 6px;
      color: #dc2626;
      font-size: 11px;
    }
    .error-box pre {
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }

    .hidden-row { display: none !important; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🧪 Custom Playwright Report</h1>
    <div class="subtitle">The Testing Academy — Playwright Framework</div>
  </div>

  <div class="container">
    <div class="summary-cards">
      <div class="summary-card card-total">
        <div class="value">${data.totalTests}</div>
        <div class="label">Total Tests</div>
      </div>
      <div class="summary-card card-passed">
        <div class="value">${data.passed}</div>
        <div class="label">Passed</div>
      </div>
      <div class="summary-card card-failed">
        <div class="value">${data.failed}</div>
        <div class="label">Failed</div>
      </div>
      <div class="summary-card card-skipped">
        <div class="value">${data.skipped}</div>
        <div class="label">Skipped</div>
      </div>
      <div class="summary-card card-rate">
        <div class="value">${passRate}%</div>
        <div class="label">Pass Rate</div>
      </div>
      <div class="summary-card card-duration">
        <div class="value">${formatDuration(totalDuration)}</div>
        <div class="label">Duration</div>
      </div>
    </div>

    <div class="meta-bar">
      <span class="meta-label">Environment</span>
      <span class="meta-badge green">${this.escapeHtml(data.environment)}</span>
      <span class="meta-label">Browser</span>
      <span class="meta-badge blue">${this.escapeHtml(data.browser.toUpperCase())}</span>
      <span class="meta-label">Platform</span>
      <span class="meta-badge purple">${this.escapeHtml(data.platform)}</span>
      <span class="meta-label">Workers</span>
      <span class="meta-badge">${data.workers}</span>
      <span class="meta-label">Run ID</span>
      <span class="meta-badge">${this.escapeHtml(data.runId)}</span>
      <span class="meta-label">Started</span>
      <span class="meta-badge">${formattedStart}</span>
    </div>

    <div class="filter-bar">
      <div class="filter-section">
        <span class="meta-label">Priority</span>
        ${priorityFilterHtml}
      </div>
      <div style="width:1px;height:20px;background:#e5e7eb;margin:0 6px;"></div>
      <div class="filter-section">
        <span class="meta-label">Status</span>
        ${statusFilterHtml}
      </div>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th class="cell-center">Sr No</th>
            <th>Suite</th>
            <th>Test Name</th>
            <th>Author</th>
            <th class="cell-center">Priority</th>
            <th>Tags</th>
            <th>File</th>
            <th class="cell-center">Start Time</th>
            <th class="cell-center">End Time</th>
            <th class="cell-center">Duration</th>
            <th class="cell-center">Status</th>
            <th class="cell-center">Screenshot</th>
            <th class="cell-center">Video</th>
            <th class="cell-center">Trace</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
  </div>

  <script>
    let currentPriority = 'all';
    let currentStatus = 'all';
    let currentTag = 'all';

    function applyFilters() {
      const rows = document.querySelectorAll('.test-row');
      rows.forEach(row => {
        const p = row.getAttribute('data-priority');
        const s = row.getAttribute('data-status');
        const t = row.getAttribute('data-tags') || '';
        const tags = t.split(',');
        let show = true;
        if (currentPriority !== 'all' && p !== currentPriority) show = false;
        if (currentStatus !== 'all' && s !== currentStatus) show = false;
        if (currentTag !== 'all' && !tags.includes(currentTag)) show = false;
        row.classList.toggle('hidden-row', !show);
      });
    }

    function filterPriority(val, el) {
      currentPriority = val;
      currentTag = 'all';
      document.querySelectorAll('.filter-bar .filter-badge').forEach(b => b.classList.remove('active'));
      el.classList.add('active');
      applyFilters();
    }

    function filterStatus(val, el) {
      currentStatus = val;
      document.querySelectorAll('.filter-bar .filter-badge').forEach(b => b.classList.remove('active'));
      el.classList.add('active');
      applyFilters();
    }

    function filterTag(val, el) {
      currentTag = val;
      currentPriority = 'all';
      document.querySelectorAll('.filter-bar .filter-badge').forEach(b => b.classList.remove('active'));
      el.classList.add('active');
      applyFilters();
    }

    function toggleDetails(id, btn) {
      const el = document.getElementById(id);
      const arrow = btn.querySelector('.toggle-arrow');
      if (el.style.display === 'none') {
        el.style.display = 'block';
        arrow.textContent = '▲';
      } else {
        el.style.display = 'none';
        arrow.textContent = '▼';
      }
    }
  </script>
</body>
</html>`;
  }

  private countSteps(steps: StepInfo[]): number {
    let count = steps.length;
    for (const step of steps) {
      count += this.countSteps(step.steps);
    }
    return count;
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

export default CustomReporter;
