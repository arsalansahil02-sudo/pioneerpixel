import React, { useState } from 'react';
import {
  FileText,
  Search,
  Download,
  Bookmark,
  X,
  Upload,
} from 'lucide-react';
import type { StudyNote, Course } from '../../types';

interface StudyNotesSectionProps {
  courses: Course[];
  isNoteBookmarked: (noteId: string) => boolean;
  onToggleBookmark: (noteId: string) => void;
}

export const StudyNotesSection: React.FC<StudyNotesSectionProps> = ({
  courses,
  isNoteBookmarked,
  onToggleBookmark,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const [selectedPreviewNote, setSelectedPreviewNote] = useState<StudyNote | null>(null);

  // Collect all notes across all courses
  const allNotes: (StudyNote & { courseTitle: string; courseCode: string })[] = [];
  courses.forEach((c) => {
    c.notes.forEach((n) => {
      allNotes.push({ ...n, courseTitle: c.title, courseCode: c.code });
    });
  });

  const filteredNotes = allNotes.filter((note) => {
    const matchesSubject = selectedSubjectId === 'all' || note.courseId === selectedSubjectId;
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.topicsCovered.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search & Subject Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes by topic, keyword, or chapter..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141414] border border-[#303030] text-xs text-white placeholder-[#666666] focus:outline-none focus:border-white transition-colors"
          />
        </div>

        {/* Subject Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedSubjectId('all')}
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
              selectedSubjectId === 'all'
                ? 'bg-white text-[#080808] font-bold'
                : 'bg-[#141414] border border-[#2b2b2b] text-[#888888] hover:text-white'
            }`}
          >
            All Subjects ({allNotes.length})
          </button>
          {courses.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedSubjectId(c.id)}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                selectedSubjectId === c.id
                  ? 'bg-white text-[#080808] font-bold'
                  : 'bg-[#141414] border border-[#2b2b2b] text-[#888888] hover:text-white'
              }`}
            >
              {c.code.replace('BCA-', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Backend Future Integration Banner */}
      <div className="p-4 rounded-xl bg-[#121212] border border-[#262626] flex items-center justify-between text-xs text-[#888888]">
        <div className="flex items-center gap-2">
          <Upload className="w-4 h-4 text-white shrink-0" />
          <span>
            <strong className="text-white">PDF Upload Pipeline:</strong> The reader interface below is prepared for real university faculty PDF uploads in the future backend phase.
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#666666]">Supabase Storage Ready</span>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => {
          const isBookmarked = isNoteBookmarked(note.id);

          return (
            <div
              key={note.id}
              className="rounded-2xl bg-[#141414] border border-[#2e2e2e] p-6 hover:border-white/70 hover:bg-[#181818] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#0a0a0a] border border-[#2a2a2a] text-[#AAAAAA]">
                    {note.courseCode} • {note.chapterTitle}
                  </span>
                  <button
                    onClick={() => onToggleBookmark(note.id)}
                    type="button"
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      isBookmarked
                        ? 'bg-white text-[#080808] border-white'
                        : 'bg-[#080808] text-[#888888] hover:text-white border-[#303030]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {note.title}
                </h3>
                <p className="text-xs text-[#888888] leading-relaxed mb-4 line-clamp-2">
                  {note.description}
                </p>

                {/* Topics Covered Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {note.topicsCovered.map((topic: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0a0a0a] border border-[#222222] text-[#CCCCCC]"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-[#222222] flex items-center justify-between text-xs font-mono">
                <span className="text-[#777777]">
                  {note.pagesCount} Pages • {note.fileSize}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedPreviewNote(note)}
                    type="button"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#080808] bg-white hover:bg-[#EAEAEA] transition-colors cursor-pointer"
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12 text-[#888888] text-xs font-mono">
          No study notes match your search criteria.
        </div>
      )}

      {/* PDF Document Preview Modal */}
      {selectedPreviewNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#141414] border border-[#303030] p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setSelectedPreviewNote(null)}
              type="button"
              className="absolute top-5 right-5 p-2 text-[#888888] hover:text-white rounded-lg hover:bg-[#202020] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1c1c] border border-[#333333] text-[10px] font-mono uppercase tracking-wider text-[#D0D0D0] mb-3">
              <FileText className="w-3.5 h-3.5 text-white" />
              <span>
                Study Notes Preview • {courses.find((c) => c.id === selectedPreviewNote.courseId)?.code || selectedPreviewNote.courseId.toUpperCase()}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-1">{selectedPreviewNote.title}</h2>
            <div className="text-xs font-mono text-[#888888] mb-6">
              {selectedPreviewNote.chapterTitle} • {selectedPreviewNote.pagesCount} Pages • {selectedPreviewNote.fileSize}
            </div>

            {/* Document Sheet Simulation */}
            <div className="rounded-xl bg-[#0a0a0a] border border-[#2b2b2b] p-6 font-mono text-xs text-[#EAEAEA] leading-relaxed mb-6 space-y-4 shadow-inner">
              <div className="text-center pb-4 border-b border-[#202020]">
                <div className="text-white font-bold text-sm uppercase">{selectedPreviewNote.title}</div>
                <div className="text-[11px] text-[#777777]">Department of Computer Science • BCA Semester 1</div>
              </div>

              <div>
                <strong className="text-white block mb-1">Executive Summary:</strong>
                <p className="text-[#AAAAAA]">{selectedPreviewNote.description}</p>
              </div>

              <div>
                <strong className="text-white block mb-1">Syllabus Topics Covered:</strong>
                <ul className="list-disc pl-5 space-y-1 text-[#CCCCCC]">
                  {selectedPreviewNote.topicsCovered.map((t: string, idx: number) => (
                    <li key={idx}>{t}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-[#111111] rounded border border-[#222222] text-[#888888]">
                {selectedPreviewNote.previewContent}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-[#222222] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-[#777777] font-mono">
                Downloads will serve authenticated university PDFs.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedPreviewNote(null)}
                  type="button"
                  className="px-4 py-2 text-xs font-semibold text-[#888888] hover:text-white"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() =>
                    alert(
                      'PDF Download Action: Verified university faculty PDFs will be served directly once the backend storage bucket is connected in future phases. No broken or fake links are generated.'
                    )
                  }
                  className="px-4 py-2 text-xs font-semibold text-[#080808] bg-white hover:bg-[#EAEAEA] rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF Document</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
