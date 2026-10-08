import {
  FileText, Upload, Sparkles, AlertCircle, Loader2, X, FileCheck,
} from 'lucide-react';
import { useRef, useState, useCallback } from 'react';
import { useApp } from '@/hooks/useApp';
import { analyzeResume } from '@/services/analysisEngine';
import { saveAnalysis } from '@/services/storage';
import { extractPdfText, extractTxtText } from '@/utils/pdf';
import { SAMPLE_RESUME_TEXT, SAMPLE_RESUME_NAME } from '@/data/sampleResume';
import { Card, CardHeader } from '@/components/Card';
import { EmptyState } from '@/components/EmptyState';
import { wordCount } from '@/utils/helpers';

export function AnalyzerPage() {
  const { analysis, setAnalysis, isAnalyzing, setIsAnalyzing, showToast, navigate } = useApp();
  const [resumeText, setResumeText] = useState(analysis?.rawText || '');
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supportedTypes = ['application/pdf', 'text/plain'];

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    setFileName(file.name);

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isTxt = file.type === 'text/plain' || file.name.toLowerCase().endsWith('.txt');

    if (!isPdf && !isTxt) {
      setError('Unsupported file type. Please upload a PDF or TXT file.');
      showToast('error', 'Unsupported file type. Use PDF or TXT.');
      return;
    }

    try {
      if (isPdf) {
        showToast('info', 'Extracting text from PDF...');
        const text = await extractPdfText(file);
        if (!text || text.trim().length < 20) {
          setError('PDF text extraction found very little text. The PDF might be image-based. Try pasting your resume text manually.');
          showToast('warning', 'PDF extraction found little text. Try manual paste.');
          return;
        }
        setResumeText(text);
        showToast('success', `Extracted ${wordCount(text)} words from PDF.`);
      } else {
        const text = await extractTxtText(file);
        if (!text || text.trim().length < 10) {
          setError('The text file appears to be empty.');
          showToast('error', 'Text file is empty.');
          return;
        }
        setResumeText(text);
        showToast('success', `Loaded ${wordCount(text)} words from text file.`);
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      setError(`Failed to read file: ${message}. Try pasting your resume text manually.`);
      showToast('error', 'File reading failed. Try manual paste.');
    }
  }, [showToast]);

  const handleAnalyze = useCallback(() => {
    setError(null);

    if (!resumeText.trim()) {
      setError('Please upload a resume or paste your resume text before analyzing.');
      showToast('error', 'No resume text to analyze.');
      return;
    }

    if (wordCount(resumeText) < 20) {
      setError('Your resume text is very short. Please add more content for a meaningful analysis.');
      showToast('warning', 'Resume text is too short.');
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      try {
        const result = analyzeResume(resumeText);
        setAnalysis(result);
        saveAnalysis(result);
        setIsAnalyzing(false);
        showToast('success', `Analysis complete! Score: ${result.overallScore}/100`);
        navigate('dashboard');
      } catch (e) {
        setIsAnalyzing(false);
        const message = e instanceof Error ? e.message : 'Unknown error';
        setError(`Analysis failed: ${message}`);
        showToast('error', 'Analysis failed. Please try again.');
      }
    }, 1500);
  }, [resumeText, setIsAnalyzing, setAnalysis, showToast, navigate]);

  const loadDemo = useCallback(() => {
    setResumeText(SAMPLE_RESUME_TEXT);
    setFileName(SAMPLE_RESUME_NAME);
    setError(null);
    showToast('info', 'Demo resume loaded. Click Analyze to see results.');
  }, [showToast]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Resume Analyzer</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Upload your resume or paste the text to get instant analysis
        </p>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader title="Upload Resume" subtitle="PDF or TXT file" icon={Upload} />
        <div className="p-5">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
              dragOver
                ? 'border-blue-500 bg-blue-500/5 scale-[1.01]'
                : 'border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-slate-700 dark:text-slate-300 font-medium">
              Drag & drop your resume here
            </p>
            <p className="text-sm text-slate-400 mt-1">
              or click to browse — PDF or TXT files
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.txt,application/pdf,text/plain"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
                e.target.value = '';
              }}
            />
          </div>
          {fileName && (
            <div className="flex items-center gap-3 mt-4 px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <FileCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span className="text-sm text-slate-700 dark:text-slate-300 flex-1 truncate">{fileName}</span>
              <button
                onClick={() => { setFileName(null); setResumeText(''); }}
                className="text-slate-400 hover:text-rose-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </Card>

      {/* Paste Text */}
      <Card>
        <CardHeader title="Resume Text" subtitle="Extracted or pasted content" icon={FileText} />
        <div className="p-5">
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here..."
            className="w-full h-64 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm text-slate-700 dark:text-slate-300 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono"
          />
          <div className="flex items-center justify-between mt-3 text-sm">
            <span className="text-slate-400">
              {wordCount(resumeText)} words · {resumeText.length} characters
            </span>
            {resumeText && (
              <button
                onClick={() => { setResumeText(''); setFileName(null); setError(null); }}
                className="text-slate-400 hover:text-rose-500 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm animate-slide-up">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !resumeText.trim()}
          className="flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold text-base hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Analyze Resume
            </>
          )}
        </button>
        <button
          onClick={loadDemo}
          disabled={isAnalyzing}
          className="px-6 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-base hover:bg-slate-50 dark:hover:bg-slate-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-violet-500" />
          Try Demo Analysis
        </button>
      </div>

      {/* No Analysis Empty State */}
      {!analysis && !isAnalyzing && (
        <Card>
          <EmptyState
            icon={FileText}
            title="No Analysis Yet"
            description="Upload your resume or try the demo analysis to see your career insights come to life."
            actionLabel="Try Demo Analysis"
            onAction={loadDemo}
          />
        </Card>
      )}

      {/* Loading State */}
      {isAnalyzing && (
        <Card>
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-800" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-violet-500 animate-spin" />
            </div>
            <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mt-6">Analyzing your resume...</p>
            <p className="text-sm text-slate-400 mt-2">Detecting skills, scoring, and matching careers</p>
          </div>
        </Card>
      )}
    </div>
  );
}
