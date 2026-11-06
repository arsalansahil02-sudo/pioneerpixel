import React, { useState } from 'react';
import {
  Heart,
  MessageSquare,
  Send,
  Plus,
  Sparkles,
  X,
  Download,
} from 'lucide-react';
import { useCommunity } from '../../hooks/useCommunity';

interface CommunityFeedSectionProps {
  onOpenUploadRequest: () => void;
}

export const CommunityFeedSection: React.FC<CommunityFeedSectionProps> = ({
  onOpenUploadRequest,
}) => {
  const { communityPosts, currentUser, isAdmin, likePost, createCommunityPost } = useCommunity();
  const [showAdminPostModal, setShowAdminPostModal] = useState(false);

  // Admin direct post creation state
  const [postType, setPostType] = useState<'text' | 'image' | 'note'>('text');
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postMediaUrl, setPostMediaUrl] = useState('');
  const [postTag, setPostTag] = useState('Official Update');

  const handleAdminCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    createCommunityPost({
      type: postType,
      title: postTitle.trim() || undefined,
      content: postContent.trim(),
      mediaUrl: postMediaUrl.trim() || undefined,
      tag: postTag.trim(),
    });

    setShowAdminPostModal(false);
    setPostTitle('');
    setPostContent('');
    setPostMediaUrl('');
  };

  return (
    <div className="py-10 bg-[#FFFFFF] min-h-screen text-[#080808]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E7EB] mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F4F6] border border-[#D1D5DB] text-[10px] font-mono uppercase tracking-wider text-[#080808] mb-3">
              <MessageSquare className="w-3 h-3 text-[#080808]" />
              <span>Public Feed</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#080808] tracking-tight">
              Community Feed
            </h1>
            <p className="text-xs text-[#555555] mt-1">
              Curated posts, notes, and photo highlights published and reviewed by the Admin team.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={() => setShowAdminPostModal(true)}
                type="button"
                className="px-4 py-2 rounded-xl bg-[#080808] text-white hover:bg-[#222222] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Post (Admin)</span>
              </button>
            )}

            <button
              onClick={onOpenUploadRequest}
              type="button"
              className="px-4 py-2 rounded-xl bg-[#FFFFFF] hover:bg-[#F3F4F6] border border-[#D1D5DB] text-xs font-semibold text-[#080808] flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
            >
              <Send className="w-3.5 h-3.5 text-[#666666]" />
              <span>Submit Content</span>
            </button>
          </div>
        </div>

        {/* Student Submission Prompt Callout */}
        <div className="mb-8 p-4 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#080808] border border-[#080808] flex items-center justify-center text-white shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#080808]">Have something valuable to share?</div>
              <div className="text-[11px] text-[#555555]">
                Send notes, photos, or text to the Main Admin for review and community publishing.
              </div>
            </div>
          </div>

          <button
            onClick={onOpenUploadRequest}
            type="button"
            className="px-3.5 py-1.5 rounded-lg bg-[#080808] text-white text-xs font-bold hover:bg-[#222222] shrink-0"
          >
            Submit Post
          </button>
        </div>

        {/* Community Feed Posts */}
        {communityPosts.length === 0 ? (
          <div className="py-16 text-center text-xs text-[#666666] bg-[#F9FAFB] rounded-3xl border border-[#E5E7EB] p-8">
            <MessageSquare className="w-10 h-10 text-[#888888] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#080808] mb-1">No Community Posts Yet</h3>
            <p className="text-xs text-[#666666] max-w-sm mx-auto mb-4">
              Announcements, approved student notes, and learning showcases will be published here.
            </p>
            <button
              onClick={onOpenUploadRequest}
              type="button"
              className="px-4 py-2 rounded-xl bg-[#080808] text-white text-xs font-bold hover:bg-[#222222] cursor-pointer"
            >
              Submit Content to Admin
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {communityPosts.map((post) => {
              const isLiked = currentUser ? post.likedBy.includes(currentUser.id) : false;

              return (
                <article
                  key={post.id}
                  className="rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] overflow-hidden shadow-sm"
                >
                {/* Post Top Header */}
                <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center text-[#080808] font-bold text-xs">
                      {post.authorName[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#080808]">{post.authorName}</span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                            post.authorRole === 'Main Admin'
                              ? 'bg-[#080808] text-white font-bold border-[#080808]'
                              : 'bg-[#F3F4F6] text-[#555555] border-[#D1D5DB]'
                          }`}
                        >
                          {post.authorRole}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-[#666666]">{post.createdAt}</div>
                    </div>
                  </div>

                  {post.tag && (
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#F9FAFB] border border-[#E5E7EB] text-[#555555] font-semibold">
                      {post.tag}
                    </span>
                  )}
                </div>

                {/* Optional Title */}
                {post.title && (
                  <div className="px-5 pt-4">
                    <h3 className="text-base font-bold text-[#080808]">{post.title}</h3>
                  </div>
                )}

                {/* Image Media (if present) with direct download to device */}
                {post.type === 'image' && post.mediaUrl && (
                  <div className="relative mt-3 bg-[#F9FAFB] border-y border-[#E5E7EB] group/postimg">
                    <img
                      src={post.mediaUrl}
                      alt={post.title || 'Community post media'}
                      className="w-full max-h-[480px] object-cover"
                    />
                    <a
                      href={post.mediaUrl}
                      download={`community_image_${post.id}.png`}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute top-3 right-3 px-3 py-1.5 rounded-xl bg-white/95 hover:bg-white text-[#080808] border border-[#D1D5DB] shadow-md flex items-center gap-1.5 text-xs font-mono transition-opacity cursor-pointer"
                      title="Download image directly to your device storage"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download to Device</span>
                    </a>
                  </div>
                )}

                {/* Post Text Content */}
                <div className="p-5 text-xs text-[#222222] leading-relaxed whitespace-pre-line">
                  {post.content}
                </div>

                {/* Post Footer Action Bar (Like Button) */}
                <div className="px-5 py-3.5 bg-[#F9FAFB] border-t border-[#E5E7EB] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => likePost(post.id)}
                      type="button"
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                        isLiked
                          ? 'bg-[#080808] text-white font-bold shadow-xs'
                          : 'bg-[#FFFFFF] border border-[#D1D5DB] text-[#080808] hover:border-[#080808]'
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isLiked ? 'fill-white text-white' : 'text-[#666666]'
                        }`}
                      />
                      <span>{post.likes} Likes</span>
                    </button>
                  </div>

                  <span className="text-[10px] font-mono uppercase text-[#888888]">
                    Verified Public Post
                  </span>
                </div>
              </article>
            );
          })}
        </div>
        )}

        {/* Modal: Admin Direct Post Creation */}
        {showAdminPostModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="relative w-full max-w-lg rounded-3xl bg-[#FFFFFF] border border-[#E5E7EB] p-6 sm:p-8 text-[#080808] shadow-2xl">
              <button
                onClick={() => setShowAdminPostModal(false)}
                type="button"
                className="absolute top-5 right-5 text-[#666666] hover:text-[#080808]"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-[#080808] mb-1">Create Community Post (Admin)</h3>
              <p className="text-xs text-[#555555] mb-6">
                Publish announcements, notes, or image highlights directly to the public community feed.
              </p>

              <form onSubmit={handleAdminCreatePost} className="space-y-4 text-xs">
                {/* Type Selection */}
                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    Post Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'text', label: 'Text Post' },
                      { id: 'note', label: 'Study Note' },
                      { id: 'image', label: 'Photo / Image' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setPostType(t.id as any)}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                          postType === t.id
                            ? 'bg-[#080808] text-white font-bold border-[#080808]'
                            : 'bg-[#F9FAFB] border-[#D1D5DB] text-[#555555] hover:text-[#080808]'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="e.g. Weekend Workshop Results"
                    className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    Tag / Category
                  </label>
                  <input
                    type="text"
                    value={postTag}
                    onChange={(e) => setPostTag(e.target.value)}
                    placeholder="e.g. Announcement, Workshop, Tip"
                    className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                    Content
                  </label>
                  <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    rows={4}
                    required
                    placeholder="Write your public post content..."
                    className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                  />
                </div>

                {postType === 'image' && (
                  <div>
                    <label className="block text-[10px] uppercase font-mono text-[#666666] font-semibold mb-1">
                      Photo / Image URL
                    </label>
                    <input
                      type="url"
                      value={postMediaUrl}
                      onChange={(e) => setPostMediaUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#D1D5DB] text-xs text-[#080808] focus:outline-none focus:border-[#080808]"
                    />
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-3 border-t border-[#E5E7EB]">
                  <button
                    onClick={() => setShowAdminPostModal(false)}
                    type="button"
                    className="px-4 py-2 text-xs text-[#666666] hover:text-[#080808]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#080808] text-white font-bold hover:bg-[#222222]"
                  >
                    Publish Post
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
