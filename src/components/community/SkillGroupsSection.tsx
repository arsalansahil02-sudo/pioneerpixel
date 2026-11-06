import React, { useState } from 'react';
import {
  Layers,
  Users,
  Shield,
  Lock,
  Plus,
  FileText,
  Image as ImageIcon,
  Video,
  AlertCircle,
  X,
  Download,
} from 'lucide-react';
import { useCommunity } from '../../hooks/useCommunity';
import { compressImage } from '../../utils/imageCompression';

export const SkillGroupsSection: React.FC = () => {
  const {
    currentUser,
    groups,
    students,
    isAdmin,
    joinGroup,
    leaveGroup,
    addGroupResource,
    createSkillGroup,
  } = useCommunity();

  const [activeGroupId, setActiveGroupId] = useState<string>(groups[0]?.id || '');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form for sharing a note/image/video in a group
  const [showShareModal, setShowShareModal] = useState(false);
  const [resourceType, setResourceType] = useState<'note' | 'image' | 'video'>('note');
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceContent, setResourceContent] = useState('');
  const [resourceMediaUrl, setResourceMediaUrl] = useState('');

  // Modal & form for Admin creating a new group
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupCategory, setNewGroupCategory] = useState('Programming');
  const [newGroupDesc, setNewGroupDesc] = useState('');
  const [newGroupAdminName, setNewGroupAdminName] = useState(currentUser?.name || 'Arsalan Sahil');

  const activeGroup = groups.find((g) => g.id === activeGroupId) || groups[0] || null;

  const joinedCount = currentUser?.joinedGroupIds?.length || 0;
  const isMemberOfActive = activeGroup && currentUser ? currentUser.joinedGroupIds.includes(activeGroup.id) : false;
  const canAccessContent = isMemberOfActive || isAdmin;

  // Enrolled members objects
  const groupMembers = activeGroup ? students.filter((s) => activeGroup.memberIds.includes(s.id)) : [];

  const handleJoin = (groupId: string) => {
    setErrorMessage(null);
    const result = joinGroup(groupId);
    if (!result.success && result.error) {
      setErrorMessage(result.error);
    }
  };

  const handleLeave = (groupId: string) => {
    setErrorMessage(null);
    leaveGroup(groupId);
  };

  const handleGroupImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file, 800, 800, 0.75);
      setResourceMediaUrl(compressed);
    } catch (err) {
      console.warn('Group resource image compression failed', err);
    }
  };

  const handleShareResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceTitle.trim() || !resourceContent.trim()) return;

    const res = addGroupResource(activeGroup.id, {
      type: resourceType,
      title: resourceTitle.trim(),
      content: resourceContent.trim(),
      mediaUrl: resourceMediaUrl.trim() || undefined,
    });

    if (res.success) {
      setShowShareModal(false);
      setResourceTitle('');
      setResourceContent('');
      setResourceMediaUrl('');
    } else if (res.error) {
      setErrorMessage(res.error);
    }
  };

  const handleCreateGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim() || !newGroupDesc.trim()) return;

    createSkillGroup(
      newGroupName.trim(),
      newGroupDesc.trim(),
      newGroupCategory.trim(),
      newGroupAdminName.trim() || currentUser?.name || 'Arsalan Sahil'
    );

    setNewGroupName('');
    setNewGroupDesc('');
    setShowCreateGroupModal(false);
  };

  return (
    <div className="py-10 bg-[#FFFFFF] min-h-screen text-[#080808]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Max 2 Rules Notice */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5E7EB] mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F4F6] border border-[#D1D5DB] text-[10px] font-mono uppercase tracking-wider text-[#080808] mb-3">
              <Layers className="w-3 h-3 text-[#080808]" />
              <span>Peer Learning Skill Groups</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#080808] tracking-tight">
              Specialized Skill Groups
            </h1>
            <p className="text-xs sm:text-sm text-[#555555] mt-1">
              Join groups based on skills you want to learn. Learn from peers, access exclusive notes, images, and video links.
            </p>
          </div>

          {/* Action & Group Limit Display */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {isAdmin && (
              <button
                onClick={() => {
                  setNewGroupAdminName(currentUser?.name || 'Arsalan Sahil');
                  setShowCreateGroupModal(true);
                }}
                type="button"
                className="px-4 py-3 rounded-2xl bg-[#080808] hover:bg-[#222222] text-white text-xs font-bold font-mono uppercase flex items-center gap-2 cursor-pointer shadow-md transition-colors"
                title="Create a new skill group (Admin Only)"
              >
                <Plus className="w-4 h-4 text-white" />
                <span>Create Group</span>
              </button>
            )}

            <div className="p-3.5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] flex items-center gap-3 shrink-0 shadow-xs">
              <div className="text-right">
                <div className="text-[10px] uppercase font-mono text-[#666666] font-semibold">
                  {isAdmin ? 'Admin Authority' : 'Your Group Quota'}
                </div>
                <div className="text-sm font-bold text-[#080808] font-mono">
                  {isAdmin ? 'All Groups Active' : `${joinedCount} / 2 Groups Joined`}
                </div>
              </div>
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                  isAdmin ? 'bg-[#080808] text-white' : joinedCount >= 2 ? 'bg-[#080808] text-white' : 'bg-[#E5E7EB] text-[#080808]'
                }`}
              >
                {isAdmin ? <Shield className="w-4 h-4 text-white" /> : `${joinedCount}/2`}
              </div>
            </div>
          </div>
        </div>

        {/* Error message / Limit banner */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-[#FEF2F2] border border-[#FCA5A5] text-xs text-[#991B1B] flex items-start justify-between gap-3 animate-in fade-in shadow-xs">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
              <span className="font-medium">{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-[#666666] hover:text-[#080808] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 2-Column Layout or Empty State */}
            {groups.length === 0 ? (
          <div className="py-20 text-center text-xs text-[#666666] bg-[#F9FAFB] rounded-3xl border border-[#E5E7EB] p-8">
            <Layers className="w-10 h-10 text-[#888888] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#080808] mb-1">No Skill Groups Created Yet</h3>
            <p className="text-xs text-[#666666] max-w-sm mx-auto mb-4 leading-relaxed">
              Skill groups are created by the Admin for specialized peer learning.
            </p>
            {isAdmin && (
              <button
                onClick={() => {
                  setNewGroupAdminName(currentUser?.name || 'Arsalan Sahil');
                  setShowCreateGroupModal(true);
                }}
                type="button"
                className="px-4 py-2 rounded-xl bg-[#080808] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-sm hover:bg-[#222222]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create First Skill Group</span>
              </button>
            )}
          </div>
        ) : activeGroup ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: All Skill Groups */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono uppercase text-[#666666] font-semibold mb-2 px-1">
              Available Skill Groups ({groups.length}):
            </div>

            {groups.map((group) => {
              const isSelected = group.id === activeGroupId;
              const isMember = currentUser?.joinedGroupIds.includes(group.id) || false;

              return (
                <div
                  key={group.id}
                  onClick={() => setActiveGroupId(group.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer relative shadow-xs hover:shadow-md ${
                    isSelected
                      ? 'bg-[#F9FAFB] border-[#080808]'
                      : 'bg-[#FFFFFF] border-[#E5E7EB] hover:border-[#999999]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-[#080808] tracking-tight">
                          {group.name}
                        </h3>
                        {isMember && (
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#080808] text-white font-bold">
                            Joined
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono uppercase text-[#666666]">
                        Category: {group.category}
                      </span>
                    </div>

                    {/* Join / Leave button */}
                    <div onClick={(e) => e.stopPropagation()}>
                      {isMember ? (
                        <button
                          onClick={() => handleLeave(group.id)}
                          type="button"
                          className="px-3 py-1.5 rounded-lg bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#080808] text-xs font-mono transition-colors cursor-pointer border border-[#D1D5DB]"
                        >
                          Leave Group
                        </button>
                      ) : (
                        <button
                          onClick={() => handleJoin(group.id)}
                          type="button"
                          className="px-3.5 py-1.5 rounded-lg bg-[#080808] hover:bg-[#222222] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                        >
                          Join Group
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-[#555555] leading-relaxed mb-4 line-clamp-2">
                    {group.description}
                  </p>

                  <div className="flex items-center justify-between text-xs pt-3 border-t border-[#E5E7EB]">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#080808]">
                      <Shield className="w-3.5 h-3.5 text-[#080808]" />
                      <span>Admin: <strong className="text-[#080808]">{group.adminName}</strong></span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-mono text-[#666666]">
                      <Users className="w-3 h-3" />
                      <span>{group.memberIds.length} Students</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Group Workspace & Shared Content */}
          <div className="lg:col-span-7 rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] p-6 sm:p-8 shadow-sm">
            {/* Group Header Banner */}
            <div className="pb-6 border-b border-[#E5E7EB] mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#666666] font-semibold">
                    Skill Group Workspace • {activeGroup.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#080808] mt-1">
                    {activeGroup.name}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  {isMemberOfActive ? (
                    <button
                      onClick={() => handleLeave(activeGroup.id)}
                      type="button"
                      className="px-3 py-1.5 rounded-lg bg-[#F3F4F6] text-xs font-mono text-[#080808] hover:bg-[#E5E7EB] border border-[#D1D5DB]"
                    >
                      Leave Group
                    </button>
                  ) : (
                    <button
                      onClick={() => handleJoin(activeGroup.id)}
                      type="button"
                      className="px-4 py-2 rounded-xl bg-[#080808] text-white text-xs font-bold hover:bg-[#222222] shadow-xs"
                    >
                      Join This Group
                    </button>
                  )}
                </div>
              </div>

              <p className="text-xs text-[#555555] leading-relaxed mb-4">
                {activeGroup.description}
              </p>

              {/* Group Meta Info */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs">
                <div>
                  <div className="text-[10px] uppercase font-mono text-[#666666] font-semibold">Group Admin / Tutor</div>
                  <div className="font-bold text-[#080808] mt-0.5">{activeGroup.adminName}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono text-[#666666] font-semibold">Joined Members</div>
                  <div className="font-bold text-[#080808] mt-0.5">{activeGroup.memberIds.length} Students</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono text-[#666666] font-semibold">Shared Content</div>
                  <div className="font-bold text-[#080808] mt-0.5">{activeGroup.resources.length} Items</div>
                </div>
              </div>
            </div>

            {/* Members Preview */}
            <div className="mb-6">
              <div className="text-[10px] uppercase font-mono text-[#666666] mb-2 font-semibold">
                Group Members ({groupMembers.length}):
              </div>
              <div className="flex flex-wrap gap-1.5">
                {groupMembers.map((member) => (
                  <span
                    key={member.id}
                    className="text-xs px-2.5 py-1 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-[#080808] flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#080808]" />
                    <span>{member.name}</span>
                    {member.id === activeGroup.adminId && (
                      <span className="text-[9px] font-mono px-1 rounded bg-[#080808] text-white">
                        Admin
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Shared Content Area (Strict Member Privacy Enforced) */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#080808] uppercase tracking-wider">
                    Shared Learning Content
                  </h3>
                  <span className="text-xs font-mono text-[#666666]">
                    ({activeGroup.resources.length})
                  </span>
                </div>

                {canAccessContent && (
                  <button
                    onClick={() => setShowShareModal(true)}
                    type="button"
                    className="px-3 py-1.5 rounded-lg bg-[#080808] text-white hover:bg-[#222222] text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Share Resource</span>
                  </button>
                )}
              </div>

              {/* If User IS a member or Admin: Display Shared Notes, Images, and Video Links */}
              {canAccessContent ? (
                <div className="space-y-4">
                  {activeGroup.resources.length === 0 ? (
                    <div className="py-12 text-center text-xs text-[#666666]">
                      No resources shared yet. Be the first group member to share notes, an image, or a video link!
                    </div>
                  ) : (
                    activeGroup.resources.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] space-y-2.5 shadow-xs"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {item.type === 'note' && (
                              <span className="p-1.5 rounded-md bg-[#FFFFFF] border border-[#D1D5DB] text-[#080808]">
                                <FileText className="w-3.5 h-3.5" />
                              </span>
                            )}
                            {item.type === 'image' && (
                              <span className="p-1.5 rounded-md bg-[#FFFFFF] border border-[#D1D5DB] text-[#080808]">
                                <ImageIcon className="w-3.5 h-3.5" />
                              </span>
                            )}
                            {item.type === 'video' && (
                              <span className="p-1.5 rounded-md bg-[#FFFFFF] border border-[#D1D5DB] text-[#080808]">
                                <Video className="w-3.5 h-3.5" />
                              </span>
                            )}
                            <h4 className="text-xs font-bold text-[#080808]">{item.title}</h4>
                          </div>

                          <span className="text-[10px] font-mono text-[#666666]">
                            {item.createdAt}
                          </span>
                        </div>

                        {/* Text / Note description */}
                        <p className="text-xs text-[#333333] leading-relaxed whitespace-pre-line pl-8">
                          {item.content}
                        </p>

                        {/* If Image Resource */}
                        {item.type === 'image' && item.mediaUrl && (
                          <div className="relative pl-8 pt-1 group/imgres">
                            <img
                              src={item.mediaUrl}
                              alt={item.title}
                              className="rounded-xl border border-[#E5E7EB] max-h-60 w-full object-cover"
                            />
                            <a
                              href={item.mediaUrl}
                              download={`group_resource_${item.id}.png`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-lg bg-white border border-[#D1D5DB] text-xs font-mono text-[#080808] hover:bg-[#F3F4F6] cursor-pointer shadow-xs"
                              title="Download diagram/image to your device"
                            >
                              <Download className="w-3 h-3 text-[#555555]" />
                              <span>Download Image to Device</span>
                            </a>
                          </div>
                        )}

                        {/* Author signature */}
                        <div className="pl-8 pt-2 flex items-center justify-between text-[10px] font-mono text-[#666666]">
                          <span>Shared by: <strong className="text-[#080808]">{item.authorName}</strong></span>
                          <span className="uppercase font-semibold">{item.type}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                /* LOCKED STATE */
                <div className="p-8 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFFFFF] border border-[#D1D5DB] flex items-center justify-center text-[#080808] mx-auto shadow-xs">
                    <Lock className="w-6 h-6 text-[#080808]" />
                  </div>
                  <h4 className="text-base font-bold text-[#080808]">Group Content Locked</h4>
                  <p className="text-xs text-[#555555] max-w-sm mx-auto leading-relaxed">
                    Only members of the <strong>{activeGroup.name}</strong> group can access shared study notes, diagrams, and video links.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => handleJoin(activeGroup.id)}
                      type="button"
                      className="px-5 py-2.5 rounded-xl bg-[#080808] text-white text-xs font-bold hover:bg-[#222222] cursor-pointer shadow-sm"
                    >
                      Join {activeGroup.name} Group
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        ) : null}

        {/* Modal: Share Resource in Group */}
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="relative w-full max-w-lg rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] p-6 sm:p-8 text-[#080808] shadow-2xl">
              <button
                onClick={() => setShowShareModal(false)}
                type="button"
                className="absolute top-5 right-5 text-[#666666] hover:text-[#080808]"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-[#080808] mb-1">
                Share Resource in {activeGroup.name}
              </h3>
              <p className="text-xs text-[#555555] mb-6">
                Group members can share notes, diagrams, images, and video links to learn from each other.
              </p>

              <form onSubmit={handleShareResource} className="space-y-4 text-xs">
                {/* Type Selection */}
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    Resource Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'note', label: 'Study Note', icon: FileText },
                      { id: 'image', label: 'Image / Diagram', icon: ImageIcon },
                      { id: 'video', label: 'Video Link', icon: Video },
                    ].map((t) => {
                      const Icon = t.icon;
                      const isSel = resourceType === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setResourceType(t.id as any)}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                            isSel
                              ? 'bg-[#080808] text-white font-bold border-[#080808]'
                              : 'bg-[#F9FAFB] border-[#D1D5DB] text-[#555555] hover:text-[#080808]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-[11px]">{t.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={resourceTitle}
                    onChange={(e) => setResourceTitle(e.target.value)}
                    required
                    placeholder="e.g. Pointer Dereferencing Cheatsheet"
                    className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                  />
                </div>

                {/* Content / Notes / URL */}
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    {resourceType === 'video'
                      ? 'Video Link URL & Explanation'
                      : 'Content / Notes'}
                  </label>
                  <textarea
                    value={resourceContent}
                    onChange={(e) => setResourceContent(e.target.value)}
                    rows={4}
                    required
                    placeholder={
                      resourceType === 'video'
                        ? 'Paste YouTube / tutorial link and add a brief explanation of what it teaches...'
                        : 'Write notes, explanations, or code snippets for group members...'
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                  />
                </div>

                {/* Optional Image URL or Direct Device Upload */}
                {resourceType === 'image' && (
                  <div>
                    <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                      Upload Image Directly from Device or Enter URL
                    </label>

                    {resourceMediaUrl ? (
                      <div className="p-3 rounded-xl bg-[#F9FAFB] border border-[#D1D5DB] space-y-2 mb-2">
                        <div className="h-28 w-full rounded-lg overflow-hidden bg-black/5 flex items-center justify-center">
                          <img
                            src={resourceMediaUrl}
                            alt="Resource Preview"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-emerald-600 font-semibold">✓ Image Ready</span>
                          <button
                            type="button"
                            onClick={() => setResourceMediaUrl('')}
                            className="text-red-600 hover:underline cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#D1D5DB] hover:border-[#080808] rounded-xl p-3 text-center cursor-pointer transition-colors bg-[#F9FAFB] hover:bg-[#FFFFFF] mb-2">
                        <ImageIcon className="w-5 h-5 text-[#666666] mb-1" />
                        <span className="font-semibold text-[#080808] text-xs">
                          Click to Choose Image from Your Device
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleGroupImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}

                    <input
                      type="url"
                      value={resourceMediaUrl}
                      onChange={(e) => setResourceMediaUrl(e.target.value)}
                      placeholder="Or enter image URL: https://..."
                      className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                    />
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-3 border-t border-[#E5E7EB]">
                  <button
                    onClick={() => setShowShareModal(false)}
                    type="button"
                    className="px-4 py-2 text-xs text-[#666666] hover:text-[#080808]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#080808] text-white font-bold hover:bg-[#222222]"
                  >
                    Share in Group
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Admin Create Skill Group Modal */}
        {showCreateGroupModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="relative w-full max-w-md rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] p-6 sm:p-8 text-[#080808] shadow-2xl">
              <button
                onClick={() => setShowCreateGroupModal(false)}
                type="button"
                className="absolute top-5 right-5 text-[#666666] hover:text-[#080808] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-xl bg-[#080808] text-white flex items-center justify-center">
                  <Layers className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#080808]">Create Skill Group</h3>
                <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-[#080808] text-white font-bold ml-auto">
                  Admin Only
                </span>
              </div>
              <p className="text-xs text-[#555555] mb-5">
                Create a new peer learning skill group. As admin, you will automatically be a member of this group.
              </p>

              <form onSubmit={handleCreateGroupSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    Group Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="e.g. Python, C Programming, Video Editing, Graphic Design"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    Skill Category
                  </label>
                  <select
                    value={newGroupCategory}
                    onChange={(e) => setNewGroupCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                  >
                    <option value="Programming">Programming & Code</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Graphic Design">Graphic Design & UI/UX</option>
                    <option value="Media & Video">Video Editing & Media</option>
                    <option value="Computer Fundamentals">Computer Fundamentals</option>
                    <option value="Data & AI">Data Analytics & AI</option>
                    <option value="Soft Skills">Soft Skills & English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    Group Admin / Mentor Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newGroupAdminName}
                    onChange={(e) => setNewGroupAdminName(e.target.value)}
                    placeholder="Admin / Mentor Name"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    Group Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newGroupDesc}
                    onChange={(e) => setNewGroupDesc(e.target.value)}
                    placeholder="Describe what members will learn, practice, and share in this skill group..."
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-[#E5E7EB]">
                  <button
                    onClick={() => setShowCreateGroupModal(false)}
                    type="button"
                    className="px-4 py-2 text-xs text-[#666666] hover:text-[#080808] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#080808] text-white font-bold hover:bg-[#222222] transition-colors cursor-pointer shadow-sm text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create & Join Group</span>
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
