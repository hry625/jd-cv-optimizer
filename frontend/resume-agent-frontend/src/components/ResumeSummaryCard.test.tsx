import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResumeSummaryCard from './ResumeSummaryCard';

describe('ResumeSummaryCard', () => {
  it('renders all resume fields', () => {
    const resume = {
      name: '陈思远',
      email: 'siyuan.chen@example.com',
      phone: '+86 138-0000-8888',
      city: '上海',
      degree: '硕士',
      school: '复旦大学',
      major: '计算机科学与技术',
      graduation_year: '2018',
      work_experience: '字节跳动 · 前端开发工程师',
      skills: ['React', 'TypeScript'],
      projects: '简历微调助手',
      other: 'PMP 认证',
    };

    render(<ResumeSummaryCard resume={resume as any} />);

    expect(screen.getByText('陈思远')).toBeTruthy();
    expect(screen.getByText('siyuan.chen@example.com')).toBeTruthy();
    expect(screen.getByText('字节跳动 · 前端开发工程师')).toBeTruthy();
    expect(screen.getByText('简历微调助手')).toBeTruthy();
    expect(screen.getByText('React, TypeScript')).toBeTruthy();
  });
});
