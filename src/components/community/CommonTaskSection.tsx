import React, { useState } from 'react';
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  ExternalLink,
  Edit2,
  X,
  Send,
  History,
  Archive,
  Download,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useCommunity } from '../../hooks/useCommunity';
import { compressImage } from '../../utils/imageCompression';

export const CommonTaskSection: React.FC = () => {
  const {
    commonTask,
    previousTasks,
    currentUser,
    students,
    isAdmin,
    submitCommonTask,
    toggleCommonTaskCompletion,
    updateCommonTask,
    archiveCurrentTask,
  } = useCommunity();

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submissionText, setSubmissionText] = useState(
    currentUser?.commonTaskSubmission?.text || ''
  );
  const [submissionLink, setSubmissionLink] = useState(
    currentUser?.commonTaskSubmission?.link || ''
  );
  const [submissionImage, setSubmissionImage] = useState<string | null>(null);

  // Admin edit task modal
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [editTitle, setEditTitle] = useState(commonTask.title);
  const [editDesc, setEditDesc] = useState(commonTask.description);
  const [editDeadline, setEditDeadline] = useState(commonTask.deadline);
  const [editReqs, setEditReqs] = useState(commonTask.requirements.join('\n'));

  // Expandable state for previous tasks
  const [expandedPreviousTaskId, setExpandedPreviousTaskId] = useState<string | null>(null);

  const completedStudents = students.filter((s) => s.completedCommonTask);
  const pendingStudents = students.filter((s) => !s.completedCommonTask);
  const isDone = currentUser?.completedCommonTask || false;

  // Direct Image upload from device with auto-compression
  const handleProofImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressed = await compressImage(file, 800, 800, 0.75);
      setSubmissionImage(compressed);
    } catch (err) {
      console.warn('Proof image compression failed', err);
    }
  };

  const handleDownloadProofImage = () => {
    if (!submissionImage) return;
    const link = document.createElement('a');
    link.href = submissionImage;
    link.download = `common_task_proof_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    submitCommonTask(submissionText, submissionLink);
    setShowSubmitModal(false);
  };

  const handleSaveAdminTask = (e: React.FormEvent) => {
    e.preventDefault();
    const requirements = editReqs
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    updateCommonTask({
      title: editTitle.trim(),
      description: editDesc.trim(),
      deadline: editDeadline.trim(),
      requirements,
    });
    setShowEditTaskModal(false);
  };

  const handleArchiveCurrent = () => {
    if (window.confirm('Archive current task and add it to Previous Tasks list?')) {
      archiveCurrentTask();
    }
  };

  return (
    <div className="py-10 bg-[#FFFFFF] min-h-screen text-[#080808]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#E5E7EB] mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F4F6] border border-[#D1D5DB] text-[10px] font-mono uppercase tracking-wider text-[#080808] mb-3">
              <CheckSquare className="w-3 h-3 text-[#080808]" />
              <span>Unified Community Challenge</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#080808] tracking-tight">
              Community Common Task
            </h1>
            <p className="text-xs sm:text-sm text-[#555555] mt-1">
              One shared practical task assigned to all students to ensure collective skill development.
            </p>
          </div>

          {isAdmin && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleArchiveCurrent}
                type="button"
                className="px-3.5 py-2 rounded-xl bg-[#FFFFFF] hover:bg-[#F3F4F6] border border-[#D1D5DB] text-xs font-semibold text-[#080808] flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="Archive current task into previous tasks list"
              >
                <Archive className="w-3.5 h-3.5 text-[#555555]" />
                <span className="hidden sm:inline">Archive Task</span>
              </button>

              <button
                onClick={() => {
                  setEditTitle(commonTask.title);
                  setEditDesc(commonTask.description);
                  setEditDeadline(commonTask.deadline);
                  setEditReqs(commonTask.requirements.join('\n'));
                  setShowEditTaskModal(true);
                }}
                type="button"
                className="px-4 py-2 rounded-xl bg-[#080808] hover:bg-[#222222] text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Edit2 className="w-3.5 h-3.5 text-white" />
                <span>Edit Task (Admin)</span>
              </button>
            </div>
          )}
        </div>

        {/* 1. THE MAIN CURRENT COMMON TASK CARD */}
        {commonTask.title ? (
          <div className="rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] p-6 sm:p-10 mb-10 shadow-sm">
            {/* Top Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E7EB] mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#080808] border border-[#080808] flex items-center justify-center text-white shrink-0 shadow-sm">
                  <CheckSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#666666] font-semibold">
                    Assigned by {commonTask.assignedBy || 'Admin'}
                  </span>
                  <div className="text-xs font-mono text-[#080808] flex items-center gap-1 mt-0.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#666666]" />
                    <span>
                      Deadline: <strong>{commonTask.deadline || 'TBD'}</strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Completion Status Badge */}
              <div className="flex items-center gap-3">
                {isDone ? (
                  <div className="px-3.5 py-1.5 rounded-full bg-[#080808] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 fill-white text-[#080808]" />
                    <span>You Have Completed This Task</span>
                  </div>
                ) : (
                  <div className="px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#D1D5DB] text-[#666666] text-xs font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#888888]" />
                    <span>Pending Your Submission</span>
                  </div>
                )}
              </div>
            </div>

            {/* Task Title & Description */}
            <h2 className="text-xl sm:text-2xl font-bold text-[#080808] mb-4">
              {commonTask.title}
            </h2>

            <p className="text-xs sm:text-sm text-[#333333] leading-relaxed mb-8 whitespace-pre-line bg-[#FFFFFF] p-5 rounded-2xl border border-[#E5E7EB]">
              {commonTask.description}
            </p>

            {/* Requirements Checklist */}
            {commonTask.requirements.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#080808] mb-3">
                  Step-by-Step Task Requirements:
                </h3>

                <div className="space-y-2">
                  {commonTask.requirements.map((req, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E5E7EB] flex items-start gap-3 text-xs text-[#080808]"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#080808] text-white flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed font-medium">{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Student's Submission Info (if completed) */}
            {currentUser?.commonTaskSubmission && (
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#D1D5DB] mb-6 text-xs shadow-xs">
                <div className="text-[10px] font-mono uppercase text-[#666666] font-semibold mb-1">
                  Your Submitted Notes:
                </div>
                <p className="text-[#080808] mb-2 leading-relaxed">
                  {currentUser.commonTaskSubmission.text}
                </p>
                {currentUser.commonTaskSubmission.link && (
                  <a
                    href={currentUser.commonTaskSubmission.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#080808] underline hover:text-[#555555]"
                  >
                    <span>{currentUser.commonTaskSubmission.link}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}

            {/* Main Completion Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-[#E5E7EB]">
              <div className="text-xs font-mono text-[#666666]">
                {completedStudents.length} of {students.length} students have marked this completed.
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowSubmitModal(true)}
                  type="button"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#080808] text-white hover:bg-[#222222] text-xs font-bold transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isDone ? 'Update Submission' : 'Submit & Complete Task'}</span>
                </button>

                {isDone && (
                  <button
                    onClick={toggleCommonTaskCompletion}
                    type="button"
                    className="px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F3F4F6] border border-[#D1D5DB] text-xs font-mono text-[#666666] hover:text-[#080808] cursor-pointer"
                    title="Toggle status"
                  >
                    Mark Incomplete
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl bg-[#F9FAFB] border border-[#E5E7EB] p-8 sm:p-12 text-center text-[#080808] mb-10">
            <div className="w-12 h-12 rounded-2xl bg-[#FFFFFF] border border-[#D1D5DB] flex items-center justify-center text-[#080808] mx-auto mb-3 shadow-xs">
              <CheckSquare className="w-6 h-6 text-[#888888]" />
            </div>
            <h2 className="text-xl font-bold text-[#080808] mb-1">No Active Common Task</h2>
            <p className="text-xs text-[#666666] max-w-md mx-auto mb-5 leading-relaxed">
              There is currently no common challenge assigned to students across the community.
            </p>
            {isAdmin && (
              <button
                onClick={() => {
                  setEditTitle('');
                  setEditDesc('');
                  setEditDeadline('');
                  setEditReqs('');
                  setShowEditTaskModal(true);
                }}
                type="button"
                className="px-5 py-2.5 rounded-xl bg-[#080808] text-white font-bold text-xs hover:bg-[#222222] cursor-pointer shadow-sm"
              >
                + Create & Broadcast Common Task
              </button>
            )}
          </div>
        )}

        {/* 2. COMPLETION STATUS BREAKDOWN TABLE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Completed Students Column */}
          <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#080808]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#080808]">
                  Completed ({completedStudents.length})
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#666666]">Verified</span>
            </div>

            <div className="space-y-2">
              {completedStudents.map((st) => (
                <div
                  key={st.id}
                  className="p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#080808]" />
                    <span className="font-semibold text-[#080808]">{st.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#666666]">
                    {st.commonTaskSubmission?.submittedAt || 'Done'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Students Column */}
          <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#888888]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#666666]">
                  Pending Submissions ({pendingStudents.length})
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#888888]">In Progress</span>
            </div>

            <div className="space-y-2">
              {pendingStudents.map((st) => (
                <div
                  key={st.id}
                  className="p-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-between text-xs text-[#666666]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#CCCCCC]" />
                    <span>{st.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#888888]">Pending</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. PREVIOUS COMMON TASKS ARCHIVE (NEW REQUIREMENT) */}
        <div className="pt-8 border-t border-[#E5E7EB]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F4F6] border border-[#D1D5DB] text-[10px] font-mono uppercase tracking-wider text-[#080808] mb-2">
                <History className="w-3 h-3 text-[#080808]" />
                <span>Task History & Past Challenges</span>
              </div>
              <h2 className="text-2xl font-bold text-[#080808] tracking-tight">
                Previous Tasks Archive
              </h2>
              <p className="text-xs text-[#555555]">
                Review all past challenges assigned by the admin and examine their completion requirements.
              </p>
            </div>
            <span className="text-xs font-mono text-[#666666]">
              {previousTasks.length} Completed Tasks Archived
            </span>
          </div>

          {previousTasks.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#888888] font-mono bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB]">
              No archived past tasks yet.
            </div>
          ) : (
            <div className="space-y-4">
              {previousTasks.map((task) => {
                const isExpanded = expandedPreviousTaskId === task.id;

                return (
                  <div
                    key={task.id}
                    className="rounded-2xl bg-[#FFFFFF] border border-[#E5E7EB] p-5 transition-all shadow-xs hover:border-[#080808]"
                  >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#F3F4F6] border border-[#D1D5DB] flex items-center justify-center text-[#080808] shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-[#080808]" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-[#080808]">
                          {task.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-[#666666] mt-1">
                          <span>Completed on: <strong>{task.completedDate}</strong></span>
                          <span>•</span>
                          <span>Assigned by: {task.assignedBy}</span>
                          <span>•</span>
                          <span className="text-[#080808] font-bold">
                            {task.submissionsCount} Students Submitted
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        setExpandedPreviousTaskId(isExpanded ? null : task.id)
                      }
                      type="button"
                      className="px-3 py-1.5 rounded-lg bg-[#F9FAFB] hover:bg-[#F3F4F6] border border-[#D1D5DB] text-xs font-mono text-[#080808] inline-flex items-center gap-1.5 self-start sm:self-center cursor-pointer transition-colors"
                    >
                      <span>{isExpanded ? 'Hide Details' : 'View Requirements'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-[#E5E7EB] space-y-3 text-xs animate-in fade-in duration-150">
                      <p className="text-[#555555] leading-relaxed bg-[#F9FAFB] p-4 rounded-xl border border-[#E5E7EB]">
                        {task.description}
                      </p>

                      <div>
                        <div className="text-[10px] font-mono uppercase font-bold text-[#666666] mb-2">
                          Archived Requirements:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {task.requirements.map((req, rIdx) => (
                            <div
                              key={rIdx}
                              className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#E5E7EB] text-[#080808] text-[11px] flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#080808] shrink-0" />
                              <span>{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        </div>

        {/* MODAL: SUBMIT COMMON TASK WITH DIRECT IMAGE UPLOAD */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="relative w-full max-w-lg rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] p-6 sm:p-8 text-[#080808] shadow-2xl">
              <button
                onClick={() => setShowSubmitModal(false)}
                type="button"
                className="absolute top-5 right-5 text-[#666666] hover:text-[#080808] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-[#080808] mb-1">Submit Common Task Proof</h3>
              <p className="text-xs text-[#555555] mb-6">
                Share what you completed, attach a screenshot directly from your device, and provide your project link.
              </p>

              <form onSubmit={handleSubmitProof} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    What did you complete? (Summary)
                  </label>
                  <textarea
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    rows={3}
                    required
                    placeholder="e.g. Created single-page portfolio using HTML & CSS, pushed to GitHub with clean README."
                    className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    GitHub Repo URL or Live Demo Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={submissionLink}
                    onChange={(e) => setSubmissionLink(e.target.value)}
                    placeholder="https://github.com/your-username/portfolio"
                    className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                  />
                </div>

                {/* Direct Image Upload from Device */}
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    Upload Screenshot Proof (Direct from Device)
                  </label>

                  {submissionImage ? (
                    <div className="relative rounded-xl border border-[#D1D5DB] p-3 bg-[#F9FAFB] space-y-2">
                      <div className="h-32 w-full rounded-lg overflow-hidden bg-black/5 flex items-center justify-center">
                        <img
                          src={submissionImage}
                          alt="Task Proof Preview"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Image Ready
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleDownloadProofImage}
                            className="px-2 py-1 rounded bg-[#FFFFFF] border border-[#D1D5DB] hover:bg-[#080808] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                            title="Download image to your device storage"
                          >
                            <Download className="w-3 h-3" />
                            <span>Download to Device</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setSubmissionImage(null)}
                            className="text-red-600 hover:underline cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#D1D5DB] hover:border-[#080808] rounded-xl p-4 text-center cursor-pointer transition-colors bg-[#F9FAFB] hover:bg-[#FFFFFF]">
                      <ImageIcon className="w-6 h-6 text-[#666666] mb-1.5" />
                      <span className="font-semibold text-[#080808] text-xs">
                        Click to Choose Image from Your Device
                      </span>
                      <span className="text-[10px] text-[#888888] font-mono mt-0.5">
                        PNG, JPG, WEBP supported • Uploads directly from local storage
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProofImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-[#E5E7EB]">
                  <button
                    onClick={() => setShowSubmitModal(false)}
                    type="button"
                    className="px-4 py-2 text-xs text-[#666666] hover:text-[#080808] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#080808] text-white font-bold hover:bg-[#222222] cursor-pointer shadow-sm"
                  >
                    Mark as Completed
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Admin Edit Task */}
        {showEditTaskModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="relative w-full max-w-lg rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] p-6 sm:p-8 text-[#080808] shadow-2xl">
              <button
                onClick={() => setShowEditTaskModal(false)}
                type="button"
                className="absolute top-5 right-5 text-[#666666] hover:text-[#080808] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-[#080808] mb-1">Edit Common Task (Admin)</h3>
              <p className="text-xs text-[#555555] mb-6">
                Update the single common task assigned to all students.
              </p>

              <form onSubmit={handleSaveAdminTask} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    Task Title
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    Deadline
                  </label>
                  <input
                    type="text"
                    value={editDeadline}
                    onChange={(e) => setEditDeadline(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    Task Description
                  </label>
                  <textarea
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    rows={4}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    Step-by-Step Requirements (One per line):
                  </label>
                  <textarea
                    value={editReqs}
                    onChange={(e) => setEditReqs(e.target.value)}
                    rows={5}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808] font-mono"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-[#E5E7EB]">
                  <button
                    onClick={() => setShowEditTaskModal(false)}
                    type="button"
                    className="px-4 py-2 text-xs text-[#666666] hover:text-[#080808] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#080808] text-white font-bold hover:bg-[#222222] cursor-pointer shadow-sm"
                  >
                    Save Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
